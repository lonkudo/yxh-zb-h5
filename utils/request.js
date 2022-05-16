import settings from '@/settings'

export default class Request {
	http(params) {
		// 用来初始化一个请求处理的对象
		// 首先把数据取出来
		let url = params.url,
			method = params.method,
			header = {
				'Content-Type': 'application/x-www-form-urlencoded',
			} // 默认开启这种模式，这个取决于服务器
		;
		// (data = params.data || {}), // 这个项目里面，token和uid放在data里面一起携带过去
		// 	(hideLoading = params.hideLoading || false) // 默认打开接收请求的时候的loading
		let data = params.data || {}
		let hideLoading = params.hideLoading || false
		let requestUrl = settings.api + url

		if (method) {
			method = method.toUpperCase()
			if (method == 'POST') {
				header = {
					'content-type': 'application/x-www-form-urlencoded',
				}
			} else {
				header = {
					'content-type': 'application/json',
				}
			}
		}

		if (!hideLoading) {
			uni.showLoading({
				title: 'Loading...',
			})
		}

		// 返回promise
		return new Promise((resolve, reject) => {
			// 请求
			uni.request({
				url: requestUrl,
				data: data,
				method: method,
				header: header,
				success: (res) => {
					// 判断 请求api 格式是否正确
					if (res.statusCode && res.statusCode != 200) {
						uni.showToast({
							title: 'api error' + res.errMsg,
							icon: 'none',
						})
						return
					}
					// 将结果抛出
					resolve(res.data.data)
				},
				//请求失败
				fail: (e) => {
					uni.showToast({
						title: '' + e.data.msg,
						icon: 'none',
					})
					resolve(e.data)
				},
				//请求完成
				complete() {
					//隐藏加载
					if (!hideLoading) {
						uni.hideLoading()
					}
					resolve()
					return
				},
			})
		})
	}
}
