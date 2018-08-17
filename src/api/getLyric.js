import axios from 'axios';
//获取热搜方法
export function getLyric(id) {
    const url = '/api/getLyric'

    const data = Object.assign({}, {
        musicid: id,
        g_tk: 5381,
        uin: 0,
        format: 'jsonp',
        inCharset: 'utf - 8',
        outCharset: 'utf - 8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        nobase64: 1,
        songtype: 0,
        _: 1531376155369,
        jsonpCallback: jsonp2
    })

    function jsonp2() {

    }
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}