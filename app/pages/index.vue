<template>
  <div>
    <h1>Welcome, {{ userEmail }}</h1>
    <div>
      <p>Total items: {{ totalItems }}</p>
      <p>Items below reorder point: {{ itemsBelowReorder }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO: Get user from useAuth(), use user.email for userEmail
// TODO: Fetch items from PocketBase
// TODO: totalItems = computed from items list
// TODO: itemsBelowReorder = computed (items where qty < reorderPoint)
const userEmail = ref('')
const totalItems = computed(() => 0)
const itemsBelowReorder = computed(() => 0)
</script>
