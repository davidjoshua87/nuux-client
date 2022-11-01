<template>
  <v-row justify="center" align="center" class="d-flex">
    <v-col cols="12" sm="8" md="6">
      <v-card v-if="showCard === true" class="logo py-4 d-flex justify-center">
        <v-form ref="form" v-model="valid" autocomplete="off" lazy-validation>
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
          <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
            Login
          </v-btn>
        </v-form>
      </v-card>

      <v-row class="py-4 d-flex justify-center">
        <v-alert v-if="showMessage" transition="scale-transition" type="success">
          <strong>{{ message }}</strong>
        </v-alert>
        <v-alert v-if="showError" transition="scale-transition" type="error">
          <strong>{{ message }}</strong>
        </v-alert>
      </v-row>

      <v-row class="py-4 d-flex justify-center">
        <v-progress-circular v-if="loading" :size="70" :width="7" color="white" indeterminate />
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
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
  mounted () {
    this.$refs.form.reset()
    this.checkCard()
    this.checkLoading()
    this.checkShowMsg()
    this.checkMessage()
  },
  methods: {
    async login () {
      this.loading = true
      this.showCard = false

      await this.$auth
        .loginWith('local', {
          data: this.loginData
        })
        .then((response) => {
          if (response.status === 200) {
            this.message = response.data.message
            this.showMessage = true
            this.loading = false
            setTimeout(() => {
              this.$router.push('/welcome')
              this.showMessage = false
              this.showCard = true
            }, 2000)
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
                this.$refs.form.reset()
              }, 2000)
            } else {
              this.message = error.response.data.message
              this.showError = true
              this.loading = false
              setTimeout(() => {
                this.showError = false
                this.$router.push('/auth/login')
                this.$refs.form.reset()
              }, 2000)
            }
          }
        })
    },
    checkCard () {
      const show = localStorage.getItem('showCard') === null ? true : localStorage.getItem('showCard')
      this.showCard = show
    },
    checkLoading () {
      const show = localStorage.getItem('loading') === null ? false : localStorage.getItem('loading')
      this.loading = show
    },
    checkShowMsg () {
      const show = localStorage.getItem('message') === null ? false : localStorage.getItem('message')
      this.showMessage = show
    },
    checkMessage () {
      const show = localStorage.getItem('message') === null ? '' : localStorage.getItem('message')
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
</style>
