export const state = () => ({
  loading: false,
  showCard: true,
  showMessage: false,
  showError: false,
  message: '',
  subscribe: false,
  auth: {
    loggedIn: false,
    user: null,
    token: null
  }
})

export const mutations = {
  setAuth (state, { token, user }) {
    state.auth.token = token
    state.auth.user = user
    state.auth.loggedIn = !!token
  },
  logout (state) {
    state.auth.token = null
    state.auth.user = null
    state.auth.loggedIn = false
  }
}

export const actions = {
  nuxtServerInit ({ commit, req }) {
    if (process.server && req && req.cookies) {
      const auth = req.cookies.auth // Mengakses cookie di sisi server
      if (auth) {
        try {
          const { token, user } = JSON.parse(auth)
          commit('setAuth', { token, user })
        } catch (error) {
          console.error('Failed to parse auth cookie:', error)
        }
      }
    }
  },
  nuxtClientInit ({ commit, $cookies }) {
    const auth = $cookies.get('auth')
    if (auth) {
      try {
        const { token, user } = JSON.parse(auth)
        commit('setAuth', { token, user })
      } catch (error) {
        console.error('Failed to parse auth from cookies:', error)
      }
    }
  }
}

export const getters = {
  isAuthenticated (state) {
    return state.auth.loggedIn
  },
  isSubscribe (state) {
    return state.subscribe
  },
  getUserInfo (state) {
    return state.auth.user
  }
}
