<template>
	<view class="flex b-f flex-direction justify-center align-center">
		<view class="ava-120 bg-green flex align-center justify-center margin-top-lg"
			><text class="iconfont icon-check fs-80 fc-b-f"></text
		></view>
		<text class="margin-top-lg w-400 margin-bottom-lg msg"
			>You are already an anchor, go to PC and start broadcasting.</text
		>
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
		height: 120rpx;
		line-height: 40rpx;
		text-align: center;
	}
</style>
