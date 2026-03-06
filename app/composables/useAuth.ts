/**
 * useAuth composable — auth brain
 *
 * WHAT IT DOES:
 * Reusable auth logic shared across pages/components.
 * Nuxt/Vue equivalent of React hooks.
 *
 * TODO: Implement
 * - user: ref or computed for current user
 * - isLoggedIn: computed boolean
 * - login(email, password): Promise
 * - logout(): void
 */
export function useAuth() {
  // TODO: Get $pb from useNuxtApp()
  // TODO: Create user ref (reactive state)
  // TODO: Create isLoggedIn computed
  // TODO: Implement login()
  // TODO: Implement logout()

  return {
    user: ref(null),
    isLoggedIn: computed(() => false),
    login: async (_email: string, _password: string) => {
      // TODO: Call pb.collection('users').authWithPassword()
      // TODO: Update user state
    },
    logout: () => {
      // TODO: pb.authStore.clear()
      // TODO: Clear user state
    },
  }
}
