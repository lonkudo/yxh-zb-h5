import defaultSettings from '@/settings'
import { site } from '@/api/common'

const { lan } = defaultSettings

const state = {
	lan: lan,
	siteInfo: null,
	battleLikeFlag: false,
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
	SET_BATTLE_LIKE_FLAG: (state) => {
		state.battleLikeFlag = !state.battleLikeFlag
	},
}

const actions = {
	changeSetting({ commit }, data) {
		commit('CHANGE_SETTING', data)
	},
	GetSiteInfo({ commit }) {
		console.log('getSiteinfo')
		return new Promise((resolve, reject) => {
			site()
				.then((res) => {
					commit('SET_SITEINFO', res.info)
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
