<script>
import DailyChart from '../components/DailyChart.vue';
export default {
  name: 'ProfileComponent',
  components: {
    DailyChart
  },
  props: {
    // profile: { type: Object, required: true }
  },
  computed: {

  },
};
</script>

<template>
  <q-page class="flex column items-center q-px-sm">
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="page-title q-my-md"><span>Profile</span></div>
    </transition>
    <transition appear enter-active-class="animated fadeInUp slow" leave-active-class="animated fadeOutDown slow">


      <q-card :class="$q.dark.isActive ? 'profile-card dark' : 'profile-card light'">
        <div class="flex row justify-between">
          <div class="col">
            <span>5</span>
            <p>Current Streak</p>
          </div>
          <div class="col">
            <span>7</span>
            <p>Best Streak</p>
          </div>
          <div class="col">
            <span>30</span>
            <p>Games Played</p>
          </div>
          <div class="col">
            <span>25</span>
            <p>Win %</p>
          </div>
        </div>

        <hr />

        <p class="flex row justify-between q-mb-sm">
          <span>Level 10</span>
          <span>50 / 100</span>
        </p>
        <q-linear-progress :value="0.45" color="info" />


        <hr />

        <div class="flex column">
          <p class="mb-2">Badges: </p>
          <small class="q-caption">Earn badges for completing quests and hitting milestones!</small>
        </div>

        <hr />

        <div class="flex column text-center">
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
  max-width: 25rem;
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
