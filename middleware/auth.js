export default function ({ store, redirect }) {
  console.log('Middleware called')
  // Hanya berjalan di sisi client
  const auth = localStorage.getItem('auth')
  console.log('Middleware auth:', auth)

  if (auth) {
    const { token, user } = JSON.parse(auth)
    store.commit('setAuth', { token, user })
  }

  // Check if the user is authenticated
  if (!store.getters.isAuthenticated) {
    console.log('User not authenticated, redirecting to /login...')
    return redirect('/login')
  }
}
