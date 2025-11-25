import request from '@/utils/request'

export function getMyProjects(params) {
    return request({
        url: '/project-api/get-myProjects',
        method: 'get',
        params: params
    })
}
export function getMyInvolvedProject(params) {
    return request({
        url: '/project-api/get-myInvolvedProjects',
        method: 'get',
        params: params
    })
}

export function getMyInvolvedProjectStatus2(params) {
    return request({
        url: '/project-api/get-myInvolvedProjects-status2',
        method: 'get',
        params: params
    })
}

export function getAllProjects() {
    return request({
        url: '/project-api/get-allProjects',
        method: 'get',
    })
}



export function getMyProjectAchievement(params){
    return request({
        url: '/project-api/get-myProject-achievement',
        method: 'get',
        params: params
    })
}
export function getMyInvolvedProjectAchievement(params) {
    return request({
        url: '/project-api/get-myInvolvedProject-achievement',
        method: 'get',
        params: params
    })
}

export function updateProjectStatus(data) {
    return request({
        url: '/project-api/update-project-status',
        method: 'post',
        data: data
    })
}

export function declareProject(data){
    return request({
        url: '/project-api/declare-project',
        method: 'post',
        data: data
    })
}

export function getProjectView(params) {
    return request({
        url: '/project-api/get-project-view',
        method: 'get',
        params: params
    })
}

export function getProjectAchievement(params) {
    return request({
        url: '/project-api/get-project-achievement',
        method: 'get',
        params: params
    })
}

export function updateProjectBudget(data) {
    return request({
        url: '/project-api/update-project-budget',
        method: 'post',
        data: data
    })
}

export function addAchievement(data){
    return request({
        url: '/achievement-api/add-achievement',
        method: 'post',
        data: data
    })
}


export function getAchievementStatus0(params){
    return request({
        url: '/achievement-api/get-achievement-status0',
        method: 'get',
        params: params
    })
}

export function updateAchievementStatus(data){
    return request({
        url: '/achievement-api/update-achievement-status-q',
        method: 'post',
        params: data
    })
}

export function changeAchievementStatus(data){
    return request({
        url: '/achievement-api/change-achievement-status',
        method: 'post',
        params: data
    })
}