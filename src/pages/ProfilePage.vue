<script setup>
import DailyChart from 'src/components/DailyChart.vue';
import StatsBar from 'src/components/StatsBar.vue';
import ExperienceBar from 'src/components/ExperienceBar.vue';
</script>

<template>
  <q-page class="flex column items-center q-px-sm">
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="page-title q-my-md"><span>Statistics</span></div>
    </transition>
    <transition appear enter-active-class="animated fadeInDown slow" leave-active-class="animated fadeOutDown slow">
      <q-card :class="$q.dark.isActive ? 'profile-card dark' : 'profile-card light'">
        <stats-bar />
        <hr />
        <ExperienceBar />
        <hr />

        <div class="flex column">
          <p class="mb-2">Badges: </p>
          <small class="q-caption">Earn badges for completing quests and hitting milestones!</small>
        </div>

        <hr />
        <div class="flex column items-center text-center">
          <p>Performance Overview</p>
          <DailyChart />
        </div>

      </q-card>
    </transition>
  </q-page>
</template>

<style lang="scss" scoped>
.profile-card {
  width: 100%;
  max-width: $content-width;
  padding: 0.75rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: $media-width) {
    background-color: transparent;
    box-shadow: none;
    padding: 0.75rem 0;
  }

  .row {

    div {
      text-align: center;

      p {
        font-size: 0.7rem;
      }

      span {
        font-size: 2.2rem;
      }
    }
  }

}
</style>
