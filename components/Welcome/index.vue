<template>
  <div class="bg-image-home d-flex justify-center">
    <v-container>
      <v-row class="d-flex mt-6 justify-center">
        <v-col cols="12">
          <v-card class=" d-flex py-2 justify-center">
            <v-card-title class="headline font-weight-bold font-2xl">
              Welcome
              <span class="ml-2">to</span>
              <span class="ml-3" style="color:blueviolet;"><b>Mux</b></span>
            </v-card-title>
            <v-card-title>
              <logo />
            </v-card-title>
            <v-card-title>
              <h5 class="text-h6 font-weight-semibold mr-2" style="font-size: 9px;">
                Music
              </h5>
              <h5 class="text-h6 font-weight-semibold" style="font-size: 9px;">
                Xperience
              </h5>
            </v-card-title>
          </v-card>
          <music-search />
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
.bg-image-home {
  background-image: url("/bg-image-login.png");
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-repeat: repeat;
  background-position: 0% 0%;
  background-size: cover;
}
</style>
