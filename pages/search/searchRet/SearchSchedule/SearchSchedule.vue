<template>
	<view v-if="scheduleList.length > 0">
		<search-schedule-item
			v-for="(item, index) in scheduleList"
			:key="index"
			:scheduleInfo="item"
		></search-schedule-item>
	</view>
</template>

<script>
	import SearchScheduleItem from './SearchScheduleItem.vue'
	import pdata from './data.js'
	export default {
		name: 'SearchSchedule',
		components: {
			SearchScheduleItem,
		},
		props: ['scheduleList'],
		data() {
			return {}
		},
	}
</script>

<style lang="scss"></style>
