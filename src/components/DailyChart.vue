<script setup>
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { inject, computed } from 'vue'

const profile = inject('profile')

ChartJS.register(CategoryScale, LinearScale, BarElement)

const chartData = computed(() => {
  const data = [0, 0, 0, 0, 0, 0, 0]

  if (profile.value && profile.value.history) {
    profile.value.history.forEach(game => {
      if (game.score >= 0 && game.score <= 5) {
        data[5 - game.score] += 1
      } else {
        data[6] += 1 // Count losses in 'x' category
      }
    })
  }

  return {
    labels: ['5', '4', '3', '2', '1', '0', 'x'],
    datasets: [{
      data: data,
      backgroundColor: '#b027a9',
      borderRadius: 1,
    }],
  }
})

const options = {
  responsive: true,
  maintainAspectRatio: false,
  resizeDelay: 200,
  indexAxis: 'y'
}
</script>

<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="options" />
  </div>
</template>

<style scoped lang="scss">
.chart-container {
  height: 10rem;
  width: 100%;
  max-width: 15rem;
  position: relative;
}
</style>
