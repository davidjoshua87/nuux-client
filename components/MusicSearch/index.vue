<template>
  <div>
    <v-card class="pa-4 pl-md-10 pr-md-10 mt-4">
      <v-text-field
        v-model="keywordSearch"
        label="Search Music"
        required
        :hint="hintText"
        :append-icon="closeBtn === true ? 'mdi-close' : ''"
        @keyup="handleInputSearch"
        @keypress="handleSearch"
        @click:append="clearSearch"
      />
    </v-card>
    <v-card class="mt-7">
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
        <h2>No result found for "{{ errorSearch }}"</h2>
        <p>
          please make sure your words are spelled correctly or use less or
          different keybords.
        </p>
      </div>
      <v-card class="mx-auto" tile>
        <div>
          <h2 v-if="showPlaylist === true" class="mb-md-4 pa-3 text-center text-capitalize">
            {{ keywordPlaylist }}
          </h2>
          <h2 v-else class="mb-md-4 pa-3 text-center text-capitalize">
            Search "{{ keywordSearch }}" Playlist
          </h2>
        </div>
        <v-row>
          <v-col
            v-for="(item, i) in dataMusic"
            :key="i"
            cols="12"
            sm="6"
            lg="4"
          >
            <v-list-item three-line>
              <v-list-item-content class="d-flex align-center justify-center">
                <v-img
                  :lazy-src="item.artworkUrl30"
                  max-height="291"
                  max-width="250"
                  :src="item.artworkUrl100"
                  class="mb-5"
                />
                <v-list-item-title class="text-center">
                  {{ item.artistName }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-center">
                  {{ item.trackName }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <vuetify-audio
                    :file="item.previewUrl"
                    flat
                    color="success"
                    downloadable
                  />
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
  </div>
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
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
          id: 2,
          band: 'Dewa',
          song: 'Kangen',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
          id: 3,
          band: 'Iwan Fals',
          song: 'Ujung Aspal',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
          id: 4,
          band: 'Dewa',
          song: 'Kangen 12',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      ],
      dataMusic: [],
      keywordSearch: '',
      keywordPlaylist: '',
      hintText: '',
      isLoading: false,
      emptyState: false,
      errorSearch: false,
      closeBtn: false,
      showPlaylist: false
    }
  },
  mounted () {
    this.fetchPlaylist()
  },
  methods: {
    async fetchPlaylist () {
      this.isLoading = true
      this.emptyState = false
      this.showPlaylist = false
      this.dataMusic = []
      this.keywordPlaylist = 'indonesian hits'
      await this.$axios
        .$get(`/api/music/playlist/${this.keywordPlaylist}/song`)
        .then((response) => {
          if (response.data.length > 0) {
            this.isLoading = false
            this.dataMusic = response.data
            this.emptyState = false
            this.showPlaylist = true
          }
        })
        .catch((err) => {
          console.log(err)
          this.errorSearch = this.keywordPlaylist
          this.isLoading = false
          this.emptyState = true
          this.dataMusic = []
          this.showPlaylist = false
        })
    },
    async fetchMusic () {
      this.isLoading = true
      this.emptyState = false
      this.showPlaylist = false
      this.dataMusic = []
      await this.$axios
        .$get(`/api/music/search/${this.keywordSearch}/song`)
        .then((response) => {
          if (response.data.length > 0) {
            this.isLoading = false
            this.dataMusic = response.data
            this.emptyState = false
            this.showPlaylist = false
          } else {
            this.errorSearch = this.keywordSearch
            this.isLoading = false
            this.emptyState = true
            this.dataMusic = []
            this.showPlaylist = false
          }
        })
        .catch((err) => {
          console.log(err)
          this.errorSearch = this.keywordSearch
          this.isLoading = false
          this.emptyState = true
          this.dataMusic = []
          this.showPlaylist = false
        })
    },
    debounce (func, timeout) {
      let timer
      return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
      }
    },
    async handleInputSearch (e) {
      const isWordCharacter = this.keywordSearch.length

      if (isWordCharacter >= 2) {
        this.hintText = 'For example: Dewa19'
        await this.debounce(this.fetchMusic(), 300)
      } else {
        this.emptyState = false
        this.hintText = 'Keyword minimum 2 characters'

        if (isWordCharacter === 0) {
          this.fetchPlaylist()
        }
      }

      if (isWordCharacter > 0) {
        this.closeBtn = true
      } else {
        this.closeBtn = false
      }
    },
    handleSearch (e) {
      if (e.key === 'Enter') {
        this.fetchMusic()
      }
    },
    clearSearch () {
      this.keywordSearch = ''
      this.dataMusic = []
      this.closeBtn = false
      this.fetchPlaylist()
    }
  }
}
</script>

<style></style>
