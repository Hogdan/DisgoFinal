<template>
  <router-view />
</template>

<script setup>
import { watch, ref, onMounted, provide } from 'vue'
import { Profile } from './models/Profile.js'

const profile = ref(Profile.create())

onMounted(() => {
  if (localStorage.getItem('profile')) {
    const saved = JSON.parse(localStorage.getItem('profile'))
    profile.value = Profile.fromJSON(saved)
  }
})

watch(profile, () => {
  localStorage.setItem('profile', JSON.stringify(profile.value))
}, { deep: true })

// Provide profile to all child components
provide('profile', profile)
</script>
