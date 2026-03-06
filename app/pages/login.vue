<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
// TODO: Use ref() for email, password, errorMessage
// TODO: Use useAuth().login() on submit
// TODO: On success → navigateTo('/')
const email = ref('')
const password = ref('')
const errorMessage = ref('')

async function handleSubmit() {
  // TODO: const { login } = useAuth()
  // TODO: await login(email, password)
  // TODO: navigateTo('/')
}
</script>
