<script setup>
import StatsBar from 'src/components/StatsBar.vue'
import ExperienceBar from 'src/components/ExperienceBar.vue'
import ExperienceCounter from 'src/components/ExperienceCounter.vue'
import DailyChart from './DailyChart.vue'
import { computed, inject } from 'vue'

const profile = inject('profile')

const lastGameScore = computed(() => {
  if (profile.value && profile.value.history && profile.value.history.length > 0) {
    return profile.value.history[profile.value.history.length - 1].score
  }
  return 0
})

const experienceEarned = computed(() => (lastGameScore.value * 10) + 50)

function resultsMessage() {
  if (lastGameScore.value === 5) return 'PERFECT!'
  return lastGameScore.value >= 0 ? 'YOU WIN!' : 'TRY AGAIN!'
}

</script>

<template>
  <q-card class="results-card">
    <q-item-label class="row flex-center q-py-sm">
      <div class="results-msg">{{ resultsMessage() }}</div>
    </q-item-label>
    <hr />
    <StatsBar />
    <hr />

    <q-item-label class="flex-center column q-py-sm">
      <div class="results-score">YOUR SCORE: {{ lastGameScore }}</div>
      <DailyChart />
    </q-item-label>

    <hr />
    <transition appear enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutDown">
      <ExperienceCounter :experienceEarned="experienceEarned" />
    </transition>
    <ExperienceBar />
    <hr />

    <q-card-actions align="right">
      <q-btn flat label="Close" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<style scoped lang="scss">
.results-card {
  width: 100%;
  max-width: $content-width;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: $media-width) {
    padding: 1rem 0.5rem 0;
  }

  .row {
    .results-msg {
      font-size: 1.5rem;
      font-weight: 500;
    }
  }

}

@keyframes bounce {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
