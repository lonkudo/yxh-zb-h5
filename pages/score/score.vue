<template>
	<view>
		<u-navbar
			:is-back="false"
			:title="'Score'"
			:title-bold="true"
			:title-color="'#000'"
			:back-icon-color="'#000'"
			:back-icon-size="40"
		>
			<navigator :url="'settings'" slot="default"
				><text class="margin-left-lg iconfont icon-shezhi fs-40"></text
			></navigator>
			<navigator :url="'filter'" slot="right"
				><text class="margin-right-lg iconfont icon-shaixuan fs-40"></text
			></navigator>
		</u-navbar>
		<u-tabs-swiper
			ref="uTabs"
			:list="menu"
			:current="current"
			@change="tabsChange"
			:is-scroll="false"
			swiperWidth="750"
			active-color="#02b875"
			font-size="24"
			gutter="0"
		></u-tabs-swiper>
		<swiper
			:current="swiperCurrent"
			@transition="transition"
			@animationfinish="animationfinish"
			:style="{ height: myHeight + 'rpx' }"
		>
			<swiper-item class="swiper-item" :key="'Ongoing'" @touchmove.stop="">
				<scroll-view
					scroll-y
					:id="'content-wrap' + 'Ongoing'"
					:style="{ height: myHeight + 'rpx' }"
				>
					<view class="b-f margin-top-sm list">
						<score-item></score-item>
						<score-item></score-item>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item
				class="swiper-item"
				:key="'Finished'"
				@touchmove.stop=""
				:style="{ height: myHeight + 'rpx' }"
			>
				finished
			</swiper-item>
			<swiper-item
				class="swiper-item"
				:key="'Schedule'"
				@touchmove.stop=""
				:style="{ height: myHeight + 'rpx' }"
			>
				Schedule
			</swiper-item>
			<swiper-item
				class="swiper-item"
				:key="'Subscribe'"
				@touchmove.stop=""
				:style="{ height: myHeight + 'rpx' }"
			>
				Subscribe
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { swiperAutoHeight, swiperUTabs } from '@/mixin'
	import ScoreItem from './components/ScoreItem.vue'
	export default {
		mixins: [swiperAutoHeight, swiperUTabs],
		components: { ScoreItem },
		data() {
			return {
				myHeight: 0,
				menu: [
					{ name: 'Ongoing' },
					{ name: 'Finished' },
					{ name: 'Schedule' },
					{ name: 'Subscribe' },
				],
			}
		},
		onLoad() {
			this.myHeight = this.initScrollHeight(268)
		},
	}
</script>

<style lang="scss">
	.list {
		border-top: 1rpx solid #f1f1f1;
		border-bottom: 1rpx solid #f1f1f1;
		> :nth-child(n) {
			border-top: 1rpx solid #f1f1f1;
		}
	}
</style>
