<template>
  <div class="d-flex justify-center">
    <v-container>
      <v-row class="d-flex mt-6 justify-center">
        <v-col cols="12">
          <music-player :current-track="currentTrack" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'DiscoverComponent',
  data () {
    return {
      tracks: [],
      currentTrackIndex: 0
    }
  },
  computed: {
    currentTrack () {
      return this.tracks[this.currentTrackIndex]
    }
  },
  methods: {
    handleTrackChange (direction) {
      if (direction === 'next') {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length
      } else if (direction === 'previous') {
        this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length
      }
    }
  }
}
</script>

<style>
</style>
