import Request from '@/utils/request'

const request = new Request()
import user from '@/store/modules/user'

//  获取关注列表
export function site() {
	return request({
		url: '?service=Common.Site',
		method: 'GET',
	})
}

//  获取关注列表
export function getMessageCount(uid) {
	return request({
		url: '?service=User.GetMessagecount',
		method: 'GET',
		params: {
			uid,
		},
	})
}
