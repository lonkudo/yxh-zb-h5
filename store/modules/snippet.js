console.log(
	'aa',

	uni.getStorageSync('snippetList') || '[]'
)

const snippet = {
	state: {
		snippetList: uni.getStorageSync('snippetList') || [],
	},

	mutations: {
		add_sni: function (state, str) {
			const timestamp = new Date()
			state.snippetList.push({ time: timestamp, msg: str })
			uni.setStorage({
				key: 'snippetList',
				data: state.snippetList,
			})
		},
		del_sni: function (state, obj) {
			const index = state.snippetList.findIndex((ele) => {
				return ele.timestamp === obj.timestamp
			})
			state.snippetList.splice(index, 1)
			uni.setStorageSync('snippetList', state.snippetList)
		},
	},
}

export default snippet
