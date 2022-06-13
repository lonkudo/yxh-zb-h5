const flag = {
	state: {
		battleLikeFlag: false,
		singleChat: false,
	},
	mutations: {
		SET_BATTLE_LIKE_FLAG: (state) => {
			state.battleLikeFlag = !state.battleLikeFlag
		},
		SET_SINGLE_CHAT: (state) => {
			console.log('setSingle')
			state.singleChat = true
		},
	},
}

export default flag
