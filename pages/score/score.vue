<template>
	<view>
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
				<view>ongoing</view>
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
	export default {
		mixins: [swiperAutoHeight, swiperUTabs],
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
			this.myHeight = this.initScrollHeight(0)
		},
	}
</script>

<style lang="scss"></style>
