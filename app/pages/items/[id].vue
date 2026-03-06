<template>
  <div>
    <NuxtLink to="/items" class="mb-4 inline-block text-sm text-slate-600 hover:text-slate-900 transition-colors">
      ← Back to Items
    </NuxtLink>
    <h1 class="mb-6 text-2xl font-semibold text-slate-900">Item Details</h1>

    <p v-if="loading" class="text-slate-500">Loading...</p>
    <p v-if="error" class="rounded-lg bg-red-50 p-4 text-sm text-red-600">{{ error }}</p>
    <template v-else>
      <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <span class="mb-6 block h-48 w-48 overflow-hidden rounded-lg bg-slate-200">
          <img v-if="item?.image" :src="$pb.files.getUrl(item, item.image)" alt="" class="h-full w-full object-cover" />
        </span>
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
          <div class="flex gap-3 pt-2">
            <button
              type="submit"
              class="rounded-lg bg-slate-800 px-4 py-2.5 font-medium text-white hover:bg-slate-700 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              @click="handleDelete"
              class="rounded-lg border border-red-300 px-4 py-2.5 font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </template>
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
  const { $pb } = useNuxtApp()
  const route = useRoute()
  const fileInputRef = ref<HTMLInputElement | null>(null)
  const item = ref<Item | null>(null)
  const loading = ref(false)
  const error = ref<string>('')
  const form = reactive({
    name: '',
    sku: '',
    qty: 0,
    reorderPoint: 0,
  })

  async function fetchItem(id: string) {
    if (!id) return
    loading.value = true
    error.value = ''
    try {
    const record = await $pb.collection('items').getOne(id) as Item
    item.value = record 
    form.name = record.name
    form.sku = record.sku || ''
    form.qty = record.qty
    form.reorderPoint = record.reorderPoint
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
  } finally {
    loading.value = false
  }
  }

async function handleSubmit() {
  loading.value = true
  error.value = ''
  const id = route.params.id as string
  if (!id) return
  try {
    const file = fileInputRef.value?.files?.[0]
    await $pb.collection('items').update(id, {
      ...form,
      ...(file && { image: file }),
    })
    await fetchItem(id)
    if (fileInputRef.value) fileInputRef.value.value = ''
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}

async function handleDelete() {
    if (!confirm('Are you sure you want to delete this item?')) return
    loading.value = true
    error.value = ''
    const id = route.params.id as string
    if (!id) return
    try {
      await $pb.collection('items').delete(id as string)
      navigateTo('/items')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

watch(
  () => route.params.id,
  (id) => fetchItem(id as string)
, { immediate: true })



</script>
