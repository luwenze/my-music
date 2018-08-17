<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box ref="searchBox" @query="onQueryChange"></search-box>
        </div>
        <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
            <scroll class="shortcut" :refreshDelay="refreshDelay" :data="shortcut" ref="shortcut">
                <div>
                    <div class="hot-key">
                        <h1 class="title">热门搜索</h1>
                        <ul>
                            <li @click="addQuery(item.k)" class="item" v-for="item in hotkey">
                                <span>{{item.k}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="search-history" v-show="searchHistory.length">
                        <h1 class="title">
                            <span class="text">搜索历史</span>
                            <span class="clear" @click="showConfirm">
                                <i class="icon-clear"></i>
                            </span>
                        </h1>
                        <search-list @select="addQuery" @delete="deleteSearchHistory" :searches="searchHistory"></search-list>
                    </div>
                </div>
            </scroll>
        </div>

        <div ref="searchResult" class="search-result" v-show="query">
            <suggest ref="suggest" :query="query" @select="saveSearch" @listScroll="blurInput"></suggest>
        </div>
        <confirm ref="confirm" text="是否清空所有历史" confirmBtnText="清空" @confirm="clearSearchHistory"></confirm>
        <router-view></router-view>
    </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import Suggest from 'components/suggest/suggest'
import SearchList from 'base/search-list/search-list'
import Confirm from 'base/confirm/confirm'
import Scroll from 'base/scroll/scroll'
import { getHotKey } from 'api/search'
import { mapActions } from 'vuex'
import { playlistMixin, searchMixin} from 'common/js/mixin'

const ERR_OK = 0
export default {
  name: 'Search',
  mixins:[playlistMixin,searchMixin],
  data() {
    return {
      hotkey: []
    }
  },
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm,
    Scroll
  },
  created() {
    this._getHotKey()
  },
  mounted() {
    // this.$refs.shortcut.refresh()
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  },
  computed: {
    shortcut() {
      return this.hotkey.concat(this.searchHistory)
    }
  },
  methods: {
    showConfirm() {
      this.$refs.confirm.show()
    },
    handlePlaylist(playlist){
        const bottom=playlist.length>0?'60px':''
        this.$refs.shortcutWrapper.style.bottom=bottom
        this.$refs.shortcut.refresh()
        this.$refs.searchResult.style.bottom=bottom
        this.$refs.suggest.refresh()
    },
    _getHotKey() {
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          this.hotkey = res.data.hotkey.slice(0, 10)
        }
      })
    },
    ...mapActions([
      'clearSearchHistory'
    ])
  }
}
</script>

<style lang="less" rel="stylesheet/less">
@import '~common/less/variable';
@import '~common/less/mixin';

.search {
    // position: fixed;
    // top: 0;
    // left: 0;
    // right: 0;
    // bottom: 0;
    // z-index: 100;
  .search-box-wrapper {
    margin: 20px;
  }
  .shortcut-wrapper {
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;
    .shortcut {
      height: 100%;
      overflow: hidden;
      .hot-key {
        margin: 0 20px 20px 20px;
        .title {
          margin-bottom: 20px;
          font-size: @font-size-medium;
          color: @color-text-l;
        }
        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: @color-highlight-background;
          font-size: @font-size-medium;
          color: @color-text-d;
        }
      }
    }
  }
  .search-history {
    position: relative;
    margin: 0 20px;
    .title {
      display: flex;
      align-items: center;
      height: 40px;
      font-size: @font-size-medium;
      color: @color-text-l;
      .text {
        flex: 1;
      }
      .clear {
        .extend-click();
        .icon-clear {
          font-size: @font-size-medium;
          color: @color-text-d;
        }
      }
    }
  }
  .search-result {
    position: fixed;
    width: 100%;
    top: 178px;
    bottom: 0;
  }
}
</style>
