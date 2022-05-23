<template>
	<view class="news-item margin-xs padding-xs b-f br-8" @tap="go(newsInfo)">
		<view class="flex justify-between">
			<view
				class="flex flex-direction justify-between padding-top-xs padding-bottom-xs"
			>
				<text class="fc-b-3 fs-30 f-hide-2 w-450">{{ newsInfo.caption }}</text>
				<view class="flex justify-between">
					<text class="fc-blue fs-24 f-hide w-300">{{
						newsInfo.competition_name
					}}</text>
					<text class="fc-b-9 fs-24 f-hide">{{ newsInfo.create_time }}</text>
				</view>
			</view>
			<view>
				<img :src="newsInfo.img" alt="" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'NewsItem',
		props: ['newsInfo'],
		data() {
			return {}
		},
		methods: {
			go(info) {
				uni.navigateTo({
					url: 'detail/newsDetail?id=' + info.id,
				})
			},
		},
	}
</script>

<style lang="scss">
	.news-item {
		img {
			width: 211rpx;
			height: 140rpx;
			border-radius: 10rpx;
		}
	}
</style>
