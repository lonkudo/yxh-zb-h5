<template>
	<view
		class="img-left flex align-center justify-start"
		:style="{ height: size + 'rpx' }"
	>
		<view class="margin-right-xm flex align-center">
			<image
				:src="require('@/static/logo.png')"
				:style="{ width: size + 'rpx', height: size + 'rpx' }"
			/>
		</view>
		<view
			:class="[
				'flex flex-direction margin-left-xs right',
				top.length > 0 && down.length > 0 ? 'justify-between' : 'justify-center',
			]"
			:style="{ padding: pad + 'rpx' + ' 0', width: width + 'rpx' }"
		>
			<text class="fc-b-3 f-hide" v-if="top.length > 0">{{ top }}</text>
			<text class="fc-b-9 f-hide" v-if="down.length > 0">{{ down }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ImageLeft',
		props: {
			img: {
				type: String,
				default: '/static/logo.png',
			},
			top: {
				type: String,
				default: '',
			},
			down: {
				type: String,
				default: '',
			},
			size: {
				type: Number,
				default: 60,
			},
			pad: {
				type: Number,
				default: 0,
			},
			width: {
				type: Number,
				default: 750,
			},
		},
		data() {
			return {}
		},
	}
</script>

<style lang="scss">
	.img-left {
		image {
			border-radius: 50%;
		}
		.right {
			height: 100%;
		}
	}
</style>
