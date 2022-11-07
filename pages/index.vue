<template>
  <div>
    <auth-login v-if="!isAuthenticated" />
    <div v-else>
      <div v-if="isSubscribe">
        <subscription />
      </div>
      <div v-else>
        <welcome />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
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
    }
  },
  mounted () {
    this.getUpdateUser()
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
        if (this.user.subscription === null) {
          return true
        } else {
          return false
        }
      }
    }
  }
}
</script>
