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
			<navigator :url="'filter'" slot="right"
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
					<view class="b-f margin-top-sm list">
						<score-item></score-item>
						<score-item></score-item>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item
				class="swiper-item"
				:key="'Finished'"
				@touchmove.stop=""
				:style="{ height: myHeight + 'rpx' }"
			>
				finished
			</swiper-item>
			<swiper-item
				class="swiper-item"
				:key="'Schedule'"
				@touchmove.stop=""
				:style="{ height: myHeight + 'rpx' }"
			>
				Schedule
			</swiper-item>
			<swiper-item
				class="swiper-item"
				:key="'Subscribe'"
				@touchmove.stop=""
				:style="{ height: myHeight + 'rpx' }"
			>
				Subscribe
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { swiperAutoHeight, swiperUTabs } from '@/mixin'
	import ScoreItem from './components/ScoreItem.vue'
	export default {
		mixins: [swiperAutoHeight, swiperUTabs],
		components: { ScoreItem },
		data() {
			return {
				myHeight: 0,
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
					time: 0,
					date: 0,
					compe_id: [],
				},
			}
		},
		onLoad() {
			this.myHeight = this.initScrollHeight(268)
		},
		watch: {
			cateIndex: {
				handler: function (newValue, oldValue) {
					/* 当cateIndex发生改变的时候去重新获取数据。 */
					// console.log(
					// 	this.oldCateIndex.time,
					// 	this.oldCateIndex.date,
					// 	'compare',
					// 	newValue.time,
					// 	newValue.date
					// )
					if (this.oldCateIndex.time !== newValue.time) {
						/* 第一行发生改变，第二行切换成all，并且获取对应数据。因为修改对象，它的索引不变所以新旧值相同，所以要另外起一个变量进行对比。 */
						newValue.date = 0
						if (newValue.time === 0) {
							// this.changeId('')
							// this.initOngoing()
						} else if (newValue.time === 1) {
							// this.initFinished('')
						} else if (newValue.time === 2) {
							// this.initFuture('')
						} else if (newValue.time === 3) {
							// this.appointmentPage.p = 0
							// this.appointmentList = []
							// this.reservationNext()
						}
						if (newValue.time !== 3) {
							// this.compePage.type = newValue.time + 1
							// this.getCompe()
							// this.selectable = true
						} else {
							// this.selectable = false
						}
					}
					if (this.oldCateIndex.date !== newValue.date) {
						/* 第二行发生改变，检测第一行，然后进行对应数据的init */
						if (newValue.date === 0) {
							// this.eventsList = this.allEvents
						} else {
							// this.eventsList = [this.recommendNew[newValue.date - 1].id]
						}
						if (newValue.time === 0) {
							/* 两层判断，第一层判断第一行菜单，第二行判断第二层菜单 */
							if (newValue.date === 0) {
								// this.changeId('')
								// this.initOngoing()
							} else {
								// this.changeId(this.recommendNew[newValue.date - 1].id)
								// this.initOngoing()
							}
						} else if (newValue.time === 1) {
							if (newValue.date === 0) {
								// this.initFinished('')
							} else {
								// this.initFinished(this.recommendNew[newValue.date - 1].id)
							}
						} else if (newValue.time === 2) {
							if (newValue.date === 0) {
								// this.initFuture('')
							} else {
								// this.initFuture(this.recommendNew[newValue.date - 1].id)
							}
						} else if (newValue.time === 3) {
							if (newValue.date === 0) {
								// this.appointmentPage.p = 0
								// this.appointmentList = []
								// this.appointmentPage.compe_id = []
								// this.reservationNext()
							} else {
								// this.appointmentPage.p = 0
								// this.appointmentList = []
								// this.appointmentPage.compe_id = [
								// 	this.recommendNew[newValue.date - 1].id,
								// ]
								// this.reservationNext()
							}
						}
					}
					if (this.oldCateIndex.compe_id !== newValue.compe_id) {
						/* 当全局的compe_id发生更改的时候执行, 修改对应id然后 重新初始化页面数据 */
						if (newValue.time === 0) {
							if (newValue.compe_id.length === 0) {
								if (this.initFlag) {
									// this.changeId('')
									// this.initOngoing()
								} else {
									// this.changeId(['-1'])
									// this.initOngoing()
								}
							} else {
								// this.changeId(newValue.compe_id)
								// this.initOngoing()
							}
						} else if (newValue.time === 1) {
							if (JSON.stringify(newValue.compe_id) === '[]') {
								// this.initFinished(['-1'])
							} else {
								// this.initFinished(newValue.compe_id)
							}
						} else if (newValue.time === 2) {
							if (JSON.stringify(newValue.compe_id) === '[]') {
								// this.initFuture(['-1'])
							} else {
								// this.initFuture(newValue.compe_id)
							}
						} else if (newValue.time === 3) {
							// this.appointmentPage.p = 0
							// this.appointmentList = []
							// this.appointmentPage.compe_id = newValue.compe_id
							// this.reservationNext()
						}
					}
					console.log('---1----1----1----1----1---', newValue, this.oldCateIndex)
					this.oldCateIndex.time = newValue.time
					this.oldCateIndex.date = newValue.date
					this.oldCateIndex.compe_id = newValue.compe_id
					return newValue
				},
				deep: true,
				immediate: true,
			},
			// compeInfo: {
			// 	handler: function (newVal) {
			// 		return newVal
			// 	},
			// 	deep: true,
			// },
		},
		methods: {
			tabsChange(index) {
				this.swiperCurrent = index
				this.cateIndex.time = index
			},
		},
	}
</script>

<style lang="scss">
	.list {
		border-top: 1rpx solid #f1f1f1;
		border-bottom: 1rpx solid #f1f1f1;
		> :nth-child(n) {
			border-top: 1rpx solid #f1f1f1;
		}
	}
</style>
