import { userLogin, userCodeLogin, logout } from '@/api/login'
import { getUserInfo, getUserLevel } from '@/api/my'

const user = {
	state: {
		token: uni.getStorage({ key: 'token' }),
		uid: uni.getStorage({ key: 'uid' }),
		userinfo: JSON.parse(JSON.stringify(uni.getStorage({ key: 'userinfo' }))),
		levelexp: parseInt(uni.getStorage({ key: 'levelexp' })),
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_UID: (state, uid) => {
			state.uid = uid
		},
		SET_USERINFO: (state, userinfo) => {
			state.userinfo = userinfo
		},
		SET_LEVELEXP: (state, exp) => {
			state.levelexp = exp
		},
	},

	actions: {
		// 登录
		Login({ commit }, userInfo) {
			const user_login = userInfo.user_login.trim()
			const user_pass = userInfo.user_pass
			const loginType = userInfo.loginType
			return new Promise((resolve, reject) => {
				if (loginType === 'pwd') {
					userLogin(user_login, user_pass)
						.then((res) => {
							if (res.code === 0) {
								const info = res.info
								commit('SET_TOKEN', info.token)
								commit('SET_UID', info.id)
								uni.setStorage({ key: 'token', data: 'info.token' })
								uni.setStorage({ key: 'uid', data: 'info.id' })
								// commit('NEW')
							}
							resolve(res)
						})
						.catch((error) => {
							reject(error)
						})
				} else {
					userCodeLogin(user_login, user_pass)
						.then((res) => {
							if (res.code === 0) {
								const info = res.info
								commit('SET_TOKEN', info.token)
								commit('SET_UID', info.id)
								uni.setStorage({ key: 'token', data: 'info.token' })
								uni.setStorage({ key: 'uid', data: 'info.id' })
								commit('NEW')
							}
							resolve(res)
						})
						.catch((error) => {
							reject(error)
						})
				}
			})
		},
		// 获取用户信息
		GetInfo({ commit }, user) {
			return new Promise((resolve, reject) => {
				getUserInfo(user.uid, user.token)
					.then((res) => {
						const info = res.info
						commit('SET_USERINFO', info) // 在vuex设置info
						// 在本地存储设置info
						window.localStorage.setItem('userInfo', JSON.stringify(info))
						resolve(res)
					})
					.catch((error) => {
						reject(error)
					})
			})
		},

		/* 获取用户等级 */
		GetUserLevel({ commit }, user) {
			console.log('run')
			getUserLevel(user.uid, user.token).then((res) => {
				// console.log('avatar')
				// console.log(res);
				const info = res.info
				let level = info.level
				let rules = info.rule
				const le = rules.find((item) => {
					return item.levelid === level.levelid
				})
				let percentage = Math.floor((level.level_experience / le.level_up) * 100)
				commit('SET_LEVELEXP', percentage)
				uni.setStorage({ key: 'levelexp', percentage })
				// console.log(this.percentage);
			})
		},
		// 退出系统
		LogOut({ commit }, state) {
			return new Promise((resolve, reject) => {
				logout(state.token, state.uid)
					.then((res) => {
						commit('SET_TOKEN', '')
						commit('SET_UID', '')
						commit('SET_USERINFO', '') // 在vuex删除userinfo
						commit('SET_LEVELEXP', 0) // 在vuex删除userinfo
						uni.removeStorage({ key: 'uid' })
						uni.removeStorage({ key: 'token' })
						uni.removeStorage({ key: 'userInfo' }) // 在本地删除userInfo
						uni.removeStorage({ key: 'levelexp' })
						// location.reload();
						resolve(res)
					})
					.catch((error) => {
						reject(error)
					})
			})
		},

		// 前端 登出
		FedLogOut({ commit }) {
			console.log('FedLogOut')
			return new Promise((resolve) => {
				commit('SET_TOKEN', '')
				commit('SET_UID', '')
				commit('SET_USERINFO', '') // 在vuex删除userinfo
				commit('SET_LEVELEXP', 0) // 在vuex删除userinfo
				uni.removeStorage({ key: 'uid' })
				uni.removeStorage({ key: 'token' })
				uni.removeStorage({ key: 'userInfo' })
				uni.removeStorage({ key: 'levelexp' })
				// location.reload();
				resolve()
			})
		},
	},
}

export default user
