<template>
	<view>
		<view class="goback flex align-center" v-show="showBack" @tap="go('back')"
			><text class="iconfont icon-left fs-40 fc-b-f margin-sm"></text
			><text class="fc-b-f">{{ liveDetail.title }}</text>
		</view>
		<view class="video-container">
			<video
				id="myVideo"
				:src="liveDetail.pull"
				object-fit="contain"
				@play="showBack = false"
				@pause="showBack = true"
				@ended="showBack = true"
			></video>
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
			gutter="0"
		></u-tabs-swiper>
		<swiper
			:current="swiperCurrent"
			@transition="transition"
			@animationfinish="animationfinish"
			:style="{ height: myHeight + 'rpx' }"
		>
			<swiper-item class="swiper-item" :key="0" @touchmove.stop="">
				<view
					class="b-f flex flex-direction"
					:id="'content-wrap' + 1"
					:style="{ height: myHeight + 'rpx' }"
				>
					<scroll-view
						scroll-y=""
						class="flex flex-direction padding-sm b-f6"
						:style="{ height: chatHeight + 'rpx' }"
					>
						<view
							v-for="(item, index) in chatList"
							:key="index"
							class="margin-bottom-xs"
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
									:level="item.msg[0].level"
									v-if="item.msg[0].ct.level !== '0'"
								></level>
								<text class="margin-left-xs fc-g fs-24">
									{{ item.msg[0].ct.user_nicename }}:</text
								>
								<text class="margin-left-sm fs-24"> enter live room </text>
							</template>
							<!-- 用户赠送礼物 -->
							<template v-else-if="item.msg[0]._method_ === 'SendGift'">
								<level
									:level="item.msg[0].level"
									v-if="item.msg[0].ct.level !== '0'"
								></level>
								<text class="margin-left-xs fc-g fs-24"> {{ item.msg[0].uname }}:</text>
								<text class="margin-left-sm fc-red fs-24">{{
									item.msg[0].ct.giftname + ' x' + item.msg[0].ct.giftcount
								}}</text>
							</template>
							<!-- 用户离开直播间 -->
							<template v-else-if="item.msg[0]._method_ === 'disconnect'">
								<level
									:level="item.msg[0].level"
									v-if="item.msg[0].ct.level !== '0'"
								></level>
								<text class="margin-left-xs fc-g fs-24">
									{{ item.msg[0].ct.user_nicename }}:</text
								>
								<text class="margin-left-sm fs-24"> leave </text>
							</template>

							<template v-else>
								<text>
									{{ JSON.stringify(item) + 'ejwq' }}
									ejwqk
								</text>
							</template>
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
						<view class="btn ava-80 btn-gift"></view>
					</view>
				</view>
			</swiper-item>
			<swiper-item
				class="swiper-item"
				:key="1"
				@touchmove.stop=""
				:style="{ height: myHeight + 'rpx' }"
			>
			</swiper-item>
			<swiper-item
				class="swiper-item"
				:key="2"
				@touchmove.stop=""
				:style="{ height: myHeight + 'rpx' }"
			>
			</swiper-item>
			<swiper-item
				class="swiper-item"
				:key="3"
				@touchmove.stop=""
				:style="{ height: myHeight + 'rpx' }"
			>
			</swiper-item>
		</swiper>
		<u-popup v-model="showSnippet" mode="bottom">
			<view style="height: 500rpx">
				<view
					class="flex align-center h-60 justify-between padding-left-sm padding-right-sm b-f6"
				>
					<text @tap="showSnippet = false">Close</text>
					<text>Snippet</text>
					<text class="fc-g" @tap="go('snippet')">Set</text>
				</view>
				<scroll-view scroll-y="" style="height: 440rpx">
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
						<button @tap="addSnippet">增加</button>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import { getLiveDetail, enterLiveRoom } from '@/api/live'
	import { swiperAutoHeight, swiperUTabs } from '@/mixin'
	import Level from '@/components/Level/Level.vue'
	export default {
		mixins: [swiperAutoHeight, swiperUTabs],
		components: { Level },
		data() {
			return {
				liveuid: '',
				stream: '',
				game_id: '',
				liveDetail: {},
				roomInfo: {},
				chatList: [],
				myHeight: 0,
				inputContent: '',
				menu: [
					{ name: 'Chat' },
					{ name: 'Squad' },
					{ name: 'Analyse' },
					{ name: 'Contribution' },
				],
				showBack: true,
				ws: null,
				showSnippet: false,
			}
		},
		async onLoad(options) {
			this.liveuid = options.liveuid
			this.stream = options.stream
			this.game_id = options.game_id
			this.myHeight = this.initScrollHeight(544)
			this.chatHeight = this.initScrollHeight(624)
		},
		async onShow() {
			this.getLiveDetail()
			await this.enterLiveRoom()
			this.createChatServerClient()
		},
		onHide() {
			this.ws.disconnect()
		},
		computed: {
			snippetList: function () {
				return this.$store.state.snippet.snippetList
			},
		},
		methods: {
			addSnippet() {
				this.$store.commit('add_sni', 'my str')
			},
			go(path, item) {
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
			},
			getLiveDetail() {
				let uid = this.isEmpty(this.uid) ? 100 : this.uid
				let token = this.isEmpty(this.token) ? 'not logined' : this.token
				getLiveDetail(uid, token, this.liveuid, this.stream, this.game_id)
					.then((res) => {
						this.liveDetail = res.info
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
						console.log(res, 'res')
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
					console.log('mes', mes)
				})
				this.ws.on('broadcastingListen', (mes) => {
					console.log('---1----1----1----1----1---')
					console.log('mes', mes)
					console.log('---2----23---2----2----2---')
					this.chatList.push(JSON.parse(mes))
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
				console.log('inputSend')
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
		},
	}
</script>

<style lang="scss">
	.video-container {
		width: 750rpx;
		height: 464rpx;
	}
	.goback {
		position: fixed;
		top: 0;
		left: 0;
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
</style>
