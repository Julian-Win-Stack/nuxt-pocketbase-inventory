<template>
  <div>
    <h1 class="text-2xl font-semibold text-slate-100 mb-6">Welcome, {{ userEmail }}</h1>
    <div class="grid gap-4 sm:grid-cols-2 justify-items-center">
      <div class="w-full rounded-lg border border-slate-700 bg-slate-800/50 p-6 shadow-sm">
        <p class="text-sm font-medium text-slate-400">Total items</p>
        <p class="mt-1 text-2xl font-semibold text-slate-100">{{ totalItems }}</p>
      </div>
      <div class="w-full rounded-lg border border-slate-700 bg-slate-800/50 p-6 shadow-sm">
        <p class="text-sm font-medium text-slate-400">Items below reorder point</p>
        <p class="mt-1 text-2xl font-semibold text-amber-400">{{ itemsBelowReorder }}</p>
      </div>
      <UiStockPieChart 
      v-if="items.length > 0"
      :labels="stockChartData.labels" 
      :values="stockChartData.values" 
      />
      <UiTopItemsBarChart
      v-if="items.length > 0"
      :labels="top5Items.labels"
      :values="top5Items.values"
      />
    </div>
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
  created?: string
  updated?: string
}

const { user } = useAuth()
const userEmail = computed(() => user.value?.email ?? '')
const items = ref<Item[]>([])
const totalItems = computed(() => items.value.length)
const itemsBelowReorder = computed(() =>
  (items.value.filter((item) => item.qty < item.reorderPoint)).length
)

const stockChartData = computed(() => {
  const low = items.value.filter(i => i.qty < i.reorderPoint).length
  const healthy = items.value.filter(i => i.qty >= i.reorderPoint).length
  return {
    labels: ['Low stock', 'Healthy stock'],
    values: [low, healthy],
  }
})

const top5Items = computed(() => {
  const sortedItems = (items.value.sort((a, b) => b.qty - a.qty)).slice(0, 5)
  return {
    labels: sortedItems.map(i => i.name),
    values: sortedItems.map(i => i.qty),
  }
})

onMounted(async () => {
  const { $pb } = useNuxtApp()
  if (!$pb?.authStore.isValid) return

  try {
    items.value = (await $pb.collection('items').getFullList()) as Item[]
  } catch (error) {
    console.error('Error fetching items:', error)
  }
})
</script>
