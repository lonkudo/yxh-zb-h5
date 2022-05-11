<template>
	<view v-if="showTabs">
		<u-tabs
			:list="tabs"
			lineWidth="30"
			lineColor="#02b875"
			:activeStyle="{
				color: '#02b875',
				fontWeight: 'bold',
				transform: 'scale(1.05)',
			}"
			:inactiveStyle="{
				color: '#606266',
				transform: 'scale(1)',
			}"
			itemStyle="padding-left: 15px; padding-right: 15px; height: 44px; background-color: white"
			:scrollable="scrollable"
		></u-tabs>
	</view>
</template>

<script>
	export default {
		name: 'MyUTabs',
		props: {
			showTabs: {
				type: Boolean,
				default: true,
			},
			tabs: {
				type: Array,
				default: () => {
					return []
				},
			},
			scrollable: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {}
		},
	}
</script>

<style lang="scss"></style>
