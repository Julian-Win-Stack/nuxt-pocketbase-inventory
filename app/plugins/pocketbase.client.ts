/**
 * PocketBase client plugin
 *
 * WHAT IT DOES:
 * Creates one PocketBase client instance and makes it available app-wide.
 *
 * HOW TO USE:
 * const { $pb } = useNuxtApp()
 */
import PocketBase from 'pocketbase'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(() => {
  const pb = new PocketBase('http://127.0.0.1:8090')
  return {
    provide: {
      pb,
    },
  }
})
