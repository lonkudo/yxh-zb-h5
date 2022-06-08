<template>
	<view class="color-bar flex" :style="{ width: width + 'rpx' }">
		<view
			:style="{ flex: win }"
			class="h100 bg-red flex align-center justify-start fs-20 padding-left-xs"
			v-if="this.toNum(win) !== 0"
			>{{ win }} win</view
		>
		<view
			:style="{ flex: draw }"
			class="h100 bg-green flex align-center justify-center fs-20 padding-xs"
			v-if="this.toNum(draw) !== 0"
			>{{ draw }} draw</view
		>
		<view
			:style="{ flex: lose }"
			class="h100 bg-blue flex align-center justify-end fs-20 padding-right-xs"
			v-if="this.toNum(lose) !== 0"
			>{{ lose }} loss</view
		>
	</view>
</template>

<script>
	export default {
		name: 'ColorBar',
		props: {
			win: {
				type: [String, Number],
				default: 0,
			},
			draw: {
				type: [String, Number],
				default: 2,
			},
			lose: {
				type: [String, Number],
				default: 3,
			},
			width: {
				type: [String, Number],
				default: 730,
			},
		},
		data() {
			return {}
		},
		computed: {},
	}
</script>

<style lang="scss">
	.color-bar {
		height: 50rpx;
		border-radius: 25rpx;
		overflow: hidden;
	}
</style>
