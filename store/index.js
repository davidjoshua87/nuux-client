export const state = () => ({
  loading: false,
  showCard: true,
  showMessage: false,
  showError: false,
  message: '',
  subscribe: false
})

export const getters = {
  isAuthenticated (state) {
    return state.auth.loggedIn // auth object as default will be added in vuex state, when you initialize nuxt auth
  },
  isSubscribe (state) {
    return state.subscribe
  },
  getUserInfo (state) {
    return state.auth.user
  }
}
