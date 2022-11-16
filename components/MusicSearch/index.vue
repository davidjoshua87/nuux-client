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
          <h2
            v-if="showPlaylist === true"
            class="mb-md-4 pa-3 text-center text-capitalize"
          >
            {{ keywordPlaylist }}
          </h2>
          <h2
            v-if="showSearchPlaylist === true"
            class="mb-md-4 pa-3 text-center text-capitalize"
          >
            Results Playlist:  "{{ keywordSearch }}"
          </h2>
        </div>
        <v-row class="mx-auto tile">
          <v-card id="playlist" height="300" width="100%" :class="{ playlist }">
            <v-list rounded>
              <v-list-item-group>
                <v-list-item
                  v-for="(track, idx) in playlist"
                  :key="track.trackId"
                  :class="[
                    { selected: track === selectedTrack },
                  ]"
                >
                  <v-list-item-content
                    class="d-flex align-center justify-center"
                    @click="selectTrack(track), snackbar = true, zIndex = 999"
                  >
                    <v-list-item-title class="px-2">
                      {{ idx + 1 }}. {{ track.artistName }} -
                      {{ track.trackName }}
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-spacer />
                  <span class="px-2">
                    {{ millisToMinutes(track.trackTimeMillis) }}
                  </span>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-row>
        <v-overlay v-if="snackbar === true" :z-index="zIndex" style="background: rgba(0,0,0,0.9);">
          <v-snackbar
            v-model="snackbar"
            :timeout="-1"
            absolute
            centered
            elevation="24"
          >
            <v-list width="312px" style="border-radius: 8px">
              <v-list-item>
                <v-list-item-content class="d-flex align-center justify-center">
                  <v-img
                    :lazy-src="selectedTrack.artworkUrl30"
                    max-height="291"
                    max-width="250"
                    :src="selectedTrack.artworkUrl100"
                    class="mb-5"
                    style="border-radius: 6px;"
                  />
                  <v-list-item-title class="text-center mb-2">
                    {{ selectedTrack.artistName }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-center mb-2">
                    {{ selectedTrack.trackName }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <vuetify-audio
                      :file="selectedTrack.previewUrl"
                      flat
                      color="success"
                      downloadable
                      :ended="audioFinish"
                    />
                  </v-list-item-subtitle>
                  <v-btn
                    color="deep-orange"
                    elevation="24"
                    dence
                    rounded
                    style="max-width: 50px;"
                    @click="snackbar = false, zIndex = 0"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-snackbar>
        </v-overlay>
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
      playlist: [],
      keywordSearch: '',
      keywordPlaylist: '',
      hintText: '',
      index: 0,
      zIndex: 0,
      background: 'transparent',
      isLoading: false,
      emptyState: false,
      errorSearch: false,
      closeBtn: false,
      showPlaylist: false,
      showSearchPlaylist: false,
      selectedTrack: null,
      snackbar: false
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
      this.showSearchPlaylist = false
      this.dataMusic = []
      this.keywordPlaylist = 'indonesian hits'
      await this.$axios
        .$get(`/api/music/playlist/${this.keywordPlaylist}/song`)
        .then((response) => {
          if (response.data.length > 0) {
            this.isLoading = false
            this.dataMusic = response.data
            this.playlist = response.data
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
          this.playlist = []
          this.showPlaylist = false
        })
    },
    async fetchMusic () {
      this.isLoading = true
      this.emptyState = false
      this.showPlaylist = false
      this.showSearchPlaylist = false
      this.dataMusic = []
      await this.$axios
        .$get(`/api/music/search/${this.keywordSearch}/song`)
        .then((response) => {
          if (response.data.length > 0) {
            this.isLoading = false
            this.dataMusic = response.data
            this.playlist = response.data
            this.emptyState = false
            this.showSearchPlaylist = true
          } else {
            this.errorSearch = this.keywordSearch
            this.isLoading = false
            this.emptyState = true
            this.dataMusic = []
            this.playlist = []
            this.showSearchPlaylist = false
          }
        })
        .catch((err) => {
          console.log(err)
          this.errorSearch = this.keywordSearch
          this.isLoading = false
          this.emptyState = true
          this.dataMusic = []
          this.playlist = []
          this.showSearchPlaylist = false
        })
    },
    debounce (func, timeout) {
      let timer
      return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, timeout)
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
      this.playlist = []
      this.closeBtn = false
      this.fetchPlaylist()
    },
    millisToMinutes (millis) {
      const minutes = Math.floor(millis / 60000)
      const seconds = ((millis % 60000) / 1000).toFixed(0)
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    },
    selectTrack (track) {
      this.selectedTrack = track
    },
    audioFinish () {
      this.snackbar = false
    }
  }
}
</script>

<style scoped>
.selected {
  background-color: purple !important;
}
.even {
  background-color: #505050;
}
.playlist {
  overflow: auto;
  padding: 12px;
}

/* width */
::-webkit-scrollbar {
  width: 7px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #FFF;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: purple;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

</style>
