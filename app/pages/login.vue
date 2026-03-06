<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <div class="w-full max-w-sm">
      <h1 class="text-2xl font-semibold text-slate-900 mb-6 text-center">Login</h1>
      <form @submit.prevent="handleSubmit" class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="mb-4 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="mb-4 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
        <p v-if="errorMessage" class="mb-4 text-sm text-red-600">{{ errorMessage }}</p>
        <button
          type="submit"
          class="w-full rounded-lg bg-slate-800 px-4 py-2.5 font-medium text-white hover:bg-slate-700 transition-colors"
        >
          Login
        </button>
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

async function handleSubmit() {
  errorMessage.value = ''
  try {
    const { login } = useAuth()
    await login(email.value, password.value)
    await navigateTo('/')
  } catch (err) {
    errorMessage.value =
      err instanceof ClientResponseError ? err.message : 'Login failed'
  }
}
</script>
