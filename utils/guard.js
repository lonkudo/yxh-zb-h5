/**
 * 放在一些功能前面，如果没有登录就跳转登录页
 * 写法 if(this.guard()) return
 */

export default function () {
	if (this.isEmpty(this.token)) {
		uni.navigateTo({
			url: '/pages/login/login',
		})
	}
}
