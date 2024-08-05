<template>
  <v-app dark>
    <navbar />
    <v-main class="main bg-image-home">
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
  overflow: hidden;
  padding: 0 !important;
}

.bg-image-home {
  background-image: url("/bg-image-login.png");
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-repeat: repeat;
  background-position: 0% 0%;
  background-size: cover;
}
</style>
