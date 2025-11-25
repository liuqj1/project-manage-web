//参考模板
import request from '@/utils/request'

//get携带参数用params
export function fetchList(params) {
    return request({
        url: '/opLog/list',
        method: 'get',
        params: params
    })
}

//get请求的路径携带参数，后端接口也要对应接收
export function fetchList(parentId, params) {
    return request({
        url: '/menu/list/' + parentId,
        method: 'get',
        params: params
    })
}

//post携带参数用data
export function createMenu(data) {
    return request({
        url: '/menu/add',
        method: 'post',
        data: data
    })
}
