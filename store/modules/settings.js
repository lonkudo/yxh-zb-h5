import defaultSettings from '@/settings'
import { site } from '@/api/common'

const { lan } = defaultSettings

const state = {
	lan: lan,
	siteInfo: null,
	// socket连接状态
	isSuccessConnect: false,
}

const mutations = {
	CHANGE_SETTING: (state, { key, value }) => {
		if (state.hasOwnProperty(key)) {
			state[key] = value
		}
	},
	SET_SITEINFO: (state, siteInfo) => {
		state.siteInfo = siteInfo
	},
	SET_ISSUCCESSCONNECT: (state, isSuccessConnect) => {
		state.isSuccessConnect = isSuccessConnect
	},
}

const actions = {
	changeSetting({ commit }, data) {
		commit('CHANGE_SETTING', data)
	},
	GetSiteInfo({ commit }) {
		return new Promise((resolve, reject) => {
			site()
				.then((res) => {
					commit('SET_SITEINFO', res.info)
					// commit('SET_ISSUCCESSCONNECT', true)
					resolve(res.info)
				})
				.catch((err) => {
					// console.log(err);
					reject(err)
				})
		})
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
