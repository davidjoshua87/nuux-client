<template>
  <div class="bg-image-account d-flex align-center justify-center">
    <v-container>
      <v-row class="mt-lg-4" style="margin-top: 5px">
        <v-col cols="12">
          <!-- account image -->
          <v-card
            v-if="showCard === true"
            elevation="18"
            class="row pa-4 ma-lg-4 ma-md-2"
            style="margin: 12px 0px"
          >
            <div>
              <h2>Account Avatar</h2>
            </div>

            <v-card-text class="d-flex">
              <v-avatar
                density="default"
                variant="flat"
                :width="$vuetify.breakpoint.xs ? '100%' : '100px'"
                :height="$vuetify.breakpoint.xs ? '100%' : '100px'"
                class="rounded-lg me-6 fill-height mobile-avatar"
              >
                <v-responsive>
                  <v-img
                    aspect-ratio="1"
                    contain
                    src="/avatar-default.png"
                    alt="avatar"
                  />
                </v-responsive>
              </v-avatar>
              <v-form class="d-flex flex-column justify-center gap-5">
                <div class="d-flex flex-wrap gap-2">
                  <v-btn
                    elevation="6"
                    density="default"
                    medium
                    class="primary mb-2 mr-2"
                  >
                    <span class="v-btn__overlay" />
                    <span class="v-btn__underlay" />
                    <span class="v-btn__content">
                      <img class="mr-1" src="/upload-avatar.png">
                      <span class="d-none d-sm-block"> Upload new photo </span>
                    </span>
                  </v-btn>

                  <input
                    type="file"
                    name="file"
                    accept=".jpeg,.png,.jpg,GIF"
                    hidden=""
                  >

                  <v-btn elevation="6" density="default" medium class="grey">
                    <span class="v-btn__overlay" />
                    <span class="v-btn__underlay" />
                    <span class="v-btn__content">
                      <img src="/reset-avatar.png">
                      <span class="d-none d-sm-block"> Reset </span>
                    </span>
                  </v-btn>
                </div>
                <p class="text-body-1 mb-0">
                  Allowed JPG, GIF or PNG. Max size of 800K
                </p>
              </v-form>
            </v-card-text>
          </v-card>
          <!-- account information -->
          <v-card
            v-if="showCard === true"
            elevation="18"
            class="row pa-4 ma-lg-4 ma-md-2"
            style="margin: 12px 0px"
          >
            <div>
              <h2>Account Information</h2>
            </div>
            <v-card-text>
              <v-form
                ref="formInfo"
                v-model="validFormInfo"
                autocomplete="off"
                lazy-validation
                class="mt-6"
              >
                <v-row>
                  <v-col cols="12" sm="8" md="6">
                    <v-text-field
                      v-model="userData.fullname"
                      autocomplete="off"
                      :counter="25"
                      :rules="nameRules"
                      label="Fullname"
                      required
                    />
                  </v-col>
                  <v-col cols="12" sm="8" md="6">
                    <v-text-field
                      v-model="userData.email"
                      autocomplete="off"
                      :rules="emailRules"
                      name="input-email"
                      label="Email"
                      required
                      readonly
                    />
                  </v-col>
                  <v-col cols="12" sm="8" md="6">
                    <v-text-field
                      v-model="userData.phoneNumber"
                      autocomplete="off"
                      :rules="phoneRules"
                      :counter="12"
                      name="input-phone"
                      label="Phone Number"
                      required
                    />
                  </v-col>
                  <v-col cols="12" sm="8" md="6">
                    <v-text-field
                      v-model="userData.address"
                      autocomplete="off"
                      :counter="50"
                      :rules="addressRules"
                      label="Address"
                      required
                    />
                  </v-col>
                  <v-col cols="12" sm="8" md="6">
                    <v-select
                      v-model="userData.province"
                      :items="optProvinces"
                      autocomplete="off"
                      :rules="provinceRules"
                      label="Provice"
                      required
                    />
                  </v-col>
                  <v-col cols="12" sm="8" md="6">
                    <v-text-field
                      v-model="userData.zipCode"
                      autocomplete="off"
                      :rules="zipcodeRules"
                      :counter="5"
                      label="Zip Code"
                      required
                    />
                  </v-col>
                  <v-col cols="12" sm="8" md="6">
                    <v-select
                      v-model="userData.country"
                      :items="optCountries"
                      autocomplete="off"
                      :rules="countryRules"
                      label="Country"
                      required
                    />
                  </v-col>
                  <v-col cols="12" sm="8" md="6">
                    <v-select
                      v-model="userData.language"
                      :items="optLanguage"
                      autocomplete="off"
                      :rules="languageRules"
                      label="Language"
                      required
                      @change="checkInput"
                    />
                  </v-col>
                  <v-col cols="12" class="d-flex flex-wrap gap-4">
                    <v-btn
                      density="default"
                      medium
                      type="button"
                      class="primary mr-2"
                      :disabled="showButtonInfo === false"
                      @click="saveData"
                    >
                      <span class="v-btn__overlay" />
                      <span class="v-btn__underlay" />
                      <span class="v-btn__content"> save changes </span>
                    </v-btn>
                    <v-btn
                      density="default"
                      medium
                      type="reset"
                      class="text-secondary grey"
                      @click="resetBindData"
                    >
                      <span class="v-btn__overlay" />
                      <span class="v-btn__underlay" />
                      <span class="v-btn__content"> Reset </span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
          <!-- change password -->
          <v-card
            v-if="showCard === true"
            elevation="18"
            class="row pa-4 ma-lg-4 ma-md-2"
            style="margin: 12px 0px"
          >
            <div>
              <h2>Account Password</h2>
            </div>
            <v-card-text>
              <v-form
                ref="formPass"
                v-model="validFormPass"
                autocomplete="off"
                lazy-validation
                class="mt-6"
              >
                <v-row class="mb-3">
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="userPassword.currentPassword"
                      autocomplete="off"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="passwordRules"
                      :type="showPassword ? 'text' : 'password'"
                      name="input-current-password"
                      label="Current Password"
                      @click:append="showPassword = !showPassword"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="userPassword.newPassword"
                      autocomplete="off"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="newPasswordRules"
                      :type="showPassword ? 'text' : 'password'"
                      name="input-new-password"
                      label="New Password"
                      @click:append="showPassword = !showPassword"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="userPassword.confirmPassword"
                      autocomplete="off"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="confirmPasswordRules"
                      :type="showPassword ? 'text' : 'password'"
                      name="input-confirm-password"
                      label="Confirm Password"
                      @input="checkPassword"
                      @click:append="showPassword = !showPassword"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="8" md="6">
                    <v-alert
                      id="message"
                      density="comfortable"
                      class="transparent mb-0"
                      role="alert"
                      disabled
                    >
                      <h3>Password must contain the following:</h3>
                      <ul style="font-size: 14px">
                        <li>
                          <p id="letter" class="invalid mb-0">
                            At least one lowercase character
                          </p>
                        </li>
                        <li>
                          <p id="capital" class="invalid mb-0">
                            At least one uppercase character
                          </p>
                        </li>
                        <li>
                          <p id="number" class="invalid mb-0">
                            At least one number, symbol, or whitespace character
                          </p>
                        </li>
                        <li>
                          <p id="length" class="invalid mb-0">
                            Minimum 8 characters long - the more, the better
                          </p>
                        </li>
                      </ul>
                    </v-alert>
                  </v-col>
                  <v-col cols="12" class="d-flex flex-wrap gap-4">
                    <v-btn
                      density="default"
                      medium
                      type="button"
                      class="primary mr-2"
                      :disabled="showButtonPass === false"
                      @click="changePassword"
                    >
                      <span class="v-btn__overlay" />
                      <span class="v-btn__underlay" />
                      <span class="v-btn__content"> save changes </span>
                    </v-btn>
                    <v-btn
                      density="default"
                      medium
                      type="reset"
                      class="text-secondary grey"
                      @click="resetPassword"
                    >
                      <span class="v-btn__overlay" />
                      <span class="v-btn__underlay" />
                      <span class="v-btn__content"> Reset </span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
          <!-- change plan subscribe -->
          <v-card
            v-if="showCard === true"
            elevation="18"
            class="row pa-4 ma-lg-4 ma-md-2"
            style="margin: 12px 0px"
          >
            <div>
              <h2>Account Subscription</h2>
            </div>
            <v-card-text>
              <v-chip class="ma-2" color="white" primary outlined>
                Your Subscribe Packet:  <span class="ml-1"><b>{{ textSubscribe }}</b></span>
              </v-chip>
            </v-card-text>
            <v-card-text>
              <v-col cols="12" md="6" class="pl-0">
                <v-alert density="comfortable" class="grey mb-4" role="alert">
                  <span class="v-alert__underlay" />
                  <div class="v-alert__content">
                    <div class="v-alert-title mb-1">
                      Are you sure you want to change your plan subscribe?
                    </div>
                    <p class="mb-0">
                      Please click the button and select the desired packet
                      subscription.
                    </p>
                  </div>
                </v-alert>
              </v-col>

              <v-btn
                density="default"
                medium
                type="button"
                class="primary mt-3"
                @click="changeSubscription"
              >
                <span class="v-btn__overlay" />
                <span class="v-btn__underlay" />
                <span class="v-btn__content"> Change Subscribe </span>
              </v-btn>
            </v-card-text>
          </v-card>
          <!-- delete account -->
          <v-card
            v-if="showCard === true"
            elevation="18"
            class="row pa-4 ma-lg-4 ma-md-2"
            style="margin: 12px 0px"
          >
            <div>
              <h2>Account Delete</h2>
            </div>
            <v-card-text>
              <v-col cols="12" md="6" class="pl-0">
                <v-alert
                  density="comfortable"
                  class="warning mb-4"
                  role="alert"
                >
                  <span class="v-alert__underlay" />
                  <div class="v-alert__content">
                    <div class="v-alert-title mb-1">
                      Are you sure you want to delete your account?
                    </div>
                    <p class="mb-0">
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>
                  </div>
                </v-alert>
              </v-col>

              <div>
                <v-checkbox
                  v-model="confirmDelete"
                  label="I confirm my account deactivation"
                  color="primary"
                  value="primary"
                  hide-details
                />
              </div>
              <v-btn
                density="default"
                medium
                type="button"
                class="error mt-3"
                :disabled="!confirmDelete"
                @click="deleteAccount"
              >
                <span class="v-btn__overlay" />
                <span class="v-btn__underlay" />
                <span class="v-btn__content"> Delete Account </span>
              </v-btn>
            </v-card-text>
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

          <v-dialog v-model="dialogAlert" width="300">
            <v-card>
              <v-card-title class="text-h5 error lighten-2 pa-2">
                Warning!
              </v-card-title>

              <v-card-text class="py-2">
                <p>
                  {{ textWarning }}
                </p>
              </v-card-text>

              <v-divider />

              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" text @click="dialogAlert = false">
                  Ok
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'AccountComponent',
  data () {
    return {
      validFormInfo: true,
      validFormPass: true,
      user: null,
      showPassword: false,
      loading: false,
      showCard: true,
      showMessage: false,
      showError: false,
      confirmDelete: false,
      dialogAlert: false,
      showButtonInfo: false,
      showButtonPass: false,
      message: '',
      textWarning: '',
      textSubscribe: '',
      userData: {
        id: '',
        fullname: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        province: '',
        zipCode: '',
        country: '',
        language: '',
        subscription: null
      },
      userPassword: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      optProvinces: ['DKI Jakarta', 'DIY Yogyakarta', 'Bali'],
      optCountries: ['USA', 'Indonesia'],
      optLanguage: ['English', 'Indonesia'],
      nameRules: [
        v => !!v || 'Fullname is required',
        v =>
          (v && v.length <= 25) || 'Fullname must be less than 25 characters'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      phoneRules: [
        v => !!v || 'Phone Number is required',
        v =>
          (v && v.length <= 12) || 'Phone number must be less than 12 number'
      ],
      addressRules: [
        v => !!v || 'Address is required',
        v =>
          (v && v.length <= 50) || 'Address must be less than 50 characters'
      ],
      provinceRules: [v => !!v || 'Province is required'],
      zipcodeRules: [
        v => !!v || 'Zip Code is required',
        v => (v && v.length <= 5) || 'Zip Code must be less than 5 number'
      ],
      countryRules: [v => !!v || 'Country is required'],
      languageRules: [v => !!v || 'Language is required'],
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
      ],
      newPasswordRules: [
        v => !!v || 'Password is required',
        v => this.userPassword.currentPassword !== v || 'Password is the same as the old password',
        v => /[a-z]/g.test(v) || 'Password at least one lowercase character',
        v => /[A-Z]/g.test(v) || 'Password at least one uppercase character',
        v =>
          /[0-9]/g.test(v) ||
          'Password at least one number, symbol, or whitespace character',
        v =>
          (v && v.length >= 8) ||
          'Password minimum 8 characters long - the more, the better'
      ],
      confirmPasswordRules: [
        v => !!v || 'Password is required',
        v => this.userPassword.newPassword === v || 'Password did not match'
      ]
    }
  },
  computed: {
    dataUser () {
      return this.$store.getters.getUserInfo
    }
  },
  mounted () {
    this.getUpdateUser()
  },
  methods: {
    async getUpdateUser () {
      if (this.dataUser !== null) {
        await this.$axios
          .$get(`/api/user/${this.dataUser.id}`)
          .then((response) => {
            if (response.message === 'Succeed Get User By Id') {
              this.user = response.data
              this.bindDataUser()
            }
          })
          .catch((error) => {
            if (error.response) {
              console.log(error)
            }
          })
      }
    },
    bindDataUser () {
      this.userData = {
        id: this.user._id,
        fullname: this.user.fullname,
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
        address: this.user.address,
        province: this.user.province,
        zipCode: this.user.zipCode,
        country: this.user.country,
        language: this.user.language,
        subscription: this.user.subscription
      }
      if (this.userData.language === '') {
        this.dialogAlert = true
        this.textWarning = 'Please complete your data information!'
      }

      if (this.userData.subscription === null) {
        this.textSubscribe = 'Not Subscribed'
      } else if (this.userData.subscription === '1') {
        this.textSubscribe = 'Packet 1'
      } else if (this.userData.subscription === '6') {
        this.textSubscribe = 'Packet 6'
      } else {
        this.textSubscribe = 'Packet 12'
      }

      this.checkInput()
    },
    async resetBindData () {
      this.userData = {
        fullname: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        province: '',
        zipCode: '',
        country: '',
        language: ''
      }
      await this.getUpdateUser()
    },
    checkInput () {
      if (this.userData.language === '') {
        this.showButtonInfo = false
        return this.showButtonInfo
      } else {
        this.showButtonInfo = true
        return this.showButtonInfo
      }
    },
    async saveData () {
      this.loading = true
      this.showCard = false

      if (this.userData !== null) {
        await this.$axios
          .$put(`/api/user/edit/${this.userData.id}`, {
            fullname: this.userData.fullname,
            phoneNumber: this.userData.phoneNumber,
            address: this.userData.address,
            province: this.userData.province,
            zipCode: this.userData.zipCode,
            country: this.userData.country,
            language: this.userData.language
          })
          .then((response) => {
            if (response.message === 'Succeed To Update User') {
              this.message = response.message
              this.showMessage = true
              this.loading = false
              this.getUpdateUser()
              setTimeout(() => {
                this.$router.push('/account')
                this.showMessage = false
                this.showCard = true
              }, 100)
            }
          })
          .catch((error) => {
            this.message = error.message
            this.showError = true
            this.loading = false
            setTimeout(() => {
              this.$router.push('/account')
              this.showError = false
              this.showCard = true
            }, 100)
          })
      }
    },
    checkPassword () {
      if (
        this.userPassword.newPassword !== '' ||
        this.userPassword.newPassword !== null
      ) {
        if (
          this.userPassword.newPassword === this.userPassword.confirmPassword
        ) {
          this.showButtonPass = true
          return this.showButtonPass
        } else {
          this.showButtonPass = false
          return this.showButtonPass
        }
      }
    },
    resetPassword () {
      this.userPassword.currentPassword = ''
      this.userPassword.newPassword = ''
      this.userPassword.confirmPassword = ''
    },
    async changePassword () {
      this.loading = true
      this.showCard = false

      if (this.userData !== null) {
        await this.$axios
          .$put(`/api/user/edit/${this.userData.id}`, {
            password: this.userPassword.newPassword
          })
          .then((response) => {
            if (response.message === 'Succeed To Update User') {
              this.message = response.message
              this.showMessage = true
              this.loading = false
              this.getUpdateUser()
              setTimeout(() => {
                this.$auth.logout()
                this.showMessage = false
                this.showCard = true
              }, 100)
            }
          })
          .catch((error) => {
            this.message = error.message
            this.showError = true
            this.loading = false
            setTimeout(() => {
              this.$router.push('/account')
              this.showError = false
              this.showCard = true
            }, 100)
          })
      }
    },
    changeSubscription () {
      this.$router.push('/subscription')
    },
    async deleteAccount () {
      this.loading = true
      this.showCard = false

      await this.$axios
        .$delete(`/api/user/${this.userData.id}`)
        .then((response) => {
          if (response.message === 'Succeed To Delete') {
            this.message = response.message
            this.showMessage = true
            this.loading = false
            setTimeout(() => {
              this.$auth.logout()
              this.$router.push('/auth/login')
              this.showMessage = false
              this.showCard = true
            }, 100)
          }
        })
        .catch((error) => {
          this.message = error.message
          this.showError = true
          this.loading = false
          setTimeout(() => {
            this.showError = false
            this.$router.push('/account')
          }, 100)
        })
    }
  }
}
</script>

<style>
.bg-image-account {
  background-image: url("/bg-image-login.png");
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-repeat: no-repeat;
  background-position: 0% 0%;
  background-size: cover;
}
</style>
