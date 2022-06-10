<template>
	<scroll-view scroll-y="true">
		<view>
			<template v-if="sysMesList.length > 0">
				<view
					v-for="(item, index) in sysMesList"
					:key="index"
					class="flex flex-direction b-f margin-top-sm padding-sm"
				>
					<view class="margin-bottom-sm"
						><text class="fc-b-9 fs-24">{{ item.addtime }}</text></view
					>
					<view
						><text class="fc-b-3 fs-36">{{ item.content }}</text></view
					>
				</view>
			</template>
			<template v-else>
				<no-message :height="myHeight"></no-message>
			</template>
		</view>
	</scroll-view>
</template>

<script>
	import { getMessages, readMsg } from '@/api/my'
	import { commentFunc, addCommentLike } from '@/api/news'
	import NoMessage from '../../../components/NoMessage/NoMessage.vue'

	export default {
		components: { NoMessage },
		data() {
			return {
				messagePage: {
					p: 1,
					num: 5,
					type: 3,
					showMore: true,
					flag: false,
				},
				sysMesList: [],
				myHeight: 0,
			}
		},
		onLoad() {
			this.getMessages()
			this.myHeight = this.initScrollHeight(0)
		},
		methods: {
			getMessages() {
				/* 获取信息 */
				const token = this.token
				const uid = this.uid
				const obj = Object.assign({ uid, token }, this.messagePage)
				this.messagePage.flag = true
				getMessages(obj)
					.then((res) => {
						console.log('res', res)
						// if (this.messagePage.type === 1) {
						// 	if (this.isEmpty(res.info)) {
						// 		this.commentsList = this.commentsList.concat([])
						// 		this.messagePage.showMore = false
						// 	} else {
						// 		this.commentsList = this.commentsList.concat(res.info)
						// 	}
						// 	if (this.commentsList.length === 0) {
						// 		this.noticeMsg.comments = 'No data.'
						// 	}
						// }
						//  else if (this.messagePage.type === 2) {
						// 	if (this.isEmpty(res.info)) {
						// 		this.likesList = this.likesList.concat([])
						// 		this.messagePage.showMore = false
						// 	} else {
						// 		this.likesList = this.likesList.concat(res.info)
						// 	}
						// 	if (this.likesList.length === 0) {
						// 		this.noticeMsg.likes = 'No data.'
						// 	}
						if (this.messagePage.type === 3) {
							if (this.isEmpty(res.info)) {
								this.sysMesList = this.sysMesList.concat([])
								this.messagePage.showMore = false
							} else {
								this.sysMesList = this.sysMesList.concat(res.info)
								if (res.info.length < 5) {
									this.messagePage.showMore = false
								}
							}
							if (this.sysMesList.length === 0) {
								this.noticeMsg.systemMsgs = 'No data.'
							}
						}
						this.readMsg(this.messagePage.type) // 消息获取完以后把这个类型消息标记成已读
					})
					.catch((err) => {
						console.log(err)
					})
					.finally(() => {
						this.messagePage.flag = false
					})
			},
			readMsg(msgType) {
				/* 阅读消息后把消息标记成已读 */
				const token = window.localStorage.getItem('token')
				if (!token) return /* 如果用户未登录访问数据，则直接返回 */
				const uid = window.localStorage.getItem('uid')
				readMsg({ uid, token, type: msgType })
					.then((res) => {
						MsgCounterBus.$emit('reNew')
						console.log(res)
					})
					.catch((err) => {
						console.log(err)
					})
			},
		},
	}
</script>

<style lang="scss"></style>
