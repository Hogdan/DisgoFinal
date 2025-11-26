<script setup>
import { inject } from 'vue';
const profile = inject('profile');
</script>

<template>
  <div class="flex row justify-between">
    <div class="col">
      <p>{{ profile.currentStreak }}</p>
      <small>Current Streak</small>
    </div>
    <div class="col">
      <p>{{ profile.bestStreak }}</p>
      <small>Best Streak</small>
    </div>
    <div class="col">
      <p>{{ profile.totalGames }}</p>
      <small>Games Played</small>
    </div>
    <div class="col">
      <p>{{ profile.getWinPercentage() }}</p>
      <small>Win %</small>
    </div>
  </div>
</template>

<style scoped lang="scss">
.row {
  width: 100%;

  .col {
    text-align: center;
    margin-bottom: 0.5rem;

    p {
      font-size: 2.2rem;
    }
  }
}
</style>
