<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="logo py-4 d-flex justify-center">
          <v-form ref="form" v-model="valid" lazy-validation>
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
              @click:append="showPassword = !showPassword"
            />
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="register">
              Register
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'RegisterComponent',
  data () {
    return {
      valid: true,
      showPassword: false,
      registerData: {
        fullname: '',
        email: '',
        password: ''
      },
      nameRules: [
        v => !!v || 'Fullname is required',
        v => (v && v.length <= 25) || 'Fullname must be less than 25 characters'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ]
    }
  },
  methods: {
    async register () {
      try {
        const user = await this.$axios.$post('/api/auth/register', {
          fullname: this.registerData.fullname,
          email: this.registerData.email,
          password: this.registerData.password
        })
        this.$router.push('/auth/login')
        this.$refs.form.reset()
        console.log(user)
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
