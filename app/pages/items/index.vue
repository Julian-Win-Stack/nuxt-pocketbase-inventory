<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-semibold text-slate-100">Items</h1>
      <UiButton
        variant="primary"
        @click="error = ''; showModal = true"
      >
        Add Item
      </UiButton>
    </div>

    <div class="space-y-4">
      <div class="flex flex-wrap items-center gap-4">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search by name or SKU..."
          class="w-64 rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
        <label class="flex cursor-pointer items-center gap-2 text-slate-300">
          <input
            v-model="lowStockOnly"
            type="checkbox"
            class="rounded border-slate-600 bg-slate-900 text-slate-500 focus:ring-slate-500"
          />
          Low stock only
        </label>
        <select
          v-model="sortBy"
          class="rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-slate-100 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        >
        <option value="">No sorting</option>
          <option value="name">Sort by name</option>
          <option value="qty">Sort by qty</option>
        </select>
      </div>
      <UiDataTable
        :rows="filteredItems"
        :columns="columns"
        :loading="loading"
        :row-href="(row) => `/items/${row.id}`"
      >
      <template #empty>No items yet. Add your first one!</template>
      <template #actions="{ row }">
        <UiButton
          variant="danger"
          @click="handleDelete(String(row.id))"
        >
          Delete
        </UiButton>
      </template>
      </UiDataTable>
    </div>

    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60" @click="showModal = false" />
        <div class="relative w-full max-w-md rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-xl">
          <h2 class="mb-4 text-lg font-semibold text-slate-100">Add new item</h2>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <input
              v-model="form.name"
              type="text"
              placeholder="Name"
              required
              class="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            />
            <input
              v-model="form.sku"
              type="text"
              placeholder="SKU"
              class="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            />
            <input
              v-model.number="form.qty"
              type="number"
              placeholder="Qty"
              required
              class="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            />
            <input
              v-model.number="form.reorderPoint"
              type="number"
              placeholder="Reorder Point"
              required
              class="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            />
            <input
              type="file"
              accept="image/*"
              ref="fileInputRef"
              class="w-full text-sm text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:border-slate-600 file:bg-slate-700 file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-200 hover:file:bg-slate-600"
            />
            <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
            <div class="flex gap-3 pt-2">
              <UiButton
                type="submit"
                :loading="loading"
              >
                Add Item
              </UiButton>
              <UiButton
                variant="secondary"
                @click="showModal = false"
              >
                Close
              </UiButton>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
interface Item {
  id: string
  name: string
  sku?: string
  qty: number
  reorderPoint: number
  owner: string
  image?: string
}

const form = reactive({
  name: '',
  sku: '',
  qty: 0,
  reorderPoint: 0,
})

const { $pb } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const fileInputRef = ref<HTMLInputElement | null>(null)
const items = ref<Item[]>([])
const loading = ref(false)
const error = ref<string>('')
const showModal = ref(false)
const searchQuery = ref(route.query.search as string ?? '')
const lowStockOnly = ref(route.query.lowStock === 'true')
const sortBy = ref<'name' | 'qty' | ''>((route.query.sort as 'name' | 'qty' | '') ?? '')

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'sku', label: 'SKU' },
  { key: 'qty', label: 'Qty' },
  { key: 'reorderPoint', label: 'Reorder' },
]

const filteredItems = computed(() => {
  let result = [...items.value]
    // 1. Search: filter by name or SKU (case-insensitive)
    
    if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    result = result.filter(item =>
      item.name.toLowerCase().includes(q) ||
      (item.sku?.toLowerCase().includes(q) ?? false)
    )
  }

    // 2. Filter: low stock only
    if (lowStockOnly.value) {
    result = result.filter(item => item.qty < item.reorderPoint)
  }

  // 3. Sort
  if (sortBy.value){
  result = result.sort((a, b) => {
    if (sortBy.value === 'name') {
      return a.name.localeCompare(b.name)
    }
    return a.qty - b.qty
  })
  }

  return result
})

async function fetchItems() {
  loading.value = true
  error.value = ''
  if (!$pb?.authStore.isValid) return
  try {
    items.value = await $pb.collection('items').getFullList() as Item[]
  } catch (err) {
    console.error('Error fetching items:', error)
    error.value = err instanceof Error ? err.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}

 async function handleSubmit() {
  loading.value = true
  error.value = ''
  try {
    const file = fileInputRef.value?.files?.[0]
    await $pb.collection('items').create({
      name: form.name,
      sku: form.sku,
      qty: form.qty,
      reorderPoint: form.reorderPoint,
      owner: $pb.authStore.record?.id,
      ...(file && { image: file }),
    })
    await fetchItems()
    useToast().add("Item added successfully", 'success')
    if (fileInputRef.value) fileInputRef.value.value = ''
    showModal.value = false
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
  } finally {
    loading.value = false
    form.name = ''
    form.sku = ''
    form.qty = 0
    form.reorderPoint = 0
  }
 }
 async function handleDelete(id: string) {
  if (!confirm('Are you sure you want to delete this item?')) return
  loading.value = true
  error.value = ''
  try {
    await $pb.collection('items').delete(id)
    await fetchItems()
    useToast().add("Item deleted successfully", 'success')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
    useToast().add("Item deletion failed", 'error')
  } finally {
    loading.value = false 
  }
 }

 onMounted(async () => {
  await fetchItems()
 })

 watch([searchQuery, lowStockOnly, sortBy], ([search, lowStock, sort]) => {
  const newQuery = {
    ...(search && { search }),
    ...(lowStock && { lowStock: 'true' }),
    ...(sort && { sort }),
  }
  // Only update if different
  const currentQuery = { ...route.query }
  if (JSON.stringify(newQuery) !== JSON.stringify(currentQuery)) {
    router.replace({ query: newQuery })
  }
}, { deep: true })

watch(() => route.query, (query) => {
  searchQuery.value = query.search as string ?? ''
  lowStockOnly.value = query.lowStock === 'true'
  sortBy.value = query.sort as 'name' | 'qty' | '' ?? ''
}, { immediate: true })
</script>
