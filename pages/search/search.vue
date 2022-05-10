<template>
	<view class="flex flex-direction">
		<view>
			<search-page-header></search-page-header>
		</view>
		<view v-if="showTabs">
			<u-tabs
				:list="searchTabs"
				lineWidth="30"
				lineColor="#02b875"
				:activeStyle="{
					color: '#02b875',
					fontWeight: 'bold',
					transform: 'scale(1.05)',
				}"
				:inactiveStyle="{
					color: '#606266',
					transform: 'scale(1)',
				}"
				itemStyle="padding-left: 15px; padding-right: 15px; height: 44px; background-color: white"
				:scrollable="false"
			></u-tabs>
		</view>
		<scroll-view scroll-y="true" class="b-f6">
			<find-title :title="'Recommand Attention'"></find-title>
			<attention></attention>
			<find-title :title="'Today\'s Recommend'"></find-title>
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
			RecommendNews
		},
		data() {
			return {
				showTabs: false,
				searchTabs: [
					{ name: 'All' },
					{ name: 'Host' },
					{ name: 'Schedule' },
					{ name: 'Live' },
					{ name: 'News' },
				],
			}
		},
		methods: {},
	}
</script>

<style lang="scss"></style>
