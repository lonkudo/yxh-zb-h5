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
						<view v-for="(item, index) in 30" :key="index"
							><text>mmsg textmsg textmsg textmsg textmsg textsg text</text></view
						>
					</scroll-view>
					<view
						class="h-80 b-f6 flex align-center justify-between padding-left-sm padding-right-sm"
					>
						<view class="btn ava-60 btn-snippet"></view>
						<view
							class="flex input-con b-f align-center padding-left-sm padding-right-sm h-60"
						>
							<input
								type="text"
								:placeholder="'Enter Chat Content'"
								v-model="inputContent"
								placeholder-style="color:#aaa"
								class="w-500 fs-20"
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
	</view>
</template>

<script>
	import { getLiveDetail, enterLiveRoom } from '@/api/live'
	import { swiperAutoHeight, swiperUTabs } from '@/mixin'
	export default {
		mixins: [swiperAutoHeight, swiperUTabs],
		data() {
			return {
				liveuid: '',
				stream: '',
				game_id: '',
				liveDetail: {},
				roomInfo: {},
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
			}
		},
		async onLoad(options) {
			this.myHeight = this.initScrollHeight(544)
			this.chatHeight = this.initScrollHeight(624)
			console.log('options', options)

			this.liveuid = options.liveuid
			this.stream = options.stream
			this.game_id = options.game_id
			this.getLiveDetail()
			await this.enterLiveRoom()
			console.log('---5----5----5----5----5---,', this.roomInfo)
			this.createChatServerClient()
		},
		methods: {
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
			createChatServerClient() {},
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
