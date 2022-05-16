export default class Request {
	http(params){
		// 用来初始化一个请求处理的对象
		// 首先把数据取出来
		let url = params.url,
				method = params.method,
				header = {
					'Content-Type': 'application/x-www-form-urlencoded'
				} // 默认开启这种模式，这个取决于服务器
				data = params.data || {}, // 这个项目里面，token和uid放在data里面一起携带过去
				hideLoading = params.hideLoading || false // 默认打开接收请求的时候的loading
	} 
}