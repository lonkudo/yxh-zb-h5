<template>
	<view>
		<view>
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
		<swiper
			:current="swiperCurrent"
			@transition="transition"
			@animationfinish="animationfinish"
			style="height: 100%"
			class="middle"
		>
			<swiper-item class="swiper-item" :key="0" style="height: 100%">
				<u-tabs-swiper
					ref="uVideoTabs"
					:list="videoMenu"
					:current="videoCurrent"
					@change="videoTabsChange"
					:is-scroll="false"
					swiperWidth="750"
					active-color="#02b875"
					class="fix-top"
				></u-tabs-swiper>
				<swiper
					:current="swiperVideoCurrent"
					@transition="transitionVideo"
					@animationfinish="animationfinishVideo"
					style="height: 100%"
				>
					<swiper-item
						class="swiper-item"
						v-for="(item, index) in videoMenu"
						:key="index"
						style="height: 100%"
					>
						<scroll-view
							scroll-y
							style="width: 100%; height: 100%; padding-bottom: 270rpx"
							@scrolltolower="onreachBottom"
						>
							<discover-video></discover-video>
						</scroll-view>
					</swiper-item>
				</swiper>
			</swiper-item>
			<swiper-item class="swiper-item" :key="1" style="height: 100%">
				<u-tabs-swiper
					ref="uNewsTabs"
					:list="newsMenu"
					:current="newsCurrent"
					@change="newsTabsChange"
					:is-scroll="false"
					swiperWidth="750"
					active-color="#02b875"
					class="fix-top"
				></u-tabs-swiper>

				<swiper
					:current="swiperNewsCurrent"
					@transition="transitionNews"
					@animationfinish="animationfinishNews"
					style="height: 100%"
				>
					<swiper-item
						class="swiper-item"
						v-for="(item, index) in newsMenu"
						:key="index"
						style="height: 100%"
					>
						<scroll-view
							scroll-y
							style="width: 100%; height: 100%; padding-bottom: 270rpx"
							@scrolltolower="onreachBottom"
						>
							<news></news>
						</scroll-view>
					</swiper-item>
				</swiper>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import DiscoverVideo from './discover/DiscoverVideo/DiscoverVideo.vue'
	import News from '@/pages/home/home/News/News.vue'
	export default {
		components: {
			DiscoverVideo,
			News,
		},
		data() {
			return {
				menu: [{ name: 'Video' }, { name: 'News' }],
				newsMenu: [
					{ name: 'All' },
					{ name: 'Journey' },
					{ name: 'Work' },
					{ name: 'Bonus' },
					{ name: 'Sexy-girl' },
					{ name: 'Self-made' },
					{ name: '	Journey' },
					{ name: 'Date' },
				],
				videoMenu: [
					{ name: 'All' },
					{ name: 'Journey' },
					{ name: 'Work' },
					{ name: 'Bonus' },
					{ name: 'Sexy-girl' },
					{ name: 'Self-made' },
					{ name: '	Journey' },
					{ name: 'Date' },
				],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				newsCurrent: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperNewsCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				videoCurrent: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperVideoCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			}
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index
			},
			videoTabsChange(index) {
				this.swiperVideoCurrent = index
			},
			newsTabsChange(index) {
				this.swiperNewsCurrent = index
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx
				this.$refs.uTabs.setDx(dx)
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current
				this.$refs.uTabs.setFinishCurrent(current)
				this.swiperCurrent = current
				this.current = current
			},
			transitionVideo(e) {
				let dx = e.detail.dx
				this.$refs.uVideoTabs.setDx(dx)
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinishVideo(e) {
				let current = e.detail.current
				this.$refs.uVideoTabs.setFinishCurrent(current)
				this.swiperVideoCurrent = current
				this.videoCurrent = current
			},
			transitionNews(e) {
				let dx = e.detail.dx
				this.$refs.uNewsTabs.setDx(dx)
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinishNews(e) {
				let current = e.detail.current
				this.$refs.uNewsTabs.setFinishCurrent(current)
				this.swiperNewsCurrent = current
				this.newsCurrent = current
			},
			// scroll-view到底部加载更多
			onreachBottom() {},
		},
	}
</script>

<style lang="scss">
	.middle {
		position: fixed;
		top: 80rpx;
		bottom: 100rpx;
		left: 0;
		right: 0;
	}
</style>
