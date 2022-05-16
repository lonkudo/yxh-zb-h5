<template>
	<view class="b-f br-5 margin-xs padding-xs">
		<view v-for="(item, index) in newsList" class="flex align-center">
			<text :class="['seq fs-14 fw-2 margin-xs', seqBg(index)]">{{ index }}</text>
			<text class="f-hide w-650 fs-24 fc-b-9">{{ item.caption }}</text>
		</view>
	</view>
</template>

<script>
	import pdata from './data.js'
	export default {
		name: 'RecommendNews',
		data() {
			return {
				newsList: pdata,
			}
		},
		methods: {
			seqBg(idx) {
				if (idx === 0) {
					return 'bg-red fc-b-f'
				} else if (idx === 1) {
					return 'bg-orange fc-b-f'
				} else if (idx === 2) {
					return 'bg-yellow fc-b-f'
				} else {
					return 'fc-b-9'
				}
			},
		},
	}
</script>

<style lang="scss">
	.seq {
		display: block;
		height: 24rpx;
		width: 24rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 24rpx;
	}
</style>
