<template>
  <div class="d-flex justify-center">
    <v-container>
      <div class="d-flex justify-space-around">
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
      </div>
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'WelcomeComponent'
}
</script>

<style>
</style>
