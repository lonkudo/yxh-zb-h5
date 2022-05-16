<template>
	<view class="margin-xs flex flex-wrap live-con justify-between">
		<live-item
			v-for="(item, index) in liveList"
			:key="index"
			:liveInfo="item"
		></live-item>
	</view>
</template>

<script>
	import LiveItem from '@/components/Live/LiveItem.vue'
	import pdata from './data.js'
	export default {
		name: 'SearchLive',
		components: {
			LiveItem,
		},
		data() {
			return {
				liveList: pdata,
			}
		},
	}
</script>

<style lang="scss"></style>
