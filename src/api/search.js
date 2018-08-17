import axios from 'axios';
//获取热搜方法
export function getHotKey() {
    const url = '/api/getHotKey'

    const data = Object.assign({}, {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: 1530763163877
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

//
export function search(query, page, zhida, perpage) {
    const url = '/api/search'
    const data = Object.assign({}, {
        w: query,
        p: page,
        catZhida: zhida ? 1 : 0,
        perpage: perpage,
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf - 8',
        outCharset: 'utf - 8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        zhidaqu: 1,
        t: 0,
        flag: 1,
        ie: 'utf - 8',
        sem: 1,
        aggr: 0,
        n: 20,
        remoteplace: 'txt.mqq.all',
        _: 1532483644574
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}