<template>
  <div class="d-flex align-center justify-center min-vh-100">
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <v-card
            v-if="showCard"
            elevation="18"
            class="pa-4 ma-lg-4 ma-md-2 d-flex flex-column align-center justify-center"
          >
            <div>
              <div class="d-flex justify-center ma-4">
                <div class="mr-2">
                  <img src="/logo-mux.png" height="25" alt="Mux Logo">
                </div>
                <div
                  class="v-card-title font-weight-semibold text-h5 text-uppercase"
                >
                  Mux
                </div>
              </div>
              <div class="v-card-text pt-2 text-center">
                <h5 class="text-h5 font-weight-semibold mb-4">
                  Welcome to Mux! 👋🏻
                </h5>
                <p class="mb-4">
                  Please sign-in to your account and start the adventure
                </p>
              </div>
              <v-form
                ref="form"
                v-model="valid"
                autocomplete="off"
                lazy-validation
                class="text-center"
              >
                <v-text-field
                  v-model="loginData.email"
                  autocomplete="off"
                  :rules="emailRules"
                  name="input-email"
                  label="Email"
                  required
                />
                <v-text-field
                  v-model="loginData.password"
                  autocomplete="off"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="passwordRules"
                  :type="showPassword ? 'text' : 'password'"
                  name="input-password"
                  label="Password"
                  @click:append="showPassword = !showPassword"
                />
                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="my-2"
                  width="100%"
                  @click="login"
                >
                  Login
                </v-btn>
              </v-form>
              <div class="text-center text-base ma-4">
                <span>New on our platform? Please log in.</span>
                <!-- <v-btn
                  to="/auth/register"
                  plain
                  router
                  exact
                  class="text-transform-none"
                >
                  <a class="text-primary ms-2">Create an account</a>
                </v-btn> -->
              </div>
            </div>
          </v-card>

          <v-row class="py-4 d-flex justify-center">
            <v-alert
              v-if="showMessage"
              transition="scale-transition"
              type="success"
            >
              <strong>{{ message }}</strong>
            </v-alert>
            <v-alert
              v-if="showError"
              transition="scale-transition"
              type="error"
            >
              <strong>{{ message }}</strong>
            </v-alert>
          </v-row>

          <!-- <v-row class="py-4 d-flex justify-center">
            <v-progress-circular
              v-if="loading"
              :size="70"
              :width="7"
              color="white"
              indeterminate
            />
          </v-row> -->
        </v-col>
      </v-row>
    </v-container>

    <!-- Overlay and spinner -->
    <div v-if="loading" class="overlay">
      <v-progress-circular
        :size="100"
        :width="10"
        color="white"
        indeterminate
        class="spinner"
      />
    </div>
  </div>
</template>

<script>
import { generateJwtToken } from '@/helpers/jwtHelper'

export default {
  name: 'LoginComponent',
  data () {
    return {
      valid: true,
      showPassword: false,
      loading: false,
      showCard: true,
      showMessage: false,
      showError: false,
      message: '',
      loginData: {
        email: '',
        password: ''
      },
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      passwordRules: [v => !!v || 'Password is required']
    }
  },
  computed: {
    dataUser () {
      return this.$store.getters.getUserInfo
    }
  },
  mounted () {
    this.resetForm()
    this.checkCard()
    this.checkLoading()
    this.checkShowMsg()
    this.checkMessage()
  },
  methods: {
    resetForm () {
      this.loginData.email = ''
      this.loginData.password = ''
    },
    generateToken () {
      this.token = generateJwtToken()
    },
    async login () {
      this.loading = true

      try {
        // Simulate login logic (replace with your actual authentication logic)
        if (
          this.loginData.email === process.env.EMAIL &&
          this.loginData.password === process.env.PASSWORD
        ) {
          // Simulate asynchronous JWT token generation
          const token = generateJwtToken() // No need for await here since it's synchronous
          const user = {
            id: '66ac949b646ac82b9510597f',
            fullname: 'Joshua David Shing',
            email: 'mail@mail.com',
            password:
              '$2b$10$He.zpwEfUCFtDbD/2ek20ujll0Wna0XQ.E6V.qvRCKDa6u.1SCZPe',
            avatar:
              'https://res.cloudinary.com/dj-project/image/upload/v1722586434/musicxperience/avatar.png',
            phoneNumber: '0811111111',
            address: 'Jakarta',
            province: 'DKI Jakarta',
            zipCode: '11111',
            country: 'Indonesia',
            language: 'Indonesia',
            subscription: '12'
          }
          // Save the token to localStorage or handle authentication state
          localStorage.setItem('auth', JSON.stringify({ token, user }))
          this.$store.commit('setAuth', { token, user })

          this.message = 'Success Login'
          this.showMessage = true
          // Redirect based on some condition, like subscription status
          await new Promise(resolve => setTimeout(resolve, 10000)) // Simulate async delay

          this.$router.push('/home')
          this.showMessage = false
          this.loading = false
        } else {
          this.message = 'Fail Login'
          this.errorMessage = 'Invalid credentials'
          this.showError = true

          await new Promise(resolve => setTimeout(resolve, 10000)) // Simulate async delay

          this.showError = false
          this.resetForm() // Reset form logic if needed
          this.loading = false
        }
      } catch (error) {
        this.message = 'An error occurred'
        this.errorMessage = error.message
        this.showError = true
        this.loading = false
      }
    },
    // login () {
    //   this.loading = true
    //   this.showCard = false
    //   if (this.loginData.email === this.dataUser.email) {
    //     // Simpan data pengguna ke localStorage
    //     console.log('Login successful, state updated')

    //     this.message = 'Success Login'
    //     this.showMessage = true
    //     this.loading = false

    //     setTimeout(() => {
    //       if (this.dataUser.subscription === null) {
    //         console.log('Navigating to /subscription')
    //         this.$router.push('/subscription')
    //       } else {
    //         console.log('Navigating to /home')
    //         this.$router.push('/home')
    //       }

    //       this.showMessage = false
    //       this.showCard = true
    //     }, 1000)
    //   } else {
    //     this.message = 'Fail Login'
    //     this.showError = true
    //     this.loading = false

    //     setTimeout(() => {
    //       this.showError = false
    //       window.location.href = '/auth/login'
    //       this.resetForm()
    //     }, 1000)
    //   }

    //   // await this.$auth
    //   //   .loginWith('local', {
    //   //     data: this.loginData
    //   //   })
    //   //   .then((response) => {
    //   //     if (response.status === 200) {
    //   //       this.message = response.data.message
    //   //       this.showMessage = true
    //   //       this.loading = false
    //   //       setTimeout(() => {
    //   //         if (this.dataUser.subscription === null) {
    //   //           this.$router.push('/subscription')
    //   //         } else {
    //   //           this.$router.push('/home')
    //   //         }

    //   //         this.showMessage = false
    //   //         this.showCard = true
    //   //       }, 100)
    //   //     }
    //   //   })
    //   //   .catch((error) => {
    //   //     if (error.response) {
    //   //       if (error.response.status === 400) {
    //   //         this.message = error.response.data.message
    //   //         this.showError = true
    //   //         this.loading = false
    //   //         setTimeout(() => {
    //   //           this.showError = false
    //   //           window.location.href = '/auth/login'
    //   //           this.resetForm()
    //   //         }, 100)
    //   //       } else {
    //   //         this.message = error.response.data.message
    //   //         this.showError = true
    //   //         this.loading = false
    //   //         setTimeout(() => {
    //   //           this.showError = false
    //   //           window.location.href = '/auth/login'
    //   //           this.resetForm()
    //   //         }, 100)
    //   //       }
    //   //     }
    //   //   })
    // },
    checkCard () {
      const show =
        localStorage.getItem('showCard') === null
          ? true
          : localStorage.getItem('showCard')
      this.showCard = show
    },
    checkLoading () {
      const show =
        localStorage.getItem('loading') === null
          ? false
          : localStorage.getItem('loading')
      this.loading = show
    },
    checkShowMsg () {
      const show =
        localStorage.getItem('message') === null
          ? false
          : localStorage.getItem('message')
      this.showMessage = show
    },
    checkMessage () {
      const show =
        localStorage.getItem('message') === null
          ? ''
          : localStorage.getItem('message')
      this.message = show
    }
  }
}
</script>

<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  border: 1px solid transparent;
  -webkit-text-fill-color: #fff;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset;
  box-shadow: 0 0 0px 1000px transparent inset;
  transition: background-color 5000s ease-in-out 0s;
}
.min-vh-100 {
  min-height: 100vh;
}

.text-transform-none {
  text-transform: none;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Semi-transparent black */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it is on top of other content */
}
</style>
