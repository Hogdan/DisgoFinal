<script setup>
</script>

<template>
  <q-header :class="$q.dark.isActive ? 'dark header' : 'light header'">
    <q-toolbar>

      <q-btn flat dense rounded to="/">
        <q-avatar size="1.75rem">
          <img src="src/assets/discoball.png">
        </q-avatar>
        <q-toolbar-title class="brand">Disgo</q-toolbar-title>
      </q-btn>
      <q-space />
      <q-btn dense flat round icon="person" to="/profile" />
      <q-btn dense flat round :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'" @click="$q.dark.toggle()" />

    </q-toolbar>
  </q-header>
</template>

<style lang="scss" scoped>
.header {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 6px 0 rgba(0, 0, 0, 0.19);
  border-bottom: 0.1rem solid $secondary !important;

  .brand {
    padding: 0 0.25rem;
    font-weight: 600;
    font-size: 1.2rem;
  }
}
</style>
