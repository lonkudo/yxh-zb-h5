<template>
	<scroll-view scroll-y="true">
		<view>
			<view
				v-for="(item, index) in commentsList"
				:key="index"
				class="flex flex-direction b-f margin-top-sm padding-sm"
			>
				<view class="flex align-center">
					<image
						:src="item.user.avatar"
						mode="aspectFill"
						class="ava-60 margin-right-xs"
					/>
					<view class="flex flex-direction justify-between">
						<text class="fs-20 fc-b-3">{{ item.user.user_nicename }}</text>
						<view
							><text class="fs-12 fc-b-9 margin-right-sm">commented on me </text
							><text class="fs-20 fc-b-9">{{ item.addtime }}</text></view
						>
					</view>
				</view>
				<view class="margin-top-sm f-hide w-700">
					<text>{{ item.user_content }}</text>
				</view>
				<view class="self-end flex margin-top-sm margin-bottom-sm">
					<view class="margin-right-lg flex align-center">
						<text class="iconfont icon-pinglun"></text>
						<text class="fc-b-9 fs-16 margin-left-xs">reply</text>
					</view>
					<view>
						<text class="iconfont icon-dianzan"></text>
					</view>
				</view>
				<view class="br-8 b-f6 flex align-center of-h">
					<image :src="item.media.thumb" mode="aspectFill" class="h-120 w-200" />
					<view
						class="flex flex-direction padding-left-sm padding-top-xs padding-bottom-xs h-120 justify-between"
					>
						<!-- <text class="fc-b-3 f-hide-2 fs-24">{{ item.media.title }}</text> -->
						<view class="f-hide w-450">
							<text class="fc-b-3 fs-24">{{ item.media.title }}</text>
						</view>
						<text class="fc-b-9 fs-16">{{ item.media.addtime }}</text>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import { getMessages, readMsg } from '@/api/my'
	import { commentFunc, addCommentLike } from '@/api/news'

	export default {
		data() {
			return {
				messagePage: {
					p: 1,
					num: 5,
					type: 1,
					showMore: true,
					flag: false,
				},
				commentsList: [],
			}
		},
		onLoad() {
			this.getMessages()
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
						if (this.messagePage.type === 1) {
							if (this.isEmpty(res.info)) {
								this.commentsList = this.commentsList.concat([])
								this.messagePage.showMore = false
							} else {
								this.commentsList = this.commentsList.concat(res.info)
							}
							if (this.commentsList.length === 0) {
								this.noticeMsg.comments = 'No data.'
							}
						}
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
						// } else if (this.messagePage.type === 3) {
						// 	if (this.isEmpty(res.info)) {
						// 		this.sysMesList = this.sysMesList.concat([])
						// 		this.messagePage.showMore = false
						// 	} else {
						// 		this.sysMesList = this.sysMesList.concat(res.info)
						// 		if (res.info.length < 5) {
						// 			this.messagePage.showMore = false
						// 		}
						// 	}
						// 	if (this.sysMesList.length === 0) {
						// 		this.noticeMsg.systemMsgs = 'No data.'
						// 	}
						// }
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
