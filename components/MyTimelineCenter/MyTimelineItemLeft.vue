<template>
	<view class="my-time-axis-item">
		<slot name="content" />
		<view class="my-time-axis-node" :style="[nodeStyle]">
			<slot name="node">
				<view class="my-dot"> </view>
			</slot>
		</view>
	</view>
</template>

<script>
	/**
	 * timeLineItem 时间轴Item
	 * @description 时间轴组件一般用于物流信息展示，各种跟时间相关的记录等场景。(搭配my-time-line使用)
	 * @tutorial https://www.uviewui.com/components/timeLine.html
	 * @property {String} bg-color 左边节点的背景颜色，一般通过slot内容自定义背景颜色即可（默认#ffffff）
	 * @property {String Number} node-top 节点左边图标绝对定位的top值，单位rpx
	 * @example <my-time-line-item node-top="2">...</my-time-line-item>
	 */
	export default {
		name: 'MyTimelineItemLeft',
		props: {
			// 节点的背景颜色
			bgColor: {
				type: String,
				default: '#ffffff',
			},
			// 节点左边图标绝对定位的top值
			nodeTop: {
				type: [String, Number],
				default: '',
			},
		},
		data() {
			return {}
		},
		computed: {
			nodeStyle() {
				let style = {
					backgroundColor: this.bgColor,
				}
				if (this.nodeTop != '') style.top = this.nodeTop + 'rpx'
				return style
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/uni_modules/uview-ui/libs/css/style.components.scss';

	.my-time-axis-item {
		@include vue-flex;
		flex-direction: column;
		width: 100%;
		position: relative;
		margin-bottom: 32rpx;
		transform-origin: 0;
		transform: translateX(-100%);
	}

	.my-time-axis-node {
		position: absolute;
		top: 12rpx;
		right: 0rpx;
		transform-origin: 0;
		transform: translateX(50%);
		@include vue-flex;
		align-items: center;
		justify-content: center;
		z-index: 1;
		font-size: 24rpx;
	}

	.my-dot {
		height: 16rpx;
		width: 16rpx;
		border-radius: 100rpx;
		background: #ddd;
	}
</style>
