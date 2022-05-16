<template>
	<view class="padding-xs"
		><discover-video-item
			v-for="(item, index) in videoList"
			:key="index"
			:videoInfo="item"
		></discover-video-item
	></view>
</template>

<script>
	import DiscoverVideoItem from './DiscoverVideoItem'
	import pdata from './data'
	export default {
		name: 'DiscoverVideo',
		components: {
			DiscoverVideoItem,
		},
		data() {
			return {
				videoList: pdata,
			}
		},
	}
</script>

<style lang="scss"></style>
