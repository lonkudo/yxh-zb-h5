<template>
	<view class="slider b-f margin-xs">
		<u-swiper
			:list="list1"
			@change="change"
			@click="click"
			indicator
			indicatorMode="dot"
		></u-swiper>
	</view>
</template>

<script>
	export default {
		name: 'RecommendSlider',
		data() {
			return {
				list1: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
			}
		},
		methods: {
			change() {},
			click() {},
		},
	}
</script>

<style lang="scss"></style>
