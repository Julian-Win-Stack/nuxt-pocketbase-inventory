<template>
    <button
    :class="buttonClasses"
    :type="type"
    :disabled="disabled || loading"
    >
        <slot v-if="!loading" />
        <span v-else>Loading...</span>
    </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    variant?: 'primary' | 'secondary' | 'danger'
    disabled?: boolean
    loading?: boolean
    type?: 'button' | 'submit' 
}>(), {
    variant: 'primary',
    disabled: false,
    loading: false,
    type: 'button',
})

const buttonClasses = computed(() => {
    const base = 'rounded-lg px-4 py-2.5 text-sm font-medium transition-colors'
    const variantClasses = {
        primary: 'bg-slate-600 text-white hover:bg-slate-500',
        secondary: 'border border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700',
        danger: 'border border-red-600/50 bg-transparent text-red-400 hover:bg-red-900/30',
    }
    const state = props.disabled || props.loading ? 'opacity-50 cursor-not-allowed' : ''
    return [base, variantClasses[props.variant], state].filter(Boolean).join(' ')
})
</script>