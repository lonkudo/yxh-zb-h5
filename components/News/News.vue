<template>
	<view
		class="margin-xs b-f br-5 padding-top-xs padding-bottom-xs padding-left-sm padding-right-sm news-con"
	>
		<news-item
			class="margin-top-sm margin-bottom-sm"
			v-for="(item, index) in newsList"
			:key="index"
			:newsInfo="item"
		></news-item>
	</view>
</template>

<script>
	import pdata from './data.js'

	import NewsItem from './NewsItem.vue'
	export default {
		name: 'News',
		components: {
			NewsItem,
		},
		data() {
			return {
				newsList: pdata,
			}
		},
	}
</script>

<style lang="scss">
	.news-con {
		view:nth-child(n) {
			border-bottom: 1px solid #e5e5e5;
		}
		view:nth-last-child(1) {
			border-bottom: 0;
		}
	}
</style>
