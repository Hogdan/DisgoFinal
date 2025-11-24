<template>
  <q-layout view="hhr lpr ffr">

    <q-header :class="$q.dark.isActive ? 'dark header' : 'light header'">
      <q-toolbar>

        <q-btn flat dense round to="/">
          <q-avatar size="1.75rem" to="/">
            <img src="src/assets/discoball.png">
          </q-avatar>
        </q-btn>
        <q-toolbar-title class="flex items-center brand">Disgo</q-toolbar-title>
        <q-btn dense flat round icon="person" to="/profile" />
        <q-btn dense flat round :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'" @click="$q.dark.toggle()" />

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer v-if="footerShown" :reveal="true">
      <span :class="$q.dark.isActive ? 'dark footer' : 'light footer'">&copy; 2025 | Disgo</span>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { provide, ref } from 'vue'
const footerShown = ref(true)
provide('footerShown', footerShown)
</script>

<style lang="scss" scoped>
.brand {
  font-weight: bold;
  font-size: 1.2rem;
}

.footer {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 0.1rem solid $secondary;
  box-shadow: 0 -4px 8px 0 rgba(0, 0, 0, 0.2), 0 -2px 6px 0 rgba(0, 0, 0, 0.19);
}

.header {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 6px 0 rgba(0, 0, 0, 0.19);
  border-bottom: 0.1rem solid $secondary !important;
}

.dark {
  background-color: $dark;
  color: $light;

  span {
    color: $light;
  }
}

.light {
  background-color: $light;
  color: $dark;

  span {
    color: $dark;
  }
}
</style>
