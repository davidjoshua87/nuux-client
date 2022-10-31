<template>
  <div>
    <div v-if="!isAuthenticated">
      <auth-login />
    </div>
    <div v-else>
      <welcome />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>

<style></style>
