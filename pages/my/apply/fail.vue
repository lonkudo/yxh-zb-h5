<template>
	<view class="flex b-f flex-direction justify-center align-center">
		<view class="ava-120 bg-red flex align-center justify-center margin-top-lg"
			><text class="iconfont icon-cha fs-60 fc-b-f"></text
		></view>
		<view class="margin-top-lg w-400 msg"><text>Application failed</text></view>
		<view class="w-400 margin-bottom-lg btn bg-green"
			><text>Apply again</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
	}
</script>

<style lang="scss">
	.msg {
		display: block;
		height: 80rpx;
		line-height: 40rpx;
		text-align: center;
		border-radius: 40rpx;
	}
	.btn {
		display: block;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 40rpx;
	}
</style>
