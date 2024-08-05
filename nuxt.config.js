import colors from 'vuetify/es5/util/colors'

export default {
  router: {
    middleware: ['auth'] // Menambahkan middleware auth secara global
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Music Xperience',
    title: 'MUX - Listening is everything',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Mux is the only music you need.'
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content:
          'https://res.cloudinary.com/dj-project/image/upload/v1722762153/musicxperience/logo-mux-large.png'
      },
      {
        hid: 'og:url',
        name: 'og:url',
        content: 'https://musicxperience.vercel.app/'
      },
      { hid: 'og:title', name: 'og:title', content: 'Listening is everything' },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'Mux, music, online, listen, stream, play, digital, album, artist, playlist'
      },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/cookies.js'
    // { src: '~/plugins/fontawesome.js', mode: 'client' }
    // { src: '~/plugins/k-progress.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  // Global page headers and other configurations...
  env: {
    SECRET_KEY: process.env.SECRET_KEY,
    NAME: process.env.NAME,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true
          // Specify the token type if needed
        },
        user: {
          property: 'user'
        },
        endpoints: {
          login: {
            url: '/api/login',
            method: 'post',
            propertyName: 'token'
          },
          user: {
            url: '/api/user',
            method: 'get',
            propertyName: 'user'
          },
          logout: {
            url: '/api/logout',
            method: 'post'
          }
        }
      }
    }
  },

  // auth: {
  //   strategies: {
  //     local: {
  //       token: {
  //         property: 'token',
  //         global: true,
  //         required: true,
  //         type: 'Bearer'
  //       },
  //       user: {
  //         property: 'user',
  //         autoFetch: true
  //       },
  //       endpoints: {
  //         login: { url: '/api/user/signin', method: 'post' },
  //         logout: false, //  we don't have an endpoint for our logout in our API and we just remove the token from localstorage
  //         user: { url: '/api/user/me', method: 'get' }
  //       }
  //     }
  //   }
  // },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://localhost:5000'
    // baseURL: 'https://nuux-server.herokuapp.com'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: 'public/'
  },

  generate: {
    dir: 'dist'
  }
}
