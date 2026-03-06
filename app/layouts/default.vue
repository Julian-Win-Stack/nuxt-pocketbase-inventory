<template>
  <div class="min-h-screen flex flex-col">
    <nav class="bg-white border-b border-slate-200 px-6 py-4">
      <div class="max-w-4xl mx-auto flex gap-6 items-center">
        <NuxtLink
          to="/"
          class="text-slate-600 hover:text-slate-900 font-medium transition-colors"
          active-class="!text-slate-900 font-semibold"
        >
          Dashboard
        </NuxtLink>
        <NuxtLink
          to="/items"
          class="text-slate-600 hover:text-slate-900 font-medium transition-colors"
          active-class="!text-slate-900 font-semibold"
        >
          Items
        </NuxtLink>
        <NuxtLink
          to="/settings"
          class="text-slate-600 hover:text-slate-900 font-medium transition-colors"
          active-class="!text-slate-900 font-semibold"
        >
          Settings
        </NuxtLink>
      </div>
    </nav>
    <main class="flex-1 px-6 py-8">
      <div class="max-w-4xl mx-auto">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>
