<script setup>
import { inject } from 'vue';
const profile = inject('profile');
</script>

<template>
  <div class="flex column q-py-sm">
    <div class="flex row justify-between q-mb-sm">
      <span>Level {{ profile.getLevel() }}</span>
      <span>{{ profile.getExperience() }} / {{ profile.getExperienceToNextLevel() }}</span>
    </div>
    <q-linear-progress :value="profile.getExperience() / profile.getExperienceToNextLevel()" color="info" />
  </div>
</template>
