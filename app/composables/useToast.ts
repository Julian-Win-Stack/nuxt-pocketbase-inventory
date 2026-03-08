type Toast = {
  id: string
  message: string
  type: 'success' | 'error' 
}
const toasts = ref<Toast[]>([])

export function useToast() {
    function add(message: string, type: 'success' | 'error') {
        const id = crypto.randomUUID()
        toasts.value.push({ id, message, type })
        setTimeout(() => remove(id), 4000)
    }
    function remove(id: string) {
        toasts.value = toasts.value.filter(toast => toast.id !== id)
    }

    return {
        toasts,
        add,
        remove,
    }

}