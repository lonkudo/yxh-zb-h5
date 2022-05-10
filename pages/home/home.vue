<template>
	<view class="flex flex-direction">
		<search-header class="top"></search-header>
		<scroll-view scroll-y="true" class="middle b-f6">
			<recommend-slider></recommend-slider>
			<system-informs-slider></system-informs-slider>
			<home-title :title="'Popular game'"></home-title>
			<popular-game></popular-game>
			<home-title :title="'Live'"></home-title>
			<live></live>
			<home-title :title="'Videos'"></home-title>
			<videos></videos>
			<home-title :title="'Sport news'"></home-title>
			<news></news>
			<view>text</view>
			<view>text</view> <view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
		</scroll-view>
	</view>
</template>

<script>
	import SearchHeader from '@/components/SearchHeader/index.vue'
	import RecommendSlider from '@/components/RecommendSlider/RecommendSlider.vue'
	import SystemInformsSlider from '@/components/SystemInformsSlider/SystemInformsSlider.vue'
	import PopularGame from '@/components/PopularGame/PopularGame.vue'
	import Live from '@/components/Live/Live.vue'
	import Videos from '@/components/Videos/Videos.vue'
	import News from '@/components/News/News.vue'
	import HomeTitle from '@/components/HomeTitle/HomeTitle.vue'

	export default {
		components: {
			SearchHeader,
			RecommendSlider,
			SystemInformsSlider,
			PopularGame,
			Live,
			Videos,
			News,
			HomeTitle,
		},
		data() {
			return {}
		},
		methods: {},
	}
</script>

<style lang="scss">
	.top {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}
	.middle {
		position: fixed;
		top: 90rpx;
		left: 0;
		right: 0;
		bottom: 100rpx;
		.slider {
		}
	}
</style>
