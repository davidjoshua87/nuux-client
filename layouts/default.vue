<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="isMobile"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-header
        :absolute="!fixed"
        app
        class="d-flex align-center justify-center"
      >
        <span>Nuux App v.{{ version }}</span>
      </v-header>
      <v-list v-if="!isAuthenticated">
        <div
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item
            v-if="isAuthenticated === item.isAuth"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
      <v-list v-else>
        <div
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item
            v-if="isAuthenticated === item.isAuth"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon v-if="isMobile" @click.stop="drawer = !drawer" />
      <v-btn
        to="/"
        router
        exact
        @click="onCheckMenuLogin"
      >
        {{ title }}
      </v-btn>
      <v-spacer />
      <template v-if="!isAuthenticated">
        <div v-if="isMenuLogin === true" class="mr-4">
          <v-btn
            to="/auth/login"
            router
            exact
            @click="onCheckMenuLogin"
          >
            Login
          </v-btn>
        </div>
        <div v-if="isMenuRegister === true" class="mr-4">
          <v-btn
            to="/auth/register"
            router
            exact
            @click="onCheckMenuLogin"
          >
            Register
          </v-btn>
        </div>
      </template>
      <template v-else>
        <div class="mr-4">
          <v-btn
            v-if="isDesktop"
            to="/profile"
            router
            exact
          >
            Profile
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
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
      class="d-flex align-center justify-center"
    >
      <span>Group ONE &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import packageInfo from '../package'
export default {
  name: 'DefaultLayout',
  data () {
    return {
      version: packageInfo.version,
      isMobile: false,
      isDesktop: false,
      isMenuLogin: false,
      isMenuRegister: false,
      clipped: true,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Nuux App',
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/welcome',
          isAuth: true
        },
        {
          icon: 'mdi-account',
          title: 'Profile',
          to: '/profile',
          isAuth: true
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
    }
  },
  beforeDestroy () {
    if (typeof window === 'undefined') { return }
    window.removeEventListener('resize', this.onResize, { passive: true })
  },

  mounted () {
    this.onResize()
    this.onCheckMenuLogin()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  methods: {
    async logout () {
      await this.$auth.logout()
      this.isMenuLogin = false
    },
    onResize () {
      this.isMobile = window.innerWidth < 600
      this.isDesktop = window.innerWidth > 600
    },
    onCheckMenuLogin () {
      const url = window.location.pathname
      if (url === '/' || url === '/auth/login') {
        this.isMenuLogin = false
        this.isMenuRegister = true
      } else {
        this.isMenuRegister = false
        this.isMenuLogin = true
      }
    }
  }
}
</script>
