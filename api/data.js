import Request from '@/utils/request'

const request = new Request()

/**
 *
 * @param {赛事id} competition_id
 * @returns
 */
export function getLeagueSeasonTime(competition_id) {
	return request({
		url: '?service=Data.GetSeasonTime',
		method: 'POST',
		data: { competition_id },
	})
}

//  数据首页
export function getDataIndex(query) {
	return request({
		url: '?service=Data.Index',
		method: 'POST',
		data: query,
	})
}

//  数据首页分类
export function getDataCategory(classid) {
	return request({
		url: '?service=Data.Category',
		method: 'POST',
		data: { classid },
	})
}

//  FIFA联合排名-国家
export function getFifaRankCountry(order) {
	return request({
		url: '?service=Data.RankingCountry',
		method: 'POST',
		data: order,
	})
}

//  FIFA联合排名-俱乐部
export function getFifaRankClub(order) {
	return request({
		url: '?service=Data.RankingClub',
		method: 'POST',
		data: order,
	})
}

/**
 *
 * 联赛排名-积分榜
 * @param {赛事id} competition_id
 * @param {赛季id} season_id
 * @returns
 */
export function getLeagueRankPoint(competition_id, season_id) {
	return request({
		url: '?service=Data.GetCompetitionPoints',
		method: 'POST',
		data: { competition_id, season_id },
	})
}

/**
 *
 * 联赛排名-球队榜
 * @param {p页数} p
 * @param {num 分页条数 20} num
 * @param {赛事id} competition_id
 * @param {赛季id} season_id
 * @param {类型:1:进球,2:失球,3:点球,4:射门,5:射正,6:关键传球,7:拦截,8:封堵,9:解围,10:黄牌,11:红牌} type
 * @returns
 */
export function getLeagueRankTeamTheTable(
	p,
	num,
	competition_id,
	season_id,
	type
) {
	return request({
		url: '?service=Data.TeamRanking',
		method: 'POST',
		data: { p, num, competition_id, season_id, type },
	})
}

/**
 *
 * 联赛排名-射手榜
 * @param {p页数} p
 * @param {num 分页条数 20} num
 * @param {赛事id} competition_id
 * @param {赛季id} season_id
 * @param {类型:1:进球,2:失球,3:点球,4:射门,5:射正,6:关键传球,7:拦截,8:封堵,9:解围,10:黄牌,11:红牌} type
 * @returns
 */
export function getLeagueRankTopScorer(
	p,
	num,
	competition_id,
	season_id,
	type
) {
	return request({
		url: '?service=Data.PlayerRanking',
		method: 'POST',
		data: { p, num, competition_id, season_id, type },
	})
}

// 球队资料
export function getTeamData(data) {
	return request({
		url: '?service=Data.LeagueRank',
		method: 'POST',
		data,
	})
}

// 球队资料
export function getTeamDataList(data) {
	return request({
		url: '?service=Data.LeagueRank',
		method: 'POST',
		data,
	})
}

// 球队资料-动态
export function getTeamDetailDynamic(data) {
	return request({
		url: '?service=Data.LeagueRank',
		method: 'POST',
		data,
	})
}

// 球队资料-基本信息
export function getTeamDetailBasicInfo(team_id) {
	return request({
		url: '?service=Data.TeamInfo',
		method: 'POST',
		data: { team_id },
	})
}

// 球队资料-联赛排名
/**
 * 
 * @param {required} competition_id  	赛事id
 * @param {required} team_id 队伍id
 * @returns 
 */
export function getTeamLeagueRank(competition_id, team_id) {
	return request({
		url: '?service=Data.TeamCompetitionRank',
		method: 'POST',
		data: { competition_id, team_id },
	})
}

// 球队资料-球员列表
export function getTeamDetailPlayerList(team_id) {
	return request({
		url: '?service=Data.TeamPlayer',
		method: 'POST',
		data: { team_id },
	})
}

/**
 *
 * @param {	队伍id required} team_id
 * @param { 联赛id required} competition_id
 * @param {	赛季id } season_id
 * @returns
 */
// 球队资料-球队赛程
export function getTeamDetailSchedule(team_id, competition_id, season_id) {
	return request({
		url: '?service=Data.TeamSchedule',
		method: 'POST',
		data: { team_id, competition_id, season_id },
	})
}

// 球队资料-球员转会
export function getTeamDetailTransfer(team_id, timestamp) {
	return request({
		url: '?service=Data.TeamPlayerTransfer',
		method: 'POST',
		data: { team_id, timestamp },
	})
}

// 球员-基本信息
export function getPlayerInfo(player_id) {
	return request({
		url: '?service=Data.PlayerInfo',
		method: 'POST',
		data: { player_id },
	})
}

/**
 * @description 球员联赛数据
 * @param {球员id required} player_id
 * @param {赛事id} competition_id
 * @returns Promise
 */
export function getPlayerLeagueData(player_id, competition_id) {
	return request({
		url: '?service=Data.PlayerDataCompetition',
		method: 'POST',
		data: { player_id, competition_id },
	})
}

/**
 * @description 球员-队友
 * @param {球员id required} player_id
 * @returns Promise
 */
export function getPlayerTeamMate(player_id) {
	return request({
		url: '?service=Data.TeamMate',
		method: 'POST',
		data: { player_id },
	})
}

/**
 * @description 数据-动态（球员，球队，赛事，国家）
 * @param {赛事id,动态类型为1时传递} competition_id
 * @param {球队id,动态类型为2时传递} team_id
 * @param {球员id,动态类型为3时传递} player_id
 * @param {国家id,动态类型为4时传递} country_id
 * @param {动态类型 1：赛事动态；2球队动态；3球员动态；4国家动态} type
 * @param {*} p
 * @param {*} num
 * @returns
 */
export function getDynamic(data) {
	return request({
		url: '?service=Data.Dynamic',
		method: 'POST',
		data: data,
	})
}

/**
 * @description 联赛数据
 * @param {赛事id,动态类型为1时传递} competition_id
 * @param {赛季id,动态类型为1时传递} season_id
 * @param {动态类型 1：赛事动态；2球队动态；3球员动态；4国家动态} type
 * @returns
 */
export function getCompetitions(data) {
	return request({
		url: '?service=Data.GetCompetition',
		method: 'POST',
		data: data,
	})
}
/*
 *
 * @param {*} team_id 队伍id：国家id
 * @param {*} year 年份（默认本年）
 * @returns
 */
export function getCountrySchedule(team_id, year) {
	return request({
		url: '?service=Data.CountryCompe',
		method: 'POST',
		data: { team_id, year },
	})
}

/**
 *
 * @param {*} team_id 队伍id：国家id
 * @returns
 */
export function getCountryDetail(team_id) {
	return request({
		url: '?service=Data.CountryDetail',
		method: 'POST',
		data: { team_id },
	})
}

/**
 * @description 国家队资料
 * @param {*} team_id  队伍id：国家id
 * @returns
 */
export function getCountryInfo(team_id) {
	return request({
		url: '?service=Data.CountryInfo',
		method: 'POST',
		data: { team_id },
	})
}

/**
 * @description 国家队球员
 * @param {*} team_id  队伍id：国家id
 * @returns
 */
export function getCountryPlayer(team_id) {
	return request({
		url: '?service=Data.CountryPlayer',
		method: 'POST',
		data: { team_id },
	})
}
