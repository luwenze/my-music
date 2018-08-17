<template>
    <transition name="slide">
        <music-list :title="title" :bgImage="bgImage" :songs="songs" :rank="rank"></music-list>
    </transition>

</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
export default {
  name: 'TopList',
  components: {
    MusicList
  },
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  computed: {
    title() {
      return this.topList.topTitle
    },
    bgImage() {
      return this.topList.picUrl
    },
    ...mapGetters(['topList'])
  },
  mounted() {
    this._getMusicList()
  },
  methods: {
    _getMusicList() {
      var that = this
      this.$ajax.get('/api/musicList').then(function(response) {
        that.songs = response.data.musicList
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
