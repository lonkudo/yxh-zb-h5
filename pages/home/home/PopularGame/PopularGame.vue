<template>
	<view class="margin-xs b-f br-5 h-200">
		<scroll-view scroll-x="true" class="w-520">
			<view
				class="flex game-swiper padding-top-sm padding-bottom-sm justify-between"
			>
				<view
					class="game-item flex flex-direction justify-between padding-left-sm padding-right-sm"
					v-for="(item, index) in gameList"
					:key="index"
					@tap="go(item)"
				>
					<view class="top flex align-center justify-between">
						<text class="fc-b-9 fs-20 f-hide w-230">{{ item.name_en }}</text>
						<view v-if="true">
							<text class="fc-b-9 fs-20 margin-left-xs"
								>{{ item.match_time | formatGiven('MM-dd hh:ss') }} ></text
							>
						</view>
						<view v-else>
							<text class="fc-b-9 fs-20 margin-right-xs">Live</text>
							<text class="iconfont fc-g icon-zhibozhong"></text>
						</view>
					</view>
					<view class="bottom flex justify-between">
						<view class="left flex flex-direction justify-between">
							<view class="team-item flex align-center">
								<img :src="item.home_team.logo" alt="" class="margin-right-sm" />
								<text class="fs-18 f-hide w-230">{{ item.home_team.name_en }}</text>
							</view>
							<view class="team-item flex align-center">
								<img :src="item.away_team.logo" alt="" class="margin-right-sm" />
								<text class="fs-18 f-hide w-230">{{ item.away_team.name_en }}</text>
							</view>
						</view>
						<view class="right">
							<view v-if="false" class="scores flex flex-direction justify-between">
								<text class="fs-18">{{ item.score.home_team }}</text>
								<text class="fs-18">{{ item.score.home_team }}</text>
							</view>
							<view v-else class="scores flex align-center">
								<text
									:class="[
										'iconfont icon-lingdang fs-40  ',
										item.is_appointment ? 'fc-g' : 'fc-b-c',
									]"
									@tap.stop="subscribe(item)"
								></text>
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
	import check from '@/utils/check'
	import { getAppointmentList } from '@/api/my'
	import { addAppointment } from '@/api/score'
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
		watch: {
			pdata: function (newVal) {
				this.gameList = this.pdata
			},
		},
		created() {},
		methods: {
			@check()
			subscribe(item) {
				/* 订阅赛事 */
				addAppointment({
					uid: this.uid,
					game_id: item.id,
					token: this.token,
					hideLoading: true,
				})
					.then((res) => {
						if (res.info.isappointment === '0') {
							item.is_appointment = 0
							this.$u.toast('unsubscribed')
						} else if (res.info.isappointment === 1) {
							item.is_appointment = 1
							this.$u.toast('subscribed')
							this.$store.dispatch('FINISH_TASK', {
								type: 1,
								taskid: 7,
								that: this,
							})
						}
					})
					.catch((err) => {
						console.log('err', err)
					})
			},
			go(item) {
				console.log('item', item)
				let game_id = item.live[0].id
				let stream = item.live[0].stream
				let liveuid = item.live[0].uid
				uni.navigateTo({
					url:
						'/pages/live/live?liveuid=' +
						liveuid +
						'&game_id=' +
						game_id +
						'&stream=' +
						stream,
				})
			},
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
