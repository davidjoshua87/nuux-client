<template>
  <div class="bg-image-subscribe d-flex align-center justify-center">
    <v-container>
      <v-row class="d-flex justify-center">
        <v-col v-for="(item, i) in items" :key="i" cols="12" md="4">
          <v-item-group v-if="showCard === true">
            <v-item>
              <v-card id="item._id" class="mx-auto" max-width="320">
                <img width="100%" height="260" :src="item.link">

                <v-card-title>
                  {{ item.title }}
                  <v-spacer />
                  <span class="ml-2">
                    <div>{{ item.currency }} {{ item.price }}</div>
                  </span>
                </v-card-title>

                <v-divider class="mx-4" />

                <v-card-text>
                  <div class="mb-2 text-subtitle-1">
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

        <v-row class="py-4 d-flex align-center justify-center">
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
      user: null,
      items: [
        {
          _id: '1',
          link: '/image-subscribe.png',
          title: 'Packet 1',
          currency: 'IDR',
          price: '35.000',
          subtitle: 'Subscribe for 1 month',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        },
        {
          _id: '6',
          link: '/image-subscribe.png',
          title: 'Packet 6',
          currency: 'IDR',
          price: '199.000',
          subtitle: 'Subscribe for 6 month',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        },
        {
          _id: '12',
          link: '/image-subscribe.png',
          title: 'Packet 12',
          currency: 'IDR',
          price: '399.000',
          subtitle: 'Subscribe for 1 year',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
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
    this.getUpdateUser()
  },
  methods: {
    async getUpdateUser () {
      if (this.dataUser !== null) {
        this.user = await this.dataUser
        // await this.$axios.$get(`/api/user/${this.dataUser.id}`)
        //   .then((response) => {
        //     if (response.message === 'Succeed Get User By Id') {
        //       this.user = response.data
        //     }
        //   }).catch((error) => {
        //     if (error.response) {
        //       console.log(error)
        //     }
        //   })
      }
    },
    async subscribe (id) {
      this.loading = true
      this.showCard = false

      if (this.user !== null) {
        await this.$axios.$put(`/api/user/edit/${this.user._id}`, {
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
              }, 100)
            }
          }).catch((error) => {
            this.message = error.message
            this.showError = true
            this.loading = false
            setTimeout(() => {
              this.$router.push('/subscription')
              this.showError = false
              this.showCard = true
            }, 100)
          })
      }
    }
  }
}
</script>

<style>
.bg-image-subscribe {
  background-image: url("/bg-image-login.png");
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-repeat: no-repeat;
  background-position: 0% 0%;
  background-size: cover;
}
</style>
