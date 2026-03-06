import type PocketBase from 'pocketbase'

declare module '#app' {
  interface NuxtApp {
    $pb: PocketBase
  }
}
