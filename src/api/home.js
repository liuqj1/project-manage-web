import request from "@/utils/request";

// // 获取昨日黄金数据
// export function fetchLastGoldData(){
//     return request({
//         url: '/home-api/last-gold-data',
//         method: "GET",
//     })
// }
//
//
// //近7日黄金价格预测
// export function fetchWeekForecastPrice(){
//     return request({
//         url: '/home-api/weekPred-price',
//         method: "GET",
//     })
// }
//
// //近7日黄金价格实际
// export function fetchWeekActualPrice(){
//     return request({
//         url: '/home-api/weekAct-price',
//         method: "GET",
//     })
// }

export function fetchAchievementAndCount(){
    return request({
        url: '/achievement-api/get-all-achievement',
        method: 'get',
    })
}

export function fetchAchievementAndQuality(){
    return request({
        url: '/achievement-api/get-quality-count',
        method: 'get',
    })
}


//参与的
export function fetchPeopleProjectNum(){
    return request({
        url: '/user/get-people-projectNum',
        method: 'get',
    })
}
export function fetchPeopleChargeProjectNum(){
    return request({
        url: '/user/get-peopleCharge-projectNum',
        method: 'get',
    })
}

export function fetchUserCount(){
    return request({
        url: '/user/get-userCount',
        method: 'get',
    })
}

export function fetchAchievementWithStatus(){
    return request({
        url: '/project-api/get-achievement-with-status',
        method: 'get',
    })
}

export function fetchProjectWithStatus(){
    return request({
        url: '/project-api/get-project-with-status',
        method: 'get',
    })
}

export function fetchExpendOverview(){
    return request({
        url: '/expend-api/get-expend-overview',
        method: 'get',
    })
}