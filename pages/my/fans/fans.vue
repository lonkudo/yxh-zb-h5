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
			:style="{ height: myHeight + 'rpx' }"
		>
			<swiper-item class="swiper-item" :key="0" @touchmove.stop="">
				<scroll-view
					scroll-y
					refresher-enabled="true"
					:refresher-triggered="triggeredfollow"
					:refresher-threshold="100"
					refresher-background="#f6f6f6"
					@refresherpulling="onPulling"
					@refresherrefresh="onRefreshfollow"
					@refresherrestore="onRestore"
					@refresherabort="onAbort"
					@scrolltolower="loadMore('follow')"
					:style="{ height: myHeight + 'rpx' }"
					:id="'content-wrap' + 0"
				>
					<template v-if="followList.length > 0">
						<view>
							<fans-item
								v-for="(item, index) in followList"
								:key="index"
								:item="item"
								@onTap="follow(item)"
							></fans-item>
						</view>
						<u-loadmore
							class="h-100"
							:status="statusfollow"
							:icon-type="iconType"
							:load-text="loadText"
						/>
					</template>
					<template v-else>
						<no-content :height="myHeight"></no-content>
					</template>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item" :key="1" @touchmove.stop="">
				<scroll-view
					scroll-y
					:id="'content-wrap' + 1"
					refresher-enabled="true"
					:refresher-triggered="triggeredfans"
					:refresher-threshold="100"
					refresher-background="#f6f6f6"
					@refresherpulling="onPulling"
					@refresherrefresh="onRefreshfans"
					@refresherrestore="onRestore"
					@refresherabort="onAbort"
					@scrolltolower="loadMore('fans')"
					:style="{ height: myHeight + 'rpx' }"
				>
					<template v-if="fansList.length > 0">
						<view :style="{ height: myHeight + 'rpx' }">
							<fans-item
								v-for="(item, index) in fansList"
								:key="index"
								:item="item"
								@onTap="follow(item)"
							></fans-item>
							<u-loadmore
								class="h-100"
								:status="statusfans"
								:icon-type="iconType"
								:load-text="loadText"
							/>
						</view>
					</template>
					<template v-else>
						<no-content :height="myHeight"></no-content>
					</template>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item" :key="2" @touchmove.stop="">
				<scroll-view
					scroll-y
					:id="'content-wrap' + 2"
					refresher-enabled="true"
					:refresher-triggered="triggeredrec"
					:refresher-threshold="100"
					refresher-background="#f6f6f6"
					@refresherpulling="onPulling"
					@refresherrefresh="onRefreshrec"
					@refresherrestore="onRestore"
					@refresherabort="onAbort"
					:style="{ height: myHeight + 'rpx' }"
				>
					<template v-if="!recPage.isAll">
						<view :style="{ height: myHeight + 'rpx' }">
							<fans-item
								v-for="(item, index) in recList"
								:key="index"
								:item="item"
								@onTap="follow(item)"
							></fans-item>
						</view>
					</template>
					<template v-else>
						<no-content :height="myHeight"> No more </no-content>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { swiperAutoHeight, swiperUTabs } from '@/mixin'
	import NoContent from '@/components/NoContent/NoContent.vue'
	import FansItem from './fansItem.vue'
	import { getFollowList, getFansList, RecUsers } from '@/api/my'
	import { setAttent } from '@/api/live'
	import fifaVue from '../../data/fifa/fifa.vue'
	import check from '@/utils/check'

	export default {
		mixins: [swiperAutoHeight, swiperUTabs],
		components: {
			NoContent,
			FansItem,
		},
		data() {
			return {
				menu: [{ name: 'Followed' }, { name: 'Fans' }, { name: 'Recommend' }],
				activeName: this.fansTab,
				followList: [],
				fansList: [],
				recList: {},
				followPage: {
					p: 1,
					num: 10,
					total: 0,
					isAll: false,
					total: 0,
				},
				fansPage: {
					p: 1,
					num: 10,
					total: 0,
					isAll: false,
					total: 0,
				},
				recPage: {
					p: 1,
					isAll: false,
				},
				triggeredfans: false, // 下拉刷新
				triggeredfollow: false, // 下拉刷新
				triggeredrec: false, // 下拉刷新
				/* 上滑加载更多 */
				statusfans: 'loadmore',
				statusfollow: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '',
					loading: 'loading',
					nomore: 'no more data',
				},
				loadingFlag: false,
			}
		},
		onLoad() {
			this.myHeight = this.initScrollHeight(88)
			this.getData()

			this._freshingfollow = false
			this.triggeredfollow = true
			this._freshingfans = false
			this.triggeredfans = true
			this._freshingrec = false
			this.triggeredrec = true
		},
		onShow() {
			// 只有从任务中心过来的时候isSwitch 是true，自动切换tab
			let { tab, isSwitch } = uni.getStorageSync('fansTab')

			if (isSwitch) {
				if (tab === 'fans') {
					this.$nextTick(() => {
						this.swiperCurrent = 1
						uni.setStorageSync('fansTab', { tab, isSwitch: false })
					})
				} else {
					this.$nextTick(() => {
						this.swiperCurrent = 0
						uni.setStorageSync('fansTab', { tab, isSwitch: false })
					})
				}
			}
		},
		methods: {
			/* 获取关注列表 */
			getFollowList(callback) {
				const token = this.token
				const uid = this.uid
				getFollowList(uid, uid, this.followPage.p, this.followPage.num)
					.then((res) => {
						console.log('res', res)
						this.followList = this.followList.concat(res.info)
						this.followPage.total = parseInt(res.count)
						if (this.followPage.total === this.followList.length) {
							this.followPage.isAll = true
						}
						callback && callback()
					})
					.catch((err) => {
						this.$message.error('1')
					})
			},
			getFansList(callback) {
				const token = this.token
				const uid = this.uid

				getFansList(uid, uid, this.fansPage.p, this.fansPage.num)
					.then((res) => {
						this.fansList = this.fansList.concat(res.info)
						this.fansPage.total = parseInt(res.count)
						if (this.fansPage.total === this.fansList.length) {
							this.fansPage.isAll = true
						}
						callback && callback()
					})
					.catch((err) => {
						this.$message.error('1')
					})
			},
			@check()
			getData() {
				const token = this.token
				const uid = this.uid
				this.getFollowList()
				this.getFansList()
				this.getRecList()
			},
			@check()
			follow(item) {
				const token = this.token
				const uid = this.uid
				setAttent(uid, token, item.id).then((res) => {
					if (res.code === 0) {
						if (res.info.isattent == '1') {
							this.$u.toast('Succeess Follow')
						} else {
							this.$u.toast('Cancel Follow')
						}
						item.is_attention = res.info.isattent
						// item = JSON.parse(JSON.stringify(item))
						// this.getList(this.$store.state.search.keyword);
					}
				})
			},
			getRecList(callback) {
				const token = this.token
				const uid = this.uid
				RecUsers({ uid: uid, p: this.recPage.p })
					.then((res) => {
						this.recList = res.info
						this.recPage.p += 1
						try {
							if (this.recList.length === 0) {
								this.recPage.isAll = true
							}
						} catch (error) {}
						callback && callback()
					})
					.catch((err) => {
						this.$message.error(err)
					})
			},
			followPageChanged(args) {
				this.followPage.p = args.page
				this.getFollowList()
			},
			fansPageChanged(args) {
				this.fansPage.p = args.page
				this.getFansList()
			},
			onPulling(e) {
				/* 下拉的时候触发 */
				// console.log('onpulling', e)
			},
			onRestore() {
				/* 恢复下拉状态，写法固定 */
				this.triggeredfollow = 'restore'
				this.triggeredfans = 'restore'
				this.triggeredrec = 'restore'
			},
			onAbort() {},

			onRefreshfans() {
				/* 下拉刷新已完场赛事 */
				if (this._freshingfans) return
				this._freshingfans = true
				this.fansPage.p = 1
				this.fansPage.isAll = false
				this.fansList = []
				this.statusfans = 'loadmore'
				this.getFansList(() => {
					this.triggeredfans = false
					this._freshingfans = false
				})
			},
			onRefreshfollow() {
				/* 下拉刷新未来赛事 */
				if (this._freshingfollow) return
				this._freshingfollow = true
				this.followPage.p = 1
				this.followPage.isAll = false
				this.followList = []
				this.statusfollow = 'loadmore'
				this.getFollowList(() => {
					this.triggeredfollow = false
					this._freshingfollow = false
				})
			},
			onRefreshrec() {
				/* 下拉刷新未来赛事 */
				if (this._freshingrec) return
				this._freshingrec = true
				this.getRecList(() => {
					this.triggeredrec = false
					this._freshingrec = false
				})
			},
			loadMore(target) {
				/* 获取更多数据，这个方法搭配 u-loadmore使用,status 三种状态 loadmore loading nomore */
				/* 加载完成以后，如果isAll为true就让status 为nomore表示没有更多数据 */
				/* 每次init的时候也要同时初始化loadMore的状态。 */
				console.log('----------------------', this.loadingFlag)
				if (this.loadingFlag) return
				this.loadingFlag = true // 防止重复发送请求
				if (target === 'fans') {
					if (this.fansPage.isAll) {
						this.statusfans = 'nomore'
						this.loadingFlag = false
						return
					}
					this.statusfans = 'loading'
					this.fansPage.p += 1
					this.getFansList(() => {
						if (this.fansPage.isAll) {
							this.statusfans = 'nomore'
						} else {
							this.statusfans = 'loadmore'
						}
						this.loadingFlag = false
					})
				}
				if (target === 'follow') {
					if (this.followPage.isAll) {
						this.statusfollow = 'nomore'
						this.loadingFlag = false
						return
					}
					this.statusfollow = 'loading'
					this.followPage.p += 1
					this.getFollowList(() => {
						if (this.followPage.isAll) {
							this.statusfollow = 'nomore'
						} else {
							this.statusfollow = 'loadmore'
						}
						this.loadingFlag = false
					})
				}
			},
		},
	}
</script>

<style lang="scss"></style>
