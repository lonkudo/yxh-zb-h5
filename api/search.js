import Request from '@/utils/request'

const request = new Request().http

//  获取主播
export function getHostList(num, keyword, uid) {
	return request({
		url: '?Seek.GetUsers',
		method: 'POST',
		data: { service: 'Seek.GetUsers', p: 1, num, keyword, uid },
	})
}
//  获取直播
export function getStudioList(num, keyword) {
	return request({
		url: '?Seek.GetLives',
		method: 'POST',
		data: { service: 'Seek.GetLives', p: 1, num, keyword },
	})
}
//  获取视频
export function getVideoList(num, keyword) {
	return request({
		url: '?Seek.GetVideos',
		method: 'POST',
		data: { service: 'Seek.GetVideos', p: 1, num, keyword },
	})
}
//  获取新闻
export function getNewsList(num, keyword) {
	return request({
		url: '?Seek.GetNews',
		method: 'POST',
		data: { service: 'Seek.GetNews', p: 1, num, keyword },
	})
}
//  赛程
export function getScheduleList(p, num, keyword) {
	return request({
		url: '?Seek.GetSchedule',
		method: 'POST',
		data: { service: 'Seek.GetSchedule', p, num, keyword },
	})
}

// 推荐
export function getRecommand(p, uid) {
	return request({
		url: '?Seek.GetSearch',
		method: 'POST',
		data: { service: 'Seek.GetSearch', p, uid },
	})
}

// 换一组用户
export function changeUser(p, uid) {
	return request({
		url: '?Seek.ChangUser',
		method: 'POST',
		data: { service: 'Seek.ChangUser', p, uid },
	})
}

// 换一组新闻
export function changeNews(p) {
	return request({
		url: '?Seek.ChangNews',
		method: 'POST',
		data: { service: 'Seek.ChangNews', p },
	})
}
