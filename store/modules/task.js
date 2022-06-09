import { getTaskList, liveOrDailyTask } from '@/api/my'

const task = {
	state: {
		taskList: {},
	},
	mutations: {
		SET_TASKLIST: (state, taskList) => {
			state.taskList = taskList
		},
	},
	actions: {
		GET_TASKLIST: ({ commit }, userInfo) => {
			getTaskList(userInfo.uid, userInfo.token, 1)
				.then((res) => {
					console.log('---run----run----run----run----run---')
					commit('SET_TASKLIST', res.info)
				})
				.catch((err) => {
					console.log(err)
				})
		},
		FINISH_TASK: ({ commit, state, dispatch }, info) => {
			// 如果任务已完成则直接终止，不发送请求。
			let that = info.that
			let item
			if (info.type === 1) {
				item = state.taskList.task.find((ele) => {
					return ele.id === info.taskid
				})
			} else {
				item = state.taskList.go.find((ele) => {
					return ele.id === info.taskid
				})
			}

			if (item && item.current_num === item.num) return

			liveOrDailyTask(that.uid, info.type, info.taskid)
				.then((res) => {
					if (res.code === 0) {
						// setTimeout(() => {
						// 	that.$u.toast('task completed')
						// }, 1000)
						// 每完成一次都会增加金币。所以不做是否完成所有了。
						that.$store.dispatch('GetInfo', { uid: that.uid, token: that.token })
						dispatch('GET_TASKLIST', { uid: that.uid, token: that.token })
						// let that = this
					} else if (res.code === 433) {
						// this.$message.warning(
						// 	'The task has been completed. Please do not submit it again.'
						// )
					}
				})
				.catch((err) => {
					console.log(err)
				})
		},
	},
}

export default task
