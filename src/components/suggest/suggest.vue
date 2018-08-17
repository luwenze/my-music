<template>
    <scroll class="suggest" :data="result" :pullup="pullup" :beforeScroll="beforeScroll" @scrollToEnd="searchMore" ref="suggest" @beforeScroll="listScroll">
        <ul class="suggest-list">
            <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <loading v-show="hasMore" title=""></loading>
        </ul>
        <div v-show="!hasMore && !result.length" class="no-result-wrapper">
            <no-result title="抱歉，暂无搜索结果"></no-result>
        </div>
    </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import NoResult from 'base/no-result/no-result'
import { mapMutations, mapActions } from 'vuex'
import { search } from 'api/search'
import { getSongKey } from 'api/songKey'
import { createSingerSong } from 'common/js/song'
import { deepClone } from 'common/js/dom'
import Singer from 'common/js/singer'
const ERR_OK = 0
const SINGER_TYPE = 'singer'
const PERPAGE = 20
export default {
  name: 'suggest',
  components: {
    Scroll,
    Loading,
    NoResult
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      pullup: true,
      hasMore: true,
      beforeScroll:true
    }
  },
  methods: {
    search() {
      this.page = 1
      this.hasMore = true
      this.$refs.suggest.scrollTo(0, 0)
      search(this.query, this.page, this.showSinger, PERPAGE).then(res => {
        if (res.code === ERR_OK) {
          this.result = this._genResult(res.data)
          this._checkMore(res.data)
        }
      })
    },
    getIconCls(item) {
      if (item.type === SINGER_TYPE) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName(item) {
      if (item.type === SINGER_TYPE) {
        return item.singername
      } else {
        return item.name + '-' + item.singer
      }
    },
    searchMore() {
      if (!this.hasMore) {
        return
      }
      this.page++
      search(this.query, this.page, this.showSinger, PERPAGE).then(res => {
        if (res.code === ERR_OK) {
          this.result = this.result.concat(this._genResult(res.data))
          this._checkMore(res.data)
        }
      })
    },
    selectItem(item) {
      if (item.type === SINGER_TYPE) {
        const singer = new Singer({
          id: item.singerid,
          mid: item.singermid,
          name: item.singername
        })
        this.$router.push('/search/' + singer.id)
        this.setSinger(singer)
      } else {
        let itemSong = deepClone(item)
        getSongKey(itemSong.mid).then(res => {
          if (res.code === ERR_OK) {
            let data = res.data.items[0]
            itemSong.url = `http://dl.stream.qqmusic.qq.com/C400${
              data.songmid
            }.m4a?guid=9080925500&vkey=${data.vkey}&uin=0&fromtag=38`
            this.insertSong(itemSong)
          }
        })
      }
      this.$emit('select')
    },
    listScroll(){
        this.$emit('listScroll')
    },
    refresh(){
        this.$refs.suggest.refresh()
    },
    _checkMore(data) {
      const song = data.song
      if (
        !song.list.length ||
        song.curnum + song.curpage * PERPAGE > song.totalnum
      ) {
        this.hasMore = false
      }
    },
    _genResult(data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({ ...data.zhida, ...{ type: SINGER_TYPE } })
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list))
      }
      return ret
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(musicData => {
        if (musicData.songid && musicData.albumid) {
          ret.push(createSingerSong(musicData))
        }
      })
      return ret
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions(['insertSong'])
  },
  watch: {
    query(newQuery) {
      this.search(newQuery)
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
@import '~common/less/variable';
@import '~common/less/mixin';
.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      .icon {
        flex: 0 0 30px;
        width: 30px;
      }
      .name {
        flex: 1;
        font-size: @font-size-medium;
        color: @color-text-d;
        overflow: hidden;
        .text {
          .no-wrap();
        }
      }
    }
  }
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
