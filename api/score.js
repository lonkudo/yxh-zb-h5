import Request from '@/utils/request'

const request = new Request().http

//  订阅比赛
export function addAppointment(data) {
	return request({
		url: '?service=Schedule.AddAppointment',
		method: 'POST',
		data: data,
	})
}

// 获取比分数据
export function getScores(data) {
	let { compe_id } = data
	console.log('111111111', compe_id)
	if (compe_id !== undefined) {
		if (typeof compe_id[0] !== 'string') {
			compe_id = compe_id[0]
			Object.assign(data, { compe_id: compe_id })
		} else if (compe_id[0] === '') {
			delete data.compe_id
		}
	}
	return request({
		url: '?service=Match.Index',
		method: 'POST',
		data: data,
	})
}

// 获取推荐赛事
export function getMatchRecommand(data) {
	return request({
		url: '?service=Match.Recommend',
		method: 'POST',
		data: data,
	})
}

// 获取赛事赛选
export function getCompe(data) {
	return request({
		url: '?service=Match.GetCompe',
		method: 'POST',
		data: data,
	})
}
