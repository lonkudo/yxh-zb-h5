import Request from '@/utils/request'

const request = new Request()
//  获取首页轮播图
export function getBanner() {
	return request.http({
		url: '?service=Front.GetBanner',
		method: 'GET',
	})
}

//  获取直播推荐列表
export function getRecommendLiveList() {
	return request({
		url: '?Front.GetRecommendLiveList',
		method: 'POST',
		data: {
			service: 'Front.GetRecommendLiveList',
		},
	})
}

//  获取直播推荐列表
export function getHomeIndex(p, num, uid, token) {
	return request({
		url: '?service=Front.Index',
		method: 'POST',
		data: {
			p,
			num,
			uid,
			token,
		},
	})
}

/**
 * 首页推荐
 * @returns
 */
export function getRecommendImgList() {
	return request({
		url: '?service=Front.GetIndexAd',
		method: 'GET',
	})
}

//  获取直播列表
export function getLiveList(p, lan) {
	return request({
		url: '?service=Front.GetLiveList',
		method: 'POST',
		data: { p: p, lan: lan },
	})
}

//  获取赛程信息
export function getScheduleList(p, num, uid) {
	return request({
		url: '?service=Front.GetSchedulelist',
		method: 'POST',
		data: {
			p,
			num,
			uid,
		},
	})
}

//  获取新闻列表
export function getNewsList(p, lan) {
	return request({
		url: '?service=Front.GetNewsList',
		method: 'POST',
		data: { p: p, lan: lan },
	})
}

// 获取主播信息
export function getAnchorList() {
	return request({
		url: '?service=live.publicAnchor',
		method: 'GET',
	})
}
