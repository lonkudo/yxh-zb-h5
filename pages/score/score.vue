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
			<navigator :url="'filter?type=' + (cateIndex.time + 1)" slot="right"
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
					<view class="margin-top-sm list" :style="{ height: myHeight + 'rpx' }">
						<score-item
							:control="[1, 1, 1, 0, 1]"
							:info="item"
							v-for="(item, index) in ongoingObj.ongoing"
							:key="'oon' + index"
						>
							<slot name="default">ongoing</slot>
						</score-item>
						<score-item
							:control="[1, 1, 1, 1, 0]"
							:info="item"
							v-for="(item, index) in ongoingObj.future"
							:key="'ofu' + index"
						>
							<slot name="default">Not Started</slot>
						</score-item>
						<score-item
							:control="[1, 1, 1, 0, 1]"
							:info="item"
							v-for="(item, index) in ongoingObj.finished"
							:key="'ofi' + index"
						>
							<slot name="default">End</slot>
						</score-item>
					</view>
				</scroll-view>
			</swiper-item>
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
					<scroll-view scroll-y :style="{ height: myHeight2 + 'rpx' }">
						<template v-if="finishedList.length > 0">
							<view class="list">
								<score-item
									:control="[1, 1, 1, 0, 0]"
									:info="item"
									v-for="(item, index) in finishedList"
									:key="'fi' + index"
								>
									<slot name="default">End</slot>
								</score-item>
							</view>
						</template>
						<template v-else>
							<no-content :style="{ height: myHeight2 + 'rpx' }"></no-content>
						</template>
					</scroll-view>
				</view>
			</swiper-item>
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
					<scroll-view scroll-y :style="{ height: myHeight2 + 'rpx' }">
						<template v-if="futureList.length > 0">
							<view class="list">
								<score-item
									:control="[1, 1, 1, 1, 0]"
									:info="item"
									v-for="(item, index) in futureList"
									:key="'fu' + index"
								>
									<slot name="default">Not Started</slot>
								</score-item>
							</view>
						</template>
						<template v-else>
							<no-content :style="{ height: myHeight2 + 'rpx' }"></no-content>
						</template>
					</scroll-view>
				</view>
			</swiper-item>
			<swiper-item
				class="swiper-item"
				:key="'Subscribe'"
				@touchmove.stop=""
				:style="{ height: myHeight + 'rpx' }"
			>
				<!-- <template v-if="appointmentList.length > 0"> </template>
				<template v-else> -->
				<scroll-view
					scroll-y
					:style="{ height: myHeight + 'rpx' }"
					refresher-enabled="true"
					:refresher-triggered="triggered"
					:refresher-threshold="100"
					refresher-background="#f6f6f6"
					@refresherpulling="onPulling"
					@refresherrefresh="onRefresh('Subscribe')"
					@refresherrestore="onRestore"
					@refresherabort="onAbort"
				>
					<no-content :style="{ height: myHeight + 'rpx' }"></no-content>
				</scroll-view>
				<!-- </template> -->
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
	// import { DateBus } from '@/utils/bus.js'
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
				cateIndex: {
					time: 0,
					date: 0,
					compe_id: [],
				},
				oldCateIndex: {
					time: -1,
					date: 0,
					compe_id: [],
				},
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
				triggered: false, // 下拉刷新
				finishedDate: null,
				futureDate: null,
			}
		},
		onLoad() {
			/* 初始化高度  */
			this.myHeight = this.initScrollHeight(268)
			this.myHeight2 = this.initScrollHeight(348)
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
				// this.cateIndex.compe_id = data
			})
			// DateBus.$on('dateChanged', (date) => {
			// 	this.cateIndex.date = date
			// })
			this.init()
			/* 下拉刷新 */
			this._freshing = false
			setTimeout(() => {
				this.triggered = true
			}, 1000)
		},
		watch: {
			cateIndex: {
				handler: function (newValue, oldValue) {
					/* 当cateIndex发生改变的时候去重新获取数据。 */
					console.log(this.oldCateIndex.time, 'compare', newValue.time)
					// if (this.oldCateIndex.time !== newValue.time) {
					// 	/* 第一行发生改变，第二行切换成all，并且获取对应数据。因为修改对象，它的索引不变所以新旧值相同，所以要另外起一个变量进行对比。 */
					// 	console.log('---22----22----22----22----22---')
					// 	if (newValue.time === 0) {
					// 		this.changeId('')
					// 		this.initOngoing()
					// 	} else if (newValue.time === 1) {
					// 		this.initFinished('')
					// 	} else if (newValue.time === 2) {
					// 		this.initFuture('')
					// 	} else if (newValue.time === 3) {
					// 		this.appointmentPage.p = 0
					// 		this.appointmentList = []
					// 		this.reservationNext()
					// 	}
					// 	if (newValue.time !== 3) {
					// 		this.compePage.type = newValue.time + 1
					// 		// this.getCompe()
					// 		this.selectable = true
					// 	} else {
					// 		this.selectable = false
					// 	}
					// } else {
					// 	console.log('---33----33----33----33----33---')
					// }
					// if (this.oldCateIndex.compe_id !== newValue.compe_id) {
					// 	/* 当全局的compe_id发生更改的时候执行, 修改对应id然后 重新初始化页面数据 */
					// 	if (newValue.time === 0) {
					// 		if (newValue.compe_id.length === 0) {
					// 			if (this.initFlag) {
					// 				this.changeId('')
					// 				this.initOngoing()
					// 			} else {
					// 				this.changeId(['-1'])
					// 				this.initOngoing()
					// 			}
					// 		} else {
					// 			this.changeId(newValue.compe_id)
					// 			this.initOngoing()
					// 		}
					// 	} else if (newValue.time === 1) {
					// 		if (JSON.stringify(newValue.compe_id) === '[]') {
					// 			this.initFinished(['-1'])
					// 		} else {
					// 			this.initFinished(newValue.compe_id)
					// 		}
					// 	} else if (newValue.time === 2) {
					// 		if (JSON.stringify(newValue.compe_id) === '[]') {
					// 			this.initFuture(['-1'])
					// 		} else {
					// 			this.initFuture(newValue.compe_id)
					// 		}
					// 	} else if (newValue.time === 3) {
					// 		// this.appointmentPage.p = 0
					// 		// this.appointmentList = []
					// 		// this.appointmentPage.compe_id = newValue.compe_id
					// 		// this.reservationNext()
					// 	}
					// }
					this.oldCateIndex.time = newValue.time
					this.oldCateIndex.date = newValue.date
					this.oldCateIndex.compe_id = newValue.compe_id
					return newValue
				},
				deep: true,
				immediate: true,
			},
		},
		methods: {
			test() {
				console.log('refresh')
			},
			finishedDateChanged(date) {
				/* 完成，日期变更 */
				this.finishedDate = date
				this.initFinished({ id: this.$store.state.filter.finished, time: date })
			},
			futureDateChanged(date) {
				/* 完成，日期变更 */
				this.futureDate = date
				this.initFuture({ id: this.$store.state.filter.future, time: date })
			},
			init() {
				this.changeId('')
				this.initOngoing()
				this.initFinished({ id: '' })
				this.initFuture({ id: '' })
				this.initSubscribe()
			},
			tabsChange(index) {
				this.swiperCurrent = index
				this.cateIndex.time = index
			},
			show() {
				console.log('list', this.eventsList)
			},
			initSubscribe(callback) {
				this.appointmentPage.p = 0
				this.appointmentList = []
				this.reservationNext(callback)
			},
			initFuture(args) {
				let { id, time, callback } = args
				if (typeof id === 'array') {
					this.futurePage.compe_id = id
				} else {
					this.futurePage.compe_id = [id]
				}
				this.appointmentPage.p = 0
				this.futureList = []
				this.futurePage.p = 1
				if (!time) {
					const d = new Date()
					this.futurePage.time = this.formatGiven(d, 'yyyyMMdd')
				} else {
					this.futurePage.time = time
				}
				this.getScores('futureList', this.futurePage, 'futurePage.isAll', callback)
			},
			initFinished(args) {
				let { id, time, callback } = args
				if (typeof id === 'array') {
					this.finishedPage.compe_id = id
				} else if (typeof id === 'object') {
					this.finishedPage.compe_id = id
				} else {
					this.finishedPage.compe_id = [id]
				}
				this.appointmentPage.p = 0
				this.finishedList = []
				this.finishedPage.p = 1
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
			initOngoing() {
				// 不需要进行时间筛选 , 在changeId这个方法里面进行compe_id的筛选
				const d = new Date()
				this.ongoingObj.ongoing = []
				this.ongoingObj.finished = []
				this.ongoingObj.future = []
				this.ongoingPage.ongoing.time = this.formatGiven(d, 'yyyyMMdd')
				this.ongoingPage.finished.time = this.formatGiven(d, 'yyyyMMdd')
				this.ongoingPage.future.time = this.formatGiven(d, 'yyyyMMdd')
				// console.log(
				// 	'this',
				// 	this.ongoingPage.ongoing,
				// 	'this',
				// 	this.ongoingPage.finished,
				// 	'this',
				// 	this.ongoingPage.future
				// )
				this.getScores(
					'ongoingObj.ongoing',
					this.ongoingPage.ongoing,
					'ongoingStatus.ongoing'
				)
				this.getScores(
					'ongoingObj.finished',
					this.ongoingPage.finished,
					'ongoingStatus.finished'
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
			changeDate(date) {
				const d = new Date(
					date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8)
				)
				const cd = new Date()
				if (d.toDateString() !== cd.toDateString()) {
					if (cd - d < 0) {
						// 未来
						this.cateIndex.time = 2
					}
				}
				Object.assign(this.finishedPage, { p: 1, time: date, isAll: false })
				this.finishedList = []
				this.getScores('finishedList', this.finishedPage, 'finishedPage.isAll')
			},
			changeDatef(date) {
				const d = new Date(
					date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8)
				)
				const cd = new Date()
				if (d.toDateString() !== cd.toDateString()) {
					if (cd - d > 0) {
						// 过去
						this.cateIndex.time = 1
					}
				}
				Object.assign(this.futurePage, { p: 1, time: date, isAll: false })
				this.futureList = []
				this.getScores('futureList', this.futurePage, 'futurePage.isAll')
			},
			getScheduleList(p, num, uid) {
				getScheduleList(p, num, uid)
					.then((res) => {
						this.msg = 'No games'
					})
					.catch((err) => {
						console.log(err)
					})
			},
			subscribe(item) {
				const token = window.localStorage.getItem('token')
				if (!token) {
					// console.log('this', this.$refs)
					return (this.$refs.loginDialog.loginVisible = true) /* 如果用户未登录访问数据，则直接返回 */
				}
				const uid = window.localStorage.getItem('uid')
				addAppointment({ uid, game_id: item.id, token })
					.then((res) => {
						if (res.info.isappointment === '0') {
							item.is_appointment = 0
						} else if (res.info.isappointment === 1) {
							item.is_appointment = 1
						}
					})
					.catch((err) => {
						console.log('err', err)
					})
			},
			loadMore(target) {
				if (target === 'finished') {
					this.finishedPage.p += 1
					this.getScores('finishedList', this.finishedPage, 'finishedPage.isAll')
				}
				if (target === 'future') {
					this.futurePage.p += 1
					this.getScores('futureList', this.futurePage, 'futurePage.isAll')
				}
				if (target === 'reserved') {
					this.appointmentPage.p += 1
					this.reservationNext()
				}
			},
			getScores(listName, page, isAllName, callback) {
				let uid = 100
				if (!this.isEmpty(this.uid)) uid = this.uid
				Object.assign(page, { uid })
				getScores(page)
					.then((res) => {
						/* 控制loadMore显示 */
						console.log('res', res.info)
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
			/* 删除订阅的赛事 */
			scheduleAppoint(item) {
				const token = window.localStorage.getItem('token')
				if (!token) return /* 如果用户未登录访问数据，则直接返回 */
				const uid = window.localStorage.getItem('uid')
				// console.log('item', item)
				scheduleAppoint(uid, item.id, token).then((res) => {
					// console.log('sche', res)
					if (res.code === 0) {
						this.$message({
							message:
								parseInt(res.info.isappointment) === 1
									? 'Notification set'
									: 'Notification canceled',
							type: 'success',
						})
						const index = this.appointmentList.findIndex((ele) => ele.id === item.id)
						this.appointmentList.splice(index, 1)
						item.is_appointment = res.info.isappointment
						// this.init();
					} else {
						this.$message({
							message: 'error',
							type: 'warning',
						})
					}
				})
			},
			/* 获取我的订阅 */
			getAppointmentList(uid, token, p, num, compe_id, callback) {
				getAppointmentList({ uid, token, p, num, compe_id })
					.then((res) => {
						if (Object.keys(res.info).length === 0) {
							this.appointmentPage.isAll = true
						} else {
							this.appointmentList = this.appointmentList.concat(res.info)
							// console.log('this', this.appointmentList)
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
				console.log('onpulling', e)
			},
			onRefresh(val) {
				if (this._freshing) return
				this._freshing = true
				if (val === 'Subscribe') {
					this.initSubscribe(() => {
						this.triggered = false
						this._freshing = false
					})
				}
				if (val === 'Schedule') {
					//三个参数不一定齐全
					this.initFuture({
						id: this.$store.state.filter.future,
						time: this.futureDate,
						callback: () => {
							this.triggered = false
							this._freshing = false
						},
					})
				}
				if (val === 'Finished') {
					this.initFinished({
						id: this.$store.state.filter.finished,
						time: this.finishedDate,
						callback: () => {
							this.triggered = false
							this._freshing = false
						},
					})
				}
			},
			onRestore() {
				this.triggered = 'restore' // 需要重置
				console.log('onRestore')
			},
			onAbort() {
				console.log('onAbort')
			},
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
