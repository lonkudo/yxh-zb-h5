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
			<!-- 当tab切换到subscribe的时候禁用筛选功能 -->
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
								:control="[...displaySetting, false, true, true]"
								:info="item"
								v-for="(item, index) in ongoingObj.ongoing"
								:key="'oon' + index"
							>
								<slot name="default"
									><text
										:class="item.status_id == 2 || item.status_id == 4 ? 'maohao' : ''"
									>
										{{ item.time | match_time_fmt(item.status_id) }}
									</text></slot
								>
							</score-item>
							<score-item
								:control="[...displaySetting, true, false, true]"
								:info="item"
								v-for="(item, index) in ongoingObj.future"
								:key="'ofu' + index"
								@subscribe="subscribe(item)"
							>
								<slot name="default">Not Started</slot>
							</score-item>
							<score-item
								:control="[...displaySetting, false, true, true]"
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
									:control="[...displaySetting, false, false, true]"
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
		<view class="football-goal-list">
			<!-- key 不变化的时候render就不会刷新 -->
			<view class="football-goal-item" v-for="goal of goalList" :key="goal.id">
				<scores-card :item="goal" @close="close($event)"></scores-card>
			</view>
		</view>
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
	import check from '@/utils/check'

	/* -----------------------mqtt-------------------------- */
	import { Mqtt } from '@/utils/mqtt'
	import { match_time_fmt } from '@/utils/index'
	import { GoalPoolBus } from '@/utils/bus'
	import PopGoalMsg from '../../components/PopGoalMsg/PopGoalMsg.vue'
	import ScoresCard from './components/ScoresCard.vue'
	import { AudioBus, SettingBus } from '@/utils/bus'
	/* -----------------------mqtt-------------------------- */

	export default {
		mixins: [swiperAutoHeight, swiperUTabs],
		components: {
			ScoreItem,
			TimeSearch,
			ReverseTimeSearch,
			NoContent,
			PopGoalMsg,
			ScoresCard,
		},
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
				/* -------------------------mqtt---------------------------- */
				goalList: [
					// {
					// 	id: '3735680',
					// 	competition_id: '1687',
					// 	match_time: '1652864400',
					// 	home_scores: [0, 0, 0, 0, 0, 0, 0],
					// 	away_scores: [0, 0, 0, 0, 0, 0, 0],
					// 	type: 1,
					// 	position: 1,
					// 	rank: 0,
					// 	status_id: 2,
					// 	home_position: '',
					// 	away_position: '',
					// 	home_name: 'Gaokaerlishibang U19',
					// 	away_name: 'Denizlispor U19',
					// 	competition_name: 'TUR U19 A2',
					// 	time: 6,
					// 	is_appointment: 0,
					// },
					// {
					// 	id: '3735681',
					// 	competition_id: '1687',
					// 	match_time: '1652864400',
					// 	home_scores: [0, 0, 0, 0, 0, 0, 0],
					// 	away_scores: [0, 0, 0, 0, 0, 0, 0],
					// 	type: 4,
					// 	position: 1,
					// 	rank: 1,
					// 	status_id: 2,
					// 	home_position: '',
					// 	away_position: '',
					// 	home_name: 'Gaokaerlishibang U19',
					// 	away_name: 'Denizlispor U19',
					// 	competition_name: 'TUR U19 A2',
					// 	time: 6,
					// 	is_appointment: 0,
					// },
					// {
					// 	id: '3735682',
					// 	competition_id: '1687',
					// 	match_time: '1652864400',
					// 	home_scores: [0, 0, 0, 0, 0, 0, 0],
					// 	away_scores: [0, 0, 0, 0, 0, 0, 0],
					// 	type: 1,
					// 	rank: 2,
					// 	position: 2,
					// 	status_id: 2,
					// 	home_position: '',
					// 	away_position: '',
					// 	home_name: 'Gaokaerlishibang U19',
					// 	away_name: 'Denizlispor U19',
					// 	competition_name: 'TUR U19 A2',
					// 	time: 6,
					// 	is_appointment: 0,
					// },
					// {
					// 	id: '3735683',
					// 	competition_id: '1687',
					// 	match_time: '1652864400',
					// 	home_scores: [0, 0, 0, 0, 0, 0, 0],
					// 	away_scores: [0, 0, 0, 0, 0, 0, 0],
					// 	type: 4,
					// 	rank: 3,
					// 	position: 2,
					// 	status_id: 2,
					// 	home_position: '',
					// 	away_position: '',
					// 	home_name: 'Gaokaerlishibang U19',
					// 	away_name: 'Denizlispor U19',
					// 	competition_name: 'TUR U19 A2',
					// 	time: 6,
					// 	is_appointment: 0,
					// },
				],
				soundTypeOptions: [
					'Mute',
					'Default',
					'Whistle',
					'Drum',
					'Broadcast',
					'Bugle',
					'Victory',
				],
				Default: require('@/static/styles/audio/Default.mp3'),
				Whistle: require('@/static/styles/audio/Whistle.mp3'),
				Drum: require('@/static/styles/audio/Drum.mp3'),
				Broadcast: require('@/static/styles/audio/Broadcast.mp3'),
				Bugle: require('@/static/styles/audio/Bugle.mp3'),
				Victory: require('@/static/styles/audio/Victory.mp3'),
				settingFormDefault: {
					rank: true,
					red: true,
					yellow: true,
					// 进球设置
					goalSound: true,
					homeSoundType: 'Default',
					awaySoundType: 'Default',
					goalVibration: true,
					goalPopup: true,
					// 红牌设置
					redCardSound: true,
					redCardVibration: true,
					redCardPopup: true,
					soundType: 'Default',
				},
				displaySetting: [true, true, true],
				mq: null,
				/* -------------------------mqtt---------------------------- */
			}
		},
		onLoad() {
			/* 初始化高度  */
			console.log('scrollHeight', this.initScrollHeight(0))
			this.myHeight = this.initScrollHeight(78)
			this.myHeight2 = this.initScrollHeight(158)
			/* 过滤页面传回数据,更新对应的区域,更新vuex */
			/* ongoing和future和finished是分开保存的，他们筛选信息不同 */
			FilterBus.$on('confirm', (data) => {
				this.eventsList = data.compe_id
				// console.log('confirm--------')
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

			/* 音频播放 */
			AudioBus.$on('playAudio', (data, sound) => {
				console.log('data', data, sound)
				if (data === 2) return
				const innerAudioContext = uni.createInnerAudioContext()
				innerAudioContext.autoplay = true
				innerAudioContext.src = sound
				innerAudioContext.onPlay(() => {
					console.log('开始播放')
				})
				innerAudioContext.onError((res) => {
					console.log(res.errMsg)
					console.log(res.errCode)
				})
			})
			/* 如果没有本地settingForm就初始化 */

			if (!uni.getStorageSync('settingForm')) {
				uni.setStorageSync('settingForm', this.settingFormDefault)
			}
			SettingBus.$on('display', () => {
				if (!uni.getStorageSync('settingForm')) {
					this.displaySetting = [true, true, true]
				} else {
					this.displaySetting = [
						uni.getStorageSync('settingForm').red,
						uni.getStorageSync('settingForm').yellow,
						uni.getStorageSync('settingForm').rank,
					]
				}
			})
		},
		// onHide() {
		// 	console.log('---onHide----onHide----onHide----onHide----onHide---')
		// 	if (this.mq) this.mq.unconnect()
		// },
		// onUnload() {
		// 	console.log('---unload----unload----unload----unload----unload---')
		// 	if (this.mq) this.mq.unconnect()
		// },
		/* mqtt离开的时候没有关闭链接，许老板说这个链接不需要关闭 */
		methods: {
			/* -----------------------mqtt部分------------------------------- */
			// 连接MQTT服务器
			connectMqtt(host, username, password, clean, clientId, topics, callback) {
				this.mq = new Mqtt(host, topics, callback)
				this.mq.connect({
					username,
					password,
					clean, //离线时是否接收 QoS 1 和 2 的消息 false 为接收,true为不接收
					clientId,
					reconnectPeriod: 5000, //重连时间间隔
				})
			},
			// 处理文字直播消息
			connectMsg() {
				let topics = []
				this.ongoingObj.ongoing.forEach((element) => {
					topics.push(element.id)
				})
				this.connectMqtt(
					// process.env.VUE_APP_MQTT_SERVICE,
					this.$store.state.settings.siteInfo.mqttwsserver,
					'',
					'',
					true,
					// id 保证唯一
					'mqtitId-ongoing' + Math.random() * 1000,
					topics,
					this.dealMessage
				)
			},
			dealMessage(topic, payload) {
				this.freshPayload = payload
				console.log('payload', JSON.parse(payload))

				// 暂时关闭来测试
				this.realTime(JSON.parse(payload))
			},
			refeshOngoing() {
				// console.log('refeshOngoing=========');
				// this.$emit('ws', JSON.parse(this.freshPayload))
				// 暂时关闭来测试
				this.realTime(JSON.parse(this.freshPayload))
			},

			realTime(msgArr) {
				msgArr.forEach((item) => {
					/* 获取到实时数据以后，播放动画和修改渲染scoreItem的数据 */
					this.ongoingObj.ongoing.forEach((ele) => {
						//ele 是当前的 item是实时的
						if (ele.id == item.id.toString()) {
							// 进球、红牌动画
							this.checkScoresCard(ele, item)
							// console.log(ele);
							ele.home_scores = item.score[2]
							ele.away_scores = item.score[3]
							// ele.match_time = item.score[4].toString()
							ele.status_id = item.score[1]
							ele.time = match_time_fmt(item.score[1], item.score[4])
							// 实时赛况
							if (item.tlive.length > 0) {
								item.tlive[item.tlive.length - 1]['time_status'] = item.score[1]
								item.tlive[item.tlive.length - 1]['match_time'] = item.score[4]
							}
							ele.incidents = item.tlive
							// 技术统计
							ele.stats = item.stats
							// console.log("ele.stats=======",ele.stats,ele.stats.length);
						}
					})
				})
				// console.log('msgArrAfter', msgArr[0].id, msgArr);
			},
			checkScoresCard: function (ele, realItem) {
				/* 动画处理 */

				//ele 是当前的 realItem是实时的
				let eleObj = JSON.parse(JSON.stringify(ele))
				let item = JSON.parse(JSON.stringify(realItem))
				console.log('eleObj', eleObj, item)
				// 比分不一致 、 红牌不一致
				eleObj.time = match_time_fmt(item.score[1], item.score[4]) // 格式化中间的时间
				if (eleObj.home_scores[0] != item.score[2][0]) {
					//  主队的比分更新
					console.log(
						eleObj.home_scores,
						'eleobj=====homeScoreFather=====item' + eleObj.id,
						item.score[2]
					)
					console.log(
						eleObj.home_scores[0],
						'eleobj=====homeScore=====item' + eleObj.id,
						item.score[2][0]
					)
					eleObj.home_scores = item.score[2]
					ele['home_active'] = true // ele是原本的 ongoing里面的元素
					ele['type'] = 1 // 主队进球事件
					eleObj['position'] = 1 // position 1 动画渲染的时候作为主队
					eleObj['type'] = 1

					if (uni.getStorageSync('settingForm').goalPopup) {
						/* 设置rank用来控制渲染的时候显示位置 */
						this.setRank(eleObj)
						/* 推到goalList里面就是播放动画 */
						this.pushGoalList(eleObj)
						if (uni.getStorageSync('settingForm').goalSound) {
							this.changeSound(uni.getStorageSync('settingForm').homeSoundType) // 播放声音
						}
						if (uni.getStorageSync('settingForm').goalSound) {
							this.changeSound(uni.getStorageSync('settingForm').homeSoundType) // 播放声音
						}
						if (uni.getStorageSync('settingForm').goalVibration) {
							uni.vibrateLong({
								success: function () {
									console.log('vibrate')
								},
							})
						}
						/* 一定时间后清除动画 */
						this.delItemByTimeOut(eleObj.id)
					}
				}
				if (eleObj.home_scores[2] != item.score[2][2]) {
					// 主队红牌事件
					console.log(
						eleObj.home_scores,
						'eleobj=====homeRedFather======item' + eleObj.id,
						item.score[2]
					)
					console.log(
						eleObj.home_scores[2],
						'eleobj=====homeRed======item' + eleObj.id,
						item.score[2][2]
					)
					eleObj.home_scores = item.score[2]
					ele['home_active'] = true
					ele['type'] = 4 // 主队红牌事件
					eleObj['position'] = 1
					eleObj['type'] = 4

					if (uni.getStorageSync('settingForm').redCardPopup) {
						this.setRank(eleObj)
						this.pushGoalList(eleObj)
						this.changeSound(
							// JSON.parse(localStorage.getItem('settingForm')).soundType
							uni.getStorageSync('settingForm').redCardSound ? 'Default' : 'Mute'
						)

						if (uni.getStorageSync('settingForm').redCardVibration) {
							uni.vibrateLong({
								success: function () {
									console.log('vibrate')
								},
							})
						}
						this.delItemByTimeOut(eleObj.id)
					}
					// this.setFresh(realItem);
				}
				if (eleObj.away_scores[0] != item.score[3][0]) {
					// 客队进球事件
					console.log(
						eleObj.away_scores,
						'eleobj=====awayScoreFather======item' + eleObj.id,
						item.score[3]
					)
					console.log(
						eleObj.away_scores[0],
						'eleobj=====awayScore======item' + eleObj.id,
						item.score[3][0]
					)
					eleObj.away_scores = item.score[3]
					ele['away_active'] = true
					ele['type'] = 1 // 进球事件
					eleObj['position'] = 2 // 客队
					eleObj['type'] = 1

					if (uni.getStorageSync('settingForm').goalPopup) {
						this.setRank(eleObj)
						this.pushGoalList(eleObj)

						if (uni.getStorageSync('settingForm').goalSound) {
							this.changeSound(uni.getStorageSync('settingForm').awaySoundType)
						}

						if (uni.getStorageSync('settingForm').goalVibration) {
							uni.vibrateLong({
								success: function () {
									console.log('vibrate')
								},
							})
						}
						this.delItemByTimeOut(eleObj.id)
					}
				}
				if (eleObj.away_scores[2] != item.score[3][2]) {
					// 客队红牌事件
					console.log(
						eleObj.away_scores,
						'eleobj=====awayRedFather=====item' + eleObj.id,
						item.score[3]
					)
					console.log(
						eleObj.away_scores[2],
						'eleobj=====awayRed=====item' + eleObj.id,
						item.score[3][2]
					)
					eleObj.away_scores = item.score[3]
					ele['away_active'] = true
					ele['type'] = 4
					eleObj['position'] = 2
					eleObj['type'] = 4
					if (uni.getStorageSync('settingForm').redCardPopup) {
						/* 如果 */
						this.setRank(eleObj)
						this.pushGoalList(eleObj)
						this.changeSound(
							uni.getStorageSync('settingForm').redCardSound ? 'Default' : 'Mute'
						)
						if (uni.getStorageSync('settingForm').redCardVibration) {
							uni.vibrateLong({
								success: function () {
									console.log('vibrate')
								},
							})
						}
						this.delItemByTimeOut(eleObj.id) // 删除goalList里面的东西还有 修改ongoing列表的东西
						// this.setFresh(realItem);
					}
				}
				if (this.goalList.length > 0) {
					console.log('checkScoresCard', this.goalList.length, this.goalList)
				}
				eleObj = null // 信息传递完成销毁对象减少内存占用
				// return obj;
			},

			delItemByTimeOut(id) {
				console.log(new Date().getMinutes() + ':' + new Date().getSeconds())
				/* 五秒后清除动画 */
				setTimeout(() => {
					console.log(
						'delItemAfterFive',
						new Date().getMinutes() + ':' + new Date().getSeconds()
					)
					this.delItemAfterFive(id)
				}, 5000)
				// }, 120000);
				/* 十秒后删除元素（删除前空白但是占位） */
				setTimeout(() => {
					console.log(
						'delItemAfterTen',
						new Date().getMinutes() + ':' + new Date().getSeconds()
					)
					this.delItemAfterTen(id)
				}, 10000)
				// }, 120000);
			},
			setRank(eleObj) {
				// 设置这个eleObj在goalList里面的排名
				eleObj['rank'] =
					this.goalList.length > 0
						? this.goalList[this.goalList.length - 1].rank + 1
						: 0
			},
			pushGoalList(eleObj) {
				/* 推到进球列表 */
				const result = this.goalList.find((ele) => {
					if (eleObj.id === ele.id) {
						// 如果是同一场比赛的话更新进球数量
						ele.home_scores = eleObj.home_scores
						ele.away_scores = eleObj.away_scores
					}
					return eleObj.id === ele.id
				})
				if (!result) {
					this.goalList.push(eleObj) // 不是同一场比赛增加记录
				}
			},

			delItemAfterFive(id) {
				this.goalList = this.goalList.filter((item) => {
					return item.id != id
				})
			},
			delItemAfterTen(id) {
				this.ongoingObj.ongoing.forEach((ele, index) => {
					if (ele.id == id.toString()) {
						// ele.home_active = false;
						// ele.away_active = false;
						this.$set(this.ongoingObj.ongoing[index], 'home_active', false)
						this.$set(this.ongoingObj.ongoing[index], 'away_active', false)
						// this.$refs.ongoing.refeshOngoing()
						this.refeshOngoing()
					}
				})
			},
			changeSound(value) {
				console.log(
					'---chaneSound----chaneSound----chaneSound----chaneSound----chaneSound---'
				)
				switch (value) {
					case 'Mute':
						AudioBus.$emit('playAudio', 2, '')
						break
					case 'Default':
						AudioBus.$emit('playAudio', 1, this.Default)
						break
					case 'Whistle':
						AudioBus.$emit('playAudio', 1, this.Whistle)
						break
					case 'Drum':
						AudioBus.$emit('playAudio', 1, this.Drum)
						break
					case 'Broadcast':
						AudioBus.$emit('playAudio', 1, this.Broadcast)
						break
					case 'Bugle':
						AudioBus.$emit('playAudio', 1, this.Bugle)
						break
					case 'Victory':
						AudioBus.$emit('playAudio', 1, this.Victory)
						break
				}
			},
			settings() {
				if (!this.isEmpty(uni.getStorageSync('settingForm'))) {
					this.settingForm = uni.getStorageSync('settingForm').soudnType
				} else {
					this.closeSetting()
				}
			},
			closeSetting() {
				uni.setStorageSync('settingForm', this.settingForm)
				// localStorage.setItem('settingForm', JSON.stringify(this.settingForm))
			},
			/* -----------------------mqtt部分 结束------------------------------- */
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

				this.finishedPage.isAll = false
				this.statusFinished = 'loadmore' // 上拉加载更多

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
					'ongoingStatus.ongoing',
					() => {
						this.connectMsg()
					}
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
			@check()
			subscribe(item) {
				/* 订阅赛事 */
				addAppointment({ uid: this.uid, game_id: item.id, token: this.token })
					.then((res) => {
						if (res.info.isappointment === '0') {
							item.is_appointment = 0
							this.$u.toast('unsubscribed')
						} else if (res.info.isappointment === 1) {
							item.is_appointment = 1
							this.$u.toast('subscribed')
							this.$store.dispatch('FINISH_TASK', {
								type: 1,
								taskid: 7,
								that: this,
							})
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
					if (this.finishedPage.isAll) {
						this.statusFinished = 'nomore'
						this.loadingFlag = false
						return
					}
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
					if (this.futurePage.isAll) {
						this.statusFuture = 'nomore'
						this.loadingFlag = false
						return
					}
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
					if (this.appointmentPage.isAll) {
						this.statusAppointment = 'nomore'
						this.loadingFlag = false
						return
					}
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
		filters: {
			match_time_fmt(time, status) {
				// console.log(status, timestamp);
				/* 格式化开赛事件 */
				// console.log('status', status, timestamp)
				if (typeof status === 'string') status = parseInt(status)
				switch (status) {
					case 1:
						return 'Not Start'
					case 2:
						return time
					case 3:
						return 'HT'
					case 4:
						return time
					case 5:
						return 'Overtime'
					case 6:
						return 'Overtime'
					case 7:
						return 'Penalty Shoot-Out'
					case 8:
						return 'Game Over'
					case 9:
						return 'Game Delayed'
					case 10:
						return 'Game Break'
					case 11:
						return 'Game Break'
					case 12:
						return 'Game Cancel'
					case 13:
						return 'Waiting'
					case 5:
						return ''
					default:
						break
				}
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
	@keyframes twinkling {
		0% {
			// display: block;
			opacity: 1;
		}
		100% {
			opacity: 0;
			// display: none;
		}
	}
	.maohao::after {
		color: red;
		font-weight: 600;
		content: " '";
		animation: twinkling 1s ease-in-out infinite;
	}
	// .football-goal-list {
	// 	position: fixed;
	// 	background-color: rgba(0, 0, 0, 0.1);
	// 	top: 300rpx;
	// 	left: 0;
	// 	right: 0;
	// 	bottom: 200rpx;
	// }
</style>
