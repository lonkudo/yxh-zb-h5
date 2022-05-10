<template>
	<view
		class="flex align-center padding-xs padding-top-sm padding-bottom-sm justify-between b-f"
	>
		<view
			class="flex align-center b-f4 input-group margin-left-sm margin-right-sm"
			><text class="iconfont icon-sousuo fs-32 margin-right-sm"></text
			><input type="text" placeholder="Search"
		/></view>
		<view class="margin-right-sm"
			><view class="cancel-btn flex align-center justify-around"
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
	}
</script>

<style lang="scss">
	.input-group {
		height: 56rpx;
		border-radius: 28rpx;
		padding: 24rpx;
		input {
			color: #999;
		}
	}
	.cancel-btn {
		width: 100rpx;
		height: 40rpx;
		background-color: #999;
		border-radius: 10rpx;
	}
</style>
