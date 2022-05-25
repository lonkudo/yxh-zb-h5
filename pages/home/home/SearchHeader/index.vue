<template>
	<view
		class="flex align-center padding-xs padding-top-sm padding-bottom-sm justify-between b-f"
	>
		<view class="margin-left-sm"
			><text class="iconfont icon-saoyisao fc-b-0 fs-40"></text
		></view>
		<view
			@tap="go('search')"
			class="flex align-center b-f4 input-group margin-left-sm margin-right-sm"
			><text class="iconfont icon-sousuo fs-32 margin-right-sm"></text
			><input type="text" placeholder="Search"
		/></view>
		<view class="margin-left-sm margin-right-sm"
			><text class="iconfont icon-qiandao fs-40"></text
		></view>
	</view>
</template>

<script>
	export default {
		methods: {
			go(val) {
				if (val === 'search') {
					uni.navigateTo({
						url: '/pages/search/search',
					})
				}
			},
		},
	}
</script>

<style lang="scss">
	// @import '@/static/styles/font/iconfont.css';
	// @import '@/static/styles/css/theme-color.scss';

	.input-group {
		width: 540rpx;
		height: 56rpx;
		border-radius: 28rpx;
		padding: 24rpx;
		input {
			color: #999;
		}
	}
</style>
