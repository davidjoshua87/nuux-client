<template>
  <div class="bg-image-accoun d-flex align-center justify-center">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card v-if="showCard === true" elevation="18" class="row logo pa-4 ma-lg-4 ma-md-2">
            <div>
              <h2>
                Account Details
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
              <form class="d-flex flex-column justify-center gap-5">
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
              </form>
            </v-card-text>

            <v-card-text>
              <v-form class="mt-6">
                <v-row>
                  <v-col cols="12" sm="8" md="6">
                    <v-text-field
                      v-model="registerData.fullname"
                      autocomplete="off"
                      :counter="25"
                      :rules="nameRules"
                      label="Fullname"
                      required
                    />
                  </v-col>
                  <v-col cols="12" sm="8" md="6">
                    <v-text-field
                      v-model="registerData.email"
                      autocomplete="off"
                      :rules="emailRules"
                      name="input-email"
                      label="Email"
                      required
                    />
                  </v-col>
                  <v-col cols="12" sm="8" md="6">
                    <v-text-field
                      v-model="registerData.phoneNumber"
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
                      v-model="registerData.address"
                      autocomplete="off"
                      :counter="50"
                      :rules="addressRules"
                      label="Address"
                      required
                    />
                  </v-col>
                  <v-col cols="12" sm="8" md="6">
                    <v-select
                      v-model="registerData.provice"
                      :items="optProvinces"
                      autocomplete="off"
                      :rules="proviceRules"
                      label="Provice"
                      required
                    />
                  </v-col>
                  <v-col cols="12" sm="8" md="6">
                    <v-text-field
                      v-model="registerData.zipCode"
                      autocomplete="off"
                      :rules="zipcodeRules"
                      :counter="5"
                      label="Zip Code"
                      required
                    />
                  </v-col>
                  <v-col cols="12" sm="8" md="6">
                    <v-select
                      v-model="registerData.country"
                      :items="optCountries"
                      autocomplete="off"
                      :rules="countryRules"
                      label="Country"
                      required
                    />
                  </v-col>
                  <v-col cols="12" sm="8" md="6">
                    <v-select
                      v-model="registerData.currency"
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
      message: '',
      registerData: {
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
      passwordRules: [
        v => !!v || 'Password is required'
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
