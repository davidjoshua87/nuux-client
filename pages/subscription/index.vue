<template>
  <div class="bg-image-subscribe">
    <subscription />
  </div>
</template>

<script>
export default {
  middleware: 'isAuthenticated'
}
</script>

<style>
.bg-image-subscribe {
  background-image: url("/bg-image-login.png");
  width: 100%;
  height: auto;
  background-repeat: no-repeat;
  background-position: 0% 0%;
  background-size: cover;
}
</style>
