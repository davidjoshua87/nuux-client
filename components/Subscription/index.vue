<template>
  <div class="d-flex align-center justify-center my-6">
    <v-container>
      <v-row justify="center" align="center" class="d-flex">
        <v-col v-for="(item, i) in items" :key="i" cols="12" md="4">
          <v-item-group>
            <v-item>
              <v-card class="mx-auto my-6" max-width="320">
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
                    @click="subscribe"
                  >
                    Subscribe
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-item-group>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'SubscriptionComponent',
  data () {
    return {
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
  mounted () {},
  methods: {
    subscribe () {}
  }
}
</script>

<style></style>
