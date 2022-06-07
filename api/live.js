import Request from '@/utils/request'

const request = new Request().http
import { version } from '@/settings'

//  用于关注/取消关注主播
export function setAttent(uid, token, touid) {
	return request({
		url: '?Live.SetAttent',
		method: 'POST',
		data: { service: 'Live.SetAttent', uid, token, touid },
	})
}

//  判断是否有关注
export function checkAttent(uid, touid) {
	return request({
		url: '?Live.IsAttent',
		method: 'POST',
		data: { service: 'Live.IsAttent', uid, touid },
	})
}

// 获取直播分类
export function GetGameType() {
	return request({
		url: '?service=Live.GetGameType',
		method: 'GET',
	})
}

//  根据直播分类获取直播列表
export function getListByType(data) {
	const params = {
		...data,
		...{ version },
	}
	// console.log(params);
	return request({
		url: '?service=Live.GetLiveListByType',
		method: 'POST',
		data: params,
	})
}

//  获取直播列表
export function getLiveList(p, num) {
	// console.log(p, num);
	return request({
		url: '?service=Front.GetLiveList',
		method: 'POST',
		data: { p, num },
	})
}

// 进入直播间
export function enterLiveRoom(uid, token, liveuid, stream) {
	return request({
		url: '?service=Live.EnterRoom',
		method: 'POST',
		data: { uid, token, liveuid, stream },
	})
}

// 直播详情
export function getLiveDetail(uid, token, liveuid, stream, game_id) {
	return request({
		url: '?service=Live.liveDetail',
		method: 'POST',
		data: { uid, token, liveuid, stream, game_id },
	})
}

//  赛程预约
export function scheduleAddAppointment(uid, game_id, token) {
	return request({
		url: '?service=Live.GetGameId',
		method: 'POST',
		data: { uid, game_id, token },
	})
}

// 获取礼物列表
export function getGiftList(data) {
	return request({
		url: '?service=Live.GetGiftList',
		method: 'POST',
		data: data,
	})
}

// 用户余额
export function getCoin(uid, token) {
	return request({
		url: '?service=Live.getCoin',
		method: 'POST',
		data: { uid, token },
		hideLoading: true,
	})
}

// 排行榜
export function getRankList(stream) {
	return request({
		url: '?service=Live.getRankList',
		method: 'POST',
		data: { stream },
		hideLoading: true,
	})
}

// 排行榜
export function anchorSchedule(stream, liveuid) {
	return request({
		url: '?service=Live.AnchorSchedule',
		method: 'POST',
		data: { stream, liveuid },
	})
}

// 排行榜
export function sendGift(data) {
	return request({
		url: '?service=Live.SendGift',
		method: 'POST',
		data: data,
		hideLoading: true,
	})
}

// 观看视频获取金币
export function getViewCoin(data) {
	return request({
		url: '?service=Live.SendGift',
		method: 'POST',
		data: data,
	})
}

/* 获取举报类型 */
export function getReportClass() {
	// console.log(p, num);
	return request({
		url: '?service=Live.GetReportClass',
		method: 'GET',
	})
}

/* 举报 */
export function setReport(data) {
	return request({
		url: '?service=Live.SetReport',
		method: 'POST',
		data: data,
	})
}

/* 获取阵容 */
export function teamFormation(data) {
	return request({
		url: '?service=Data.MatchLineup',
		method: 'POST',
		data: data,
	})
}

/**
 *
 * @param {*} game_id 比赛id
 * @returns
 */
export function getIntelligence(game_id) {
	return request({
		url: '?service=Live.GetIntelligence',
		method: 'POST',
		data: { game_id },
	})
}

/* 切换直播间 */
export function changeRoom(data) {
	return request({
		url: '?service=Live.ChangeRoom',
		method: 'POST',
		data: data,
	})
}

/* 主队客队交战历史（就他们两个队） */
export function getBattleHistoryOfThem(data) {
	return request({
		url: '?service=Live.GetGameRecorde',
		method: 'POST',
		data: data,
	})
}

/* 对战历史获取 */
export function getBattleHistory(data) {
	return request({
		url: '?service=Live.GetRecordHA',
		method: 'POST',
		data: data,
	})
}

/* 积分情况 */
export function getPointsRecord(data) {
	return request({
		url: '?service=Live.GetPointRecorde',
		method: 'POST',
		data: data,
	})
}

/* 未来比赛情况 */
export function getFutureGames(data) {
	return request({
		url: '?service=Live.GetFutureGame',
		method: 'POST',
		data: data,
	})
}

/* 关闭直播间 */
export function closeLive(data) {
	return request({
		url: '?service=Live.StopRoom',
		method: 'POST',
		data: data,
	})
}

/* 比赛天气情况 */
export function getWeather(data) {
	return request({
		url: '?service=Live.GetEnvironment',
		method: 'POST',
		data: data,
	})
}

/**
 * 获取广告
 * @returns
 */
export function getAdvert() {
	return request({
		url: '?service=Live.GetAdvert',
		method: 'POST',
	})
}

/**
 * 比赛统计数据
 * @param {*} game_id
 * @returns
 */
export function getMatchData(game_id) {
	return request({
		url: '?service=Live.GetMatchData',
		method: 'POST',
		data: { game_id },
	})
}
