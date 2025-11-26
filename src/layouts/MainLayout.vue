<template>
  <q-layout view="hhr lpr ffr">

    <AppHeader />

    <q-page-container>
      <router-view />
    </q-page-container>

    <AppFooter />

  </q-layout>
</template>

<script setup>
import AppHeader from 'src/app/AppHeader.vue'
import AppFooter from 'src/app/AppFooter.vue'
</script>
