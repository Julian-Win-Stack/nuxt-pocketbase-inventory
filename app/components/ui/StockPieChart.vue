<template>
    <div class="h-64">
        <canvas ref="canvasRef" />
    </div>
</template>


<script setup lang="ts">
    import { Chart, registerables } from 'chart.js'
    Chart.register(...registerables)
    const canvasRef = ref<HTMLCanvasElement | null>(null)
    const chartInstance = ref<Chart | null>(null)
    
    const props = defineProps<{
    labels: string[]
    values: number[]
  }>()

function createChart() {
  if (!canvasRef.value || !props.labels.length || !props.values.length) return
  chartInstance.value = new Chart(canvasRef.value, {
    type: 'pie',
    data: {
      labels: props.labels,
      datasets: [{
        data: props.values,
        backgroundColor: ['#f59e0b', '#22c55e'],
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
      },
    },
  })
}

watch(() => [props.labels, props.values], () => {
    chartInstance.value?.destroy()
    createChart()
  }, { deep: true })

onMounted(() => {
  createChart()
})

onBeforeUnmount(() => {
  chartInstance.value?.destroy()
})
</script>