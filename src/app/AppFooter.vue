<script setup>
const footerShown = false;
</script>

<template>
  <q-footer v-if="footerShown" :reveal="true">
    <q-toolbar :class="$q.dark.isActive ? 'dark footer' : 'light footer'">
      <q-toolbar-title><span>&copy; 2025 | Disgo</span></q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<style lang="scss" scoped>
.footer {
  text-align: center;
  border-top: 0.1rem solid $secondary;
  box-shadow: 0 -4px 8px 0 rgba(0, 0, 0, 0.2), 0 -2px 6px 0 rgba(0, 0, 0, 0.19);

  span {
    font-weight: 300;
    font-size: 0.8rem;
  }
}
</style>
