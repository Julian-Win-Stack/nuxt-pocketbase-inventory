<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="item">
      <p>Name: {{ item.name }}</p>
      <p>SKU: {{ item.sku }}</p>
      <p>Qty: {{ item.qty }}</p>
      <p>Reorder point: {{ item.reorderPoint }}</p>

      <form @submit.prevent="handleSave">
        <input v-model="form.name" placeholder="Name" />
        <input v-model="form.sku" placeholder="SKU" />
        <input v-model.number="form.qty" type="number" placeholder="Qty" />
        <input v-model.number="form.reorderPoint" type="number" placeholder="Reorder point" />
        <button type="submit">Save</button>
      </form>
      <button @click="handleDelete">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO: useRoute().params.id
// TODO: watch route param when id changes
// TODO: Fetch one item by id
// TODO: Edit form + save
// TODO: Delete and navigateTo('/items')
const route = useRoute()
const item = ref<Record<string, unknown> | null>(null)
const form = reactive({
  name: '',
  sku: '',
  qty: 0,
  reorderPoint: 0,
})
const loading = ref(false)
const error = ref('')

watch(
  () => route.params.id,
  (id) => {
    // TODO: Fetch item when id changes
  },
  { immediate: true }
)

async function handleSave() {
  // TODO: Update item via $pb
}

async function handleDelete() {
  // TODO: Delete item, navigateTo('/items')
}
</script>
