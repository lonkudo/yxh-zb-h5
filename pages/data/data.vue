<template>
	<scroll-view scroll-y :style="{ height: myHeight + 'rpx' }">
		<view id="upperRec">
			<view class="data-main hot" style="margin: 15rpx 15rpx 0 15rpx">
				<view class="padding-tb-sm padding-lr-xs title">Hot recommended</view>
				<u-row gutter="10">
					<u-col span="3" v-for="(item, index) of recommendLeagues" :key="index">
						<info-item :infoItem="item"></info-item>
					</u-col>
				</u-row>
			</view>
		</view>
		<view class="data-main content">
			<u-tabs-swiper
				ref="uTabs"
				:list="moldList"
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
				:style="{ height: swiperHeight + 'rpx' }"
				class="b-f6"
			>
				<swiper-item
					class="swiper-item"
					v-for="(item, index) in moldList"
					:key="index"
				>
					<scroll-view
						:id="'content-wrap' + index"
						scroll-y
						:style="{ height: swiperHeight + 'rpx' }"
					>
						<u-collapse
							@change="changeCollapse"
							@close="close"
							@open="open"
							class="hu-collapse b-f"
							ref="collapse"
						>
							<u-collapse-item
								v-for="(league, index) of leagueList"
								:key="'le' + index"
							>
								<view slot="title">
									<text class="padding-left-sm"> {{ league.name }} </text>
									<text class="match"> {{ league.data.length }}&nbsp;matchs </text>
								</view>
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
	</scroll-view>
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
				swiperHeight: 600,
				recommendLeagues: [],
				moldList: [],
				current: 0,
				activeMold: {},
				// 洲下面联赛列表
				leagueList: [],
				wrapperHeight: 0,
				myHeight: 0,
				recHeight: 0, // 单位px
			}
		},
		components: {
			InfoItem,
		},
		onLoad() {
			// this.swiperHeight = this.initScrollHeight(200)
			this.myHeight = this.initScrollHeight(-88)
			console.log('myHeight', this.myHeight)
		},
		created() {
			this.getDataIndex()
		},
		methods: {
			getDataIndex() {
				getDataIndex({ p: 1, num: 20 }).then((res) => {
					const info = res.info
					this.recommendLeagues = info.recommend.slice(0, info.recommend.length)
					this.$nextTick(() => {
						this.getDownHeight()
					})
					this.moldList = info.mold
					this.activeMold = this.moldList.length > 0 ? this.moldList[0] : {}
					this.getDataCategory(this.activeMold.id)
					// this.$nextTick(() => {
					//   this.setSwiperHeight();
					// });
				})
			},
			getDataCategory(id) {
				getDataCategory(id).then((res) => {
					this.leagueList = res.info
					// this.$nextTick(() => {
					//   this.setSwiperHeight();
					// });
				})
			},
			tabsChange(index) {
				console.log(index)
				this.current = index
				this.swiperCurrent = index
				this.getDataCategory(this.moldList[index].id)
			},
			getDownHeight() {
				var view = uni.createSelectorQuery().select('#upperRec')
				view
					.boundingClientRect((data) => {
						this.recHeight = this.px2rpx(data.height)
						this.swiperHeight = this.initScrollHeight(this.recHeight)
					})
					.exec()
			},
			open(e) {
				// console.log("open");
				// this.$nextTick(() => {
				//   this.setSwiperHeight();
				// });
				// console.log('open', e)
			},
			close(e) {
				// console.log("close", e);
				// setTimeout(() => {
				//   this.$nextTick(() => {
				//     this.setSwiperHeight();
				//   });
				// }, 300);
			},
			changeCollapse(e) {
				// console.log("change", this.$refs.collapse);
				// setTimeout(() => {
				//   this.$nextTick(() => {
				//     this.setSwiperHeight();
				//   });
				// }, 300);
				// console.log('change', e)
			},
		},
	}
</script>

<style lang="scss" scoped>
	// @import "@/assets/styles/variables.scss";

	.data-main {
		background: #ffffff;
		margin: 0 auto;
	}
	.content {
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
	.league-item {
		margin: 28rpx 4rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.match {
		position: absolute;
		right: 40px;
	}
</style>
