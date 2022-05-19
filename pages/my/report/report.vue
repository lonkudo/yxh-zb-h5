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
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item" :key="1" @touchmove.stop="">
				<scroll-view scroll-y :id="'content-wrap' + 1">
					<view
						class="flex flex-direction"
						v-for="(time, idx) in wasReportedList"
						:key="'v' + idx"
					>
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
		},
	}
</script>

<style lang="scss"></style>
