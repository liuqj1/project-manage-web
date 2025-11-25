import request from '@/utils/request'


export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data: data
    })
}

export function getInfo(username) {
    return request({
        url: '/user/info',
        method: 'get',
        params:{
            username: username
        }
    })
}

// export function login(username, password) {
//     return request({
//         url: '/user/login',
//         method: 'post',
//         data: {
//             username,
//             password
//         }
//     })
// }
