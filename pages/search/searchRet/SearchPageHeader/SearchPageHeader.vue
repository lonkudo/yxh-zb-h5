<template>
	<view
		class="flex align-center padding-xs padding-top-sm padding-bottom-sm justify-between b-f"
	>
		<view class="flex align-center b-f4 input-group margin-left-sm"
			><text class="iconfont icon-sousuo fs-32 margin-right-sm"></text
			><input type="text" placeholder=""
		/></view>
		<view class="margin-right-sm"
			><view
				class="cancel-btn flex align-center justify-around padding-xs"
				@tap="go('back')"
				><text class="fs-28 fc-b-f">cancel</text></view
			></view
		>
	</view>
</template>

<script>
	export default {
		name: 'SearchPageHeader',
		props: {},
		data() {
			return {}
		},
		methods: {
			go(val) {
				if (val === 'back') {
					uni.navigateBack({
						delta: 1,
					})
				}
			},
		},
	}
</script>

<style lang="scss">
	.input-group {
		height: 56rpx;
		border-radius: 28rpx;
		padding: 24rpx;
		input {
			color: #999;
			width: 450rpx;
		}
	}
	.cancel-btn {
		width: 120rpx;
		height: 50rpx;
		background-color: #999;
		border-radius: 10rpx;
	}
</style>
