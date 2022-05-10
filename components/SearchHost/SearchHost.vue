<template>
	<view>
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
	import MyButton from '@/components/MyButton/MyButton.vue'
	export default {
		name: 'SearchHost',
		components: {
			SearchHostItem,
			MyButton
		},
		data() {
			return {
				hostList: pdata,
			}
		},
	}
</script>

<style lang="scss"></style>
