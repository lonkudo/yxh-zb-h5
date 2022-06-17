<template>
	<view>
		<view>
			<view
				class="flex align-center padding-xs padding-top-sm padding-bottom-sm justify-between b-f"
			>
				<view class="flex align-center b-f4 input-group margin-left-sm"
					><text class="iconfont icon-sousuo fs-32 margin-right-sm"></text
					><input type="text" placeholder="" @input="searchMsgChanged"
				/></view>
				<view class="margin-right-sm"
					><view
						class="cancel-btn flex align-center justify-around padding-xs"
						@tap="go('back')"
						><text class="fs-28 fc-b-f">cancel</text></view
					></view
				>
			</view>
			<!-- <search-page-header></search-page-header> -->
		</view>
		<view class="flex flex-direction" v-show="!showRec">
			<scroll-view scroll-y="true" class="b-f6">
				<find-title :title="'Recommand Attention'"></find-title>
				<attention :AttentionList="recHostList"></attention>
				<find-title :title="'Today\'s Recommend'"></find-title>
				<recommend-news :newsList="recNewsList"></recommend-news>
			</scroll-view>
		</view>
		<view class="flex flex-direction" v-show="showRet">
			<view style="height: 2000px" v-if="initSwiper"></view>
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
			<view class="fix-bottom">
				<swiper
					:current="swiperCurrent"
					@transition="transition"
					@animationfinish="animationfinish"
					:style="{ height: myHeight + 'rpx' }"
				>
					<swiper-item class="swiper-item" :key="0" style="height: 100%">
						<scroll-view
							scroll-y="true"
							class="b-f6"
							style="height: 100%; padding-bottom: 20rpx"
						>
							<search-ret-title :title="'Host'"></search-ret-title>
							<search-host :hostList="hostList"></search-host>
							<search-ret-title :title="'Schedule'"></search-ret-title>
							<search-schedule :scheduleList="scheduleList"></search-schedule>
							<search-ret-title :title="'Live'"></search-ret-title>
							<search-live :liveList="liveList"></search-live>
							<search-ret-title :title="'News'"></search-ret-title>
							<search-news :newsList="newsList"></search-news>
						</scroll-view>
					</swiper-item>
					<swiper-item class="swiper-item" :key="1" style="height: 100%">
						<scroll-view
							scroll-y="true"
							class="b-f6"
							style="height: 100%; padding-bottom: 20rpx"
						>
							<search-ret-title :title="'Host'"></search-ret-title>
							<search-host :hostList="hostList"></search-host>
						</scroll-view>
					</swiper-item>
					<swiper-item class="swiper-item" :key="2" style="height: 100%">
						<scroll-view
							scroll-y="true"
							class="b-f6"
							style="height: 100%; padding-bottom: 20rpx"
						>
							<search-ret-title :title="'Schedule'"></search-ret-title>
							<search-schedule :scheduleList="scheduleList"></search-schedule>
						</scroll-view>
					</swiper-item>
					<swiper-item class="swiper-item" :key="3" style="height: 100%">
						<scroll-view
							scroll-y="true"
							class="b-f6"
							style="height: 100%; padding-bottom: 20rpx"
						>
							<search-ret-title :title="'Live'"></search-ret-title>
							<search-live :liveList="liveList"></search-live>
						</scroll-view>
					</swiper-item>
					<swiper-item class="swiper-item" :key="4" style="height: 100%">
						<scroll-view
							scroll-y="true"
							class="b-f6"
							style="height: 100%; padding-bottom: 20rpx"
						>
							<search-ret-title :title="'News'"></search-ret-title>
							<search-news :newsList="newsList"></search-news>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import SearchPageHeader from './searchRet/SearchPageHeader/SearchPageHeader.vue'
	import FindTitle from './search/FindTitle/FindTitle.vue'
	import Attention from './search/Attention/Attention.vue'
	import RecommendNews from './search/RecommendNews/RecommendNews.vue'

	import SearchRetTitle from './searchRet/SearchRetTitle/SearchRetTitle.vue'
	import SearchHost from './searchRet/SearchHost/SearchHost.vue'
	import SearchSchedule from './searchRet/SearchSchedule/SearchSchedule.vue'
	import SearchLive from './searchRet/SearchLive/SearchLive.vue'
	import SearchNews from './searchRet/SearchNews/SearchNews.vue'
	import { swiperAutoHeight, swiperUTabs } from '@/mixin'

	import {
		getHostList,
		getScheduleList,
		getStudioList,
		getNewsList,
		getRecommand,
	} from '@/api/search'

	export default {
		mixins: [swiperAutoHeight, swiperUTabs],
		components: {
			SearchPageHeader,
			FindTitle,
			Attention,
			RecommendNews,
			SearchRetTitle,
			SearchHost,
			SearchSchedule,
			SearchLive,
			SearchNews,
		},
		computed: {
			showRec: function () {
				/* 展示推荐 */
				if (this.msg !== '') {
					return true
				} else {
					return false
				}
			},
			showRet: function () {
				/* 先让swiper加载，不然动态 渲染出来的swiper 下标宽度会不对 */
				if (this.initSwiper) {
					/* initSwiper true的时候把swiper用一个view 挤出屏幕, 从而不闪烁 */
					return true
				} else {
					if (this.msg !== '') {
						return true
					} else {
						return false
					}
				}
			},
		},
		data() {
			return {
				msg: '',
				menu: [
					{ name: 'All' },
					{ name: 'Host' },
					{ name: 'Schedule' },
					{ name: 'Live' },
					{ name: 'News' },
				],
				myHeight: 0,
				hostList: [],
				scheduleList: [],
				liveList: [],
				newsList: [],
				recHostList: [],
				recNewsList: [],
				hostPage: {
					num: 20,
				},
				livePage: {
					num: 20,
				},
				newsPage: {
					num: 20,
				},
				schedulePage: {
					page: 1,
					size: 20,
					total: 0,
				},
				initSwiper: true,
			}
		},
		onLoad() {
			this.myHeight = this.initScrollHeight(176)
			this.getRecommand()
			setTimeout(() => {
				this.initSwiper = false
			}, 5)
		},
		methods: {
			searchMsgChanged(event) {
				this.msg = event.target.value
				this.getList(this.msg)
				this.getScheduleList(this.msg)
				this.getLiveList(this.msg)
				this.getNewsList(this.msg)
			},
			go(val) {
				if (val === 'back') {
					uni.navigateBack({
						delta: 1,
					})
				}
			},
			getRecommand() {
				const uid = this.isEmpty(this.uid) ? '0' : this.uid
				getRecommand(1, uid)
					.then((res) => {
						this.recNewsList = res.info.news
						this.recHostList = res.info.user
					})
					.catch((err) => {
						console.log(err)
					})
			},
			getList(keyword) {
				if (!keyword) {
					this.hostList = []
					return
				}
				let num = this.pageNum
				let uid = this.isEmpty(this.uid) ? '100' : this.uid
				getHostList(num, keyword, uid).then((res) => {
					this.hostList = res.info
				})
			},
			getScheduleList(keyword) {
				// keyword 空的情况不查询
				if (!keyword) {
					this.scheduleList = []
					return
				}
				// let num = this.pageNum;
				getScheduleList(
					this.schedulePage.page,
					this.schedulePage.size,
					keyword
				).then((res) => {
					this.scheduleList = res.info
					this.schedulePage.total = parseInt(res.count)
					this.scheduleList.forEach((item) => {
						if (item.status_id > 1 && item.status_id < 9) {
							item['isLive'] = true
						} else {
							item['isLive'] = false
						}
					})
				})
			},
			getLiveList(keyword) {
				// keyword 空的情况不查询
				if (!keyword) {
					this.liveList = []
					return
				}
				let num = this.livePage.num
				getStudioList(num, keyword).then((res) => {
					this.liveList = res.info
				})
			},
			getNewsList(keyword) {
				// keyword 空的情况不查询
				console.log('---11----11----11----11----11---')
				if (!keyword) {
					this.newsList = []
					return
				}
				let num = this.newsPage.num
				getNewsList(num, keyword)
					.then((res) => {
						console.log('---222----222----222----222----222---')
						this.newsList = res.info
					})
					.catch((err) => {
						console.log('err', err)
					})
			},
		},
	}
</script>

<style lang="scss">
	.input-group {
		height: 56rpx;
		border-radius: 28rpx;
		padding: 24rpx;
		input {
			color: #999;
			width: 450rpx;
		}
	}
	.cancel-btn {
		width: 120rpx;
		height: 50rpx;
		background-color: #999;
		border-radius: 10rpx;
	}
</style>
