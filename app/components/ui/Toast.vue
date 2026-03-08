<template>
  <div
    :class="toastClasses"
    class="flex items-center justify-between gap-3 rounded-lg border px-4 py-3 shadow-lg min-w-[280px] max-w-md"
  >
    <p class="text-sm text-slate-200">{{ message }}</p>
    <button
      type="button" 
      aria-label="Close"
      class="shrink-0 rounded p-1 text-slate-400 hover:bg-slate-600/50 hover:text-slate-200 transition-colors"
      @click="remove(props.id)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const { remove } = useToast()
const props = defineProps<{
  id: string
  message: string
  type: 'success' | 'error'
}>()

const toastClasses = computed(() => {
  const base = 'border'
  const typeClasses = {
    success: 'border-emerald-500/60 bg-slate-800/95',
    error: 'border-red-500/60 bg-slate-800/95',
  }
  return [base, typeClasses[props.type]].join(' ')
})
</script>
