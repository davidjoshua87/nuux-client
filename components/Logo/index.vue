<template>
  <img
    class="mux-logo"
    alt="Vuetify Logo"
    src="/logo-mux.svg"
  >
</template>

<script>
export default {
  name: 'LogoComponent'
}
</script>

<style>
.mux-logo {
  height: 180px;
  width: 180px;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
