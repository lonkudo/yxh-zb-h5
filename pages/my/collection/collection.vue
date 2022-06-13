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
			@change="changeSwiper"
			:style="{ height: swiperHeight + 'px' }"
		>
			<swiper-item class="swiper-item" :key="0" @touchmove.stop="">
				<scroll-view scroll-y :id="'content-wrap' + 0">
					<template v-if="collectionList.length > 0">
						<view
							class="flex flex-direction"
							v-for="(time, idx) in collectionList"
							:key="'t' + idx"
						>
							<view class="margin-xs"
								><text class="fs-20">{{ time.time }}</text></view
							>
							<view class="b-f padding-xs list">
								<my-swipe-action
									:show="item.show"
									:index="index"
									:myData="time.list"
									@click="click"
									@open="open(index, idx, collectionList, 'news')"
									:options="options"
									v-for="(item, index) in time.list"
									:key="index"
									btn-width="180"
									:type="2"
								>
									<view class="flex" @tap="go(item)">
										<image
											:src="item.mediaw.img"
											mode="aspectFill"
											class="br-8"
											style="width: 180rpx; height: 100rpx"
										/>
										<view class="margin-left-xs flex flex-direction justify-between"
											><text class="f-hide w-500 fs-20">{{ item.mediaw.caption }}</text
											><text class="fc-b-9 fs-20">{{
												item.mediaw.create_time | formatGiven('yyyy-MM-dd hh:ss')
											}}</text></view
										>
									</view>
								</my-swipe-action>
							</view>
						</view>
					</template>
					<template v-else>
						<no-collection></no-collection>
					</template>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item" :key="1" @touchmove.stop="">
				<scroll-view scroll-y :id="'content-wrap' + 1">
					<template v-if="videoList.length > 0">
						<view
							class="flex flex-direction"
							v-for="(time, idx) in videoList"
							:key="'v' + idx"
						>
							<view class="margin-xs"
								><text class="fs-20">{{ time.time }}</text></view
							>
							<view class="b-f padding-xs list">
								<my-swipe-action
									:show="item.show"
									:index="index"
									:myData="time.list"
									@click="click"
									@open="open(index, idx, videoList, 'video')"
									:options="options"
									v-for="(item, index) in time.list"
									:key="index"
									btn-width="200"
									:type="1"
								>
									<view class="flex" @tap="go(item)">
										<image
											:src="item.mediaw.thumb"
											mode="aspectFill"
											class="br-8"
											style="width: 280rpx; height: 130rpx"
										/>
										<view class="margin-left-xs flex flex-direction justify-end"
											><text class="f-hide w-400 fs-20 margin-auto">{{
												item.mediaw.title
											}}</text
											><text class="fc-b-9 fs-20">{{
												item.user_name || 'user does not exist'
											}}</text>
											<text class="fc-b-9 fs-20">{{
												item.mediaw.addtime | formatGiven('yyyy-MM-dd hh:ss')
											}}</text>
										</view>
									</view>
								</my-swipe-action>
							</view>
						</view>
					</template>
					<template v-else>
						<no-collection></no-collection>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import newsData from './data.js'
	import videoData from './dataVideo.js'
	import MySwipeAciton from '@/components/my-swipe-action/my-swipe-action.vue'
	import { swiperAutoHeight, swiperUTabs } from '@/mixin'

	import { getMyCollection, delMyCollection } from '@/api/my'

	import NoCollection from '@/components/NoCollection/NoCollection.vue'
	export default {
		mixins: [swiperAutoHeight, swiperUTabs],
		components: {
			MySwipeAciton,
			NoCollection,
		},
		data() {
			return {
				menu: [{ name: 'News' }, { name: 'Video' }],
				options: [
					{
						text: 'delete',
						style: {
							backgroundColor: '#dd524d',
						},
					},
				],
				collectionList: [], // 新闻列表
				collectionPage: { p: 1, num: 10, show: true },
				videoList: [], // 视频列表
				videoPage: { p: 1, num: 10, show: true },
			}
		},
		onLoad() {
			this.getMyCollection(
				this.uid,
				this.collectionPage.p,
				this.token,
				2,
				this.collectionPage.num
			)
			this.getMyCollection(
				this.uid,
				this.videoPage.p,
				this.token,
				1,
				this.videoPage.num
			)
		},
		methods: {
			go(item) {
				console.log('---item----item----item----item----item---', item)
				console.log('')
				if (item.type === '2') {
					uni.navigateTo({
						url: '/pages/discover/detail/newsDetail?id=' + item.mediaid,
					})
				} else {
					uni.navigateTo({
						url: '/pages/discover/detail/videoDetail?id=' + item.mediaid,
					})
				}
			},
			onReachBottom() {
				console.log('bootom')
			},
			tabsChange(index) {
				this.swiperCurrent = index
			},
			click(index, index1, list, type) {
				let mediaid = list[index].mediaid
				this.delMyCollection(list[index].mediaid, type, () => {
					list.splice(index, 1)
					this.$u.toast(`deleted`)
				})
			},
			open(index, outerIndex, list, type) {
				/* 打开一个 u-swiper-action 关闭其他的。 */
				this.handleData(list)
				list[outerIndex].list[index].show = true
				list = JSON.parse(JSON.stringify(list))
				if (type === 'news') {
					this.collectionList = list
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
			getMyCollection(token, uid, p, type, num) {
				getMyCollection(token, uid, p, type, num)
					.then((res) => {
						if (type === 1) {
							// 1视频2新闻
							this.videoList = res.info
						} else if (type === 2) {
							this.collectionList = res.info
						}
					})
					.catch((err) => {
						// this.$message.error('2')
					})
					.finally(() => {
						this.$nextTick(() => {
							this.setSwiperHeight()
						})
					})
			},
			/* 删除我的收藏 */
			delMyCollection(mediaid, type, callback) {
				delMyCollection(this.uid, this.token, mediaid, type)
					.then((res) => {
						callback()
					})
					.catch((err) => {
						// this.$message.error('3')
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
