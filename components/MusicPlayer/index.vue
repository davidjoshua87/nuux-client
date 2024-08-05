<template>
  <div>
    <!-- <v-card class="mt-7"> -->
    <v-row class="ma-auto center-content mt-12">
      <div
        class="player ma-auto pa-lg-3 d-lg-flex justify-lg-center rounded-lg row"
      >
        <div class="cover-wrapper col-lg-3">
          <img :class="coverObject" :src="current.cover">
        </div>
        <div class="col-lg-9">
          <div class="song-details px-8 flex-lg-row">
            <h2 class="song-title">
              {{ current.title }}
            </h2>
            <p class="artist">
              {{ current.artist }}
            </p>
            <div class="progress-bar">
              <progress-bar
                :size="15"
                :val="current.percent"
                :bar-color="'#df83f1'"
                :bar-border-radius="8"
              />
            </div>

            <div class="timer">
              <p class="start">
                {{ currentlyTimer }}
              </p>
              <p class="end">
                {{ current.totalTimer }}
              </p>
            </div>
          </div>
          <div class="controls flex-lg-row">
            <v-btn
              v-if="songs.length > 1"
              class="prev cursor-pointer"
              icon
              @click="prev"
            >
              <v-icon>mdi-step-backward</v-icon>
            </v-btn>
            <v-btn
              v-if="!isPlaying"
              class="play cursor-pointer"
              icon
              @click="play"
            >
              <v-icon>mdi-play</v-icon>
            </v-btn>
            <v-btn v-else class="pause cursor-pointer" icon @click="pause">
              <v-icon>mdi-pause</v-icon>
            </v-btn>
            <v-btn
              v-if="songs.length > 1"
              class="next cursor-pointer"
              icon
              @click="next"
            >
              <v-icon>mdi-step-forward</v-icon>
            </v-btn>
          </div>
        </div>

        <div class="footer col-lg-12">
          <p>Powered by Mux</p>
          <v-btn
            alt="Playlist"
            title="Playlist"
            icon
            class="cursor-pointer"
            @click="toggleMusicLists"
          >
            <v-icon color="black">
              mdi-playlist-music
            </v-icon>
          </v-btn>
        </div>
      </div>
    </v-row>
    <!-- </v-card> -->
    <!-- <music-lists
      v-if="showMusicLists"
      :current-song="current"
      @play-song="play"
      @update-progress="updateProgress"
    /> -->
  </div>
</template>

<script>
import ProgressBar from 'vue-simple-progress'
import { formatTimer } from '../../helpers/timer'
import { deleteElement, threatSongs, shuffleArray } from '../../helpers/utils'
import songs from '../MusicPlayer/songs'

export default {
  name: 'MusicPlayerComponent',
  components: {
    ProgressBar
  },
  data () {
    return {
      current: {},
      coverObject: { cover: true, animated: false },
      index: 0,
      isPlaying: false,
      currentlyTimer: '00:00',
      songs: shuffleArray(songs),
      player: new Audio(),
      showMusicLists: false
    }
  },
  mounted () {
    this.songs = threatSongs(this.songs)
    this.current = this.songs[this.index]
    this.player.src = this.current.src
  },
  methods: {
    toggleMusicLists () {
      this.showMusicLists = !this.showMusicLists
    },
    setCover () {
      this.coverObject.animated = true

      setTimeout(() => {
        this.coverObject.animated = false
      }, 1000)
    },
    setCurrentSong () {
      this.player.pause()
      this.current = this.songs[this.index]
      this.play(this.current)
      this.setCover()
    },
    listenersWhenPlay () {
      this.player.removeEventListener('ended', this.onEnded)
      this.player.removeEventListener('timeupdate', this.onTimeUpdate)

      this.player.addEventListener('ended', this.onEnded)
      this.player.addEventListener('timeupdate', this.onTimeUpdate)
    },
    onEnded () {
      this.isPlaying = false
      this.current.isPlaying = false
      this.player.currentTime = 0
      this.next()
    },
    onTimeUpdate () {
      const playerTimer = this.player.currentTime
      this.currentlyTimer = formatTimer(playerTimer)
      this.current.percent = (playerTimer * 100) / this.current.seconds
      this.current.isPlaying = true
    },
    play (song) {
      if (typeof song.src !== 'undefined') {
        this.current.isPlaying = false
        this.index = this.songs.indexOf(this.current)
        this.current = song
        this.player.src = this.current.src
      }

      this.player.pause()
      this.player.currentTime = 0

      this.player.play()
      this.isPlaying = true

      this.setCover()
      this.listenersWhenPlay()
    },
    pause () {
      this.player.pause()
      this.isPlaying = false
    },
    next () {
      this.current.isPlaying = false
      this.index = this.songs.indexOf(this.current)
      this.index++
      if (this.index > this.songs.length - 1) {
        this.index = 0
      }
      this.setCurrentSong()
    },
    prev () {
      this.current.isPlaying = false
      this.index = this.songs.indexOf(this.current)
      this.index--
      if (this.index < 0) {
        this.index = this.songs.length - 1
      }
      this.setCurrentSong()
    },
    removeSongFromPlaylist (song) {
      if (this.songs.length > 1) {
        if (this.index > 0) {
          this.index--
        }
        this.current.isPlaying = false
        this.songs = deleteElement(this.songs, song)
        this.setCurrentSong()
      }
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Muli&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

.player {
  background-color: white;
  height: fit-content;
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
  margin-top: 25px;
}

.cover-playlist {
  height: 50px;
  width: 50px;
}

.cover-wrapper {
  width: 100%;
  margin-top: 30px;
  height: 100%;
  text-align: center;
}

.animated {
  animation: appear-smoothly 1s normal both;
  transition: all 0.3s;
}

.cover {
  height: 100%;
  width: 270px;
  box-shadow: 0 24px 35px -16px rgba(107, 179, 237, 0.5);
  border-radius: 15px;
}

.progress-bar {
  box-shadow: 0 24px 35px -16px rgba(107, 179, 237, 0.5);
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
  margin-left: 10px;
  width: 100%;
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

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 15px;
}

.play,
.pause {
  background-image: linear-gradient(
    to right top,
    #d16ba5,
    #c777b9,
    #ba83ca,
    #aa8fd8,
    #9a9ae1,
    #8aa7ec,
    #79b3f4,
    #69bff8,
    #52cffe,
    #41dfff,
    #46eefa,
    #5ffbf1
  );
  border-radius: 50%;
  width: 80px;
  height: 80px;
  justify-content: center;
  box-shadow: -1px 17px 24px -6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-size: 25px;
  color: #fff;
  margin-left: 20px;
  margin-right: 20px;
}

.next,
.prev {
  border: 0;
  border-radius: 50%;
  font-size: 20px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.09);
  color: #fff;
  transition: background-color 0.2s;
  position: relative;
}

.playlist {
  background-color: #fff;
  overflow-y: auto;
  max-height: 622px;
  border-radius: 5px;
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
  padding: 10px;
}

.actions > .delete {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  justify-content: center;
  box-shadow: -1px 17px 24px -6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-size: 20px;
  color: #ba83ca;
}

.playlist .song:hover {
  background-color: #ededed;
  transition: box-shadow 0.2s, background-color 0.3s;
}

.timer {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px;
  color: black;
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

ul {
  list-style: none;
}

.footer {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  background-color: white;
  color: black;
  margin: 10px 0;
}

.footer > a {
  cursor: pointer;
  position: relative;
  top: -10px;
  font-size: 25px;
  color: #585858;
}

#app {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
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

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes scale-up-center {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes flip-in-hor-bottom {
  0% {
    transform: rotateX(80deg);
    opacity: 0;
  }
  100% {
    transform: rotateX(0);
    opacity: 1;
  }
}

@keyframes appear-smoothly {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>
