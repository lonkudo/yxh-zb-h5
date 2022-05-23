<template>
	<view
		class="flex flex-direction align-center b-f"
		:style="{ height: height + 'rpx' }"
	>
		<image
			src="/static/styles/png/NoContent@2x.png"
			class="my-img"
			mode="aspectFit"
		/>
		<text class="fs-30 fc-b-9 margin-bottom-lg">No content yet</text>
	</view>
</template>

<script>
	export default {
		name: 'NoContent',
		props: {
			height: {
				type: Number,
				default: 500,
			},
		},
		data() {
			return {}
		},
	}
</script>

<style lang="scss">
	.my-img {
		width: 407rpx;
		height: 407rpx;
	}
</style>
