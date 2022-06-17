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
		name: 'MyButton',
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
			mana: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				isActive: this.initActive,
			}
		},
		methods: {
			handleTap: function () {
				if (!this.mana) {
					this.isActive = !this.isActive
				}

				// else {
				// 	this.isActive = this.initActive
				// 	console.log('isActive', this.isActive)
				// }
				this.$emit('onTap')
			},
		},
		watch: {
			initActive: {
				handler: function (newVal) {
					this.isActive = newVal
				},
				immediate: true,
			},
		},
	}
</script>

<style lang="scss">
	.my-btn {
		box-sizing: border-box;
		width: 140rpx;
		height: 50rpx;
		border-radius: 25rpx;
		line-height: 50rpx;
		text-align: center;
		font-size: 20rpx;
		border: 1px solid #999;
		color: #999;
	}
	.active {
		background-color: #02b875;
		border: 0;
		color: #fff;
	}
</style>
