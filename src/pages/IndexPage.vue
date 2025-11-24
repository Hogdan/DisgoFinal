<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <q-page class="flex column items-center q-px-sm">
      <div class="page-title q-my-md"><span>Daily Game</span></div>
      <div :class="$q.dark.isActive ? 'dark content' : 'light content'">
        <div class="flex column text-center items-center q-mb-md">
          <p class="text-h4 q-mb-lg">Welcome to Disgo!</p>
          <p class="q-my-lg">Can you order the historical events from<br /> today's date
            correctly?</p>
          <q-btn size="lg" class="q-my-lg" color="primary" to="/game" label="Lets Disgo" />
          <q-btn dense flat round class="q-my-lg" :color="$q.dark.isActive ? '$light' : '$dark'" icon="lightbulb" />
        </div>
      </div>
    </q-page>
  </transition>
</template>

<script setup>
//
</script>
<style lang="scss" scoped>
.content {
  background-color: transparent;
  width: 100%;
  max-width: 25rem;
  padding: 4rem 0;
}
</style>
