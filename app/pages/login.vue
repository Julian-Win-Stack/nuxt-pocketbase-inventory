<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-950 px-4">
    <div class="w-full max-w-sm">
      <h1 class="text-2xl font-semibold text-slate-100 mb-6 text-center">Login</h1>
      <form @submit.prevent="handleSubmit" class="rounded-lg border border-slate-700 bg-slate-800/50 p-6 shadow-sm">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="mb-4 w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="mb-4 w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
        <p v-if="errorMessage" class="mb-4 text-sm text-red-400">{{ errorMessage }}</p>
        <UiButton
          type="submit"
          variant="primary"
          :loading="loading"
          class="w-full"
        >
          Login
        </UiButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ClientResponseError } from 'pocketbase'

definePageMeta({
  layout: false,
})

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

async function handleSubmit() {
  errorMessage.value = ''
  loading.value = true
  try {
    const { login } = useAuth()
    await login(email.value, password.value)
    await navigateTo('/')
  } catch (err) {
    errorMessage.value =
      err instanceof ClientResponseError ? err.message : 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
