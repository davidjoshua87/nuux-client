<template>
  <v-app dark>
    <!-- <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1> -->
    <v-container>
      <v-row class="d-flex mt-8 justify-center pa-2">
        <div class="pt-8">
          <div class="text-center mb-4">
            <h1 v-if="error.statusCode === 404" class="text-h1 mb-1">
              404
            </h1>
            <h5 v-if="error.statusCode === 404" class="text-h5 mb-1">
              {{ pageNotFound }} ⚠️
            </h5>
            <h5 v-else class="text-h5 mb-1">
              {{ otherError }} ⚠️
            </h5>
            <p class="text-sm">
              We couldn't find the page you are looking for.
            </p>
          </div>
          <div class="misc-avatar w-100 text-center">
            <div aria-label="Coming Soon" role="img">
              <img class="v-img__img" src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template-free/demo/assets/404.8c86ddd4.png" alt="">
            </div>
            <v-btn
              to="/"
              color="primary"
            >
              Back To Home
            </v-btn>
          </div>
        </div>
      </v-row>
    </v-container>
    <!-- <h1 v-else>
      {{ otherError }}
    </h1> -->
    <!-- <NuxtLink to="/">
      Home page
    </NuxtLink> -->
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Error Page'
        }
      ]
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
.v-img__img{
  width: 500px;
}
@media (max-width: 767px) {
  .v-img__img{
    width: 100%;
  }
}
</style>
