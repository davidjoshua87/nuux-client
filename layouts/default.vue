<template>
  <v-app dark>
    <navbar />
    <v-main class="bg-image">
      <v-container>
        <Nuxt />
      </v-container>
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
.bg-image {
  background-image: url("~assets/images/bg-image-login.png");
  width: 100%;
  background-repeat: no-repeat;
  background-position: 0% 0%;
  background-size: cover;
}
</style>
