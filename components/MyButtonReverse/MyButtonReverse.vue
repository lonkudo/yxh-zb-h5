<template>
	<view
		:class="['my-btn', { active: isActive }]"
		@tap.stop="handleTap()"
		:style="{ width: width + 'rpx' }"
		>{{ isActive ? text : falseText }}</view
	>
</template>

<script>
	export default {
		name: 'MyButtonReverse',
		props: {
			text: {
				type: String,
				default: 'my button',
			},
			falseText: {
				type: String,
				default: 'false button',
			},
			width: {
				type: Number,
				default: 140,
			},
			initActive: {
				type: Boolean,
				default: true,
			},
		},
		data() {
			return {
				isActive: this.initActive,
			}
		},
		methods: {
			handleTap: function () {
				this.isActive = !this.isActive
				this.$emit('onTap')
			},
		},
	}
</script>

<style lang="scss">
	.my-btn {
		box-sizing: border-box;
		width: 150rpx !important;
		height: 50rpx;
		border-radius: 25rpx;
		line-height: 50rpx;
		text-align: center;
		font-size: 20rpx;
		background-color: #ccc;
		color: #fff;
	}
	.active {
		border: 1px solid #02b875 !important;
		background-color: #fff;
		color: #02b875;
		border: 0;
	}
</style>
