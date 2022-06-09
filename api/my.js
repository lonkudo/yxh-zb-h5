import Request from '@/utils/request'

const request = new Request().http
import user from '@/store/modules/user'

//  获取关注列表
export function getFollowList(uid, touid, p, num) {
	return request({
		url: '?service=User.GetFollowsList',
		method: 'POST',
		data: {
			uid,
			touid,
			p,
			num,
		},
	})
}

// 获取粉丝列表
export function getFansList(uid, touid, p) {
	return request({
		url: '?service=User.GetFansList',
		method: 'POST',
		data: {
			uid,
			touid,
			p,
		},
	})
}

//  (取消)关注用户
export function attent(uid, token, touid) {
	return request({
		url: '?service=Live.SetAttent',
		method: 'POST',
		data: {
			uid,
			token,
			touid,
		},
	})
}

// 获取收藏列表
export function getMyCollection(uid, p, token, type, num) {
	return request({
		url: '?service=User.MyCollection',
		method: 'POST',
		data: {
			uid,
			p,
			token,
			type,
			num,
		},
	})
}

// 删除收藏视频或者新闻
export function delMyCollection(uid, token, mediaid, type) {
	return request({
		url: '?service=User.MyCollectionDel',
		method: 'POST',
		data: {
			uid,
			token,
			mediaid,
			type,
		},
	})
}

// 获取个人信息
export function getUserInfo(uid, token) {
	return request({
		url: '?service=User.GetUserInfo',
		method: 'POST',
		data: {
			service: 'User.GetUserInfo',
			uid,
			token,
		},
	})
}

// 获取订阅列表
export function getAppointmentList(data) {
	return request({
		url: '?service=Match.AppointmentList',
		method: 'POST',
		data,
	})
}

// 获取任务列表
export function getTaskList(uid, token, p) {
	return request({
		url: '?service=Sign.GetTaskList',
		method: 'POST',
		data: {
			uid,
			token,
			p,
		},
	})
}

// 签到任务提交
export function signTask(uid, day, token) {
	return request({
		url: '?service=Sign.Sign',
		method: 'POST',
		data: {
			uid,
			day,
			token,
		},
	})
}

//  直播或日常任务提交
export function liveOrDailyTask(uid, type, task_id) {
	return request({
		url: '?service=Sign.TaskFinish',
		method: 'POST',
		data: {
			uid,
			type,
			task_id,
		},
	})
}

// 申请主播
export function applyLive(uid, token, positive, back, hold, name, number) {
	return request({
		url: '?service=User.ApplyLive',
		method: 'POST',
		data: {
			uid,
			token,
			positive,
			back,
			hold,
			name,
			number,
		},
	})
}

// 发送私聊消息
export function chat(uid, token, lan, to_uid, content) {
	return request({
		url: '?service=User.PrivateChat',
		method: 'POST',
		data: {
			uid,
			token,
			lan,
			to_uid,
			content,
		},
	})
}

// 获取私信列表
export function getChatList(uid, token) {
	return request({
		url: '?service=User.PrivateChatlist',
		method: 'POST',
		data: {
			uid,
			token,
		},
	})
}

// 私信详情
export function chatDetail(uid, token, to_uid) {
	return request({
		url: '?service=User.SeePrivateChat',
		method: 'POST',
		data: {
			uid,
			token,
			to_uid,
		},
	})
}

// 等级
export function getUserLevel(uid, token) {
	return request({
		url: '?service=User.MyLevel',
		method: 'POST',
		data: {
			uid,
			token,
		},
	})
}

// 检测拉黑状态
export function checkBlack(uid, touid) {
	return request({
		url: '?service=Live.CheckBlack',
		method: 'POST',
		data: {
			uid,
			touid,
		},
	})
}

// 获取用户私信
export function getMessages(obj) {
	return request({
		url: '?service=User.Message',
		method: 'POST',
		data: obj,
	})
}

// 获取用户主播申请状态
export function checkIsAnchor(uid, token) {
	return request({
		url: '?service=User.CheckIsLive',
		method: 'POST',
		data: {
			uid,
			token,
		},
	})
}

// 获取用户主播申请状态
export function readMsg(data) {
	return request({
		url: '?service=User.ChangeMessagestatus',
		method: 'POST',
		data: data,
	})
}

// 获取推荐用户
export function RecUsers(data) {
	return request({
		url: '?service=Seek.ChangUser',
		method: 'POST',
		data: data,
	})
}

/**
 *
 * @param {*} data
 * @param {	用户ID} uid
 * @param {	} p
 * @param {	} num
 * @param {筛选开始时间 (格式：时间戳)} start_time
 * @param {筛选结束时间(格式：时间戳)} end_time
 * @returns
 */
export function getEarningList(data) {
	return request({
		url: '?service=User.MyProfit',
		method: 'POST',
		data: data,
	})
}

/**
 *
 * @param {*} data
 * @param {*} uid
 * @param {*} token
 * @param {*} token
 * @param {*新手机号} mobile
 * @param {*验证码} code
 * @returns
 */
export function changeMobile(data) {
	return request({
		url: '?service=User.ChangeMobile',
		method: 'POST',
		data: data,
	})
}

// 获取我举报别人的列表
export function myReport(data) {
	return request({
		url: '?service=Report.MyReport',
		method: 'POST',
		data: data,
	})
}

// 获取我举报别人的列表
export function wasReported(data) {
	return request({
		url: '?service=Report.Reported',
		method: 'POST',
		data: data,
	})
}

// 获取反馈列表
export function getFeedback(data) {
	return request({
		url: '?service=User.FeedbackList',
		method: 'POST',
		data: data,
	})
}

// 提交反馈
export function sendFeedback(data) {
	return request({
		url: '?service=User.SetFeedback',
		method: 'POST',
		data: data,
	})
}

// 获取修改手机验证码
export function getMobileCode(data) {
	return request({
		url: '?service=User.GetChangeMobileCode',
		method: 'POST',
		data: data,
	})
}

// 修改个人信息
export function updateInfo(data) {
	return request({
		url: '?service=User.UpdateFields',
		method: 'POST',
		data: data,
	})
}

// 查询直播记录
export function liveRecord(data) {
	return request({
		url: '?service=User.LiveRecord',
		method: 'POST',
		data: data,
	})
}

// 金币日志
export function goldLog(data) {
	return request({
		url: '?service=User.GoldLog',
		method: 'POST',
		data: data,
	})
}
