export const state = () => ({
  loading: false,
  showCard: true,
  showMessage: false,
  showError: false,
  message: ''
})

export const getters = {
  isAuthenticated (state) {
    return state.auth.loggedIn // auth object as default will be added in vuex state, when you initialize nuxt auth
  },
  getUserInfo (state) {
    return state.auth.user
  }
}
