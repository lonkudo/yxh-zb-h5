<template>
	<view class="Coin-container">
		<view class="coin" v-if="status === 0" @click="coinClicked()">
			<view class="back"> </view>
			<view class="over">
				<text class="plus" v-if="num !== ''">+</text><text>{{ num }}</text>
			</view>
		</view>
		<view class="done" v-if="status === 1">
			<svg-icon icon-class="check"></svg-icon>
		</view>
		<view class="miss" v-if="status === 2">
			<svg-icon icon-class="exclam"></svg-icon>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'Coin',
		props: {
			status: {
				type: Number,
				default: 0,
			},
			num: {
				type: String,
				default: '',
			},
		},
		data() {
			return {}
		},
		methods: {
			coinClicked() {
				this.$emit('coinClicked')
			},
		},
	}
</script>
<style lang="scss" scoped>
	.coin {
		width: 80rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		position: relative;
		border-radius: 50%;
		cursor: pointer;
		.back {
			display: block;
			background-image: url('@/static/styles/png/coin.png');
			background-size: 80rpx 80rpx;
			width: 80rpx;
			height: 80rpx;
			position: absolute;
			top: 5rpx;
			left: -5rpx;
		}
		.over {
			display: block;
			width: 50rpx;
			height: 50rpx;
			position: absolute;
			top: 20rpx;
			left: 10rpx;
			background-color: #fece0a;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		text {
			display: inline-block;
			color: white;
			font-size: 30rpx !important;
			// font-weight: 600;
			z-index: 1;
		}
		text.plus {
			margin-top: 4rpx;
		}
	}
	.done {
		margin: 10rpx 0 0 0;
		width: 70rpx;
		height: 70rpx;
		display: block;
		top: 0;
		left: 0;
		background-color: #fece0a;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20rpx !important;
		cursor: pointer;
	}
	.miss {
		width: 70rpx;
		height: 70rpx;
		display: block;
		top: 0;
		left: 0;
		background-color: #f4f4f4;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20rpx !important;
	}
</style>
