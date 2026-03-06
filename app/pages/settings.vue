<template>
  <div>
    <h1 class="text-2xl font-semibold text-slate-900 mb-6">Settings</h1>
    <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <p class="text-slate-600 mb-4">Current user: <span class="font-medium text-slate-900">{{ userEmail }}</span></p>
      <button
        type="button"
        @click="handleLogout"
        class="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
      >
        Logout
      </button>
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
