import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import search from './modules/search'
import settings from './modules/settings'
import history from './modules/history'
import data from './modules/data'
import snippet from './modules/snippet' // 用户快捷语
import filter from './modules/filter' // 比分模块过滤赛事
import flag from './modules/flag' // 有一些地方需要全局的flag
import task from './modules/task' // 个人中心的任务模块

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
		flag,
		task,
	},
	getters,
})

export default store
