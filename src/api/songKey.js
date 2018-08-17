import axios from 'axios';
//获取热搜方法
export function getSongKey(songmid) {
    const url = '/api/getSongKey'

    const data = Object.assign({}, {
        songmid: songmid,
        g_tk: 5381,
        jsonpCallback: MusicJsonCallback41577578715874686(),
        loginUin: 0,
        hostUin: 0,
        format: 'json',
        inCharset: 'utf - 8',
        outCharset: 'utf - 8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        cid: '205361747',
        callback: MusicJsonCallback41577578715874686(),
        uin: 0,
        filename: 'C400002ihFxm1EarI4.m4a',
        guid: '9080925500'
    })

    function MusicJsonCallback41577578715874686() {

    }

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}