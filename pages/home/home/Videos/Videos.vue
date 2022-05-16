<template>
	<view>
		<video-item v-for="(item,index) in videoList" :key="index" :videoInfo="item"></video-item>
	</view>
</template>

<script>
	import VideoItem from './VideoItem.vue'
	import pdata from './data.js'
	export default {
		name:"Videos",
		components: {
			VideoItem
		},
		data() {
			return {
				videoList: pdata,
			};
		}
	}
</script>

<style lang="scss">
	
</style>