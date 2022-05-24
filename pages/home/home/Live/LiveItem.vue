<template>
	<view class="b-f br-5 live-item flex flex-direction" @tap="go('live')">
		<view class="hot"
			><text class="fc-b-f fs-16 b-t iconfont icon-remen">2302</text></view
		>
		<img :src="liveInfo.thumb" alt="" />
		<text
			class="margin-top-xs margin-left-xs f-hide margin-left-sm fs-28 fc-b-3"
			>{{ liveInfo.title }}</text
		>
		<view class="flex align-center margin-top-xs margin-left-sm">
			<img :src="liveInfo.user_avatar" alt="" />
			<text class="margin-left-xs f-hide fc-b-6 fs-22">{{
				liveInfo.user_nicename
			}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'LiveItem',
		props: ['liveInfo'],
		data() {
			return {}
		},
		methods: {
			go(val) {
				if (val === 'live') {
					uni.navigateTo({
						url:
							'/pages/live/live?' +
							'liveuid=' +
							this.liveInfo.uid +
							'&game_id=' +
							this.liveInfo.game_id +
							'&stream=' +
							this.liveInfo.stream,
					})
				}
			},
		},
	}
</script>

<style lang="scss">
	.live-item {
		width: 360rpx;
		height: 340rpx;
		position: relative;
		margin-bottom: 10rpx;
		.hot {
			position: absolute;
			right: 20rpx;
			top: 150rpx;
			text {
				padding: 2rpx 6rpx;
			}
		}
		img {
			height: 200rpx;
			width: 360rpx;
			border-top-left-radius: 5rpx;
			border-top-right-radius: 5rpx;
		}
		view {
			img {
				height: 58rpx;
				width: 58rpx;
				border-radius: 50%;
			}
		}
	}
</style>
