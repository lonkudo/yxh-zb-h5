<template>
	<scroll-view scroll-y="true">
		<view>
			<template v-if="likesList.length > 0">
				<view
					v-for="(item, index) in likesList"
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
								><text class="fs-20 fc-b-9">{{ item.addtime }}</text></view
							>
						</view>
					</view>
					<view class="margin-top-sm margin-bottom-sm f-hide w-700">
						<text>{{
							item.leixing === '1' ? 'Like the comment' : 'Unlike the comment'
						}}</text>
					</view>
					<view class="br-8 b-f6">
						<view class="flex margin-bottom-xs align-center"
							><text class="fc-blue fs-24">{{ item.user.user_nicename }} :</text
							><text class="margin-left-xs fs-24">{{ item.content }}</text></view
						>
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
			</template>
			<template v-else>
				<no-message></no-message>
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
					type: 2,
					showMore: true,
					flag: false,
				},
				likesList: [],
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
						if (this.messagePage.type === 2) {
							if (this.isEmpty(res.info)) {
								this.likesList = this.likesList.concat([])
								this.messagePage.showMore = false
							} else {
								this.likesList = this.likesList.concat(res.info)
							}
							if (this.likesList.length === 0) {
								this.noticeMsg.likes = 'No data.'
							}
						}
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
				const token = this.token
				// if (!token) return /* 如果用户未登录访问数据，则直接返回 */
				const uid = this.uid
				readMsg({ uid, token, type: msgType })
					.then((res) => {
						// MsgCounterBus.$emit('reNew')
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
