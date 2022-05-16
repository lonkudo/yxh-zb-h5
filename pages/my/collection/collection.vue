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
		></u-tabs-swiper>
		<swiper
			:current="swiperCurrent"
			@transition="transition"
			@animationfinish="animationfinish"
			style="height: 2000rpx"
		>
			<swiper-item class="swiper-item" :key="0" style="height: 100%">
				<scroll-view scroll-y style="width: 100%; height: 100%">
					<view
						class="flex flex-direction"
						v-for="(time, idx) in newsList"
						:key="'t' + idx"
					>
						<view class="margin-xs"
							><text class="fs-20">{{ time.time }}</text></view
						>
						<view class="b-f padding-xs list">
							<view v-for="(item, index) in time.list" :key="index" class="flex">
								<image
									:src="item.mediaw.thumb"
									mode="aspectFill"
									class="br-8"
									style="width: 180rpx; height: 100rpx"
								/>
								<view class="margin-left-xs flex flex-direction justify-between"
									><text class="f-hide w-500 fs-20">{{ item.mediaw.title }}</text
									><text class="fc-b-9 fs-20">{{
										item.mediaw.addtime | formatGiven('yyyy-MM-dd hh:ss')
									}}</text></view
								>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item" :key="1" style="height: 100%">
				<scroll-view scroll-y style="width: 100%; height: 100%">
					<view
						class="flex flex-direction"
						v-for="(time, idx) in videoList"
						:key="'v' + idx"
					>
						<view class="margin-xs"
							><text class="fs-20">{{ time.time }}</text></view
						>
						<view class="b-f padding-xs list">
							<view v-for="(item, index) in time.list" :key="index" class="flex">
								<image
									:src="item.mediaw.img"
									mode="aspectFill"
									class="br-8"
									style="width: 300rpx; height: 130rpx"
								/>
								<view class="margin-left-xs flex flex-direction justify-end"
									><text class="f-hide w-500 fs-20 margin-auto">{{
										item.mediaw.caption
									}}</text
									><text class="fc-b-9 fs-20">{{
										item.user_name || 'user does not exist'
									}}</text>
									<text class="fc-b-9 fs-20">{{
										item.mediaw.addtime | formatGiven('yyyy-MM-dd hh:ss')
									}}</text>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import newsData from './data.js'
	import videoData from './dataVideo.js'
	export default {
		data() {
			return {
				menu: [{ name: 'News' }, { name: 'Video' }],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				newsList: newsData,
				videoList: videoData,
			}
		},
		methods: {
			onReachBottom() {
				console.log('bootom')
			},
			tabsChange(index) {
				this.swiperCurrent = index
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
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
	.list {
		view:nth-child(n) {
			margin-bottom: 20rpx;
		}
		view:nth-last-child(1) {
			margin-bottom: 0rpx;
		}
	}
	.margin-auto {
		margin-bottom: auto;
	}
</style>
