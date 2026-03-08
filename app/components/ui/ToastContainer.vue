<template>
    <TransitionGroup name="toast" class="fixed top-4 right-4 z-50 flex flex-col gap-2" tag="div">
        <UiToast
        v-for="toast in toasts"
        :key="toast.id"
        :id="toast.id"
        :message="toast.message"
        :type="toast.type"
        />
    </TransitionGroup>
</template>

<script setup lang="ts">
const { toasts } = useToast()

</script>

<style scoped>
/* Enter: slide in from right */
.toast-enter-active {
  transition: all 0.3s ease-out;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

/* Leave: fade out */
.toast-leave-active {
  transition: all 0.3s ease-in;
}
.toast-leave-to {
  opacity: 0;
}

</style>