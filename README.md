# OpenStock Lite

A small **Nuxt 4 + PocketBase** inventory app boilerplate. Built for learning: auth, protected routes, CRUD, composables, plugins, Pinia.

## Project structure

```
app/
  pages/          # File-based routing
  components/
  composables/
  layouts/
  middleware/
  stores/         # Pinia stores
plugins/
pocketbase/       # Backend (PocketBase)
nuxt.config.ts
```

## Quick start

1. **PocketBase** — See [pocketbase/README.md](pocketbase/README.md)
2. **Nuxt** — `npm install && npm run dev`

## What to build (in order)

1. **Plugin** — `plugins/pocketbase.client.ts` — PocketBase client
2. **Composable** — `app/composables/useAuth.ts` — Auth logic
3. **Middleware** — `app/middleware/auth.global.ts` — Route protection
4. **Pages** — Implement the TODOs in each page

Each file has `TODO` comments showing what to implement. No logic is included—this is your practice ground.
