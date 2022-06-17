<template>
	<view
		class="margin-xs flex flex-wrap live-con justify-between"
		v-if="liveList.length > 0"
	>
		<live-item
			v-for="(item, index) in liveList"
			:key="index"
			:liveInfo="item"
		></live-item>
	</view>
</template>

<script>
	import LiveItem from '@/pages/home/home/Live/LiveItem.vue'
	export default {
		name: 'SearchLive',
		props: ['liveList'],
		components: {
			LiveItem,
		},
		data() {
			return {}
		},
	}
</script>

<style lang="scss"></style>
