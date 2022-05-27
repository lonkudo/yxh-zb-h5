<template>
	<view class="flex align-center" id="msgItem">
		<view class="flex align-center b-0 br-50 padding-xs">
			<image :src="info.userInfo.avatar" mode="" class="ava-80" />
			<view class="flex flex-direction justify-between h-70">
				<text class="fc-b-f fs-20 f-hide w-200">{{
					info.userInfo.user_nicename
				}}</text>
				<text class="fc-b-f fs-20 fc-gold f-hide w-200"
					>Send {{ info.giftInfo.giftName }}</text
				>
			</view>
			<image :src="info.giftInfo.giftIcon" mode="" class="ava-80" />
		</view>
		<text :class="['fc-b-f gift-num fs-40 margin-left-lg']" id="popNum"
			>x{{ info.giftInfo.giftNum }}</text
		>
	</view>
</template>

<script>
	export default {
		name: 'PopMsginfo',
		props: ['info'],
		watch: {
			info: {
				handler: function (newValue) {
					this.$nextTick(() => {
						this.play()
					})
					// console.log('newVal', newValue.countdown)
				},
				immediate: true,
				deep: true,
			},
		},
		data() {
			return {
				oldInfo: {},
				isPop: false,
			}
		},
		methods: {
			play: function () {
				document.getElementById('popNum').className =
					'fc-b-f gift-num fs-40 margin-left-lg'
				window.requestAnimationFrame(function (time) {
					window.requestAnimationFrame(function (time) {
						document.getElementById('popNum').className =
							'fc-b-f gift-num fs-40 margin-left-lg pop'
					})
				})
			},
		},
	}
</script>

<style lang="scss">
	.gift-num {
		color: transparent;
		font-weight: 900;
		-webkit-text-stroke: 2rpx #f1862f;
	}

	.pop {
		animation-name: msgPop;
		animation-duration: 100ms;
		animation-timing-function: linear;
	}

	@keyframes msgPop {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.5);
		}
		100% {
			transform: scale(1);
		}
	}

	.slideIn {
		animation-duration: 500ms;
		animation-name: slidein;
	}
	.slideOut {
		animation-duration: 500ms;
		animation-name: slideOut;
	}
	@keyframes slidein {
		from {
			margin-left: -100%;
			width: 300%;
		}

		to {
			margin-left: 0%;
			width: 100%;
		}
	}
	@keyframes slideout {
		from {
			margin-left: 0%;
			width: 100%;
		}
		to {
			margin-left: -100%;
			width: 300%;
		}
	}
</style>
