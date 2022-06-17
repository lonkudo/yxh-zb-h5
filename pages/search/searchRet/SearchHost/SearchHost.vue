<template>
	<view v-if="hostList.length > 0">
		<search-host-item
			v-for="(item, index) in hostList"
			:key="index"
			:hostInfo="item"
		></search-host-item>
	</view>
</template>

<script>
	import SearchHostItem from './SearchHostItem.vue'
	import pdata from './data.js'

	export default {
		name: 'SearchHost',
		props: {
			hostList: {
				type: Array,
				default() {
					return []
				},
			},
		},
		components: {
			SearchHostItem,
		},
		data() {
			return {}
		},
	}
</script>

<style lang="scss"></style>
