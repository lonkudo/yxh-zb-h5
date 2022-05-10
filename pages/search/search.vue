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
	import SearchPageHeader from '@/components/SearchPageHeader/SearchPageHeader.vue'
	import FindTitle from '@/components/FindTitle/FindTitle.vue'
	import Attention from '@/components/Attention/Attention.vue'
	import RecommendNews from '@/components/RecommendNews/RecommendNews.vue'
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
