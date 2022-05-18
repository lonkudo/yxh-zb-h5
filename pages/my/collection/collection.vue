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
			<swiper-item
				class="swiper-item"
				:key="0"
				style="height: 100%"
				@touchmove.stop=""
			>
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
							<list-swipe-action
								:show="item.show"
								:index="index"
								:myData="time.list"
								@click="click"
								@open="open(index, idx, newsList, 'news')"
								:options="options"
								v-for="(item, index) in time.list"
								:key="index"
								btn-width="180"
							>
								<view class="flex">
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
							</list-swipe-action>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item
				class="swiper-item"
				:key="1"
				style="height: 100%"
				@touchmove.stop=""
			>
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
							<list-swipe-action
								:show="item.show"
								:index="index"
								:myData="time.list"
								@click="click"
								@open="open(index, idx, videoList, 'video')"
								:options="options"
								v-for="(item, index) in time.list"
								:key="index"
								btn-width="280"
							>
								<view class="flex">
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
							</list-swipe-action>
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
	import listSwipeAciton from '@/components/list-swipe-action/list-swipe-action.vue'
	import { swiperAutoHeight, swiperUTabs, userComputed } from '@/mixin'
	export default {
		mixins: [swiperAutoHeight, swiperUTabs, userComputed],
		components: {
			listSwipeAciton,
		},
		data() {
			return {
				menu: [{ name: 'News' }, { name: 'Video' }],
				newsList: newsData,
				videoList: videoData,
				options: [
					{
						text: 'delete',
						style: {
							backgroundColor: '#dd524d',
						},
					},
				],
			}
		},
		onLoad() {
			this.handleData(this.newsList)
			this.handleData(this.videoList)
		},
		methods: {
			onReachBottom() {
				console.log('bootom')
			},
			tabsChange(index) {
				this.swiperCurrent = index
				console.log('tasChanged')
				if (index === 0) {
					this.newsList = newsData
				} else {
					this.videoList = videoData
				}
			},
			click(index, index1, list) {
				list.splice(index, 1)
				this.$u.toast(`deleted`)
			},
			open(index, outerIndex, list, type) {
				/* 打开一个 u-swiper-action 关闭其他的。 */
				this.handleData(list)
				list[outerIndex].list[index].show = true
				list = JSON.parse(JSON.stringify(list))
				if (type === 'news') {
					this.newsList = list
				} else if (type === 'video') {
					this.videoList = list
				}
			},
			handleData(arr) {
				/* 给每个item添加show来配合 u-swiper-action 滑动  */
				arr.forEach((element) => {
					element.list.forEach((ele) => {
						ele.show = false
					})
				})
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
