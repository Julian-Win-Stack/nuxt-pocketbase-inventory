<template>
  <div>
    <!-- Create form -->
    <form @submit.prevent="handleCreate">
      <input v-model="form.name" placeholder="Name" required />
      <input v-model="form.sku" placeholder="SKU" />
      <input v-model.number="form.qty" type="number" placeholder="Qty" required />
      <input v-model.number="form.reorderPoint" type="number" placeholder="Reorder point" required />
      <button type="submit">Create</button>
    </form>

    <!-- Items list -->
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} — {{ item.qty }}
        <NuxtLink :to="`/items/${item.id}`">View</NuxtLink>
        <button @click="handleDelete(item.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// TODO: reactive() or ref() for form state
// TODO: ref() for items, loading, error
// TODO: onMounted: fetch items from PocketBase
// TODO: handleCreate: add item, refresh list
// TODO: handleDelete: remove item, refresh list
const form = reactive({
  name: '',
  sku: '',
  qty: 0,
  reorderPoint: 0,
})
const items = ref<unknown[]>([])
const loading = ref(false)
const error = ref('')

onMounted(() => {
  // TODO: Fetch items
})

async function handleCreate() {
  // TODO: Create item via $pb
}

function handleDelete(_id: string) {
  // TODO: Delete item, refresh list
}
</script>
