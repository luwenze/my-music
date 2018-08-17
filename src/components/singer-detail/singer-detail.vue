<template>
    <transition name="slide">
        <div class="singerDetail">
            <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
        </div>
    </transition>

</template>

<script>
import { mapGetters } from 'vuex'
import MusicList from 'components/music-list/music-list'
import { getSingerDetails } from 'api/singerDetails'
import { getSongKey } from 'api/songKey'
import { createSingerIdSong } from 'common/js/song'
import {deepClone} from 'common/js/dom'
const ERR_OK = 0
export default {
  data() {
    return {
      songs: []
    }
  },
  name: 'singerDetail',
  components: {
    MusicList
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters(['singer'])
  },
  created() {
    this._getDetail()
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetails(this.singer.mid).then(res => {//根据singer的mid进行ajax
        res = JSON.parse(res.slice(31, res.length - 1))//获取到数据
        if (res.code === ERR_OK) {//判断数据
          res.data.list.forEach(item => {//遍历获取到的数据
            getSongKey(item.musicData.songmid).then(res => {//根据item的songmid进行ajax
              if (res.code === ERR_OK) {//判断数据
                let data = res.data.items[0]
                item.musicData.url = `http://dl.stream.qqmusic.qq.com/C400${data.songmid}.m4a?guid=9080925500&vkey=${data.vkey}&uin=0&fromtag=38`
                this.songs.push(createSingerIdSong(item.musicData))
              }
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
@import '~common/less/variable';
.singerDetail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: @color-background;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter, .slide-leave-to /* .slide-leave-active below version 2.1.8 */ {
  transform: translate3d(100%, 0, 0);
}
</style>
