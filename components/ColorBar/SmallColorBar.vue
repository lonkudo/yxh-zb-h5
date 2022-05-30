<template>
	<view
		:class="[
			'color-bar flex align-center justify-center',
			reverse ? reverseBg : myBg,
		]"
		:style="{ width: 100 + 'rpx' }"
	>
		<text class="fs-b-f">{{ home }}</text>
		<text class="fs-b-f margin-left-xs margin-right-xs">{{ '-' }}</text>
		<text class="fs-b-f">{{ away }}</text>
	</view>
</template>

<script>
	export default {
		name: 'SmallColorBar',
		props: {
			home: {
				type: [String, Number],
				default: 0,
			},
			away: {
				type: [String, Number],
				default: 2,
			},
			reverse: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {}
		},
		computed: {
			myBg: function () {
				let home = this.toNum(this.home)
				let away = this.toNum(this.away)
				if (home === away) {
					return 'bg-green'
				} else if (home > away) {
					return 'bg-red'
				} else {
					return 'bg-blue'
				}
			},
			reverseBg: function () {
				let away = this.toNum(this.home)
				let home = this.toNum(this.away)
				if (home === away) {
					return 'bg-green'
				} else if (home > away) {
					return 'bg-red'
				} else {
					return 'bg-blue'
				}
			},
		},
	}
</script>

<style lang="scss">
	.color-bar {
		height: 50rpx;
		border-radius: 25rpx;
		overflow: hidden;
	}
</style>
