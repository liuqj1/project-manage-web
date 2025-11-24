import request from '@/utils/request'

export function getMyTeam(params){
    return request({
        url: '/team-api/get-myTeam',
        method: 'get',
        params: params
    })
}


export function getMyChargedTeam(params){
    return request({
        url: '/team-api/get-myChargedTeam',
        method: 'get',
        params: params
    })
}

export function addMyChargedTeam(data){
    return request({
        url: '/team-api/add-myChargedTeam',
        method: 'post',
        data
    })
}

export function updateTeam(data){
    return request({
        url: '/team-api/update-team',
        method: 'post',
        data
    })
}
