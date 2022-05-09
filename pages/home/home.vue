<template>
	<view class="flex flex-direction">
		<search-header class="top"></search-header>
			<scroll-view scroll-y="true"  class="middle  b-f6">
			<recommend-slider></recommend-slider>
			<system-informs-slider></system-informs-slider>
			<view class="margin-xs margin-top-sm margin-bottom-sm flex align-center justify-between"><text class="fc-b-0 fw-9">Popular game</text><text class="fc-b-9">More ></text></view>
			<popular-game></popular-game>
			<view class="margin-xs margin-top-sm margin-bottom-sm flex align-center justify-between"><text class="fc-b-0 fw-9">Live</text><text class="fc-b-9">More ></text></view>
			<live></live>
			<view class="margin-xs margin-top-sm margin-bottom-sm flex align-center justify-between"><text class="fc-b-0 fw-9">Videos</text><text class="fc-b-9">More ></text></view>
			<videos></videos>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>		<view>text</view>
			<view>text</view>
			<view>text</view>
			<view>text</view>
			
		
			</scroll-view>

		<view class="bottom">bottom</view>

	</view>
</template>


<script>
	import SearchHeader from '@/components/SearchHeader/index.vue'
	import RecommendSlider from '@/components/RecommendSlider/RecommendSlider.vue'
	import SystemInformsSlider from '@/components/SystemInformsSlider/SystemInformsSlider.vue'
	import PopularGame from '@/components/PopularGame/PopularGame.vue'
	import Live from '@/components/Live/Live.vue'
	import Videos from '@/components/Videos/Videos.vue'
	
	export default {
		components: {
			SearchHeader,
			RecommendSlider,
			SystemInformsSlider,
			PopularGame,
			Live,
			Videos
		},
		data() {
			return {

			};
		},
		methods: {

		}
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
	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: white;
	}
</style>
