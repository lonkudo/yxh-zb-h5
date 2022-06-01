<template>
	<view>
		<!-- 头部导航区域 -->
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
			<template v-if="swiperCurrent !== 3">
				<navigator :url="'filter?type=' + (swiperCurrent + 1)" slot="right"
					><text class="margin-right-lg iconfont icon-shaixuan fs-40"></text
				></navigator>
			</template>
			<template v-else>
				<text
					class="margin-right-lg iconfont icon-shaixuan fs-40 fc-b-c"
					slot="right"
				></text>
			</template>
		</u-navbar>
		<!-- tab切换区域 -->
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
		<!-- tab切换的内容区域 -->
		<swiper
			:current="swiperCurrent"
			@transition="transition"
			@animationfinish="animationfinish"
			:style="{ height: myHeight + 'rpx' }"
		>
			<!-- ongoing的区域 -->
			<swiper-item class="swiper-item" :key="'Ongoing'" @touchmove.stop="">
				<scroll-view
					scroll-y
					:id="'content-wrap' + 'Ongoing'"
					:style="{ height: myHeight + 'rpx' }"
					refresher-enabled="true"
					:refresher-triggered="triggeredOngoing"
					:refresher-threshold="100"
					refresher-background="#f6f6f6"
					@refresherpulling="onPulling"
					@refresherrefresh="onRefreshOngoing"
					@refresherrestore="onRestore"
					@refresherabort="onAbort"
				>
					<!-- 没数据显示缺省页 -->
					<template
						v-if="
							ongoingObj.ongoing.length === 0 &&
							ongoingObj.future.length === 0 &&
							ongoingObj.finished.length === 0
						"
					>
						<no-content :style="{ height: myHeight + 'rpx' }"> </no-content>
					</template>
					<template v-else>
						<!-- ongoing区域由三部分组成 -->
						<view class="margin-top-sm list" :style="{ height: myHeight + 'rpx' }">
							<score-item
								:control="[1, 1, 1, 0, 1, 1]"
								:info="item"
								v-for="(item, index) in ongoingObj.ongoing"
								:key="'oon' + index"
							>
								<slot name="default">ongoing</slot>
							</score-item>
							<score-item
								:control="[1, 1, 1, 1, 0, 1]"
								:info="item"
								v-for="(item, index) in ongoingObj.future"
								:key="'ofu' + index"
							>
								<slot name="default">Not Started</slot>
							</score-item>
							<score-item
								:control="[1, 1, 1, 0, 1, 1]"
								:info="item"
								v-for="(item, index) in ongoingObj.finished"
								:key="'ofi' + index"
							>
								<slot name="default">End</slot>
							</score-item>
						</view>
					</template>
				</scroll-view>
			</swiper-item>
			<!-- 已完场赛事页面 -->
			<swiper-item
				class="swiper-item"
				:key="'Finished'"
				@touchmove.stop=""
				:style="{ height: myHeight + 'rpx' }"
			>
				<view
					:id="'content-wrap' + 'Finished'"
					:style="{ height: myHeight + 'rpx' }"
				>
					<time-search @dateChanged="finishedDateChanged"></time-search>
					<scroll-view
						scroll-y
						:style="{ height: myHeight2 + 'rpx' }"
						refresher-enabled="true"
						:refresher-triggered="triggeredFinished"
						:refresher-threshold="100"
						refresher-background="#f6f6f6"
						@refresherpulling="onPulling"
						@refresherrefresh="onRefreshFinished"
						@refresherrestore="onRestore"
						@refresherabort="onAbort"
						@scrolltolower="loadMore('finished')"
					>
						<template v-if="finishedList.length > 0">
							<view class="list">
								<score-item
									:control="[1, 1, 1, 0, 0, 1]"
									:info="item"
									v-for="(item, index) in finishedList"
									:key="'fi' + index"
								>
									<slot name="default">End</slot>
								</score-item>
							</view>
							<u-loadmore
								class="h-100"
								:status="statusFinished"
								:icon-type="iconType"
								:load-text="loadText"
							/>
						</template>
						<template v-else>
							<no-content :style="{ height: myHeight2 + 'rpx' }"></no-content>
						</template>
					</scroll-view>
				</view>
			</swiper-item>
			<!-- 未来赛事页面 -->
			<swiper-item
				class="swiper-item"
				:key="'Schedule'"
				@touchmove.stop=""
				:style="{ height: myHeight + 'rpx' }"
			>
				<view
					:id="'content-wrap' + 'Schedule'"
					:style="{ height: myHeight + 'rpx' }"
				>
					<reverse-time-search
						@dateChanged="futureDateChanged"
					></reverse-time-search>
					<scroll-view
						scroll-y
						:style="{ height: myHeight2 + 'rpx' }"
						refresher-enabled="true"
						:refresher-triggered="triggeredSchedule"
						:refresher-threshold="100"
						refresher-background="#f6f6f6"
						@refresherpulling="onPulling"
						@refresherrefresh="onRefreshFuture"
						@refresherrestore="onRestore"
						@refresherabort="onAbort"
						@scrolltolower="loadMore('future')"
					>
						<template v-if="futureList.length > 0">
							<view class="list">
								<score-item
									:control="[1, 1, 1, 1, 0, 1]"
									:info="item"
									v-for="(item, index) in futureList"
									:key="'fu' + index"
									@subscribe="subscribe(item)"
								>
									<slot name="default">Not Started</slot>
								</score-item>
							</view>
							<u-loadmore
								class="h-100"
								:status="statusFuture"
								:icon-type="iconType"
								:load-text="loadText"
							/>
						</template>
						<template v-else>
							<no-content :style="{ height: myHeight2 + 'rpx' }"></no-content>
						</template>
					</scroll-view>
				</view>
			</swiper-item>
			<!-- 订阅赛事区域 -->
			<swiper-item
				class="swiper-item"
				:key="'Subscribe'"
				@touchmove.stop=""
				:style="{ height: myHeight + 'rpx' }"
			>
				<scroll-view
					scroll-y
					:style="{ height: myHeight + 'rpx' }"
					refresher-enabled="true"
					:refresher-triggered="triggeredSubscribe"
					:refresher-threshold="100"
					refresher-background="#f6f6f6"
					@refresherpulling="onPulling"
					@refresherrefresh="onRefreshSubscribe"
					@refresherrestore="onRestore"
					@refresherabort="onAbort"
					@scrolltolower="loadMore('reserved')"
				>
					<template v-if="appointmentList.length > 0">
						<view v-for="(time, idx) in appointmentList" :key="idx">
							<view class="flex padding-xs align-center justify-center"
								><text>{{ time.time }}</text></view
							>
							<view class="list">
								<score-item
									:control="[1, 1, 1, 1, 0, 0]"
									:info="item"
									v-for="(item, index) in time.list"
									:key="'sub' + idx + index"
									@subscribe="subscribe(item)"
								>
									<slot name="default">Not Started</slot>
								</score-item>
							</view>
							<u-loadmore
								class="h-100"
								:status="statusAppointment"
								:icon-type="iconType"
								:load-text="loadText"
							/>
						</view>
					</template>
					<template v-else>
						<no-content :style="{ height: myHeight + 'rpx' }"></no-content>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { swiperAutoHeight, swiperUTabs } from '@/mixin'
	import ScoreItem from './components/ScoreItem.vue'
	import { FilterBus } from '@/utils/bus.js'
	import TimeSearch from '@/components/TimeSearch/TimeSearch.vue'
	import ReverseTimeSearch from '@/components/TimeSearch/ReverseTimeSearch.vue'
	import { getScores, addAppointment } from '@/api/score'
	import { getAppointmentList } from '@/api/my'
	import NoContent from '../../components/NoContent/NoContent.vue'

	export default {
		mixins: [swiperAutoHeight, swiperUTabs],
		components: { ScoreItem, TimeSearch, ReverseTimeSearch, NoContent },
		data() {
			return {
				myHeight: 0,
				myHeight2: 0,
				menu: [
					{ name: 'Ongoing' },
					{ name: 'Finished' },
					{ name: 'Schedule' },
					{ name: 'Subscribe' },
				],
				eventsList: [],
				ongoingStatus: {
					ongoing: false,
					finished: false,
					future: false,
				},
				ongoingList: [],
				ongoingObj: {
					ongoing: [],
					finished: [],
					future: [],
				},
				ongoingPage: {
					ongoing: {
						p: 1,
						num: 100,
						type: 1, // 1即时，2完场，3未开赛<
						time: '',
						compe_id: [],
					},
					future: {
						p: 1,
						num: 100,
						type: 3, // 1即时，2完场，3未开赛<
						time: '',
						compe_id: [],
					},
					finished: {
						p: 1,
						num: 100,
						type: 2, // 1即时，2完场，3未开赛<
						time: '',
						compe_id: [],
					},
				},
				scoresPage: {
					p: 1,
					num: 20,
					type: 1, // 1即时，2完场，3未开赛<
					time: '',
					compe_id: [],
				},
				finishedPage: {
					p: 1,
					num: 20,
					type: 2, // 1即时，2完场，3未开赛<
					time: '',
					compe_id: [],
					isAll: false,
				},
				futurePage: {
					p: 1,
					num: 20,
					type: 3, // 1即时，2完场，3未开赛<
					time: '',
					compe_id: [],
					isAll: false,
				},
				finishedList: [],
				futureList: [],
				appointmentList: [],
				appointmentPage: {
					p: 0,
					num: 50,
					isAll: false,
					compe_id: [],
				},
				eventForm: {
					eventSelected: [],
				},
				compePage: {
					type: 1,
					time: '',
				},
				triggeredFinished: false, // 下拉刷新
				triggeredSchedule: false, // 下拉刷新
				triggeredSubscribe: false, // 下拉刷新
				finishedDate: null,
				futureDate: null,
				/* 上滑加载更多 */
				statusFinished: 'loadmore',
				statusFuture: 'loadmore',
				statusAppointment: 'loadmore',
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
			/* 初始化高度  */
			this.myHeight = this.initScrollHeight(268)
			this.myHeight2 = this.initScrollHeight(348)
			/* 过滤页面传回数据,更新对应的区域,更新vuex */
			FilterBus.$on('confirm', (data) => {
				this.eventsList = data.compe_id
				console.log('confirm--------')
				if (data.type === '1') {
					this.changeId(data.compe_id)
					this.initOngoing()
				} else if (data.type === '2') {
					this.initFinished({ id: data.compe_id })
				} else if (data.type === '3') {
					this.initFuture({ id: data.compe_id })
				}
				this.$store.commit('CHANGE_FILTER', data)
			})

			this.init()
			/* 下拉刷新 */
			this._freshingFinished = false
			this.triggeredFinished = true
			this._freshingSchedule = false
			this.triggeredSchedule = true
			this._freshingSubscribe = false
			this.triggeredSubscribe = true
			this._freshingOngoing = false
			this.triggeredOngoing = true
		},
		methods: {
			finishedDateChanged(date) {
				/* timesearch日期变更 */
				this.finishedDate = date
				this.initFinished({ id: this.$store.state.filter.finished, time: date })
			},
			futureDateChanged(date) {
				/* reserver time search日期变更 */
				this.futureDate = date
				this.initFuture({ id: this.$store.state.filter.future, time: date })
			},
			init() {
				/* 刚进入score初始化数据 */
				this.changeId('')
				// ongoing的数据 只加载当天的，只会收到compe_id筛选赛事的影响，通过changeId来改
				this.initOngoing()
				this.initFinished({ id: '' })
				this.initFuture({ id: '' })
				this.initSubscribe()
			},
			initSubscribe(callback) {
				/* 初始化我的订阅，callback是用来当下拉结束的时候收起下拉 */
				this.appointmentPage.p = 0
				this.appointmentList = []
				this.appointmentPage.isAll = false
				this.statusAppointment = 'loadmore'
				this.reservationNext(callback)
			},
			initFuture(args) {
				/* 初始化未来赛事页面 */
				let { id, time, callback } = args
				if (typeof id === 'array') {
					this.futurePage.compe_id = id
				} else {
					this.futurePage.compe_id = [id]
				}
				this.futureList = []
				this.futurePage.p = 1
				this.futurePage.isAll = false
				this.statusFuture = 'loadmore' // 上拉加载更多
				if (!time) {
					const d = new Date()
					this.futurePage.time = this.formatGiven(d, 'yyyyMMdd')
				} else {
					this.futurePage.time = time
				}
				this.getScores('futureList', this.futurePage, 'futurePage.isAll', callback)
			},
			initFinished(args) {
				/* 初始化 已完场 赛事页面 */
				let { id, time, callback } = args
				if (typeof id === 'array') {
					this.finishedPage.compe_id = id
				} else if (typeof id === 'object') {
					this.finishedPage.compe_id = id
				} else {
					this.finishedPage.compe_id = [id]
				}
				this.finishedList = []
				this.finishedPage.p = 1
				console.log(
					'---loadmoreInit----loadmoreInit----loadmoreInit----loadmoreInit----loadmoreInit---'
				)
				this.finishedPage.isAll = false
				this.statusFinished = 'loadmore' // 上拉加载更多
				console.log(
					'---loadmoreInit----loadmoreInit----loadmoreInit----loadmoreInit----loadmoreInit---'
				)
				if (!time) {
					const d = new Date()
					this.finishedPage.time = this.formatGiven(d, 'yyyyMMdd')
				} else {
					this.finishedPage.time = time
				}
				this.getScores(
					'finishedList',
					this.finishedPage,
					'finishedPage.isAll',
					callback
				)
			},
			initOngoing(callback) {
				// 不需要进行时间筛选 , 在changeId这个方法里面进行compe_id的筛选
				const d = new Date()
				this.ongoingObj.ongoing = []
				this.ongoingObj.finished = []
				this.ongoingObj.future = []
				this.ongoingPage.ongoing.time = this.formatGiven(d, 'yyyyMMdd')
				this.ongoingPage.finished.time = this.formatGiven(d, 'yyyyMMdd')
				this.ongoingPage.future.time = this.formatGiven(d, 'yyyyMMdd')
				this.getScores(
					'ongoingObj.ongoing',
					this.ongoingPage.ongoing,
					'ongoingStatus.ongoing'
				)
				this.getScores(
					'ongoingObj.finished',
					this.ongoingPage.finished,
					'ongoingStatus.finished',
					callback
					/* 因为多个请求，同时发送,如果三个callback会因异步导致出错，
	         所以只在一般情况下加载最久的这个请求下面修改,uni.Showloading也会因为这个问题没有正常显示，暂不做处理。
	         可以通过await改造，但是这样会导致请求挨个发送，变慢。
	         或者改造request,让uni.Showloading变成单例。 */
				)
				this.getScores(
					'ongoingObj.future',
					this.ongoingPage.future,
					'ongoingStatus.future'
				)
				this.initFlag = false
			},
			ongoingLoad(target) {
				if (target === 'ongoing') {
					this.ongoingPage.ongoing.p += 1
					this.getScores(
						'ongoingObj.ongoing',
						this.ongoingPage.ongoing,
						'ongoingStatus.ongoing'
					)
				}
				if (target === 'finished') {
					this.ongoingPage.finished.p += 1
					this.getScores(
						'ongoingObj.finished',
						this.ongoingPage.finished,
						'ongoingStatus.finished'
					)
				}
				if (target === 'future') {
					this.ongoingPage.future.p += 1
					this.getScores(
						'ongoingObj.future',
						this.ongoingPage.future,
						'ongoingStatus.future'
					)
				}
			},
			changeId(id) {
				if (typeof id === 'array') {
					this.ongoingPage.ongoing.compe_id = id
					this.ongoingPage.finished.compe_id = id
					this.ongoingPage.future.compe_id = id
				} else {
					this.ongoingPage.ongoing.compe_id = [id]
					this.ongoingPage.finished.compe_id = [id]
					this.ongoingPage.future.compe_id = [id]
				}
			},
			subscribe(item) {
				/* 订阅赛事 */
				this.guard()
				addAppointment({ uid: this.uid, game_id: item.id, token: this.token })
					.then((res) => {
						if (res.info.isappointment === '0') {
							item.is_appointment = 0
							this.$u.toast('unsubscribed')
						} else if (res.info.isappointment === 1) {
							item.is_appointment = 1
							this.$u.toast('subscribed')
						}
					})
					.catch((err) => {
						console.log('err', err)
					})
			},
			loadMore(target) {
	       /* 获取更多数据，这个方法搭配 u-loadmore使用,status 三种状态 loadmore loading nomore */
	       /* 加载完成以后，如果isAll为true就让status 为nomore表示没有更多数据 */
	       /* 每次init的时候也要同时初始化loadMore的状态。 */
				if (this.loadingFlag) return
				this.loadingFlag = true // 防止重复发送请求
				if (target === 'finished') {
					if (this.finishedPage.isAll) return (this.statusFinished = 'nomore') k
					this.statusFinished = 'loading'
					this.finishedPage.p += 1
					this.getScores(
						'finishedList',
						this.finishedPage,
						'finishedPage.isAll',
						() => {
							if (this.finishedPage.isAll) {
								this.statusFinished = 'nomore'
							} else {
								this.statusFinished = 'loadmore'
							}
							this.loadingFlag = false
						}
					)
				}
				if (target === 'future') {
					if (this.futurePage.isAll) return (this.statusFuture = 'nomore')
					this.statusFuture = 'loading'
					this.futurePage.p += 1
					this.getScores('futureList', this.futurePage, 'futurePage.isAll', () => {
						if (this.futurePage.isAll) {
							this.statusFuture = 'nomore'
						} else {
							this.statusFuture = 'loadmore'
						}
						this.loadingFlag = false
					})
				}
				if (target === 'reserved') {
					if (this.appointmentPage.isAll) return (this.statusAppointment = 'nomore')
					this.statusAppointment = 'loading'
					this.appointmentPage.p += 1
					this.reservationNext(() => {
						if (this.appointmentPage.isAll) {
							this.statusAppointment = 'nomore'
						} else {
							this.statusAppointment = 'loadmore'
						}
						this.loadingFlag = false
					})
				}
			},
			getScores(listName, page, isAllName, callback) {
				/* 获取比分数据 */
				let uid = 100
				if (!this.isEmpty(this.uid)) uid = this.uid
				Object.assign(page, { uid })
				getScores(page)
					.then((res) => {
						/* 控制isAll */
						if (Object.keys(res.info).length < page.num) {
							let arr = isAllName.split('.') //
							this[arr[0]][arr[1]] = true
						} /* 拼接数组 */
						let lArr = listName.split('.')
						if (lArr.length === 1) {
							if (JSON.stringify(res.info) === '{}') {
								this[listName] = this[listName].concat([])
							} else {
								res.info.forEach((info) => {
									info.incidents = []
									info.stats = []
								})
								this[listName] = this[listName].concat(res.info)
							}
						} else {
							if (JSON.stringify(res.info) === '{}') {
								return (this[lArr[0]][lArr[1]] = this[lArr[0]][lArr[1]].concat([]))
							} else {
								res.info.forEach((info) => {
									info.incidents = []
									info.stats = []
								})
								this[lArr[0]][lArr[1]] = this[lArr[0]][lArr[1]].concat(res.info)
							}
						}
					})
					.catch((err) => {
						console.log('err', err)
					})
					.finally(() => {
						callback && callback()
					})
			},
			reservationNext(callback) {
				/* 获取订阅赛事的数据 */
				let uid = 100
				let token = '100'
				if (!this.isEmpty(this.uid)) {
					uid = this.uid
					token = this.token
				}
				this.appointmentPage.p += 1
				this.getAppointmentList(
					uid,
					token,
					this.appointmentPage.p,
					this.appointmentPage.num,
					this.appointmentPage.compe_id,
					callback
				)
			},
			getAppointmentList(uid, token, p, num, compe_id, callback) {
				/* 获取我的订阅 */
				getAppointmentList({ uid, token, p, num, compe_id })
					.then((res) => {
						if (res.code === 700) {
							this.appointmentList = []
						} else {
							if (Object.keys(res.info).length === 0) {
								this.appointmentPage.isAll = true
							} else {
								this.appointmentList = this.appointmentList.concat(res.info)
							}
						}
					})
					.catch((err) => {
						console.log(err)
						// this.$message.error("4");
					})
					.finally(() => {
						callback && callback()
					})
			},
			onPulling(e) {
				/* 下拉的时候触发 */
				// console.log('onpulling', e)
			},
			onRefreshFinished() {
				/* 下拉刷新已完场赛事 */
				if (this._freshingFinished) return
				this._freshingFinished = true
				this.initFinished({
					id: this.$store.state.filter.finished,
					time: this.finishedDate,
					callback: () => {
						this.triggeredFinished = false
						this._freshingFinished = false
					},
				})
			},
			onRefreshFuture() {
				/* 下拉刷新未来赛事 */
				if (this._freshingSchedule) return
				this._freshingSchedule = true
				this.initFuture({
					id: this.$store.state.filter.future,
					time: this.futureDate,
					callback: () => {
						this.triggeredSchedule = false
						this._freshingSchedule = false
					},
				})
			},
			onRefreshSubscribe() {
				/* 下拉刷新订阅赛事 */
				if (this._freshingSubscribe) return
				this._freshingSubscribe = true
				this.initSubscribe(() => {
					this.triggeredSubscribe = false
					this._freshingSubscribe = false
				})
			},
			onRefreshOngoing() {
				/* 下拉刷新正在进行 赛事 */
				if (this._freshingOngoing) return
				this._freshingOngoing = true
				this.initOngoing(() => {
					this.triggeredOngoing = false
					this._freshingOngoing = false
				})
			},
			onRestore() {
				/* 恢复下拉状态，写法固定 */
				this.triggeredFinished = 'restore'
				this.triggeredSchedule = 'restore'
				this.triggeredSubscribe = 'restore'
				this.triggeredOngoing = 'restore'
			},
			onAbort() {},
		},
	}
</script>

<style lang="scss">
	.list {
		border-top: 1rpx solid #f1f1f1;
		> :nth-child(n) {
			border-top: 1rpx solid #f1f1f1;
		}
		> :nth-last-child(1) {
			border-bottom: 1rpx solid #f1f1f1;
		}
	}
</style>
