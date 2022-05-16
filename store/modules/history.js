function isSameDay(t) {
	// console.log('sameDay?', new Date(t).toDateString(), new Date().toDateString())
	return new Date(t).toDateString() === new Date().toDateString()
}

function getArts() {
	let his = JSON.parse(window.localStorage.getItem('history') || '{}')
	console.log('hasOwn', his.hasOwnProperty('time'), isSameDay(his.time))
	if (!his.hasOwnProperty('time') || !isSameDay(his.time)) {
		// 没有数据，或者数据日期变更。创建新数据。
		his['time'] = new Date()
		his['content'] = []
		uni.setStorage({ key: 'history', data: JSON.stringify(his) })
		// console.log('---1----1----1----1----1---')
		// console.log('uid', window.localStorage.getItem('uid'))

		// {"time":"2022-04-02T01:07:56.776Z","content":[{"uid":"49145","traces":[{"path":"videoDetail","param":{"id":""},"timestamp":"2022-04-02T01:08:25.693Z","type":2,"act":"see"},]}]}
		// console.log('newItem', newItem)
	} else {
		// 如果有数据，检查uid，新的uid创建新的{uid,traces}对象
		const uid = window.localStorage.getItem('uid')
		const index = his.content.findIndex((element) => {
			return element.uid === uid
		})
		if (index === -1) {
			his.content.push({ uid: uid, traces: [] })
			uni.setStorage({ key: 'history', data: JSON.stringify(his) })
		}
	}

	return his
}

let ret = getArts()

// 初始化 只在 重新打开网页的时候执行

const history = {
	state: {
		record: ret,
	},
	mutations: {
		ADD: (state, item) => {
			// 创建新的记录
			let uid = uni.getStorage({ key: 'uid' })
			let index = state.record.content.findIndex((ele) => {
				return ele.uid === uid
			})
			// console.log('index', index)
			// console.log('state', state)
			// console.log('record')
			state.record.content[index].traces.push(item)
			uni.setStorage({ key: 'history', data: JSON.stringify(state.record) })
		},
		NEW: (state, item) => {
			const uid = uni.getStorage({ key: 'uid' })
			const index = state.record.content.findIndex((element) => {
				return element.uid === uid
			})
			if (index === -1) {
				state.record.content.push({ uid: uid, traces: [] })
				uni.setStorage({ key: 'history', data: JSON.stringify(state.record) })
			}
		}, // 创建新的用户
	},
	actions: {
		ADD_TRACE: ({ commit, state }, item) => {
			// console.log('add_trace', state)
			if (state.record.content.length === 0) return commit('NEW', item)
			return commit('ADD', item)
		},
	},
}

export default history
