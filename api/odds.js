import Request from '@/utils/request'

const request = new Request().http

export function getOdds(match_id) {
	return request({
		url: '?service=Odds.GetOdds',
		method: 'POST',
		data: { match_id },
	})
}
export function getOddsHistory(data) {
	return request({
		url: '?service=Odds.GetOddsHistory',
		method: 'POST',
		data: data,
	})
}
