const snippet = {
	state: {
		snippetList: uni.getStorageSync('snippetList') || [],
	},

	mutations: {
		add_sni: function (state, str) {
			/* 增加快捷语 */
			const timestamp = Date.now()
			state.snippetList.push({ timestamp: timestamp, msg: str, show: false })
			uni.setStorage({
				key: 'snippetList',
				data: state.snippetList,
			})
		},
		del_sni: function (state, obj) {
			/* 删除快捷语 */
			const index = state.snippetList.findIndex((ele) => {
				return ele.timestamp === obj.timestamp
			})
			state.snippetList.splice(index, 1)
			uni.setStorageSync('snippetList', state.snippetList)
		},
		show_sni: function (state, obj) {
			/* u-swiper-action删除的时候需要控制show来实现唯一的删除按钮显示 */
			state.snippetList.forEach((element) => {
				if (element.timestamp === obj.timestamp) {
					element.show = !element.show
				} else {
					element.show = false
				}
			})
		},
		mod_sni: function (state, obj) {
			/* 修改快捷语 */
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
