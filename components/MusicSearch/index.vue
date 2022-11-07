<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="keywordSearch"
          label="Search Music"
          required
          @keypress="handleSearch"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-row class="py-4 d-flex justify-center">
          <v-progress-circular
            v-if="isLoading"
            :size="70"
            :width="7"
            color="white"
            indeterminate
            class="text-center"
          />
        </v-row>
        <div v-if="emptyState" class="text-center">
          <h2>No result found for "{{errorSearch}}"</h2>
          <p>please make sure your words are spelled correctly or use less or different keybords.</p>
        </div>
        <v-card
          class="mx-auto"
          tile
        >
        <v-row>
          <v-col cols="12" sm="6" lg="4" v-for="(item, i) in dataMusic" :key="i">
            <v-list-item three-line>
              <v-list-item-content class="d-flex align-center justify-center">
                <v-img
                  :lazy-src="item.artworkUrl30"
                  max-height="291"
                  max-width="250"
                  :src="item.artworkUrl100"
                  class="mb-5"
                ></v-img>
                <v-list-item-title class="text-center">{{item.artistName}}</v-list-item-title>
                <v-list-item-subtitle class="text-center">
                  {{item.trackName}}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <vuetify-audio :file="item.previewUrl" flat color="success" downloadable></vuetify-audio>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'MusicSearchComponent',
  components: {
    VuetifyAudio: () => import('vuetify-audio')
  },
  data () {
    return {
      items: [
        {
          id: 1,
          band: 'Dewa',
          song: 'Aku Milikmu',
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
          id: 2,
          band: 'Dewa',
          song: 'Kangen',
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
          id: 3,
          band: 'Iwan Fals',
          song: 'Ujung Aspal',
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
          id: 4,
          band: 'Dewa',
          song: 'Kangen 12',
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      ],
      dataMusic: [],
      keywordSearch: '',
      isLoading: false,
      emptyState: false,
      errorSearch: false
    }
  },
  methods: {
    async fetchMusic () {
      this.isLoading = true
      this.emptyState = false
      this.dataMusic = []
      await this.$axios.$get(`/api/music/search/${this.keywordSearch}/song`)
        .then((response) => {
          if (response.data.length > 0) {
            this.isLoading = false
            this.dataMusic = response.data
            this.emptyState = false
          } else {
            this.errorSearch = this.keywordSearch
            this.isLoading = false
            this.emptyState = true
            this.dataMusic = []
          }
        })
        .catch((err) => {
          console.log(err)
          this.errorSearch = this.keywordSearch
          this.isLoading = false
          this.emptyState = true
          this.dataMusic = []
        })
    },
    handleSearch (e) {
      if (e.key === 'Enter') {
        this.fetchMusic()
      }
    }
  }
}
</script>
