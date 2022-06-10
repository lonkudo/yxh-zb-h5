<template>
	<view
		class="flex flex-direction align-center b-f6"
		:style="{ height: height + 'rpx' }"
	>
		<image
			src="@/static/styles/png/NoMessage@2x.png"
			class="my-img"
			mode="aspectFit"
		/>
		<text class="fs-30 fc-b-9 margin-bottom-lg">
			<slot name="default">No messages yet</slot>
		</text>
	</view>
</template>

<script>
	export default {
		props: {
			height: {
				type: Number,
				default: 500,
			},
		},
		name: 'NoMessage',
		data() {
			return {}
		},
	}
</script>

<style lang="scss"></style>
