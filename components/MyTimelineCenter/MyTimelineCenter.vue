<template>
	<view class="my-time-axis">
		<slot />
	</view>
</template>

<script>
	export default {
		name: 'MyTimelineCenter',
		data() {
			return {}
		},
	}
</script>

<style lang="scss">
	.my-time-axis {
		padding-left: 375rpx;
		position: relative;
	}

	.my-time-axis::before {
		content: ' ';
		position: absolute;
		left: 375rpx;
		top: 12rpx;
		width: 1px;
		bottom: 0;
		border-left: 1px solid #d2d2d2;
		transform-origin: 0 0;
		transform: scaleX(0.5);
	}
</style>
