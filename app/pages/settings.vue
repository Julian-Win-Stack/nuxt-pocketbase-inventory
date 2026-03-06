<template>
  <div>
    <h1>Settings</h1>
    <p>Current user: {{ userEmail }}</p>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script setup lang="ts">
// TODO: Get user from useAuth()
// TODO: logout() on button click
const userEmail = ref('')

function handleLogout() {
  // TODO: useAuth().logout()
  // TODO: navigateTo('/login')
}
</script>
