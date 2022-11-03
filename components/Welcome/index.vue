<template>
  <div class="bg-image d-flex align-center justify-center">
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-card class="logo py-4 d-flex justify-center">
            <logo />
          </v-card>
          <v-card>
            <v-card-title class="headline font-weight-bold  font-2xl d-flex align-center justify-center">
              Welcome to Mux
            </v-card-title>
            <v-card-title class="d-flex align-center justify-center">
              <h5 class="text-h5 font-weight-semibold mb-4">
                Music Xperience
              </h5>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'WelcomeComponent'
}
</script>

<style>
.bg-image {
  background-image: url("~assets/images/bg-image-login.png");
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: 0% 0%;
  background-size: cover;
}
</style>
