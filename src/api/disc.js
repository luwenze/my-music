import axios from 'axios';
//获取热搜方法
export function getDisc(disstid) {
    const url = '/api/getDisc'

    const data = Object.assign({}, {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf - 8',
        outCharset: 'utf - 8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        new_format: 1,
        pic: 500,
        disstid: disstid,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        picmid: 1,
        nosign: 1,
        song_begin: 0,
        song_num: 15,
        _: 1531288627066,
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}