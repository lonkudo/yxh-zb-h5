<template>
	<view
		@tap="onTap"
		:class="['image-info', borderRound]"
		:style="{ width: size + 'rpx', height: size / 2.075 + 'rpx' }"
	>
		<view
			:style="{ width: size + 'rpx', height: size / 2.075 + 'rpx' }"
			v-show="!loadCompleted"
			class="flex align-center justify-center"
		>
			<image
				:src="'/static/styles/logo/loading_logo.png'"
				:style="{ width: size / 3 + 'rpx', height: size / (2.075 * 3) + 'rpx' }"
				mode="aspectFit"
			/>
		</view>
		<image
			v-show="loadCompleted"
			:src="img"
			mode="aspectFill"
			:style="{ width: size + 'rpx', height: size / 2.075 + 'rpx' }"
			@load="loadCompleted = true"
		/>
		<view class="top-shadow" v-if="shadowTop"></view>
		<view class="bottom-shadow" v-if="shadowBottom"></view>
		<view class="center-icon" v-if="showIcon">
			<slot>
				<text class="fs-80 iconfont icon-Video fc-b-f"></text>
			</slot>
		</view>
		<view class="top-text padding-sm fc-b-f f-hide" v-if="shadowTop"
			><slot name="top"></slot
		></view>
		<view
			class="bottom-text padding-sm flex justify-end fc-b-f"
			v-if="shadowBottom"
			><slot name="bottom"></slot
		></view>
	</view>
</template>

<script>
	export default {
		name: 'ImageInfo',
		props: {
			img: {
				type: String,
				default: '@/static/helo1.jpg',
			},
			title: {
				type: String,
				default: '',
			},
			size: {
				type: Number,
				default: 730,
			},
			showIcon: {
				type: Boolean,
				default: false,
			},
			shadow: {
				type: String,
				default: 'all',
			},
			border: {
				type: String,
				default: 'all',
			},
		},
		data() {
			return {
				loadCompleted: false,
			}
		},
		computed: {
			borderRound: function () {
				switch (this.border) {
					case 'all':
						return 'br-8'
						break
					case 'top':
						return 'br-8-t'
						break
					case 'bottom':
						return 'br-8-b'
						break
					default:
						return ''
						break
				}
			},
			shadowTop: function () {
				switch (this.shadow) {
					case 'all':
						return true
						break
					case 'top':
						return true
						break
					case 'bottom':
						return false
						break
					default:
						return false
						break
				}
			},
			shadowBottom: function () {
				switch (this.shadow) {
					case 'all':
						return true
						break
					case 'top':
						return false
						break
					case 'bottom':
						return true
						break
					default:
						return false
						break
				}
			},
		},
		methods: {
			onTap() {
				this.$emit('onTap')
			},
		},
	}
</script>

<style lang="scss">
	.image-info {
		overflow: hidden;
		position: relative;
		image: {
			width: 100%;
			height: 100%;
		}
		.top-shadow {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 80rpx;
			background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
		}
		.bottom-shadow {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 80rpx;
			background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
		}
		.center-icon {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
		.top-text {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
		}
		.bottom-text {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}
</style>
