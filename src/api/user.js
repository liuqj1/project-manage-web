import request from "@/utils/request";

export function fetchUserData(){
    return request({
        url: '/user/get-user-data',
        method: "GET",
    })
}

export function addUser(data){
    return request({
        url: '/user/add-user',
        method: "POST",
        data: data
    })
}

export function resetPassword(params){
    return request({
        url: '/user/reset-user-password',
        method: "get",
        params: params
    })
}

export function deleteUser(params){
    return request({
        url: '/user/delete-user',
        method: "get",
        params: params
    })
}

export function getMyInfo(params){
    return request({
        url: '/user/get-myInfo',
        method: "get",
        params: params
    })
}

export function updateMyInfo(data){
    return request({
        url: '/user/update-myInfo',
        method: "post",
        data: data
    })
}