<template>
	<view>
		<u-navbar
			:is-back="true"
			:title="'Feedback'"
			:title-bold="true"
			:title-color="'#000'"
			:back-icon-color="'#000'"
			:back-icon-size="40"
		>
			<navigator :url="'writeFeedback'" slot="right"
				><text class="margin-right-sm fc-g">write feedback</text></navigator
			>
		</u-navbar>
		<scroll-view scroll-y="true">
			<view class="flex flex-direction b-f">
				<view
					v-for="(item, index) in feedbackList"
					:key="index"
					class="padding-xs flex justify-between feedback-item align-center"
				>
					<view class="flex flex-direction justify-between">
						<text class="f-hide w-550 fs-20">{{ item.content }}</text>
						<text class="fc-b-9 margin-top-sm fs-20">{{ item.addtime }}</text>
					</view>
					<my-button-reverse
						:text="'Processing'"
						:falseText="'Processed'"
					></my-button-reverse>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import data from './data.js'
	import MyButtonReverse from '@/components/MyButtonReverse/MyButtonReverse.vue'
	import { getFeedback, sendFeedback } from '@/api/my'

	export default {
		components: {
			MyButtonReverse,
		},
		onLoad() {
			console.log('onLoad')
			this.getFeedback()
		},
		data() {
			return {
				feedbackList: [],
				feedbackPage: {
					p: 0,
					show: true,
				},
			}
		},
		methods: {
			getFeedback() {
				this.feedbackPage.p += 1
				getFeedback({ p: this.feedbackPage.p, uid: this.uid, token: this.token })
					.then((res) => {
						if (res.code === 0) {
							this.feedbackList = this.feedbackList.concat(res.info)
							if (res.info.length === 0) {
								this.feedbackPage.show = false
							}
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
		},
	}
</script>

<style lang="scss">
	.feedback-item {
		border-bottom: 1rpx solid #ccc;
		&:nth-last-child(1) {
			border-bottom: 0;
		}
	}
	.top-right-btn {
		position: fixed;
		right: 0;
		top: 0;
	}
</style>
