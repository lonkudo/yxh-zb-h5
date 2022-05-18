<template>
	<view>
		<view
			class="top-card margin-xs br-8 padding-xs flex justify-between bg-custom padding-top-lg"
		>
			<view>
				<text class="flex flex-direction fc-b-f fs-20 margin-bottom-xs"
					>My coins</text
				>
				<text class="fc-b-f fs-30 fw-9">{{ userInfo.coin }}</text>
			</view>
			<navigator url="record">
				<view class="fc-b-f fs-20">Gold Record ></view>
			</navigator>
		</view>
		<view class="margin-xs br-8 padding-xs b-f">
			<view class="margin-bottom-sm flex justify-between">
				<view>
					<text class="fc-b-3 fs-20"
						>Sign in tomorrow +{{ nextDayCoin }} gold coins</text
					>
				</view>
				<view class="fc-b-9 fs-20">Sign-in Rules ></view>
			</view>
			<view class="flex align-center justify-around">
				<view
					v-for="(item, index) in taskList.list"
					:key="index"
					class="flex flex-direction align-center"
					@click="signTask(item)"
				>
					<coin
						class="my-coin"
						:num="item.coin.toString()"
						:status="item.is_sign"
					></coin>
					<text class="fs-16 fc-b-9 date">{{ item.date }}</text>
				</view>
			</view>
		</view>
		<view class="b-f">
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
				<swiper-item class="swiper-item" :key="0">
					<scroll-view
						scroll-y
						@scrolltolower="onreachBottom"
						:id="'content-wrap' + 0"
					>
						<view class="flex flex-direction">
							<view
								class="margin-xs flex align-center justify-between margin-bottom-lg"
								v-for="(daily, j) in taskList.task"
								:key="j"
							>
								<view class="flex">
									<view
										class="bg-green icon flex align-center justify-around margin-right-xs"
									>
										<text :class="['iconfont fs-36', 'icon-quanburenwu']"></text>
									</view>
									<view class="flex flex-direction justify-between">
										<text class="fs-10 fc-b-3">{{ daily.name }}</text>
										<text class="fs-10 fc-b-9"
											>Finish task will earn {{ daily.coin }} coins.</text
										>
									</view>
								</view>
								<my-button-reverse
									:text="'To Complete'"
									:falseText="'Completed'"
									:initActive="daily.is_finish === 1 ? false : true"
									mana
									@onTap="toWhere(daily.id, 'task', daily.is_finish, daily)"
								></my-button-reverse>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item" :key="1">
					<scroll-view
						scroll-y
						@scrolltolower="onreachBottom"
						:id="'content-wrap' + 1"
					>
						<view class="flex flex-direction">
							<view
								class="margin-xs flex align-center justify-between margin-bottom-lg"
								v-for="(live, j) in taskList.go"
								:key="'l' + j"
							>
								<view class="flex">
									<view
										class="bg-green icon flex align-center justify-around margin-right-xs"
									>
										<text :class="['iconfont fs-36', 'icon-quanburenwu']"></text>
									</view>
									<view class="flex flex-direction justify-between">
										<text class="fs-10 fc-b-3">{{ live.name }}</text>
										<text class="fs-10 fc-b-9"
											>Finish task will earn {{ live.coin }} coins.</text
										>
									</view>
								</view>
								<my-button-reverse
									:text="'To Complete'"
									:falseText="'Completed'"
									:initActive="live.is_finish === 1 ? false : true"
									mana
									@onTap="toWhere(live.id, 'go', live.is_finish, live)"
								></my-button-reverse>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import Coin from '@/components/Coin/Coin.vue'
	import MyButtonReverse from '@/components/MyButtonReverse/MyButtonReverse.vue'
	import swiperAutoHeight from '@/mixin/swiperAutoHeight.js'
	import swiperUTabs from '@/mixin/swiperUTabs.js'
	import { getUserInfo, getTaskList, signTask, liveOrDailyTask } from '@/api/my'

	export default {
		mixins: [swiperAutoHeight, swiperUTabs],
		components: {
			Coin,
			MyButtonReverse,
		},
		data() {
			return {
				coinList: [
					{ label: 'Today' },
					{ label: '05-17' },
					{ label: '05-17' },
					{ label: '05-17' },
					{ label: '05-17' },
					{ label: '05-17' },
					{ label: '05-17' },
				],
				/* tabs+swiper内容 */
				menu: [{ name: 'Daily Task' }, { name: 'Live Task' }],
				taskList: {},
				taskStatus: {
					task2arts: false,
					thumb1art: false,
					watch15sVideo: false,
					checkTeamInfo: false,
					watchLiveShow: false,
				},
				taskList2: [],
			}
		},
		onLoad() {
			this.getTaskList(this.uid, 1)
		},
		methods: {
			getTaskList(uid, p) {
				getTaskList(uid, p)
					.then((res) => {
						this.taskList = res.info
						console.log('tasklist', res.info)

						this.$nextTick(() => {
							this.setSwiperHeight()
						})
					})
					.catch((err) => {
						console.log(err)
					})
			},
			signTask(item) {
				signTask(this.uid, item.day, this.token)
					.then((res) => {
						// console.log('sign', res)
						if (res.code === 0) {
							uni.showToast({ title: 'Signed', duration: 2000, icon: 'success' })
							this.addCoin(item.coin)
							item.is_sign = 1
						} else if (res.code === 433) {
							uni.showToast({
								title: 'Already signed or sign the wrong day',
								duration: 2000,
								icon: 'error',
							})
						} else if (res.code === 2001) {
							uni.showToast({
								title: 'Already signed or sign the wrong day',
								duration: 2000,
								icon: 'error',
							})
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
			toWhere(id, taskType, is_finish, item) {
				// console.log('is_finish', is_finish)
				if (is_finish === 1) return

				let result = ''
				if (taskType === 'task') {
					switch (id) {
						case 1:
							uni.switchTab({
								url: '/pages/discover/discover',
							})
							break
						case 2:
							uni.switchTab({
								url: '/pages/discover/discover',
							})
							break
						case 3:
							uni.switchTab({
								url: '/pages/discover/discover',
							})
							break
						case 4:
							uni.switchTab({
								url: '/pages/data/data',
							})
							break

						default:
							break
					}
				} else if (taskType === 'go') {
					switch (id) {
						case 1:
							uni.switchTab({
								url: '/pages/discover/discover',
							})
							break
						default:
							break
					}
				}
			},
		},
		filters: {},
		computed: {
			nextDayCoin: function () {
				if (this.isEmpty(this.taskList)) {
					return ''
				} else {
					let index = this.taskList.list.findIndex((ele) => {
						return ele.date === 'Today'
					})
					console.log('index', index)
					if (index === this.taskList.list.length) {
						return this.taskList.list[0].coin
					} else {
						return this.taskList.list[index + 1].coin
					}
				}
			},
		},
	}
</script>

<style lang="scss">
	.top-card {
		height: 200rpx;
	}
	.bg-custom {
		background-image: url('@/static/styles/png/bg-my.png');
		background-size: 100% auto;
		background-color: pink;
	}
	.my-coin {
		transform: scale(0.6);
	}
	.date {
		margin-left: -5rpx;
	}
	.icon {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}
</style>
