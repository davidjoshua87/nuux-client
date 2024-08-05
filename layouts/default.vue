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
  /* background-image: url("/bg-image-login.png");
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-repeat: repeat;
  background-position: 0% 0%;
  background-size: cover; */
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: Lato, sans-serif;
  background: rgba(130,39,159,1);
  background: linear-gradient(90deg,  rgba(130,39,159,1) 0%, rgba(223,131,241,1) 45%, rgba(83,207,224,1) 100%);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  -webkit-font-smoothing: antialiased;
}
</style>
