import request from '@/utils/request'
import {getMyUnverifiedProjects} from "@/api/project";


export function getMyProjectExpend(params) {
    return request({
        url: '/expend-api/get-myProject-expend',
        method: 'get',
        params: params
    })
}

export function submitReimbursement(data){
    return request({
        url: '/expend-api/submit-reimbursement',
        method: 'post',
        data: data
    })
}

export function getMyUnverifiedExpend(params){
    return request({
        url: '/expend-api/get-myUnverified-expend',
        method: 'get',
        params: params
    })
}

export function verifyExpend(data){
    return request({
        url: '/expend-api/verify-expend',
        method: 'post',
        data: data
    })
}

export function searchExpend(data){
    return request({
        url: '/expend-api/search',
        method: 'post',
        data: data
    })
}
