<template>
	<view class="flex">
		<search-page-header></search-page-header>
		<scroll-view scroll-y="true"> </scroll-view>
	</view>
</template>

<script>
	import SearchPageHeader from '@/components/SearchPageHeader/SearchPageHeader.vue'
	export default {
		data() {
			return {}
		},
		components: {
			SearchPageHeader,
		},
	}
</script>

<style lang="scss"></style>
