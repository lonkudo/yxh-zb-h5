<template>
	<view>
		<search-news-item
			v-for="(item, index) in newsList"
			:key="index"
			:newsInfo="item"
		></search-news-item>
	</view>
</template>

<script>
	import SearchNewsItem from './SearchNewsItem.vue'
	import pdata from './data.js'
	export default {
		name: 'SearchNews',
		components: {
			SearchNewsItem,
		},
		data() {
			return {
				newsList: pdata,
			}
		},
	}
</script>

<style lang="scss"></style>
