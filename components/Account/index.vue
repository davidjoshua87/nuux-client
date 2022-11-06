<template>
  <div class="bg-image-account d-flex align-center justify-center">
    <v-container>
      <v-row class="mt-lg-4" style="margin-top: 5px;">
        <v-col cols="12">
          <!-- account image -->
          <v-card v-if="showCard === true" elevation="18" class="row pa-4 ma-lg-4 ma-md-2" style="margin: 12px 0px;">
            <div>
              <h2>
                Account Image
              </h2>
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
                      <span class="d-none d-sm-block">
                        Upload new photo
                      </span>
                    </span>
                  </v-btn>

                  <input type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden="">

                  <v-btn
                    elevation="6"
                    density="default"
                    medium
                    class="grey"
                  >
                    <span class="v-btn__overlay" />
                    <span class="v-btn__underlay" />
                    <span
                      class="v-btn__content"
                    >
                      <img src="/reset-avatar.png">
                      <span class="d-none d-sm-block">
                        Reset
                      </span>

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
          <v-card v-if="showCard === true" elevation="18" class="row pa-4 ma-lg-4 ma-md-2" style="margin: 12px 0px;">
            <div>
              <h2>
                Account Information
              </h2>
            </div>
            <v-card-text>
              <v-form class="mt-6">
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
                      v-model="userData.provice"
                      :items="optProvinces"
                      autocomplete="off"
                      :rules="proviceRules"
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
                      v-model="userData.currency"
                      :items="optCurrency"
                      autocomplete="off"
                      :rules="currencyRules"
                      label="Currency"
                      required
                    />
                  </v-col>
                  <v-col cols="12" class="d-flex flex-wrap gap-4">
                    <v-btn
                      density="default"
                      medium
                      type="button"
                      class="primary mr-2"
                    >
                      <span class="v-btn__overlay" />
                      <span class="v-btn__underlay" />
                      <span
                        class="v-btn__content"
                      >
                        save changes
                      </span>
                    </v-btn>
                    <v-btn density="default" medium type="reset" class="text-secondary grey">
                      <span class="v-btn__overlay" />
                      <span class="v-btn__underlay" />
                      <span class="v-btn__content">
                        Reset
                      </span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
          <!-- change password -->
          <v-card v-if="showCard === true" elevation="18" class="row pa-4 ma-lg-4 ma-md-2" style="margin: 12px 0px;">
            <div>
              <h2>
                Change Password
              </h2>
            </div>
            <v-card-text>
              <v-form class="mt-6">
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
                      :rules="passwordRules"
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
                      :rules="passwordRules"
                      :type="showPassword ? 'text' : 'password'"
                      name="input-confirm-password"
                      label="Confirm Password"
                      @click:append="showPassword = !showPassword"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="8" md="6">
                    <p class="text-base font-weight-medium mt-2">
                      Password Requirements:
                    </p>
                    <ul class="d-flex flex-column gap-y-3 pl-0">
                      <li class="d-flex">
                        <v-checkbox
                          v-model="checkPassword1"
                          label="Minimum 8 characters long - the more, the better"
                          color="primary"
                          value="primary"
                          dense
                          size="sm"
                          disabled
                          hide-details
                        />
                      </li>
                      <li class="d-flex">
                        <v-checkbox
                          v-model="checkPassword2"
                          label="At least one lowercase character"
                          color="primary"
                          value="primary"
                          dense
                          size="sm"
                          disabled
                          hide-details
                        />
                      </li>
                      <li class="d-flex">
                        <v-checkbox
                          v-model="checkPassword3"
                          label="At least one uppercase character"
                          color="primary"
                          value="primary"
                          dense
                          size="sm"
                          disabled
                          hide-details
                        />
                      </li>
                      <li class="d-flex">
                        <v-checkbox
                          v-model="checkPassword4"
                          label="At least one number, symbol, or whitespace character"
                          color="primary"
                          value="primary"
                          dense
                          size="sm"
                          disabled
                          hide-details
                        />
                      </li>
                    </ul>
                  </v-col>
                  <v-col cols="12" class="d-flex flex-wrap gap-4">
                    <v-btn
                      density="default"
                      medium
                      type="button"
                      class="primary mr-2"
                    >
                      <span class="v-btn__overlay" />
                      <span class="v-btn__underlay" />
                      <span
                        class="v-btn__content"
                      >
                        save changes
                      </span>
                    </v-btn>
                    <v-btn density="default" medium type="reset" class="text-secondary grey">
                      <span class="v-btn__overlay" />
                      <span class="v-btn__underlay" />
                      <span class="v-btn__content">
                        Reset
                      </span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
          <!-- change plan subscribe -->
          <v-card v-if="showCard === true" elevation="18" class="row pa-4 ma-lg-4 ma-md-2" style="margin: 12px 0px;">
            <div>
              <h2>
                Change Plan Subscribe
              </h2>
            </div>
            <v-card-text>
              <v-alert
                density="comfortable"
                class="grey mb-4"
                role="alert"
              >
                <span class="v-alert__underlay" />
                <div class="v-alert__content">
                  <div class="v-alert-title mb-1">
                    Are you sure you want to change your plan subscribe?
                  </div>
                  <p class="mb-0">
                    Please click the button and select the desired packet subscription.
                  </p>
                </div>
              </v-alert>
              <v-btn
                density="default"
                medium
                type="button"
                class="primary mt-3"
              >
                <span class="v-btn__overlay" />
                <span class="v-btn__underlay" />
                <span class="v-btn__content">
                  Change Plan Subscribe
                </span>
              </v-btn>
            </v-card-text>
          </v-card>
          <!-- delete account -->
          <v-card v-if="showCard === true" elevation="18" class="row pa-4 ma-lg-4 ma-md-2" style="margin: 12px 0px;">
            <div>
              <h2>
                Delete Account
              </h2>
            </div>
            <v-card-text>
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
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                </div>
              </v-alert>
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
              >
                <span class="v-btn__overlay" />
                <span class="v-btn__underlay" />
                <span class="v-btn__content">
                  Delete Account
                </span>
              </v-btn>
            </v-card-text>
          </v-card>
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
      valid: true,
      showPassword: false,
      loading: false,
      showCard: true,
      showMessage: false,
      showError: false,
      confirmDelete: false,
      checkPassword1: true,
      checkPassword2: false,
      checkPassword3: false,
      checkPassword4: false,
      message: '',
      userData: {
        fullname: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        provice: '',
        zipCode: '',
        country: '',
        currency: ''
      },
      userPassword: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      optProvinces: ['DKI Jakarta', 'Sumatera Utara', 'DIY Yogyakarta', 'Bali'],
      optCountries: ['Indonesia'],
      optCurrency: ['IDR'],
      nameRules: [
        v => !!v || 'Fullname is required',
        v => (v && v.length <= 25) || 'Fullname must be less than 25 characters'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      phoneRules: [
        v => !!v || 'Phone Number is required',
        v => (v && v.length <= 12) || 'Phone number must be less than 12 number'
      ],
      addressRules: [
        v => !!v || 'Address is required',
        v => (v && v.length <= 50) || 'Address must be less than 50 characters'
      ],
      proviceRules: [
        v => !!v || 'Provice is required'
      ],
      zipcodeRules: [
        v => !!v || 'Zip Code is required',
        v => (v && v.length <= 5) || 'Zip Code must be less than 5 number'
      ],
      countryRules: [
        v => !!v || 'Country is required'
      ],
      currencyRules: [
        v => !!v || 'Currency is required'
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ]
    }
  }
}
</script>

<style>
.bg-image-account {
  background-image: url("/bg-image-login.png");
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: 0% 0%;
  background-size: cover;
}
</style>
