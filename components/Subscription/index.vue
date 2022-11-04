<template>
  <div class="d-flex align-center justify-center my-6">
    <v-container>
      <v-row justify="center" align="center" class="d-flex">
        <v-col v-for="(item, i) in items" :key="i" cols="12" md="4">
          <v-item-group v-if="showCard === true">
            <v-item>
              <v-card id="item._id" class="mx-auto my-6" max-width="320">
                <img width="100%" height="320" :src="item.link">

                <v-card-title>{{ item.title }}</v-card-title>

                <v-divider class="mx-4" />

                <v-card-text>
                  <div class="my-4 text-subtitle-1">
                    {{ item.subtitle }}
                  </div>

                  <div class="text-justify">
                    {{ item.description }}
                  </div>
                </v-card-text>

                <v-divider class="mx-4" />

                <v-card-actions>
                  <v-btn
                    outlined
                    rounded
                    text
                    color="red lighten-2"
                    @click="subscribe(item._id)"
                  >
                    Subscribe
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-item-group>
        </v-col>
        <v-row class="py-4 d-flex justify-center">
          <v-alert
            v-if="showMessage"
            transition="scale-transition"
            type="success"
          >
            <strong>{{ message }}</strong>
          </v-alert>
          <v-alert v-if="showError" transition="scale-transition" type="error">
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
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'SubscriptionComponent',
  data () {
    return {
      loading: false,
      showCard: true,
      showMessage: false,
      showError: false,
      message: '',
      items: [
        {
          _id: 1,
          link: '/image-subscribe.png',
          title: 'Packet Subscribe 1',
          subtitle: 'Subscribe for 1 month',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
          _id: 6,
          link: '/image-subscribe.png',
          title: 'Packet Subscribe 6',
          subtitle: 'Subscribe for 6 month',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
          _id: 12,
          link: '/image-subscribe.png',
          title: 'Packet Subscribe 12',
          subtitle: 'Subscribe for 1 year',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      ]
    }
  },
  computed: {
    dataUser () {
      return this.$store.getters.getUserInfo
    },
    isLoading () {
      return this.$store.state.loading
    }
  },
  mounted () {
    console.log(this.isLoading)
  },
  methods: {
    async subscribe (id) {
      this.loading = true
      this.showCard = false

      await this.$axios.$put(`/api/user/edit/${this.dataUser.id}`, {
        subscription: id
      })
        .then((response) => {
          if (response.message === 'Succeed To Update User') {
            this.message = response.message
            this.showMessage = true
            this.loading = false
            setTimeout(() => {
              this.$router.push('/home')
              this.showMessage = false
              this.showCard = true
            }, 2000)
          }
        }).catch((error) => {
          if (error.response) {
            this.message = error.response.data.message
            this.showError = true
            this.loading = false
            setTimeout(() => {
              this.showError = false
              this.$router.push('/subscription')
              this.$refs.form.reset()
            }, 2000)
          }
        })
    }
  }
}
</script>

<style></style>
