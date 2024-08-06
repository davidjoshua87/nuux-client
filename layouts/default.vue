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
  background: linear-gradient(90deg,  rgba(130,39,159,1) 0%, rgba(223,131,241,1) 50%, rgba(83,207,224,1) 75%);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  -webkit-font-smoothing: antialiased;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes scale-up-center {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes flip-in-hor-bottom {
  0% {
    transform: rotateX(80deg);
    opacity: 0;
  }
  100% {
    transform: rotateX(0);
    opacity: 1;
  }
}

@keyframes appear-smoothly {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
