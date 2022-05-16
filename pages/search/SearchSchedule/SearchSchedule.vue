<template>
	<view>
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
		data() {
			return {
				scheduleList: pdata,
			}
		},
	}
</script>

<style lang="scss"></style>
