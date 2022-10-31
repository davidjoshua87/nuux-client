<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
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
      loginData: {
        email: '',
        password: ''
      },
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ]
    }
  },
  mounted () {
    this.$refs.form.reset()
  },
  methods: {
    async login () {
      try {
        const response = await this.$auth.loginWith('local', {
          data: this.loginData
        })
        this.$router.push('/welcome')
        this.$refs.form.reset()
        console.log(response)
      } catch (err) {
        console.log(err)
      }
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
