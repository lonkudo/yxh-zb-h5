const filter = {
	state: {
		// 放用于筛选的compe_id
		ongoing: [],
		finished: [],
		future: [],
		initOngoing: false, // 用来辅助判断是否采用vuex里面的数据
		initFinished: false,
		initFuture: false,
	},
	mutations: {
		CHANGE_FILTER: function (state, data) {
			/* 修改数组 */
			let { type, compe_id } = data
			if (type === '1') {
				state.initOngoing = true
				state.ongoing = compe_id
			} else if (type === '2') {
				state.initFinished = true
				state.finished = compe_id
			} else if (type === '3') {
				state.initFuture = true
				state.future = compe_id
			}
		},
	},
}

export default filter
