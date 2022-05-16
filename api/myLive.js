import Request from '@/utils/request'

const request = new Request()

//  创建直播
export function createLive(info) {
	return request({
		url: '?service=Live.CreateLive',
		method: 'POST',
		data: info,
	})
}

//  获取赛程
export function liveSchedule(p, num, uid) {
	return request({
		url: '?service=Live.GetScheduleList',
		method: 'POST',
		data: { p, num, uid },
	})
}

//  获取域名
export function getSite() {
	return request({
		url: '?service=Common.Site',
		method: 'GET',
	})
}
