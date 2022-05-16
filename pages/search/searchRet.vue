<template>
	<view class="flex flex-direction">
		<view>
			<search-page-header></search-page-header>
			<u-tabs-swiper
				ref="uTabs"
				:list="menu"
				:current="current"
				@change="tabsChange"
				:is-scroll="false"
				swiperWidth="750"
				active-color="#02b875"
				class="fix-top"
			></u-tabs-swiper>
		</view>
		<view class="fix-bottom">
			<swiper
				:current="swiperCurrent"
				@transition="transition"
				@animationfinish="animationfinish"
				style="height: 100%"
			>
				<swiper-item class="swiper-item" :key="0" style="height: 100%">
					<scroll-view
						scroll-y="true"
						class="b-f6"
						style="height: 100%; padding-bottom: 20rpx"
					>
						<search-ret-title :title="'Host'"></search-ret-title>
						<search-host></search-host>
						<search-ret-title :title="'Schedule'"></search-ret-title>
						<search-schedule></search-schedule>
						<search-ret-title :title="'Live'"></search-ret-title>
						<search-live></search-live>
						<search-ret-title :title="'News'"></search-ret-title>
						<search-news></search-news>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item" :key="1" style="height: 100%">
					<scroll-view
						scroll-y="true"
						class="b-f6"
						style="height: 100%; padding-bottom: 20rpx"
					>
						<search-ret-title :title="'Host'"></search-ret-title>
						<search-host></search-host>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item" :key="2" style="height: 100%">
					<scroll-view
						scroll-y="true"
						class="b-f6"
						style="height: 100%; padding-bottom: 20rpx"
					>
						<search-ret-title :title="'Schedule'"></search-ret-title>
						<search-schedule></search-schedule>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item" :key="3" style="height: 100%">
					<scroll-view
						scroll-y="true"
						class="b-f6"
						style="height: 100%; padding-bottom: 20rpx"
					>
						<search-ret-title :title="'Live'"></search-ret-title>
						<search-live></search-live>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item" :key="4" style="height: 100%">
					<scroll-view
						scroll-y="true"
						class="b-f6"
						style="height: 100%; padding-bottom: 20rpx"
					>
						<search-ret-title :title="'News'"></search-ret-title>
						<search-news></search-news>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import SearchPageHeader from './searchRet/SearchPageHeader/SearchPageHeader.vue'
	import SearchRetTitle from './searchRet/SearchRetTitle/SearchRetTitle.vue'
	import SearchHost from './searchRet/SearchHost/SearchHost.vue'
	import SearchSchedule from './searchRet/SearchSchedule/SearchSchedule.vue'
	import SearchLive from './searchRet/SearchLive/SearchLive.vue'
	import SearchNews from './searchRet/SearchNews/SearchNews.vue'
	export default {
		components: {
			SearchPageHeader,
			SearchRetTitle,
			SearchHost,
			SearchSchedule,
			SearchLive,
			SearchNews,
		},
		data() {
			return {
				menu: [
					{ name: 'All' },
					{ name: 'Host' },
					{ name: 'Schedule' },
					{ name: 'Live' },
					{ name: 'News' },
				],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			}
		},
		methods: {
			tabsChange(index) {
				this.swiperCurrent = index
			},
			transition(e) {
				let dx = e.detail.dx
				this.$refs.uTabs.setDx(dx)
			},
			animationfinish(e) {
				let current = e.detail.current
				this.$refs.uTabs.setFinishCurrent(current)
				this.swiperCurrent = current
				this.current = current
			},
		},
	}
</script>

<style lang="scss">
	.fix-bottom {
		position: fixed;
		top: 180rpx;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
