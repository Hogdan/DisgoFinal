<template>
  <Bar ref="bar-chart" :data="data" :options="options" />
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
export default {
  name: 'DailyChart',
  components: {
    Bar
  },
  data() {
    return {
      data: {
        labels: ['4', '3', '2', '1', '0', 'x'],
        datasets: [{
          label: 'Daily Guesses Remaining',
          data: [15, 19, 13, 4, 6, 2],
          backgroundColor: '#b027a9',
          borderRadius: 1,
        }],
      },
      options: {
        responsive: true,
        resizeDelay: 200,
        indexAxis: 'y'
      }
    }
  }
}
</script>
