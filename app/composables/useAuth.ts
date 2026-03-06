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
  const { $pb } = useNuxtApp()

  if (!$pb) return {
    user: ref<Record<string, unknown> | null>(null),
    isLoggedIn: computed(() => false),
    login: async () => {},
    logout: () => {},
  }

  const user = ref<Record<string, unknown> | null>($pb.authStore.record ?? null)

  $pb.authStore.onChange(
    (_token: string, model: Record<string, unknown> | null) => {
      user.value = model ?? null
    },
    true
  )

  const isLoggedIn = computed(() => !!user.value)

  async function login(email: string, password: string) {
    await $pb.collection('users').authWithPassword(email, password)
  }

  function logout() {
    $pb.authStore.clear()
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
  }
}

