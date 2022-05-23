/**
 * 放在一些功能前面，如果没有登录就跳转登录页
 *
 */

export default function () {
	console.log('---3----3----3----3----3---', this.isEmpty(this.token))
	if (this.isEmpty(this.token)) {
		uni.navigateTo({
			url: '/pages/login/login',
		})
	}
}
