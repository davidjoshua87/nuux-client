<template>
  <v-app dark>
    <navbar />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <footer-section />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
