<template>
	<view class="flex flex-direction">
		<view>
			<search-page-header></search-page-header>
		</view>
		<scroll-view scroll-y="true" class="b-f6">
			<find-title :title="'Recommand Attention'"></find-title>
			<attention></attention>
			<find-title :title="'Today\'s Recommend'"></find-title>
			<recommend-news></recommend-news>
		</scroll-view>
	</view>
</template>

<script>
	import SearchPageHeader from './searchRet/SearchPageHeader/SearchPageHeader.vue'
	import FindTitle from './search/FindTitle/FindTitle.vue'
	import Attention from './search/Attention/Attention.vue'
	import RecommendNews from './search/RecommendNews/RecommendNews.vue'
	export default {
		components: {
			SearchPageHeader,
			FindTitle,
			Attention,
			RecommendNews,
		},
		data() {
			return {}
		},
		methods: {},
	}
</script>

<style lang="scss"></style>
