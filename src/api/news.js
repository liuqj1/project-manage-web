import request from '@/utils/request'

export function getNewsTag() {
    return request({
        url: '/news-api/get-tagList',
        method: 'get',
    })
}
export function editNewsTag(data) {
    return request({
        url: '/news-api/tag-edit',
        method: 'post',
        data: data
    })
}