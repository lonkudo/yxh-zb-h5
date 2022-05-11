<template>
	<view>
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

<style lang="scss"></style>
