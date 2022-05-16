<template>
	<scroll-view scroll-x="true">
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
		components: {
			AttentionItem,
		},
		data() {
			return {
				AttentionList: pdata,
			}
		},
	}
</script>

<style lang="scss"></style>
