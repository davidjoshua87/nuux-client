<template>
  <div>
    <auth-login v-if="!isAuthenticated" />
    <div v-else>
      <div v-if="!isSubscribe">
        <welcome />
      </div>
      <div v-else>
        <subscription />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      loading: false,
      user: null
    }
  },
  computed: {
    dataUser () {
      return this.$store.getters.getUserInfo
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    isSubscribe () {
      return this.getIsSubscribe()
    },
    isLoading () {
      const show = localStorage.getItem('loadingOut') === null ? false : localStorage.getItem('loadingOut')
      return show
    }
  },
  mounted () {
    this.getUpdateUser()
    this.loading = this.isLoading
    setTimeout(() => {
      this.loading = false
    }, 2000)
  },
  methods: {
    async getUpdateUser () {
      if (this.dataUser !== null) {
        await this.$axios.$get(`/api/user/${this.dataUser.id}`)
          .then((response) => {
            if (response.message === 'Succeed Get User By Id') {
              this.user = response.data
            }
          }).catch((error) => {
            if (error.response) {
              console.log(error)
            }
          })
      }
    },
    getIsSubscribe () {
      if (this.user !== null) {
        if (this.user.subscription !== null) {
          return false
        } else {
          return true
        }
      }
    }
  }
}
</script>
