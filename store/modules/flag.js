const flag = {
	state: {
		battleLikeFlag: false,
	},
	mutations: {
		SET_BATTLE_LIKE_FLAG: (state) => {
			state.battleLikeFlag = !state.battleLikeFlag
		},
	},
}

export default flag
