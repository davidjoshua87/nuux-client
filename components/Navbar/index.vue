<template>
  <div>
    <v-navigation-drawer
      v-if="isMobile"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <div :absolute="!fixed" app class="d-flex align-center justify-center py-3">
        <span>Mux v.{{ version }}</span>
      </div>
      <!-- befor login -->
      <v-list v-if="!isAuthenticated">
        <div v-for="(item, i) in items" :key="i">
          <v-list-item v-if="item.isAuth === false" :to="item.to" router exact>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
      <!-- after login -->
      <v-list v-else>
        <div v-for="(item, i) in items" :key="i">
          <div v-if="item.isAuth === true">
            <div v-if="item.isSubscribe === isSubscribe">
              <v-list-item :to="item.to" router exact>
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
            <div v-if="item.isSubscribe === null">
              <v-list-item :to="item.to" router exact>
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </div>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon v-if="isMobile" @click.stop="drawer = !drawer" @click="getUpdateUser" />
      <v-btn
        :to="isSubscribe === true ? '/subscription' : '/home'"
        router
        exact
        @click="getUpdateUser"
      >
        <div>
          <img src="/logo-mux.png">
        </div>
        <h1 class="font-weight-semibold leading-normal text-xl text-uppercase ml-2">
          {{ title }}
        </h1>
      </v-btn>
      <v-spacer />
      <template v-if="isAuthenticated">
        <div class="mr-4 ml-4">
          <v-btn
            v-if="isDesktop"
            to="/account"
            router
            exact
          >
            My Account
          </v-btn>
        </div>
        <div class="mr-4">
          <v-btn
            router
            exact
            @click="logout"
          >
            Logout
          </v-btn>
        </div>
      </template>
    </v-app-bar>

    <div v-if="showMessage === true" class="void" />

    <v-row class="py-4 d-flex justify-center">
      <v-alert v-if="showMessage" transition="scale-transition" type="success">
        <strong>{{ message }}</strong>
      </v-alert>
      <v-alert v-if="showError" transition="scale-transition" type="error">
        <strong>{{ message }}</strong>
      </v-alert>
    </v-row>

    <div v-if="loading" class="void" />

    <v-row class="py-4 d-flex justify-center">
      <v-progress-circular v-if="loading" :size="70" :width="7" color="white" indeterminate />
    </v-row>
  </div>
</template>

<script>
import packageInfo from '../../package.json'
export default {
  name: 'NavbarComponent',
  data () {
    return {
      version: packageInfo.version,
      loading: false,
      showMessage: false,
      showError: false,
      message: '',
      linkMenu: '',
      isMobile: false,
      isDesktop: false,
      isMenuLogin: false,
      isMenuRegister: true,
      clipped: true,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Mux',
      user: null,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/home',
          isAuth: true,
          isSubscribe: false
        },
        {
          icon: 'mdi-account-credit-card',
          title: 'Subscribe',
          to: '/subscription',
          isAuth: true,
          isSubscribe: true
        },
        {
          icon: 'mdi-account',
          title: 'My Account',
          to: '/account',
          isAuth: true,
          isSubscribe: null
        },
        {
          icon: 'mdi-login',
          title: 'Login',
          to: '/auth/login',
          isAuth: false
        },
        {
          icon: 'mdi-account-plus',
          title: 'Register',
          to: '/auth/register',
          isAuth: false
        }
      ]
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    dataUser () {
      return this.$store.getters.getUserInfo
    },
    isSubscribe () {
      return this.getIsSubscribe()
    }
  },
  beforeDestroy () {
    if (typeof window === 'undefined') { return }
    window.removeEventListener('resize', this.onResize, { passive: true })
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
    this.getLink()
    this.getUpdateUser()
  },
  methods: {
    logout () {
      this.loading = true
      localStorage.setItem('loadingOut', this.loading)
      this.$router.push('/')

      setTimeout(() => {
        this.showMessage = true
        this.message = 'Logout Succesfull'
        this.$auth.logout()
        localStorage.removeItem('loadingOut')
        this.loading = false
        setTimeout(() => {
          this.showMessage = false
          this.message = ''
        }, 100)
      }, 300)
    },
    onResize () {
      this.isMobile = window.innerWidth < 600
      this.isDesktop = window.innerWidth > 600
    },
    getLink () {
      if (this.$store.getters.getUserInfo !== null) {
        this.linkMenu = this.$store.getters.getUserInfo.subscription
        return this.linkMenu
      }
    },
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

<style>
.void {
  display: transparent;
  height: 100px;
}
</style>
