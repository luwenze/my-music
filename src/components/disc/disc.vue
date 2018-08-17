<template>
    <transition name="slide">
        <music-list :title="title" :bgImage="bgImage" :songs="discDetail"></music-list>
    </transition>

</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getDisc } from 'api/disc'
import { createSong } from 'common/js/song'

const ERR_OK = 0
export default {
  name: 'Disc',
  components: {
    MusicList
  },
  data() {
    return {
      discDetail: []
    }
  },
  computed: {
    title() {
      return this.disc.songListDesc
    },
    bgImage() {
      return this.disc.picUrl
    },
    ...mapGetters(['disc'])
  },
  mounted() {
    this._getDiscDetail()
  },
  methods: {
    _getDiscDetail() {
      if (!this.disc.id) {
        this.$router.push('/recommend')
        return
      }
      getDisc(this.disc.id).then(res => {
        if (res.code === ERR_OK) {
          let songlist = res.cdlist[0].songlist
          songlist.forEach(item => {
            let song = createSong(item)
            this.discDetail.push(song)
          })
        }
      })
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
@import '~common/less/variable';
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
