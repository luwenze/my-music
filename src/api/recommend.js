import axios from 'axios';
//获取热搜方法
export function getRecommend() {
    const url = '/api/getRecommend'

    const data = Object.assign({}, {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf - 8',
        outCharset: 'utf - 8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: 1531279020305
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}