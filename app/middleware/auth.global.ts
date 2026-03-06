/**
 * Auth middleware — route gatekeeper
 *
 * WHAT IT DOES:
 * Runs before every page. Redirects based on auth state.
 *
 * RULES TO IMPLEMENT:
 * - Not logged in + route !== /login → redirect to /login
 * - Logged in + route === /login → redirect to /
 *
 * TODO: Implement
 * 1. Get isLoggedIn from useAuth()
 * 2. Get route path from useRoute()
 * 3. Apply redirect logic
 */
export default defineNuxtRouteMiddleware((to) => {
  // TODO: const { isLoggedIn } = useAuth()
  // TODO: if (!isLoggedIn && to.path !== '/login') return navigateTo('/login')
  // TODO: if (isLoggedIn && to.path === '/login') return navigateTo('/')
})
