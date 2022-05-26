const snippet = {
	state: {
		snippetList: uni.getStorageSync('snippetList') || [],
	},

	mutations: {
		add_sni: function (state, str) {
			const timestamp = Date.now()
			state.snippetList.push({ timestamp: timestamp, msg: str, show: false })
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
		show_sni: function (state, obj) {
			state.snippetList.forEach((element) => {
				console.log('timstamp', element.timestamp, obj.timestamp)
				if (element.timestamp === obj.timestamp) {
					console.log('---1----1----1----1----1---')
					element.show = !element.show
				} else {
					console.log('---2----2----2----2----2---')
					element.show = false
				}
			})
		},
		mod_sni: function (state, obj) {
			const index = state.snippetList.findIndex((ele) => {
				console.log(ele, obj)
				return ele.timestamp === obj.timestamp
			})
			state.snippetList[index].msg = obj.msg
			uni.setStorageSync('snippetList', state.snippetList)
		},
	},
}

export default snippet
