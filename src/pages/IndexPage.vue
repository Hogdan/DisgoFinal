<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <q-page class="flex column items-center q-px-sm">
      <div class="page-title q-my-md"><span>Daily Game</span></div>
      <div :class="$q.dark.isActive ? 'dark content' : 'light content'">
        <div class="flex column text-center items-center">
          <p class="welcome q-mb-md">Disgo</p>
          <p class="sub-line q-my-md">Can you place the historical events from today's date
            in the correct order?</p>
          <q-btn v-if="profile.playedToday()" rounded size="lg" class="q-my-lg" color="primary" to="/results"
            label="See Results" />
          <q-btn v-else rounded size="lg" class="q-my-lg" color="primary" to="/game" label="Lets Disgo" />
          <q-btn dense flat round class="q-my-lg" :color="$q.dark.isActive ? '$light' : '$dark'" icon="lightbulb" />
        </div>
      </div>
    </q-page>
  </transition>
</template>

<script setup>
import { inject } from 'vue'
const profile = inject('profile')
</script>

<style lang="scss" scoped>
.content {
  background-color: transparent;
  width: 100%;
  max-width: 25rem;
  margin: 3rem 0;

  .welcome {
    font-size: 3rem;
    font-weight: bold;
  }

  .sub-line {
    font-size: 1.2rem;
    font-weight: normal;
  }
}
</style>
