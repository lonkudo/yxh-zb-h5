import Request from '@/utils/request'

const request = new Request()
// 赛程接口文件

// 赛程预约
export function scheduleAppoint(uid, game_id, token) {
    return request({
        url: '?service=Schedule.AddAppointment',
        method: 'POST',
        data: { uid, game_id, token },
    })
}

// 展示主播已经预约的比赛
export function scheduleAppointedlist(uid, p, num) {
    return request({
        url: '?service=Schedule.LiveApplist',
        method: 'POST',
        data: { uid, p, num },
    })
}

// 展示最近可预约的比赛
export function scheduleRecentAppointlist(uid, p) {
    return request({
        url: '?service=Schedule.RecentApplist',
        method: 'POST',
        data: { uid, p },
    })
}

/**
 * 展示最近可预约的比赛
 * @param {*} uid 
 * @param {*} match_id 比赛的id
 * @param {*} token 
 * @returns 
 */
export function liveAppointmentSchedule(uid, match_id, token) {
    return request({
        url: '?service=Schedule.Liveappointment',
        method: 'POST',
        data: { uid, match_id, token },
    })
}

