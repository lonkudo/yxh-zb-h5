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
			<search-ret-title :title="'Host'"></search-ret-title>
			<search-host></search-host>
			<search-ret-title :title="'Schedule'"></search-ret-title>
			<search-schedule></search-schedule>
			<search-ret-title :title="'Live'"></search-ret-title>
			<search-live></search-live>
			<search-ret-title :title="'News'"></search-ret-title>
			<search-news></search-news>
		</scroll-view>
	</view>
</template>

<script>
	import SearchPageHeader from '@/components/SearchPageHeader/SearchPageHeader.vue'
	import SearchRetTitle from '@/components/SearchRetTitle/SearchRetTitle.vue'
	import SearchHost from '@/components/SearchHost/SearchHost.vue'
	import SearchSchedule from '@/components/SearchSchedule/SearchSchedule.vue'
	import SearchLive from '@/components/SearchLive/SearchLive.vue'
	import SearchNews from '@/components/SearchNews/SearchNews.vue'
	export default {
		components: {
			SearchPageHeader,
			SearchRetTitle,
			SearchHost,
			SearchSchedule,
			SearchLive,
			SearchNews,
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
