import {
    mapGetters,
    mapMutations,
    mapActions
} from 'vuex'
import {
    playMode
} from 'common/js/config'
import {
    shuffle
} from 'common/js/util'

export const playlistMixin = {
    computed: {
        ...mapGetters([
            'playList'
        ])
    },
    mounted() {
        this.handlePlaylist(this.playList)
    },
    activated() {
        this.handlePlaylist(this.playList)
    },
    watch: {
        playList(newVal) {
            this.handlePlaylist(newVal)
        }
    },
    methods: {
        handlePlaylist() {
            throw new Error('component must implement handlePlaylist mothod')
        }
    }
}

export const playerMixin = {
    computed: {
        iconMode() {
            return this.mode === playMode.sequence ?
                'icon-sequence' :
                this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
        },
        ...mapGetters(['sequenceList', 'currentSong', 'mode', 'playList', 'favoriteList'])
    },
    methods: {
        changeMode() {
            const mode = (this.mode + 1) % 3
            this.setPlayMode(mode)
            let list = null
            if (mode === playMode.random) {
                list = shuffle(this.sequenceList)
            } else {
                list = this.sequenceList
            }
            this.setPlayList(list)
        },
        resetCurrentIndex(list) {
            let index = list.findIndex(item => {
                return item.id === this.currentSong.id
            })
            this.setCurrentIndex(index)
        },
        toggleFavorite(song) {
            if (this.ifFavorite(song)) {
                this.deleteFavoriteList(song)
            } else {
                this.saveFavoriteList(song)
            }
        },
        getFavoriteIcon(song) {
            if (this.ifFavorite(song)) {
                return 'icon-favorite'
            } else {
                return 'icon-not-favorite'
            }
        },
        ifFavorite(song) {
            const index = this.favoriteList.findIndex((item) => {
                return item.id === song.id
            })
            return index > -1
        },
        ...mapMutations({
            setPlayingState: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_PLAY_MODE',
            setPlayList: 'SET_PLAYLIST'
        }),
        ...mapActions([
            'saveFavoriteList',
            'deleteFavoriteList'
        ])
    }
}

export const searchMixin = {
    computed: {
        ...mapGetters(['searchHistory'])
    },
    data() {
        return {
            query: '',
            refreshDelay: 100
        }
    },
    methods: {
        onQueryChange(query) {
            this.query = query
        },
        blurInput() {
            this.$refs.searchBox.blur()
        },
        saveSearch() {
            this.saveSearchHistory(this.query)
        },
        addQuery(query) {
            this.$refs.searchBox.setQuery(query)
        },
        ...mapActions([
            'saveSearchHistory',
            'deleteSearchHistory',
            'clearSearchHistory'
        ])
    }
}