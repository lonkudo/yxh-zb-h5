import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import search from './modules/search'
import settings from './modules/settings'
import history from './modules/history'
import data from './modules/data'
import snippet from './modules/snippet'
import filter from './modules/filter'
import live from './modules/live'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		user,
		search,
		settings,
		history,
		data,
		snippet,
		filter,
		live,
	},
	getters,
})

export default store
