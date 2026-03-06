<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-semibold text-slate-900">Items</h1>
      <button
        type="button"
        @click="error = ''; showModal = true"
        class="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
      >
        Add Item
      </button>
    </div>

    <p v-if="loading" class="text-slate-500">Loading...</p>
    <p v-if="error" class="rounded-lg bg-red-50 p-4 text-sm text-red-600">{{ error }}</p>
    <ul v-else class="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white shadow-sm">
      <li
        v-for="item in items"
        :key="item.id"
        class="flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors"
      >
        <span class="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-slate-200">
          <img v-if="item.image" :src="$pb.files.getUrl(item, item.image)" alt="" class="h-12 w-12 object-cover" />
        </span>
        <NuxtLink
          :to="`/items/${item.id}`"
          class="min-w-0 flex-1 text-slate-800 hover:text-slate-600 transition-colors"
        >
          {{ item.name }} ({{ item.sku || '—' }}) — qty: {{ item.qty }}, reorder: {{ item.reorderPoint }}
        </NuxtLink>
        <button
          type="button"
          @click="handleDelete(item.id)"
          class="rounded px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          Delete
        </button>
      </li>
    </ul>

    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/50" @click="showModal = false" />
        <div class="relative w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
          <h2 class="mb-4 text-lg font-semibold text-slate-900">Add new item</h2>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <input
              v-model="form.name"
              type="text"
              placeholder="Name"
              required
              class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            />
            <input
              v-model="form.sku"
              type="text"
              placeholder="SKU"
              class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            />
            <input
              v-model.number="form.qty"
              type="number"
              placeholder="Qty"
              required
              class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            />
            <input
              v-model.number="form.reorderPoint"
              type="number"
              placeholder="Reorder Point"
              required
              class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            />
            <input
              type="file"
              accept="image/*"
              ref="fileInputRef"
              class="w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200"
            />
            <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
            <div class="flex gap-3 pt-2">
              <button
                type="submit"
                class="flex-1 rounded-lg bg-slate-800 px-4 py-2.5 font-medium text-white hover:bg-slate-700 transition-colors"
              >
                Add Item
              </button>
              <button
                type="button"
                @click="showModal = false"
                class="rounded-lg border border-slate-300 px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
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
const fileInputRef = ref<HTMLInputElement | null>(null)
const items = ref<Item[]>([])
const loading = ref(false)
const error = ref<string>('')
const showModal = ref(false)

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
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
  } finally {
    loading.value = false
  }
 }

 onMounted(async () => {
  await fetchItems()
 })
</script>
