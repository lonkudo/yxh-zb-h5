import Request from '@/utils/request'

const request = new Request()
import user from '@/store/modules/user'

//  获取新闻分类
export function getClassNews() {
	return request({
		url: '?service=Discover.GetClass',
		method: 'POST',
		data: { videoclassid: 2 },
	})
}

//  获取新闻列表
export function getNewsList(uid, p, num, classid) {
	return request({
		url: '?service=Discover.GetNewsList',
		method: 'POST',
		data: {
			uid,
			p,
			num,
			classid,
		},
	})
}

//  获取热门新闻列表
export function getHotNewsList(uid, p, num, classid) {
	return request({
		url: '?service=Discover.GetHotNewsList',
		method: 'POST',
		data: {
			uid,
			p,
			num,
			classid,
		},
	})
}

//  获取新闻详情
export function getNewsDetails(id, uid) {
	return request({
		url: '?service=Discover.GetNewDetails',
		method: 'POST',
		data: {
			id,
			uid,
		},
	})
}

//  发表点赞
export function addCommentLike(uid, token, commentid, type) {
	return request({
		url: '?service=Video.AddCommentLike',
		method: 'POST',
		data: {
			uid,
			token,
			commentid,
			type,
		},
	})
}

// 发表评论, 评论视频，评论新闻，评论评论都是这个接口
export function commentFunc(dataObj) {
	return request({
		url: '?service=Video.SetComment',
		method: 'POST',
		data: dataObj,
	})
}

// 获取评论列表
export function getComments(uid, videoid, p, type) {
	return request({
		url: '?service=Video.GetComments',
		method: 'POST',
		data: {
			uid,
			videoid,
			p,
			type,
		},
	})
}

// 获取回复列表
export function getReplys(uid, parentid, p, type) {
	return request({
		url: '?service=Video.GetReplys',
		method: 'POST',
		data: {
			uid,
			commentid: parentid,
			p,
			type,
		},
	})
}

/* 获取视频新闻类型 */
export function getMediaReportClass() {
	// console.log(p, num);
	return request({
		url: '?service=Report.MediaReportClass',
		method: 'GET',
	})
}
