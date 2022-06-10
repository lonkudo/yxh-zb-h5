<template>
	<view class="margin-xs b-f br-5">
		<scroll-view scroll-x="true">
			<view
				class="flex game-swiper padding-top-sm padding-bottom-sm justify-between"
			>
				<view
					class="game-item flex flex-direction justify-between padding-left-sm padding-right-sm"
					v-for="(item, index) in gameList"
					:key="index"
				>
					<view class="top flex align-center justify-between">
						<text class="fc-b-9 fs-22 f-hide w-230">{{ item.competition_name }}</text>
						<view v-if="true">
							<text class="fc-b-9 fs-22 margin-left-xs">{{
								item.match_time | formatGiven('MM-dd hh:ss')
							}}</text>
						</view>
						<view v-else>
							<text class="fc-b-9 fs-22 margin-right-xs">Live</text>
							<text class="iconfont fc-g icon-zhibozhong"></text>
						</view>
					</view>
					<view class="bottom flex justify-between">
						<view class="left flex flex-direction justify-between">
							<view class="team-item flex align-center">
								<img :src="item.home_logo" alt="" class="margin-right-sm" />
								<text class="fs-18 f-hide w-230">{{ item.home_name }}</text>
							</view>
							<view class="team-item flex align-center">
								<img :src="item.away_logo" alt="" class="margin-right-sm" />
								<text class="fs-18 f-hide w-230">{{ item.away_name }}</text>
							</view>
						</view>
						<view class="right">
							<view v-if="false" class="scores flex flex-direction justify-between">
								<text class="fs-18">{{ item.home_scores[0] }}</text>
								<text class="fs-18">{{ item.away_scores[0] }}</text>
							</view>
							<view v-else class="scores flex align-center">
								<text class="iconfont icon-lingdang fc-g"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// import pdata from './data.js'
	export default {
		name: 'PopularGame',
		props: {
			pdata: {
				type: Array,
				default: () => {
					return []
				},
			},
		},
		data() {
			return {
				gameList: this.pdata,
			}
		},
		created() {
			console.log('pdata', this.pdata)
		},
	}
</script>

<style lang="scss">
	.game-swiper {
		white-space: nowrap;
		height: 188rpx;
		view:nth-last-child(1) {
			border: 0;
		}
		.game-item {
			min-width: 370rpx;
			max-width: 370rpx;
			border-right: 1rpx solid #f6f6f6;
			.top {
				text:nth-child(1) {
					padding-top: 2rpx;
				}
			}
			.bottom {
				.left {
					height: 90rpx;
				}
				.right {
					.scores {
						text {
							height: 40rpx;
							line-height: 40rpx;
						}
						height: 90rpx;
					}
				}
			}
		}
		.team-item {
			img {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
</style>
