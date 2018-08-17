let Mock = require('mockjs')
const Random = Mock.Random
import { CC2PY } from 'common/js/pinyin'
import { lrc } from 'common/js/lrc'
Mock.mock('/api/data', function() {
    return Mock.mock({
        "data|1-10": [{
            "name|+1": [
                "Hello",
                "Mock.js",
                "!"
            ]
        }]
    });
});
//轮播图数据
Mock.mock('/api/recommend', function() {
    return Mock.mock({
        "slider|3-10": [{
            "linkUrl": '@url("http")',
            "bgColor": "@color", //生成头像
            "fontColor": "@color",
            "text": "@word",
            "picUrl": function() {
                let imgUrl = Random.image('1080x432', this.bgColor, this.fontColor, 'png', this.text)
                return imgUrl
            }
        }]
    });
});
//获取歌单数据
Mock.mock('/api/discList', function() {
    return Mock.mock({
        "discList|20-50": [{
            "dissname": '@csentence',
            "creator": '@ctitle',
            "dissid": '@increment()',
            "bgColor": "@color", //生成头像
            "fontColor": "@color",
            "text": "@word",
            "imgUrl": function() {
                let imgUrl = Random.image('375x260', this.bgColor, this.fontColor, 'png', this.text)
                return imgUrl
            }
        }]
    });
});
//获取歌单详情数据
Mock.mock('/api/discDetail', function() {
    return Mock.mock({
        "discDetail|10": [{
            "album": '@cword',
            "duration|+1": [
                250, 281, 230, 250, 283, 154, 294, 209, 247, 220
            ],
            "id|+1": 1,
            "mid": '@id()',
            "name": '@ctitle',
            "singer": '@cname',
            "url": function() {
                let url = 'static/music (' + this.id + ').mp3'
                return url
            },
            "lrcWord": function() {
                let str = 'music' + this.id
                let lrcText = lrc[str]
                return lrcText
            },
            "bgColor": "@color", //生成头像
            "fontColor": "@color",
            "text": "@word",
            "image": function() {
                let imgUrl = Random.image('400x400', this.bgColor, this.fontColor, 'png', this.text)
                return imgUrl
            },
            "flag": 1
        }]
    });
});
//获取歌手列表数据
Mock.mock('/api/singerList', function() {
    return Mock.mock({
        "singerList|100": [{
            "Fsinger_name": '@cname',
            "Fsinger_mid|+1": 0,
            "Findex": function() {
                let name = CC2PY(this.Fsinger_name).slice(0, 1)
                return name
            },
            "bgColor": "@color", //生成头像
            "fontColor": "@color",
            "text": "@word",
            "Fsinger_avatar": function() {
                let imgUrl = Random.image('375x265', this.bgColor, this.fontColor, 'png', this.text)
                return imgUrl
            }
        }]
    });
});
//获取歌手详情数据
Mock.mock('/api/singerDetail', function() {
    return Mock.mock({
        "singerDetail|10": [{
            "album": '@cword',
            "duration|+1": [
                250, 281, 230, 250, 283, 154, 294, 209, 247, 220
            ],
            "id|+1": 1,
            "mid": '@id()',
            "name": '@ctitle',
            "singer": '@cname',
            "url": function() {
                let url = 'static/music (' + this.id + ').mp3'
                return url
            },
            "lrcWord": function() {
                let str = 'music' + this.id
                let lrcText = lrc[str]
                return lrcText
            },
            "bgColor": "@color", //生成头像
            "fontColor": "@color",
            "text": "@word",
            "image": function() {
                let imgUrl = Random.image('400x400', this.bgColor, this.fontColor, 'png', this.text)
                return imgUrl
            },
            "flag": 1
        }]
    });
});
//获取排行榜数据
Mock.mock('/api/topList', function() {
        return Mock.mock({
            "topList|20-50": [{
                "id": '@increment()',
                "bgColor": "@color", //生成头像
                "fontColor": "@color",
                "text": "@word",
                "picUrl": function() {
                    let imgUrl = Random.image('100x100', this.bgColor, this.fontColor, 'png', this.text)
                    return imgUrl
                },
                "songList|3": [{
                    "singername": "@cname",
                    "songname": "@ctitle"
                }],
                "topTitle": "@ctitle()"

            }]
        })
    })
    //获取排行榜歌曲
Mock.mock('/api/musicList', function() {
    return Mock.mock({
        "musicList|10": [{
            "album": '@cword',
            "duration|+1": [
                250, 281, 230, 250, 283, 154, 294, 209, 247, 220
            ],
            "id|+1": 1,
            "mid": '@id()',
            "name": '@ctitle',
            "singer": '@cname',
            "url": function() {
                let url = 'static/music (' + this.id + ').mp3'
                return url
            },
            "lrcWord": function() {
                let str = 'music' + this.id
                let lrcText = lrc[str]
                return lrcText
            },
            "bgColor": "@color", //生成头像
            "fontColor": "@color",
            "text": "@word",
            "image": function() {
                let imgUrl = Random.image('400x400', this.bgColor, this.fontColor, 'png', this.text)
                return imgUrl
            },
            "flag": 1
        }]
    });
});