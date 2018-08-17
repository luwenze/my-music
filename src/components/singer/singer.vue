<template>
    <div class="singer" ref="singer">
        <list-view :data="singers" @select="selectSinger" ref="list"></list-view>
        <router-view></router-view>
    </div>
</template>

<script>
const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
import ListView from 'base/listview/listview'
import { mapMutations } from 'vuex'
import {playlistMixin} from 'common/js/mixin'
export default {
  name: 'Singer',
  components: {
    ListView
  },
  mixins:[playlistMixin],
  data() {
    return {
      singers: []
    }
  },
  mounted() {
    this._getSingerList()
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: '/singer/' + singer.id
      })
      this.setSinger(singer)
    },
    handlePlaylist(playList){
        const bottom=playList.length>0?'60px':''
        this.$refs.singer.style.bottom=bottom
        this.$refs.list.refresh()
    },
    _getSingerList() {
      var that = this
      this.$ajax.get('/api/singerList').then(function(response) {
        that.singers = that._normalizeSinger(response.data.singerList)
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
            avatar: item.Fsinger_avatar
          })
        }

        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push({
          id: item.Fsinger_mid,
          name: item.Fsinger_name,
          avatar: item.Fsinger_avatar
        })
      })
      //为了得到有序列表，我们需要处理map
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    ...mapMutations({
        setSinger:'SET_SINGER'
    })
  }
}
</script>

<style lang="less" rel="stylesheet/less">
@import '~common/less/variable';
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
