<template>
  <div>
    <v-card class="mt-7">
      <v-card class="mx-auto">
        <div class="playlist">
          <h3>Now Playing <span> 🎵 </span></h3>
          <ul>
            <li v-for="song in songs" :key="song.src" class="song">
              <div class="cover-playlist">
                <img class="cover" :src="song.cover">
              </div>
              <div class="details" @click="play(song)">
                <h2 class="song-title">
                  {{ song.title }}
                </h2>
                <p class="artist">
                  {{ song.artist }}
                </p>
                <progress-bar
                  :size="8"
                  :val="current.percent"
                  :bg-color="'#53565a'"
                  :bar-color="'#df83f1'"
                  :bar-border-radius="8"
                />
              </div>
              <div>
                <p class="song-title">
                  {{ song.totalTimer }}
                </p>
              </div>
              <!-- <div class="actions">
                <v-btn class="delete" @click="removeSongFromPlaylist(song)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div> -->
            </li>
          </ul>
        </div>
      </v-card>
    </v-card>
  </div>
</template>

<script>
// import ProgressBar from 'vue-simple-progress'
import { shuffleArray } from '../../helpers/utils'
import songs from '../MusicPlayer/songs'

export default {
  name: 'MusicListsComponent',
  components: {
    // ProgressBar
  },
  props: {
    currentSong: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      songs: shuffleArray(songs),
      player: new Audio()
    }
  },
  watch: {
    currentSong: {
      handler (newSong) {
        // Update the song list with the current song's details
        this.songs.forEach((song) => {
          if (song.src === newSong.src) {
            song.percent = newSong.percent || 0
          }
        })
      },
      deep: true
    }
  },
  created () {
    this.$on('update-progress', (song) => {
      this.songs.forEach((s) => {
        if (s.src === song.src) {
          s.percent = song.percent
        }
      })
    })
  },
  methods: {
    play (song) {
      this.$emit('play-song', song)
    },
    removeSongFromPlaylist (song) {
      this.$emit('remove-song', song)
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Muli&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

.player {
  background-color: white;
}

button {
  appearance: none;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
  transform: scale(1.1);
}

.song-details {
  margin-top: 20px;
}

.cover-playlist {
  height: 50px;
  width: 50px;
}

.animated {
  animation: appear-smoothly 1s normal both;
  transition: all 0.3s;
}

.cover {
  height: 100%;
  width: 270px;
  box-shadow: 0 24px 35px -16px rgba(107, 179, 237, 0.5);
  border-radius: 5px;
}

.cover-playlist > .cover {
  margin-right: 15px;
  width: 50px;
}

.song-title {
  width: 100%;
  color: #53565a;
  font-size: 1.13em;
  text-align: center;
  margin-bottom: 5px;
}

.artist {
  font-family: Muli;
  width: 100%;
  font-weight: 400;
  text-align: center;
  color: #53565a;
}

.details {
  margin: 0 10px;
  width: 100%;
  cursor: pointer;
}

.details > .song-title {
  color: #585858;
  font-size: inherit;
  text-align: left;
}

.details > .artist {
  color: #5d5555;
  text-align: left;
}

.playlist {
  background-color: #fff;
  overflow-y: auto;
  max-height: 622px;
  border-radius: 5px;
  overflow-x: hidden;
  padding: 10px;
}

.playlist h3 {
  color: #212121;
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.playlist .song {
  display: flex;
  margin: 15px;
}

.actions > .delete {
  padding: 15px;
  border-radius: 16px;
  justify-content: center;
  cursor: pointer;
  font-size: 15px;
  color: black;
}

.theme--dark.v-btn.v-btn--has-bg {
  width: 10px;
  height: 20px;
  background-color: transparent;
}

.playlist .song:hover {
  background-color: #ededed;
  transition: box-shadow 0.2s, background-color 0.3s;
}

.song-title {
  width: 100%;
  color: #53565a;
  font-size: 1.13em;
  text-align: center;
  margin-bottom: 5px;
}

.artist {
  font-family: Muli;
  width: 100%;
  font-weight: 400;
  text-align: center;
}

.details > .song-title {
  color: #585858;
  font-size: inherit;
  text-align: left;
}

.details > .artist {
  color: #5d5555;
  text-align: left;
}

@media (max-width: 768px) {
  #app {
    grid-template-columns: 1fr;
  }

  body {
    height: 100%;
    margin-top: 10px;
  }

  .playlist {
    max-height: 200px;
  }
}
</style>
