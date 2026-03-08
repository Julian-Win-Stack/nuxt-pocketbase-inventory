# nuxt-pocketbase-inventory

**A lightweight inventory management dashboard built with Nuxt 4 and PocketBase.**

---

## Demo Account

You can log in using the following test credentials:

**Email:** test@example.com  
**Password:** 1234567890

---

## Project Motivation

The startup that I am about to contribute to uses **Nuxt.js** and **PocketBase**.

My background is primarily **Next.js**, so I quickly learned **Nuxt.js** and built this project to practice the Nuxt ecosystem while waiting for access to the startup repository.

The goal of this project was to become comfortable with:

- Vue Composition API
- Nuxt file-based routing
- authentication middleware
- composables
- reusable UI components
- PocketBase integration

---

## Core Features

- **User authentication** (email/password login via PocketBase)
- **Protected routes** (global auth middleware redirects unauthenticated users)
- **Inventory item CRUD**
  - create items
  - read items
  - update items
  - delete items
- **Modal-based create form** with image upload
- **Inline edit form** on item detail page
- **Reusable UI components**
  - Button
  - DataTable
  - Toast
  - Charts
- **Data table with custom action slots**
- **Search and filtering**
  - search by name or SKU
  - low-stock filter
  - sort by name or quantity
- **URL query param sync** for filters
- **Dashboard statistics**
  - total items
  - low-stock items
- **Charts**
  - Pie chart (stock health)
  - Bar chart (top 5 items by quantity)
- **Toast notification system**
  - auto-dismiss
  - manual close button

---

## Tech Stack

### **Frontend**

- **Nuxt 4**
- **Vue 3** (Composition API, `<script setup>`)
- **TypeScript**
- **TailwindCSS**

### **Backend**

- **PocketBase** (self-hosted, runs locally)

### **Libraries**

- **Chart.js**
  - Pie chart
  - Bar chart
- **Pinia**
  - registered as a Nuxt module
  - available but not heavily used
- **concurrently**
  - runs PocketBase and Nuxt dev server together

---

## Project Structure
```
app/
  assets/css/main.css
  components/ui/
    Button.vue
    DataTable.vue
    StockPieChart.vue
    Toast.vue
    ToastContainer.vue
    TopItemsBarChart.vue
  composables/
    useAuth.ts
    useToast.ts
  layouts/
    default.vue
  middleware/
    auth.global.ts
  pages/
    index.vue
    login.vue
    settings.vue
    items/
      index.vue
      [id].vue
  plugins/
    pocketbase.client.ts
pocketbase/
  pb_migrations/
  pb_data/
```
---

## Key Architecture Patterns

### **Composables**

Shared logic is extracted into composables:

- `useAuth`
- `useToast`

This keeps page components smaller and reusable.

---

### **PocketBase Plugin**

`pocketbase.client.ts`

Registers a global PocketBase client:

`$pb`

This allows the PocketBase client to be accessed anywhere in the app.

---

### **Global Middleware**

`auth.global.ts`

Acts as a **route guard**.

Rules:

- If the user is **not logged in** and tries to access protected pages → redirect to `/login`
- If the user **is logged in** and visits `/login` → redirect to `/`

---

### **Reusable UI Component Layer**
`components/ui/`
Contains shared UI building blocks:

- buttons
- tables
- charts
- toast system

This keeps UI consistent across pages.

---

### **Modal-Based Forms**

Item creation uses **Teleport-based modal forms**.

This allows the modal to render outside the page hierarchy while keeping Vue state intact.

---

### **Slot-Driven DataTable**

`DataTable.vue` uses **Vue slots**.

Slots allow custom rendering of:

- action buttons
- empty states
- row-level UI

---

### **Toast Notification System**

Uses a **module-level singleton pattern**.

Shared toast state is managed via `useToast`.

Features:

- auto dismiss
- close button
- multiple stacked notifications

---

### **URL Query State Synchronization**

Search, filter, and sorting states are synced with the URL.

Example:

```
/items?search=laptop&sort=name
```
Benefits:

- shareable URLs
- persistent filters
- better UX

---

## Setup Instructions

Install dependencies:
```
npm install
```

Run the development server:
```
npm run dev
```
This command runs both:

- **Nuxt dev server**
- **PocketBase server**

using `concurrently`.

---

## PocketBase Requirements

PocketBase binary must exist in:
```
pocketbase/
```

PocketBase runs at:
```
http://127.0.0.1:8090
```

No `.env` file is required.

The PocketBase URL is **hardcoded in the plugin**.

---

## PocketBase Collections

### **items**

| Field | Type | Required |
|------|------|----------|
| name | text | yes |
| sku | text | no |
| qty | number | yes |
| reorderPoint | number | yes |
| image | file | no |
| owner | relation to users | yes |

### **users**

PocketBase built-in authentication collection.

Used for:

- login
- authentication
- user ownership

No custom fields are added.

---

## Screens / Pages

| Route | Page | Description |
|------|------|-------------|
| `/login` | Login | Email/password login form |
| `/` | Dashboard | Stats, pie chart, bar chart |
| `/items` | Items list | Search, filter, sort, add modal, delete |
| `/items/[id]` | Item detail | Edit form, delete, back link |
| `/settings` | Settings | Shows user email and logout button |
