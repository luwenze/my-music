<template>
    <div class="rank" ref="rank">
        <scroll :data="topList" class="toplist" ref="topList">
            <ul>
                <li class="item" v-for="item in topList" @click="selectItem(item)">
                    <div class="icon">
                        <img width="100" height="100" :src="item.picUrl" />
                    </div>
                    <ul class="songlist">
                        <li class="song" v-for="(song,index) in item.songList">
                            <span>{{index + 1}}</span>
                            <span>{{song.songname}}-{{song.singername}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="loading-container" v-show="!topList.length">
                <loading></loading>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { playlistMixin } from 'common/js/mixin'
import { mapMutations } from 'vuex'
export default {
  name: 'Rank',
  mixins: [playlistMixin],
  components: {
    Scroll,
    Loading
  },
  data() {
    return {
      topList: []
    }
  },
  created() {
    this._getTopList()
  },
  methods: {
    handlePlaylist(playList) {
      const bottom = playList.length ? '60px' : 0
      this.$refs.rank.style.bottom = bottom
      this.$refs.topList.refresh()
    },
    selectItem(item) {
      this.$router.push({
        path: '/rank/' + item.id
      })
      this.setTopList(item)
    },
    _getTopList() {
      var that = this
      this.$ajax.get('/api/topList').then(function(response) {
        that.topList = response.data.topList
      })
    },
    ...mapMutations({
        setTopList:'SET_TOP_LIST'
    })
  }
}
</script>

<style lang="less" rel="stylesheet/less">
@import '~common/less/variable';
@import '~common/less/mixin';
.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  > .toplist {
    height: 100%;
    overflow: hidden;
    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;
      height: 100px;
      &:last-child {
        padding-bottom: 20px;
      }
      > .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
      }
      > .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background: @color-highlight-background;
        color: @color-text-d;
        font-size: @font-size-small;
        > .song {
          .no-wrap();
          line-height: 26px;
        }
      }
    }
    > .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
