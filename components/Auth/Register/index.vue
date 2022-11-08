<template>
  <div class="bg-image d-flex align-center justify-center">
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <v-card
            v-if="showCard"
            elevation="18"
            class="pa-4 ma-lg-4 ma-md-2 d-flex align-center justify-center"
          >
            <div>
              <div class="d-flex justify-center ma-4">
                <div class="mr-2">
                  <img src="/logo-mux.png" height="25">
                </div>
                <div
                  class="v-card-title font-weight-semibold text-h5 text-uppercase"
                >
                  Mux
                </div>
              </div>
              <div class="v-card-text pt-2">
                <h5 class="text-h5 font-weight-semibold mb-4">
                  Adventure starts here 🚀
                </h5>
                <p class="mb-4">
                  Make your life relaxing and fun!
                </p>
              </div>
              <v-form
                ref="form"
                v-model="valid"
                autocomplete="off"
                lazy-validation
              >
                <v-text-field
                  v-model="registerData.fullname"
                  autocomplete="off"
                  :counter="25"
                  :rules="nameRules"
                  label="Fullname"
                  required
                />
                <v-text-field
                  v-model="registerData.email"
                  autocomplete="off"
                  :rules="emailRules"
                  name="input-email"
                  label="Email"
                  required
                />

                <v-text-field
                  v-model="registerData.password"
                  autocomplete="off"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="passwordRules"
                  :type="showPassword ? 'text' : 'password'"
                  name="input-password"
                  label="Password"
                  @focus="showBoxCheckPass"
                  @blur="showBoxCheckPass"
                  @click:append="showPassword = !showPassword"
                />
                <v-alert
                  v-if="showCheckPassword === true && !valid"
                  id="message"
                  density="comfortable"
                  class="grey mb-0"
                  role="alert"
                >
                  <h4>Password must contain the following:</h4>
                  <p id="letter" class="invalid mb-0">
                    At least one lowercase character
                  </p>
                  <p id="capital" class="invalid mb-0">
                    At least one uppercase character
                  </p>
                  <p id="number" class="invalid mb-0">
                    At least one number, symbol, or whitespace character
                  </p>
                  <p id="length" class="invalid mb-0">
                    Minimum 8 characters long - the more, the better
                  </p>
                </v-alert>

                <v-btn
                  :disabled="!valid && showButton === false"
                  color="success"
                  class="my-2"
                  width="100%"
                  @click="register"
                >
                  Register
                </v-btn>
              </v-form>
              <div class="v-col v-col-12 text-center text-base ma-4">
                <span>Already have an account?</span>
                <v-btn
                  to="/auth/login"
                  plain
                  router
                  exact
                  style="text-transform: capitalize"
                >
                  <a class="text-primary ms-2"> Sign in instead </a>
                </v-btn>
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

          <v-row class="py-4 d-flex justify-center">
            <v-progress-circular
              v-if="loading"
              :size="70"
              :width="7"
              color="white"
              indeterminate
            />
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'RegisterComponent',
  data () {
    return {
      valid: true,
      showPassword: false,
      showCheckPassword: false,
      loading: false,
      showCard: true,
      showMessage: false,
      showError: false,
      message: '',
      registerData: {
        fullname: '',
        email: '',
        password: '',
        avatar: '',
        phoneNumber: '',
        address: '',
        province: '',
        zipCode: '',
        country: '',
        language: '',
        subscription: null
      },
      nameRules: [
        v => !!v || 'Fullname is required',
        v =>
          (v && v.length <= 25) || 'Fullname must be less than 25 characters'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => /[a-z]/g.test(v) || 'Password at least one lowercase character',
        v => /[A-Z]/g.test(v) || 'Password at least one uppercase character',
        v =>
          /[0-9]/g.test(v) ||
          'Password at least one number, symbol, or whitespace character',
        v =>
          (v && v.length >= 8) ||
          'Password minimum 8 characters long - the more, the better'
        // v => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(v) || 'Password must be valid'
      ]
    }
  },
  computed: {
    dataUser () {
      return this.$store.getters.getUserInfo
    },
    showButton () {
      return this.checkPassword()
    }
  },
  mounted () {
    this.resetForm()
  },
  methods: {
    resetForm () {
      this.registerData.fullname = ''
      this.registerData.email = ''
      this.registerData.password = ''
    },
    async register () {
      this.loading = true
      this.showCard = false

      await this.$axios
        .$post('/api/user/signup', {
          fullname: this.registerData.fullname,
          email: this.registerData.email,
          password: this.registerData.password,
          avatar: this.registerData.avatar,
          phoneNumber: this.registerData.phoneNumber,
          address: this.registerData.address,
          province: this.registerData.province,
          zipCode: this.registerData.zipCode,
          country: this.registerData.country,
          language: this.registerData.language,
          subscription: this.registerData.subscription
        })
        .then((response) => {
          if (response.token) {
            this.message = response.message
            setTimeout(() => {
              this.showMessage = true
              this.showCard = false
              localStorage.setItem('showCard', this.showCard)
              localStorage.setItem('loading', this.loading)

              setTimeout(() => {
                this.loading = true
                this.$router.push('/auth/login')
                this.$auth
                  .loginWith('local', {
                    data: {
                      email: this.registerData.email,
                      password: this.registerData.password
                    }
                  })
                  .then((response) => {
                    if (response.status === 200) {
                      this.message = response.data.message
                      this.showMessage = true
                      localStorage.setItem('message', this.message)
                      localStorage.setItem('showMessage', this.showMessage)
                      setTimeout(() => {
                        if (this.dataUser.subscription === null) {
                          this.$router.push('/subscription')
                        } else {
                          this.$router.push('/home')
                        }
                        localStorage.removeItem('showCard')
                        localStorage.removeItem('loading')
                        localStorage.removeItem('message')
                        localStorage.removeItem('showMessage')
                        this.showMessage = false
                        this.showCard = true
                        this.loading = false
                      }, 300)
                    }
                  })
                  .catch((error) => {
                    if (error.response) {
                      if (error.response.status === 400) {
                        this.message = error.response.data.message
                        this.showError = true
                        this.loading = false
                        setTimeout(() => {
                          this.showError = false
                          this.$router.push('/auth/login')
                          this.resetForm()
                        }, 100)
                      } else {
                        this.message = error.response.data.message
                        this.showError = true
                        this.loading = false
                        setTimeout(() => {
                          this.showError = false
                          this.$router.push('/auth/login')
                          this.resetForm()
                        }, 100)
                      }
                    }
                  })
              }, 200)
            }, 100)
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 400) {
              this.message = error.response.data.message
              this.showError = true
              this.loading = false
              setTimeout(() => {
                this.showError = false
                window.location.href = '/auth/register'
                this.resetForm()
              }, 2000)
            } else {
              this.message = error.response.data.message
              this.showError = true
              this.loading = false
              setTimeout(() => {
                this.showError = false
                window.location.href = '/auth/register'
                this.resetForm()
              }, 2000)
            }
          }
        })
    },
    checkPassword () {
      const regexPass =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/
      if (this.registerData.password !== null) {
        if (this.registerData.password.match(regexPass)) {
          this.showCheckPassword = false
          return true
        } else {
          this.showCheckPassword = true
          return false
        }
      }
    },
    showBoxCheckPass () {
      this.showCheckPassword = !this.showCheckPassword
      return this.showCheckPassword
    }
    // validationPass () {
    //   console.log(this.registerData)
    //   const inputPassword = this.registerData.password
    //   if (inputPassword !== null || inputPassword !== '') {
    //     // Validate lowercase letters
    //     const lowerCaseLetters = /[a-z]/g
    //     if (inputPassword.value.match(lowerCaseLetters)) {
    //       this.pass1 = true
    //     } else {
    //       this.pass1 = false
    //     }

    //     // Validate capital letters
    //     const upperCaseLetters = /[A-Z]/g
    //     if (inputPassword.value.match(upperCaseLetters)) {
    //       this.pass2 = true
    //     } else {
    //       this.pass2 = false
    //     }

    //     // Validate numbers
    //     const numbers = /[0-9]/g
    //     if (inputPassword.value.match(numbers)) {
    //       this.pass3 = true
    //     } else {
    //       this.pass3 = false
    //     }

    //     // Validate length
    //     if (inputPassword.value.length >= 8) {
    //       this.pass4 = true
    //     } else {
    //       this.pass4 = false
    //     }
    //   }
    // }
  }
}
</script>

<style>
.bg-image {
  background-image: url("/bg-image-login.png");
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: 0% 0%;
  background-size: cover;
}

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
</style>
