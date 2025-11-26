<template>
  <router-view />
</template>

<script setup>
import { watch, ref, onMounted, provide } from 'vue'
import { Profile } from './models/Profile.js'

const profile = ref(Profile.create())
// Provide profile immediately with default value
provide('profile', profile)

onMounted(() => {
  if (localStorage.getItem('profile')) {
    const saved = JSON.parse(localStorage.getItem('profile'))
    profile.value = Profile.fromJSON(saved)
  } else {
    profile.value = Profile.create()
  }
})

watch(profile, () => {
  localStorage.setItem('profile', JSON.stringify(profile.value))
}, { deep: true })
provide('profile', profile)
</script>
