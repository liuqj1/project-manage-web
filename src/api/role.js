import request from "@/utils/request";

export function addUserRole(params) {
    return request({
        url: '/role-api/add-role',
        method: 'get',
        params:params
    })
}

// 调用方法 两个都是
// addUserRole({roleid:row.xxxx,pid:row.xxxx})

export function deleteUserRole(params) {
    return request({
        url: '/role-api/delete-role',
        method: 'get',
        params:params
    })
}

export function checkUserRole(params) {
    return request({
        url: '/role-api/check-role',
        method: 'get',
        params:params
    })
}

export function dataBackup() {
    return request({
        url: '/system-api/manual-backup',
        method: 'get',
        responseType: 'blob' // 设置响应类型为 Blob
    })
}

export function checkBackup(){
    return request({
        url: '/system-api/check-backup',
        method: 'get',
    })
}
export function changeBackup(){
    return request({
        url: '/system-api/change-backup',
        method: 'get',
    })
}