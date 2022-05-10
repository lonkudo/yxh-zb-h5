<template>
	<view class="search-news-item br-5 b-f margin-xs padding-sm flex">
		<view
			class="flex flex-direction justify-between padding-bottom-xs padding-top-xs"
		>
			<text class="fs-30 fc-b-3 f-hide-2 w-450">{{ newsInfo.caption }}</text>
			<text class="fs-24 fc-b-9">{{ newsInfo.create_time }}</text>
		</view>
		<image :src="newsInfo.img" />
	</view>
</template>

<script>
	export default {
		name: 'SearchNewsItem',
		props: ['newsInfo'],
		data() {
			return {}
		},
	}
</script>

<style lang="scss">
	.search-news-item {
		image {
			width: 212rpx;
			height: 140rpx;
			border-radius: 8rpx;
			margin-left: auto;
		}
	}
</style>
