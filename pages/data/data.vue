<template>
	<view style="margin: 20upx 0">
		<view class="data-main hot">
			<view class="padding-tb-sm padding-lr-xs title">Hot recommended</view>
			<u-row gutter="10">
				<u-col span="3" v-for="(item, index) of recommendLeagues" :key="index">
					<info-item :infoItem="item"></info-item>
				</u-col>
			</u-row>
		</view>
		<view class="data-main content">
			<u-tabs-swiper
				ref="uTabs"
				:list="moldList"
				:current="current"
				@change="modelTabsChange"
				:is-scroll="false"
				swiperWidth="750"
				active-color="#02b875"
				class="fix-top"
			></u-tabs-swiper>
			<swiper
				:current="swiperCurrent"
				@transition="transition"
				@animationfinish="animationfinish"
				@change="changeSwiper"
				:style="{ height: swiperHeight + 'px' }"
			>
				<swiper-item
					class="swiper-item"
					v-for="(item, index) in moldList"
					:key="index"
				>
					<scroll-view
						:id="'content-wrap' + index"
						scroll-y
						@scrolltolower="onreachBottom"
					>
						<!-- <view>22222222222222222</view>
						<view>22222222222222222</view>
						<view>22222222222222222</view>
						<view>22222222222222222</view>
						<view>22222222222222222</view>
						<view>22222222222222222</view> -->
						<u-collapse
							@change="change"
							@close="close"
							@open="open"
							class="hu-collapse"
						>
							<u-collapse-item
								:title="league.name"
								name="Docs guide"
								v-for="(league, index) of leagueList"
								:key="'le' + index"
							>
								<u-row gutter="10">
									<u-col span="3" v-for="(item, index) of league.data" :key="index">
										<info-item :infoItem="item"></info-item>
									</u-col>
								</u-row>
							</u-collapse-item>
						</u-collapse>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import { getDataIndex, getDataCategory } from '@/api/data'
	import { swiperAutoHeight, swiperUTabs } from '@/mixin'
	import InfoItem from './InfoItem'
	export default {
		name: 'Data',
		mixins: [swiperAutoHeight, swiperUTabs],
		data() {
			return {
				swiperHeight: 0,
				recommendLeagues: [],
				moldList: [],
				current: 0,
				activeMold: {},
				// 洲下面联赛列表
				leagueList: [],
			}
		},
		components: {
			InfoItem,
		},
		created() {
			this.getDataIndex()
		},
		methods: {
			getDataIndex() {
				getDataIndex({ p: 1, num: 20 }).then((res) => {
					const info = res.info
					this.recommendLeagues = info.recommend.slice(0, info.recommend.length)
					this.moldList = info.mold
					this.activeMold = this.moldList.length > 0 ? this.moldList[0] : {}
					this.getDataCategory(this.activeMold.id)
					this.$nextTick(() => {
						this.setSwiperHeight()
					})
				})
			},
			getDataCategory(id) {
				getDataCategory(id).then((res) => {
					this.leagueList = res.info
					this.$nextTick(() => {
						this.setSwiperHeight()
					})
				})
			},
			modelTabsChange(index) {
				this.current = index
				this.swiperCurrent = index
			},
			open(e) {
				console.log('open')
				this.$nextTick(() => {
					this.setSwiperHeight()
				})
				// console.log('open', e)
			},
			close(e) {
				// console.log('close', e)
			},
			change(e) {
				// console.log('change', e)
			},
			// scroll-view到底部加载更多
			onreachBottom() {},
		},
	}
</script>

<style lang="scss" scoped>
	// @import "@/assets/styles/variables.scss";

	.data-main {
		width: 96%;
		background: #ffffff;
		margin: 0 auto;
	}
	.content {
		margin-top: 20rpx;
		border-radius: 8rpx;
	}
	.hot {
	}
	.title {
		font-size: 30rpx;
	}
	.mold-con {
		border-top: 1px solid #e5e5e5;
		margin-top: 8rpx;
		padding: 0 8rpx;
	}
	.swiper-con {
	}
	.league-item {
		margin: 28rpx 4rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>
