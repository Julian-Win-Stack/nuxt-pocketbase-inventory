<template>
    <div class="h-64">
        <canvas ref="canvasRef" />
    </div>
</template>

<script setup lang="ts">
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
const props = defineProps<{
  labels: string[]
  values: number[]
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const chartInstance = ref<Chart | null>(null)

function createChart() {
  if (!canvasRef.value || !props.labels.length || !props.values.length) return
  chartInstance.value = new Chart(canvasRef.value, {
    type: 'bar',
  data: {
    labels: props.labels,
    datasets: [{
      label: 'Quantity',
      data: props.values,
      backgroundColor: 'rgba(99, 102, 241, 0.8)',
    }],
  },
  options: {
    responsive: true,
    indexAxis: 'y', // horizontal bars (easier to read long names)
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { beginAtZero: true },
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