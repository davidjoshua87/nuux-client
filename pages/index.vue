<template>
  <div v-if="!loading">
    <auth-login v-if="!isAuthenticated" />
    <Welcome v-else />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      loading: false
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    isLoading () {
      const show = localStorage.getItem('loadingOut') === null ? false : localStorage.getItem('loadingOut')
      return show
    }
  },
  mounted () {
    this.loading = this.isLoading
    setTimeout(() => {
      this.loading = false
    }, 2000)
  }
}
</script>
