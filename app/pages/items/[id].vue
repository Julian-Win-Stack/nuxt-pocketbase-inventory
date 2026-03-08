<template>
  <div>
    <NuxtLink to="/items" class="mb-4 inline-block text-sm text-slate-400 hover:text-slate-100 transition-colors">
      ← Back to Items
    </NuxtLink>
    <h1 class="mb-6 text-2xl font-semibold text-slate-100">Item Details</h1>

    <p v-if="loading" class="text-slate-400">Loading...</p>
    <p v-if="error" class="rounded-lg bg-red-900/30 border border-red-800 p-4 text-sm text-red-400">{{ error }}</p>
    <template v-else>
      <div class="rounded-lg border border-slate-700 bg-slate-800/50 p-6 shadow-sm">
        <span class="mb-6 block h-48 w-48 overflow-hidden rounded-lg bg-slate-700">
          <img v-if="item?.image" :src="$pb.files.getUrl(item, item.image)" alt="" class="h-full w-full object-cover" />
        </span>
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
          <div class="flex gap-3 pt-2">
            <UiButton
              type="submit"
              variant="primary"
              :loading="loading"
            >
              Save
            </UiButton>
            <UiButton
              type="button"
              variant="danger"
              @click="handleDelete"
            >
              Delete
            </UiButton>
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
    useToast().add("Item updated successfully", 'success')
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
      useToast().add("Item deleted successfully", 'success')
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
