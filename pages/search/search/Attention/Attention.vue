<template>
	<scroll-view scroll-x="true" v-if="AttentionList.length > 0">
		<view class="flex">
			<attention-item
				v-for="(item, index) in AttentionList"
				:key="index"
				:attentionInfo="item"
			></attention-item>
		</view>
	</scroll-view>
</template>

<script>
	import AttentionItem from './AttentionItem.vue'
	import pdata from './data.js'
	export default {
		name: 'Attention',
		props: ['AttentionList'],
		components: {
			AttentionItem,
		},
		data() {
			return {}
		},
	}
</script>

<style lang="scss"></style>
