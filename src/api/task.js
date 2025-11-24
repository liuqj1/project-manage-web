import request from "@/utils/request";

export function getProjectTask(params) {
    return request({
        url: '/task-api/get-project-task',
        method: 'get',
        params: params
    })
}

export function assignTask(params){
    return request({
        url: '/task-api/assign-task',
        method: 'get',
        params: params
    })
}

export function getProjectUser(params){
    return request({
        url: '/user/get-project-user',
        method: 'get',
        params: params
    })
}

export function addTask(data){
    return request({
        url: '/task-api/add-task',
        method: 'post',
        data:data
    })
}

export function getMyProjectTask(params){
    return request({
        url: '/task-api/get-myProject-task',
        method: 'get',
        params: params
    })
}