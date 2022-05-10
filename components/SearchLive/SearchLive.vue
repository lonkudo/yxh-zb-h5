<template>
	<view>
		ok
	</view>
</template>

<script>
import LiveItem from '@/components/Live/LiveItem.vue'
import pdata from './data.js'
	export default {
		name:"SearchLive",
		components: {
			LiveItem
		},
		data() {
			return {
				liveList: pdata,
			};
		}
	}
</script>

<style lang="scss">

</style>