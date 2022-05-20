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
			@change="changeSwiper"
			:style="{ height: swiperHeight + 'px' }"
		>
			<swiper-item class="swiper-item" :key="0" @touchmove.stop="">
				<scroll-view scroll-y :id="'content-wrap' + 0">
					<view
						class="flex flex-direction b-f"
						v-for="(item, idx) in myReportList"
						:key="'t' + idx"
					>
						<view class="flex flex-direction padding-sm">
							<view class="flex margin-bottom-xs">
								<text class="fs-24 fc-b-9">Report a Review of </text>
								<text class="fs-18 fc-b-3 padding-left-sm"
									>{{ item.touserinfo.user_nicename }} :</text
								>
							</view>
							<view class="margin-bottom-xs"
								><text>{{ item.content }}</text></view
							>
							<view class="margin-bottom-lg">
								<text class="fs-24 fc-b-9">Report Type: </text>
								<text class="fs-18 fc-b-3 padding-left-sm">{{ item.type }}</text>
							</view>
							<view class="flex justify-between">
								<text class="fs-24 fc-b-9">{{ item.addtime }}</text>
								<view
									:class="['flex align-center justify-center', statusClass(item.status)]"
									><text class="fc-g fs-18 padding-left-sm padding-right-sm">{{
										item.status | statusText
									}}</text></view
								>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item" :key="1" @touchmove.stop="">
				<scroll-view scroll-y :id="'content-wrap' + 1">
					<view
						class="flex flex-direction b-f padding-sm"
						v-for="(item, idx) in wasReportedList"
						:key="'v' + idx"
					>
						<view class="flex margin-bottom-xs"> </view>
						<text class="fs-24 fc-b-9">Content reported by users:</text>
						<view class="margin-bottom-xs margin-top-xs"
							><text>{{ item.content }}</text></view
						>
						<view class="margin-bottom-lg">
							<text class="fs-24 fc-b-9">Report Type: </text>
							<text class="fs-18 fc-b-3 padding-left-sm">{{ item.type }}</text>
						</view>
						<view class="flex margin-bottom-xs align-center justify-between">
							<text class="fs-24 fc-b-9">Punishment:</text>

							<view class="margin-bottom-xs"
								><text class="fs-24 fc-b-3"
									>{{ item.status_str }} until {{ item.bantime }}</text
								></view
							>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { myReport, wasReported } from '@/api/my'
	import { swiperAutoHeight, swiperUTabs } from '@/mixin'
	export default {
		mixins: [swiperAutoHeight, swiperUTabs],
		data() {
			return {
				activeName: 'report',
				reportPage: {
					p: 0,
					show: true,
				},
				wasReportedPage: {
					p: 0,
					show: true,
				},
				myReportList: [],
				wasReportedList: [],
				menu: [{ name: 'My reports' }, { name: 'Reported' }],
			}
		},
		onLoad() {
			this.getMyReport()
			this.getWasReported()
		},
		methods: {
			getMyReport() {
				this.reportPage.p += 1
				myReport({ p: this.reportPage.p, uid: this.uid })
					.then((res) => {
						if (res.code === 0) {
							this.myReportList = this.myReportList.concat(res.info)
							if (res.info.length === 0) {
								this.reportPage.show = false
							}
						}
						this.$nextTick(() => {
							this.setSwiperHeight()
						})
					})
					.catch((err) => {
						console.log(err)
					})
					.finally()
			},
			getWasReported() {
				this.wasReportedPage.p += 1
				wasReported({ p: this.wasReportedPage.p, uid: this.uid })
					.then((res) => {
						if (res.code === 0) {
							this.wasReportedList = this.wasReportedList.concat(res.info)
							if (res.info.length === 0) {
								this.wasReportedPage.show = false
							}
						}
						this.$nextTick(() => {
							this.setSwiperHeight()
						})
					})
					.catch((err) => {
						console.log(err)
					})
			},
			statusClass(val) {
				switch (val) {
					case '0':
						return 'btn btn-green'
						break
					case '1':
						return 'btn btn-grey'
						break
					case '2':
						return ''
						break
					case '3':
						return ''
						break
					case '4':
						return ''
						break
					case '5':
						return ''
						break
					default:
						break
				}
			},
		},
		filters: {
			statusText: function (val) {
				switch (val) {
					case '0':
						return 'unhandled'
						break
					case '1':
						return 'handled'
						break
					case '2':
						return 'others'
						break
					case '3':
						return 'forbit to comment'
						break
					case '4':
						return 'prohibit'
						break
					case '5':
						return 'block user'
						break
					default:
						break
				}
			},
		},
	}
</script>

<style lang="scss">
	.btn {
		height: 40rpx;
		border-radius: 20rpx;
	}
	.btn-green {
		background-color: #e9f7f1;
		color: #52b57a;
	}
	.btn-grey {
		background-color: #999;
		color: #333;
	}
</style>
