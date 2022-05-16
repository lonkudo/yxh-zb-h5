<template>
	<view>
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
					<my-button-reverse></my-button-reverse>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import data from './data.js'
	import MyButtonReverse from '@/components/MyButtonReverse/MyButtonReverse.vue'
	export default {
		components: {
			MyButtonReverse,
		},
		data() {
			return {
				feedbackList: data,
			}
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
</style>
