<template>
	<view v-if="newsList.length > 0">
		<search-news-item
			v-for="(item, index) in newsList"
			:key="index"
			:newsInfo="item"
		></search-news-item>
	</view>
</template>

<script>
	import SearchNewsItem from './SearchNewsItem.vue'
	export default {
		name: 'SearchNews',
		props: ['newsList'],
		components: {
			SearchNewsItem,
		},
		data() {
			return {}
		},
	}
</script>

<style lang="scss"></style>
