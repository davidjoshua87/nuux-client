<template>
  <div>
    <!-- <v-card class="mt-7"> -->
    <v-card class="center-content mt-5">
      <div
        class="player ma-auto pa-lg-3 d-lg-flex justify-lg-center rounded-lg row"
      >
        <div class="cover-wrapper col-lg-3">
          <img :class="coverObject" :src="current.cover">
        </div>
        <div class="col-lg-9 pa-0">
          <div class="song-details px-10 flex-lg-row">
            <h2 class="song-title">
              {{ current.title }}
            </h2>
            <p class="artist">
              {{ current.artist }}
            </p>
            <div class="progress-bar">
              <progress-bar
                :size="10"
                :val="current.percent"
                :bg-color="'#53565a'"
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
              <v-icon style="color: #df83f1;" size="36px">
                mdi-step-backward
              </v-icon>
            </v-btn>
            <v-btn
              v-if="!isPlaying"
              class="play cursor-pointer"
              icon
              @click="play"
            >
              <v-icon style="color: black;" size="52px">
                mdi-play
              </v-icon>
            </v-btn>
            <v-btn v-else class="pause cursor-pointer" icon @click="pause">
              <v-icon style="color: black;" size="52px">
                mdi-pause
              </v-icon>
            </v-btn>
            <v-btn
              v-if="songs.length > 1"
              class="next cursor-pointer"
              icon
              @click="next"
            >
              <v-icon style="color: #df83f1;" size="36px">
                mdi-step-forward
              </v-icon>
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
    </v-card>
    <!-- </v-card> -->
    <!-- <music-lists
      v-if="showMusicLists"
      :current-song="current"
      @play-song="play"
      @update-progress="updateProgress"
    /> -->
    <v-card v-if="showMusicLists" class="ma-auto center-content mt-4">
      <div class="playlist rounded-lg">
        <h3 class="title">
          Now Playing <span> 🎵 </span>
        </h3>
        <ul>
          <li v-for="song in songs" :key="song.src" class="song">
            <div class="cover-playlist">
              <img class="cover img-playlist" :src="song.cover">
            </div>
            <div class="details" @click="play(song)">
              <h2 class="song-title">
                {{ song.title }}
              </h2>
              <p class="artist">
                {{ song.artist }}
              </p>
              <progress-bar
                v-if="song.isPlaying"
                :size="8"
                :val="current.percent"
                :bg-color="'#53565a'"
                :bar-color="'#df83f1'"
                :bar-border-radius="8"
              />
            </div>
            <div class="timer-playlist">
              <p>
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
  </div>
</template>

<script>
import ProgressBar from 'vue-simple-progress'
import { formatTimer } from '../../helpers/timer'
import { deleteElement, threatSongs } from '../../helpers/utils'
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
      songs,
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
  margin-top: 12px;
}

.cover-playlist {
  height: 50px;
  width: 50px;
}

.cover-wrapper {
  width: 100%;
  margin-top: 20px;
  height: 100%;
  text-align: center;
  padding: 0;
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

.img-playlist {
  margin: 10px auto;
}

.progress-bar {
  box-shadow: 0 24px 35px -16px rgba(107, 179, 237, 0.5) !important;
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
  color: black;
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
  color: black;
  transition: background-color 0.2s;
  position: relative;
}

.title {
  font-weight: 900;
}

.timer {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px;
  color: black;
  font-weight: 700;
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
  padding: 15px 25px;
  border-bottom: 1px solid #53565a;
  padding-bottom: 10px;
  margin-bottom: 10px;
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
  cursor: pointer;
  background-color: #ededed;
  transition: box-shadow 0.2s, background-color 0.3s;
}

.playlist .details {
  padding: 0px 0px 0px 20px;
}

.timer-playlist {
  padding: 0px;
  color: black;
  font-weight: 700;
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

.footer {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  background-color: white;
  color: black;
  margin: 0px 0 10px 0;
  padding: 10px 25px;
}

.footer > a {
  cursor: pointer;
  position: relative;
  font-size: 25px;
  color: #585858;
}

#app {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

p {
  margin-bottom: 10px;
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
