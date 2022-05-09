<template>
	<view class="br-5 video-item margin-xs">
		<img :src="videoInfo.thumb" alt="">
		<text class="title f-hide w-700 fc-b-f fs-28">{{videoInfo.title}}</text>
		<text class="time f-hide b-t fc-b-f fs-18">{{videoInfo.addtime | formatGiven('yyyy-MM-dd hh:ss')}}</text>
		<view class="title-shadow b-t"></view>
	</view>
</template>

<script>
	export default {
		name:"VideoItem",
		props: ['videoInfo'],
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.video-item {
		height: 365rpx;
		width: 730rpx;
		overflow: hidden;
		position: relative;
		img {
			width: 100%;
			height: auto;
		}
		text {
			position: absolute;

		}
		.title {
			top: 20rpx;
			left: 20rpx;
			z-index: 10;
		}
		.time {
			bottom: 10rpx;
			right: 10rpx;
		}
		.title-shadow {
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			height: 80rpx;
		}
	}
</style>