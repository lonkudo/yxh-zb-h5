<template>
	<view
		class="attention-item b-f br-5 flex flex-direction align-center margin-xs padding-sm justify-between"
	>
		<image :src="attentionInfo.avatar" mode="" />
		<text class="f-hide fc-b-6 fs-24 w-200 f-center">
			{{ attentionInfo.user_nicename }}</text
		>
		<u-button
			iconColor="#02B875"
			color="#02B875"
			shape="circle"
			text="Follow"
			size="mini"
			class="w-130"
		></u-button>
	</view>
</template>

<script>
	export default {
		name: 'AttentionItem',
		props: ['attentionInfo'],
		data() {
			return {}
		},
	}
</script>

<style lang="scss">
	.attention-item {
		width: 228rpx;
		height: 220rpx;
		image {
			width: 88rpx;
			height: 88rpx;
			border-radius: 50%;
		}
	}
</style>
