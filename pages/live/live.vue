<template>
	<view>
		<view class="goback flex align-center" v-show="showBack" @tap="go('back')"
			><text class="iconfont icon-left fs-40 fc-b-f margin-sm"></text
			><text
				class="fc-b-f"
				v-if="liveDetail.uid !== '3' && liveDetail.uid !== '2'"
				>{{ liveDetail.title }}</text
			>
		</view>
		<view
			class="switch flex align-center"
			v-show="showBack"
			@tap="showAnchor = true"
			><text class="iconfont icon-qiehuan fs-40 fc-b-f margin-sm"></text>
		</view>
		<!-- 视频区域 -->
		<view class="video-container" :style="{ height: videoHeight + 'rpx' }">
			<template v-if="liveDetail.uid === '3'">
				<web-view
					:src="liveDetail.animation"
					:style="{ height: '568rpx' }"
				></web-view>
			</template>
			<template v-else-if="liveDetail.uid === '2'">
				<template v-if="livingStatus">
					<video
						id="myVideo"
						:src="liveDetail.pull"
						object-fit="contain"
						@play="showBack = false"
						@pause="showBack = true"
						@ended="showBack = true"
					></video>
				</template>
				<template v-else>
					<view class="w100 h100 preview flex flex-direction align-center fc-b-f">
						<text class="margin-top-sm">{{ liveDetail.competition_name }}</text>
						<text class="margin-top-sm margin-bottom-sm">{{
							liveDetail.starttime | formatGiven('yyyy-MM-dd hh:ss')
						}}</text>
						<view class="flex margin-top-lg justify-around">
							<view class="flex flex-direction w-250 align-center">
								<image :src="liveDetail.home_logo" mode="" class="w-120 h-120" />
								<text
									class="margin-top-sm w-250 text-center"
									style="word-break: break-word"
									>{{ liveDetail.home_name }}</text
								>
							</view>
							<view class="flex flex-direction align-center margin-top-lg">
								<text class="w-150 text-center fs-20">{{ timeGap }}</text>
								<view class="fs-36 fw-6 margin-top-sm">
									<text>{{ liveDetail.home_scores }}</text>
									<text class="margin-left-sm margin-right-sm">-</text>
									<text>{{ liveDetail.away_scores }}</text>
								</view>
							</view>
							<view class="flex flex-direction w-250 align-center">
								<image :src="liveDetail.away_logo" mode="" class="w-120 h-120" />
								<text
									class="margin-top-sm w-250 text-center"
									style="word-break: break-word"
									>{{ liveDetail.away_name }}</text
								>
							</view>
						</view>
					</view>
				</template>
			</template>
			<template v-else>
				<video
					id="myVideo"
					:src="liveDetail.pull"
					object-fit="contain"
					@play="showBack = false"
					@pause="showBack = true"
					@ended="showBack = true"
				></video>
			</template>
		</view>
		<u-tabs-swiper
			ref="uTabs"
			:list="menu"
			:current="current"
			@change="tabsChange"
			:is-scroll="false"
			swiperWidth="750"
			active-color="#02b875"
			font-size="24"
			gutter="40"
		></u-tabs-swiper>
		<swiper
			:current="swiperCurrent"
			@transition="transition"
			@animationfinish="animationfinish"
			:style="{ height: myHeight + 'rpx' }"
		>
			<swiper-item class="swiper-item" :key="'Chat'" @touchmove.stop="">
				<!-- <text>{{ timeGap }}</text> -->
				<view
					class="b-f flex flex-direction"
					:id="'content-wrap' + 'Chat'"
					:style="{ height: myHeight + 'rpx' }"
				>
					<battle-like
						:battleLikeInfo="battleLikeInfo"
						:teamInfo="teamInfo"
						@dianzan="dianzan"
					></battle-like>
					<scroll-view
						scroll-y
						class="flex flex-direction b-f6"
						:style="{ height: chatHeight - battleLikeHeight + 'rpx' }"
					>
						<!-- :style="{ height: chatHeight + 'rpx' }" -->
						<view
							v-for="(item, index) in chatList"
							:key="index"
							class="margin-bottom-xs padding-left-sm padding-right-sm"
							style="line-height: 30rpx; vertical-align: top"
						>
							<!-- 系统消息 -->
							<template v-if="item.msg[0]._method_ === 'SystemNot'">
								<text class="fc-g fs-24">System Notice:</text>
								<text class="fc-b-3 margin-left-sm fs-24">
									{{ item.msg[0].ct }}
								</text>
							</template>
							<!-- 用户发送了消息 -->
							<template
								v-else-if="
									item.msg[0]._method_ === 'SendMsg' && item.msg[0].msgtype === '2'
								"
							>
								<level :level="item.msg[0].level"></level>
								<text class="margin-left-xs fc-g fs-24"> {{ item.msg[0].uname }}:</text>
								<text class="margin-left-sm fs-24">
									{{ item.msg[0].ct }}
								</text>
							</template>
							<!-- 用户进入房间 -->
							<template
								v-else-if="
									item.msg[0]._method_ === 'SendMsg' && item.msg[0].msgtype === '0'
								"
							>
								<level
									:level="item.msg[0].ct.level"
									v-if="item.msg[0].ct.level !== '0'"
								></level>
								<text class="margin-left-xs fc-g fs-24">
									{{ item.msg[0].ct.user_nicename }}:</text
								>
								<text class="margin-left-sm fs-24"> enter live room </text>
							</template>
							<!-- 用户赠送礼物 -->
							<template v-else-if="item.msg[0]._method_ === 'SendGift'">
								<view class="flex align-center">
									<level
										:level="item.msg[0].level"
										v-if="item.msg[0].ct.level !== '0'"
									></level>
									<text class="margin-left-xs fc-g fs-24">
										{{ item.msg[0].uname }}:</text
									>
									<image :src="item.msg[0].ct.gifticon" mode="" class="w-40 h-40" />
									<text class="fc-red fs-24">
										{{ ' x' + item.msg[0].ct.giftcount }}</text
									>
								</view>
							</template>
							<!-- 用户离开直播间 -->
							<template v-else-if="item.msg[0]._method_ === 'disconnect'">
								<level
									:level="item.msg[0].ct.level"
									v-if="item.msg[0].ct.level !== '0'"
								></level>
								<text class="margin-left-xs fc-g fs-24">
									{{ item.msg[0].ct.user_nicename }}:</text
								>
								<text class="margin-left-sm fs-24"> leave </text>
							</template>

							<!-- <template v-else>
								<text>
									{{ JSON.stringify(item)  }}
								</text>
							</template> -->
						</view>
					</scroll-view>
					<view
						class="h-80 b-f6 flex align-center justify-between padding-left-sm padding-right-sm"
					>
						<view class="btn ava-60 btn-snippet" @tap="showSnippet = true"></view>
						<view
							class="flex input-con b-f align-center padding-left-sm padding-right-sm h-60"
						>
							<input
								type="text"
								:placeholder="'Enter Chat Content'"
								v-model="inputContent"
								placeholder-style="color:#aaa"
								class="w-500 fs-20"
								@confirm="inputSend"
							/>
						</view>
						<view class="btn ava-80 btn-gift" @tap="getGiftList"></view>
					</view>
				</view>
			</swiper-item>
			<swiper-item
				class="swiper-item"
				:key="'Action'"
				@touchmove.stop=""
				:style="{ height: myHeight + 'rpx' }"
			>
				<action
					:game_id="game_id"
					:teamInfo="teamInfo"
					:myHeight="myHeight"
				></action>
			</swiper-item>
			<swiper-item
				class="swiper-item"
				:key="'Line-up'"
				@touchmove.stop=""
				:style="{ height: myHeight + 'rpx' }"
			>
				<team-formation :myHeight="myHeight" :game_id="game_id"></team-formation>
			</swiper-item>
			<swiper-item
				class="swiper-item"
				:key="'Analyse'"
				@touchmove.stop=""
				:style="{ height: myHeight + 'rpx' }"
			>
				<analyse :myHeight="myHeight" :game_id="game_id"></analyse>
			</swiper-item>
			<swiper-item>
				<handicap :myHeight="myHeight" :game_id="game_id"></handicap>
			</swiper-item>
			<swiper-item
				class="swiper-item"
				:key="'Contributon'"
				@touchmove.stop=""
				:style="{ height: myHeight + 'rpx' }"
			>
				<contribution :myHeight="myHeight" :stream="stream"></contribution>
			</swiper-item>
		</swiper>
		<!-- 快捷语弹框 -->
		<u-popup v-model="showSnippet" mode="bottom">
			<view style="height: 600rpx">
				<view
					class="flex align-center h-60 justify-between padding-left-sm padding-right-sm b-f6"
				>
					<text @tap="showSnippet = false">Close</text>
					<text>Snippet</text>
					<text class="fc-g" @tap="go('snippet')">Set</text>
				</view>
				<scroll-view scroll-y="" style="height: 540rpx">
					<view>
						<view v-for="item in snippetList" :key="item.timestamp" class="margin-sm">
							<text
								class="fc-b-6 fs-24 f-hide w-600"
								@tap="
									() => {
										sendMsg(item.msg)
										showSnippet = false
									}
								"
								>{{ item.msg }}</text
							>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
		<!-- 礼物弹框 -->
		<u-popup v-model="showGift" mode="bottom">
			<view style="height: 600rpx">
				<view
					class="flex align-center h-60 justify-between padding-left-sm padding-right-sm b-f"
				>
					<u-tabs-swiper
						:list="[{ name: 'Gift' }]"
						swiperWidth="750"
						active-color="#02b875"
					></u-tabs-swiper>
				</view>
				<swiper
					class="swiper"
					:indicator-dots="true"
					:autoplay="false"
					style="height: 440rpx"
					indicator-active-color="#02b875"
				>
					<swiper-item v-for="(list, index) in giftlist" :key="'l' + index">
						<view class="flex flex-wrap align-center padding-sm">
							<view
								:style="{
									border: giftId === item.id ? '2rpx solid #02b875' : '2rpx solid #fff',
									width: '166rpx',
									height: '170rpx',
								}"
								class="flex flex-direction align-center margin-left-xs margin-bottom-sm p-r"
								v-for="(item, idx) in list"
								:key="item.id"
								@tap="
									giftId = item.id
									giftInfo = item
								"
							>
								<view
									class="p-a top-10 left-5 bg-red br-8 flex align-center"
									style="padding: 5rpx 1rpx"
									v-if="item.mark === '1'"
								>
									<text class="fs-14 fc-b-f">Hot</text></view
								>
								<image :src="item.gifticon" mode="" class="ava-80" />
								<text class="fs-20">{{ item.giftname }}</text>
								<view class="flex align-center">
									<view class="padding-top-xs"
										><text class="fs-20 fc-b-9">{{ item.needcoin }}</text></view
									>
									<coin class="sm-2" style="width: 30rpx; height: 30rpx"></coin>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
				<view style="height: 100rpx" class="flex align-center">
					<view class="flex align-center">
						<coin
							class="sm-3 margin-right-xs"
							style="width: 30rpx; height: 30rpx; margin-top: -22rpx"
						></coin>
						<text class="fs-24 margin-right-sm">{{ this.coin }}</text>
					</view>
					<text class="fc-g fs-24" @tap="go('coin')">Gain ></text>
					<view
						class="margin-left-auto margin-right-sm h-50 bg-green flex justify-between padding-left-sm padding-right-sm align-center"
						style="border-radius: 25rpx"
					>
						<text class="fc-b-0 fs-24" @tap="showGiftNum = true">{{ giftNum }}</text>
						<text
							class="fc-b-f fs-24 margin-left-lg"
							@tap="sendGift(giftId, giftInfo, giftNum)"
							>Send</text
						>
					</view>
				</view>
			</view>
		</u-popup>
		<u-action-sheet
			:list="giftNumOptions"
			v-model="showGiftNum"
			:cancel-btn="false"
			@click="changeGiftNum"
		></u-action-sheet>
		<pop-msg></pop-msg>
		<u-popup v-model="showAnchor" mode="bottom">
			<view>
				<view class="b-f6 padding-sm flex justify-center"
					><text class="fc-g">Choose A Live Source</text></view
				>
				<view class="flex flex-wrap h-500 justify-start padding-xs">
					<view
						@tap="switchRoom(item)"
						v-for="(item, index) in roomList"
						:key="index"
						:class="[
							'flex flex-direction align-center justify-center margin-xs  w-160 h-160',
							index === roomActiveIndex ? 'bg-lightgreen' : '',
						]"
					>
						<view class="p-r">
							<image :src="item.user.avatar" mode="" class="ava-100" />
							<image
								src="/static/styles/gif/living2.gif"
								class="w-30 h-30 p-a top-70 left-70"
								mode=""
							/>
						</view>
						<text class="f-hide w-150 text-center fs-16 margin-top-xs">{{
							item.user.user_nicename
						}}</text>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getLiveDetail,
		enterLiveRoom,
		getGiftList,
		sendGift,
		getCoin,
		changeRoom,
	} from '@/api/live'
	import { swiperAutoHeight, swiperUTabs } from '@/mixin'
	import Level from '@/components/Level/Level.vue'
	import create2DArray from '@/utils/create2DArray.js'
	import Coin from '@/components/Coin/Coin.vue'
	import PopMsg from '@/components/PopMsg/PopMsg.vue'
	import { GiftPoolBus } from '@/utils/bus.js'
	import TeamFormation from './components/TeamFormation.vue'
	import Analyse from './components/Analyse'
	import Contribution from './components/Contribution.vue'
	import Action from './components/Action.vue'
	import BattleLike from './components/BattleLike/BattleLike.vue'
	import Handicap from './components/Handicap/Handicap.vue'

	export default {
		mixins: [swiperAutoHeight, swiperUTabs],
		components: {
			Level,
			Coin,
			PopMsg,
			TeamFormation,
			Analyse,
			Contribution,
			Action,
			BattleLike,
			Handicap,
		},
		data() {
			return {
				liveuid: '',
				stream: '',
				game_id: '',
				liveDetail: {},
				roomInfo: {},
				chatList: [],
				// myHeight: 0,
				inputContent: '',
				menu: [
					{ name: 'Chat' },
					{ name: 'Action' },
					{ name: 'Line-up' },
					{ name: 'Analyse' },
					{ name: 'Handicap' },
					{ name: 'Contribution' },
				],
				showBack: true,
				ws: null,
				showSnippet: false,
				showGift: false,
				giftlist: [],
				giftId: '',
				giftInfo: {},
				giftNum: 1,
				showGiftNum: false,
				giftNumOptions: [{ text: 1 }, { text: 10 }, { text: 100 }],
				giftdonghuainfo: {
					url: '',
					user_nicename: '',
				},
				coin: 0,
				pool: [], // 赠送礼物的消息池
				/* 阵容信息 */
				battleObj: {}, // 对战历史
				battleOfThemList: [], // 对战历史
				pointObj: {}, // 积分近况
				futureObj: {}, // 未来比赛
				squadFlag: false, // 如果有阵容信息，则展示阵容信息
				showAnchor: false,
				roomList: [], // 房间列表
				roomActiveIndex: 0,
				teamInfo: {},
				battleLikeInfo: {},
				livingStatus: false,
			}
		},
		async onLoad(options) {
			this.liveuid = options.liveuid
			this.stream = options.stream
			this.game_id = options.game_id
			// this.myHeight = this.initScrollHeight(544)
			// this.chatHeight = this.initScrollHeight(624)
			this.getLiveDetail()
			await this.enterLiveRoom()
			this.createChatServerClient()
			this.getRoomsList()
			/*  */
		},
		async onShow() {},
		onUnload() {
			this.ws.disconnect()
		},
		onHide() {},
		computed: {
			timeGap: function () {
				if (this.isEmpty(this.liveDetail)) return ''
				let startTimestamp = this.toNum(this.liveDetail.starttime) * 1000
				let curTimestamp = Number(new Date())
				let gap = curTimestamp - startTimestamp
				console.log(
					'gap',
					curTimestamp,
					startTimestamp,
					gap,
					'status:',
					this.livingStatus
				)
				console.log('gap', new Date(curTimestamp), new Date(startTimestamp))
				if (this.livingStatus) {
					return 'living'
				} else if (gap > 10800000) {
					return 'End'
				} else if (gap > -600000 && gap < 0) {
					return (
						Math.floor(-gap / 60000)
							.toString()
							.padStart(2, '0') +
						':' +
						Math.floor(-gap / (60000 * 60))
							.toString()
							.padStart(2, '0')
					)
				} else if (gap < -600000) {
					return 'Not Started'
				}
			},
			videoHeight: function () {
				if (this.liveuid === '3') {
					return 568
				} else {
					return 464
				}
			},
			chatHeight: function () {
				if (this.liveuid === '3') {
					return this.initScrollHeight(728)
				} else {
					return this.initScrollHeight(624)
				}
			},
			battleLikeHeight: function () {
				if (this.$store.state.live.battleLikeFlag) {
					return 230
				} else {
					return 80
				}
			},
			myHeight: function () {
				if (this.liveuid === '3') {
					return this.initScrollHeight(648)
				} else {
					return this.initScrollHeight(544)
				}
			},
			snippetList: function () {
				return this.$store.state.snippet.snippetList
			},
		},
		methods: {
			dianzan(team) {
				this.guard()
				console.log('team', team)
				let broadcastObj = {
					msg: [],
					token: this.token,
				}
				let obj = {}
				obj._method_ = 'Liked'
				obj.ct = JSON.stringify({
					match_id: this.game_id,
					team: team,
				})
				obj.uid = this.uid
				broadcastObj.msg.push(obj)
				this.ws.emit('broadcast', broadcastObj)
			},
			switchRoom(item) {
				uni.navigateTo({
					url:
						'live?liveuid=' +
						item.uid +
						'&game_id=' +
						item.game_id +
						'&stream=' +
						item.stream,
				})
			},
			getRoomsList() {
				/* 更换房间 */
				let uid = this.isEmpty(this.uid) ? 100 : this.uid
				changeRoom({ liveid: this.liveuid, game_id: this.game_id, uid })
					.then((res) => {
						this.roomList = res.info
						let index = res.info.findIndex((ele) => {
							// console.log("index cc", index, this.liveItem.liveuid, ele.uid);
							if (typeof ele.uid === Number) {
							}
							return this.liveuid.toString() === ele.uid.toString()
						})
						console.log('index', index)
						// console.log('index', index)
						this.roomActiveIndex = index
						// console.log('changeRooms', res)
					})
					.catch((err) => {
						console.log('chanrRoomsErr', err)
					})
			},

			getCoin() {
				/* 获取账户金币余额金币 */
				console.log('---getCOin----getCOin----getCOin----getCOin----getCOin---')
				getCoin(this.uid, this.token).then((res) => {
					if (res.code == 0) {
						this.coin = parseInt(res.info.coin)
					}
				})
			},
			sendGift(giftId, giftInfo, giftNum) {
				/* 赠送礼物 */
				this.guard()
				if (!giftId) return this.$u.toast('please choose a type of gift')
				// 最好还是别用this传值，万一有延时就错误了，

				// this.pool.push()
				// setTimeout(() => {
				// 	this.pool.pop()
				// }, 5000)
				// console.log('pool', this.pool)

				if (this.coin < parseInt(giftInfo.needcoin) * parseInt(giftNum)) {
					this.$u.toast(
						'Insufficient gold coins, please do the task to get more gold coins'
					)
					return
				} else {
					sendGift({
						uid: this.uid,
						token: this.token,
						liveuid: this.liveuid,
						stream: this.stream,
						giftid: this.giftId,
						giftcount: giftNum,
					}).then((res) => {
						if (res.code == 0) {
							//  刷新排行榜数据
							// this.getRankList()
							// console.log('res', res)
							this.coin = parseInt(res.info.coin)
							if (this.userInfo.level !== res.info.level) {
								this.$store.dispatch('GetInfo', { uid: this.uid, token: this.token })
							}

							// GiftPoolBus.$emit('text', 'rjekw')
							// console.log('---4----4----4----4----4---')
							// GiftPoolBus.$emit('push', {
							// 	id: this.userInfo.id,
							// 	giftId: giftInfo.id,
							// 	userInfo: {
							// 		user_nicename: this.userInfo.user_nicename,
							// 		avatar: this.userInfo.avatar,
							// 	},
							// 	giftInfo: {
							// 		giftNum: giftNum,
							// 		giftIcon: giftInfo.gifticon,
							// 		giftName: giftInfo.giftname,
							// 	},
							// })
							// this.getCoin()
							// this.giftNum = 1
							// value.active = false
							// 发送礼物
							let broadcastObj = {
								msg: [],
								token: this.token,
							}
							let obj = {}
							obj.roomnum = this.roomInfo.roomnum
							obj.equipment = ''
							obj.msgtype = '1'
							obj.uhead = this.userInfo.avatar
							obj.evensend = '0'
							obj.ct = JSON.stringify(res.info)
							obj._method_ = 'SendGift'
							obj.uid = this.uid
							obj.level = this.userInfo.level
							obj.uname = this.userInfo.user_nicename
							obj.vip_type = '0'
							obj.livename = '000'
							obj.action = '0'
							broadcastObj.msg.push(obj)
							this.ws.emit('broadcast', broadcastObj)
						} else {
							this.$u.toast(res.msg)
						}
					})
				}
			},
			changeGiftNum(index) {
				/* 更改礼物数量 */
				this.giftNum = this.giftNumOptions[index].text
			},
			go(path, item) {
				/* 跳转 */
				if (path === 'related') {
					uni.navigateTo({
						url: 'videoDetail?id=' + item.id,
					})
				}
				if (path === 'back') {
					uni.navigateBack({
						delta: 1,
					})
				}
				if (path === 'snippet') {
					uni.navigateTo({
						url: 'snippet/snippet',
					})
				}
				if (path === 'coin') {
					uni.navigateTo({
						url: '/pages/my/coins/coins',
					})
				}
			},
			getLiveDetail() {
				let uid = this.isEmpty(this.uid) ? 100 : this.uid
				let token = this.isEmpty(this.token) ? 'not logined' : this.token
				getLiveDetail(uid, token, this.liveuid, this.stream, this.game_id)
					.then((res) => {
						this.liveDetail = res.info
						let num = this.toNum(res.info.status_id)
						if (num > 1 && num < 8) {
							this.livingStatus = true
						} else {
							this.livingStatus = false
						}

						this.teamInfo = {
							home: {
								name: res.info.home_name,
								logo: res.info.home_logo,
							},
							away: {
								name: res.info.away_name,
								logo: res.info.away_logo,
							},
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
			async enterLiveRoom() {
				let uid = this.isEmpty(this.uid) ? 100 : this.uid
				let token = this.isEmpty(this.token) ? 'not logined' : this.token
				await enterLiveRoom(uid, token, this.liveuid, this.stream)
					.then((res) => {
						this.roomInfo = res.info[0]
						// console.log(res, 'res')
					})
					.catch((err) => {
						console.log(err)
					})
					.finally(() => {
						return new Promise((resolve) => {
							resolve()
						})
					})
			},
			createChatServerClient() {
				this.ws = this.io(this.roomInfo.chatserver)
				this.ws.on('connect', (e) => {
					let roomObj = {
						token: this.isEmpty(this.token) ? 1000 : this.token,
						uid: this.isEmpty(this.uid) ? 1000 : this.uid,
						roomnum: this.liveuid,
						stream: this.stream,
						liveuid: this.liveuid,
					}
					this.ws.emit('conn', roomObj)
				})
				this.ws.on('message', (mes) => {
					// console.log('mes', mes)
				})
				this.ws.on('broadcastingListen', (mes) => {
					// console.log('Mes', mes)
					let pMes = JSON.parse(mes[0])
					// console.log('pMes', pMes)
					if (pMes.msg[0]._method_ === 'SendGift') {
						GiftPoolBus.$emit('push', {
							id: pMes.msg[0].uid,
							giftId: pMes.msg[0].ct.giftid,
							userInfo: {
								user_nicename: pMes.msg[0].uname,
								avatar: pMes.msg[0].uhead,
							},
							giftInfo: {
								giftNum: pMes.msg[0].ct.giftcount,
								giftIcon: pMes.msg[0].ct.gifticon,
								giftName: pMes.msg[0].ct.giftname,
							},
						})
					}
					if (pMes.msg[0]._method_ === 'Liked') {
						this.battleLikeInfo = pMes.msg[0].ct
						// console.log('ok')
					}
					// console.log('---2----23---2----2----2---')
					this.chatList.push(pMes)
				})
				this.ws.on('disconnect', (e) => {
					console.log('断开链接', e)
				})
				this.ws.on('reconnect', (e) => {
					console.log('重新链接', e)
				})
				this.ws.on('connect', (e) => {
					console.log('建立链接', e)
				})
				this.ws.on('conn', (e) => {
					console.log('进入房间', e)
				})

				this.ws.on('close', (e) => {
					console.log('关闭', e)
				})
				this.ws.on('error', (e) => {
					console.log('错误', e)
				})
			},
			inputSend() {
				// console.log('inputSend')
				if (this.inputContent.trim().length > 0) {
					this.sendMsg(this.inputContent)
				} else {
					this.$u.toast("Content can't be empty")
				}
			},
			sendMsg(msg) {
				/* 发送消息 */
				this.guard() // 先检查是否登录，没登录就跳转登录页
				let broadcastObj = {} // 封装广播对象
				broadcastObj.msg = []
				let obj = {}
				obj._method_ = 'SendMsg'
				obj.msgtype = '2'
				obj.ct = msg
				obj.uname = JSON.parse(
					window.localStorage.getItem('userInfo')
				).user_nicename
				obj.uid = window.localStorage.getItem('uid')
				obj.action = '0'
				obj.level = JSON.parse(window.localStorage.getItem('userInfo')).level
				broadcastObj.msg.push(obj)
				broadcastObj.token = window.localStorage.getItem('token')
				this.ws.emit('broadcast', broadcastObj)
				this.inputContent = ''
			},
			getGiftList() {
				/* 获取礼物列表 */
				console.log('---11----11----11----11----11---')
				this.guard()
				const uid = this.uid
				const token = this.token
				if (this.giftlist.length !== 0) return (this.showGift = true)
				this.getCoin()
				getGiftList({ uid, token })
					.then((res) => {
						if (res.code == 0) {
							res.info.giftlist.forEach((item, index) => {
								item.active = false
							})
							this.giftlist = create2DArray(res.info.giftlist, 8)
							// console.log('giftList', this.giftlist)
							this.showGift = true
						}
					})
					.catch(() => {
						this.$u.toast('error')
					})
			},
		},
	}
</script>

<style lang="scss">
	.video-container {
		width: 750rpx;
	}
	.goback {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
	}
	.switch {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 10;
	}
	#myVideo {
		width: 100%;
		height: 100%;
	}
	.btn {
		background-size: 60rpx 60rpx;
	}
	.btn-snippet {
		background-image: url('/static/styles/png/snippet.png');
	}
	.btn-gift {
		background-image: url('/static/styles/png/gift.png');
		background-repeat: no-repeat;
		background-position: 10rpx 10rpx;
	}
	.preview {
		background-image: url('/static/styles/png/preview-bg.png');
		background-repeat: no-repeat;
		background-size: 750rpx auto;
	}
</style>
