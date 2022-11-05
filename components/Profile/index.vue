<template>
  <div class="bg-image d-flex align-center justify-center">
    <v-container>
      <v-row>
        <v-col class="text-center">
          <img
            src="/logo-mux.png"
            alt="profile"
            class="mb-5"
          >
          <blockquote class="blockquote">
            &#8220;First, solve the problem. Then, write the code.&#8221;
            <footer>
              <small>
                <em>&mdash;John Johnson</em>
              </small>
            </footer>
          </blockquote>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'ProfileComponent'
}
</script>

<style>
.bg-image {
  background-image: url("/bg-image-login.png");
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: 0% 0%;
  background-size: cover;
}
</style>
