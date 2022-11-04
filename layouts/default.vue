<template>
  <v-app dark>
    <navbar />
    <v-main class="main">
      <Nuxt />
    </v-main>
    <footer-section />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style>
.main {
  padding: 0 !important;
}
</style>
