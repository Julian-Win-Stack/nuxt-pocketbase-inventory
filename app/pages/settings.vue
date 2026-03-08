<template>
  <div>
    <h1 class="text-2xl font-semibold text-slate-100 mb-6">Settings</h1>
    <div class="rounded-lg border border-slate-700 bg-slate-800/50 p-6 shadow-sm">
      <p class="text-slate-400 mb-4">Current user: <span class="font-medium text-slate-100">{{ userEmail }}</span></p>
      <UiButton
        variant="secondary"
        @click="handleLogout"
      >
        Logout
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()
const userEmail = ref<string>('')

function handleLogout() {
  logout()
  navigateTo('/login')
}
onMounted(() => {
  userEmail.value = typeof user.value?.email === 'string' ? user.value.email : ''
})
</script>
