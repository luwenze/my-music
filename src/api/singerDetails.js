import axios from 'axios';
//获取热搜方法
export function getSingerDetails(singermid) {
    const url = '/api/getSingerDetails'

    const data = Object.assign({}, {
        singermid: singermid,
        g_tk: 1423319000,
        jsonpCallback: 'MusicJsonCallbacksinger_track',
        loginUin: 1348180083,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf - 8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        order: 'listen',
        begin: 0,
        num: 100,
        songstatus: 1
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}