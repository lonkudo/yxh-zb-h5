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
	import LiveItem from './LiveItem.vue'
	export default {
		name: 'Live',
		components: {
			LiveItem,
		},
		props: {
			liveList: {
				type: Array,
				default: () => {
					return []
				},
			},
		},
		data() {
			return {}
		},
	}
</script>

<style lang="scss"></style>
