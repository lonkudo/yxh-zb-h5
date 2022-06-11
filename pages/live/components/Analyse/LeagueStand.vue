<template>
	<view class="flex flex-direction">
		<template v-if="!this.isEmpty(pointObj)">
			<view class="padding-sm b-f6">League Stands</view>
			<view class="b-f padding-xs">
				<view class="flex align-center justify-start">
					<image :src="teamInfo.home.logo" mode="" class="ava-40" />
					<text class="fs-16 margin-left-xs w-200 f-hide">{{
						teamInfo.home.name
					}}</text>
				</view>
			</view>
			<view>
				<template v-if="!this.isEmpty(pointObj.home)">
					<u-table-my
						font-size="16"
						:th-style="{
							fontSize: '16rpx',
							fontWeight: '400',
							backgroundColor: '#fff',
							color: '#777',
							padding: '10rpx 0',
						}"
						:border="false"
					>
						<u-tr-my class="u-tr-my">
							<u-th-my class="u-th-my" width="10%">Class</u-th-my>
							<u-th-my class="u-th-my" width="9%">Game</u-th-my>
							<u-th-my class="u-th-my" width="9%">Win</u-th-my>
							<u-th-my class="u-th-my" width="9%">Draw</u-th-my>
							<u-th-my class="u-th-my" width="9%">Loss</u-th-my>
							<u-th-my class="u-th-my" width="9%">Goals</u-th-my>
							<u-th-my class="u-th-my" width="12%">Goals Against</u-th-my>
							<u-th-my class="u-th-my" width="10%">Points</u-th-my>
							<u-th-my class="u-th-my" width="11%">Ranking</u-th-my>
							<u-th-my class="u-th-my" width="12%">Win Rate</u-th-my>
						</u-tr-my>
						<u-tr-my class="u-tr-my">
							<u-th-my class="u-th-my" width="10%">Total</u-th-my>
							<u-th-my class="u-th-my" width="9%">{{
								pointObj.home.total.total
							}}</u-th-my>
							<u-th-my class="u-th-my bg-lightgreen" width="9%">{{
								pointObj.home.total.win
							}}</u-th-my>
							<u-th-my class="u-th-my bg-lightgreen" width="9%">{{
								pointObj.home.total.draw
							}}</u-th-my>
							<u-th-my class="u-th-my bg-lightgreen" width="9%">{{
								pointObj.home.total.lose
							}}</u-th-my>
							<u-th-my class="u-th-my" width="9%">{{
								pointObj.home.total.score
							}}</u-th-my>
							<u-th-my class="u-th-my" width="12%">{{
								pointObj.home.total.goals_against
							}}</u-th-my>
							<u-th-my class="u-th-my" width="10%">{{
								pointObj.home.total.points
							}}</u-th-my>
							<u-th-my class="u-th-my" width="11%">{{
								pointObj.home.total.position
							}}</u-th-my>
							<u-th-my class="u-th-my bg-pink" width="12%">{{
								pointObj.home.total.odds
							}}</u-th-my>
						</u-tr-my>
						<u-tr-my class="u-tr-my">
							<u-th-my class="u-th-my" width="10%">Home</u-th-my>
							<u-th-my class="u-th-my" width="9%">{{
								pointObj.home.home.total
							}}</u-th-my>
							<u-th-my class="u-th-my bg-lightgreen" width="9%">{{
								pointObj.home.home.win
							}}</u-th-my>
							<u-th-my class="u-th-my bg-lightgreen" width="9%">{{
								pointObj.home.home.draw
							}}</u-th-my>
							<u-th-my class="u-th-my bg-lightgreen" width="9%">{{
								pointObj.home.home.lose
							}}</u-th-my>
							<u-th-my class="u-th-my" width="9%">{{
								pointObj.home.home.score
							}}</u-th-my>
							<u-th-my class="u-th-my" width="12%">{{
								pointObj.home.home.goals_against
							}}</u-th-my>
							<u-th-my class="u-th-my" width="10%">{{
								pointObj.home.home.points
							}}</u-th-my>
							<u-th-my class="u-th-my" width="11%">{{
								pointObj.home.home.position
							}}</u-th-my>
							<u-th-my class="u-th-my bg-pink" width="12%">{{
								pointObj.home.home.odds
							}}</u-th-my>
						</u-tr-my>
						<u-tr-my class="u-tr-my">
							<u-th-my class="u-th-my" width="10%">Away</u-th-my>
							<u-th-my class="u-th-my" width="9%">{{
								pointObj.home.away.total
							}}</u-th-my>
							<u-th-my class="u-th-my bg-lightgreen" width="9%">{{
								pointObj.home.away.win
							}}</u-th-my>
							<u-th-my class="u-th-my bg-lightgreen" width="9%">{{
								pointObj.home.away.draw
							}}</u-th-my>
							<u-th-my class="u-th-my bg-lightgreen" width="9%">{{
								pointObj.home.away.lose
							}}</u-th-my>
							<u-th-my class="u-th-my" width="9%">{{
								pointObj.home.away.score
							}}</u-th-my>
							<u-th-my class="u-th-my" width="12%">{{
								pointObj.home.away.goals_against
							}}</u-th-my>
							<u-th-my class="u-th-my" width="10%">{{
								pointObj.home.away.points
							}}</u-th-my>
							<u-th-my class="u-th-my" width="11%">{{
								pointObj.home.away.position
							}}</u-th-my>
							<u-th-my class="u-th-my bg-pink" width="12%">{{
								pointObj.home.away.odds
							}}</u-th-my>
						</u-tr-my>
					</u-table-my>
				</template>
				<template v-else>
					<text>no data</text>
				</template>
			</view>
			<view class="b-f padding-xs">
				<view class="flex align-center justify-start">
					<image :src="teamInfo.away.logo" mode="" class="ava-40" />
					<text class="fs-16 margin-left-xs w-200 f-hide">{{
						teamInfo.away.name
					}}</text>
				</view>
			</view>
			<template v-if="!this.isEmpty(pointObj.away)">
				<u-table-my
					font-size="16"
					:th-style="{
						fontSize: '16rpx',
						fontWeight: '400',
						backgroundColor: '#fff',
						color: '#777',
						padding: '10rpx 0',
					}"
					:border="false"
				>
					<u-tr-my class="u-tr-my">
						<u-th-my class="u-th-my" width="10%">Class</u-th-my>
						<u-th-my class="u-th-my" width="9%">Game</u-th-my>
						<u-th-my class="u-th-my" width="9%">Win</u-th-my>
						<u-th-my class="u-th-my" width="9%">Draw</u-th-my>
						<u-th-my class="u-th-my" width="9%">Loss</u-th-my>
						<u-th-my class="u-th-my" width="9%">Goals</u-th-my>
						<u-th-my class="u-th-my" width="12%">Goals Against</u-th-my>
						<u-th-my class="u-th-my" width="10%">Points</u-th-my>
						<u-th-my class="u-th-my" width="11%">Ranking</u-th-my>
						<u-th-my class="u-th-my" width="12%">Win Rate</u-th-my>
					</u-tr-my>
					<u-tr-my class="u-tr-my">
						<u-td-my class="u-td-my" width="10%">Total</u-td-my>
						<u-td-my class="u-td-my" width="9%">{{
							pointObj.away.total.total
						}}</u-td-my>
						<u-td-my class="u-td-my bg-lightgreen" width="9%">{{
							pointObj.away.total.win
						}}</u-td-my>
						<u-td-my class="u-td-my bg-lightgreen" width="9%">{{
							pointObj.away.total.draw
						}}</u-td-my>
						<u-td-my class="u-td-my bg-lightgreen" width="9%">{{
							pointObj.away.total.lose
						}}</u-td-my>
						<u-td-my class="u-td-my" width="9%">{{
							pointObj.away.total.score
						}}</u-td-my>
						<u-td-my class="u-td-my" width="12%">{{
							pointObj.away.total.goals_against
						}}</u-td-my>
						<u-td-my class="u-td-my" width="10%">{{
							pointObj.away.total.points
						}}</u-td-my>
						<u-td-my class="u-td-my" width="11%">{{
							pointObj.away.total.position
						}}</u-td-my>
						<u-td-my class="u-td-my bg-pink" width="12%">{{
							pointObj.away.total.odds
						}}</u-td-my>
					</u-tr-my>
					<u-tr-my class="u-tr-my">
						<u-td-my class="u-td-my" width="10%">Home</u-td-my>
						<u-td-my class="u-td-my" width="9%">{{
							pointObj.away.home.total
						}}</u-td-my>
						<u-td-my class="u-td-my bg-lightgreen" width="9%">{{
							pointObj.away.home.win
						}}</u-td-my>
						<u-td-my class="u-td-my bg-lightgreen" width="9%">{{
							pointObj.away.home.draw
						}}</u-td-my>
						<u-td-my class="u-td-my bg-lightgreen" width="9%">{{
							pointObj.away.home.lose
						}}</u-td-my>
						<u-td-my class="u-td-my" width="9%">{{
							pointObj.away.home.score
						}}</u-td-my>
						<u-td-my class="u-td-my" width="12%">{{
							pointObj.away.home.goals_against
						}}</u-td-my>
						<u-td-my class="u-td-my" width="10%">{{
							pointObj.away.home.points
						}}</u-td-my>
						<u-td-my class="u-td-my" width="11%">{{
							pointObj.away.home.position
						}}</u-td-my>
						<u-td-my class="u-td-my bg-pink" width="12%">{{
							pointObj.away.home.odds
						}}</u-td-my>
					</u-tr-my>
					<u-tr-my class="u-tr-my">
						<u-td-my class="u-td-my" width="10%">Away</u-td-my>
						<u-td-my class="u-td-my" width="9%">{{
							pointObj.away.away.total
						}}</u-td-my>
						<u-td-my class="u-td-my bg-lightgreen" width="9%">{{
							pointObj.away.away.win
						}}</u-td-my>
						<u-td-my class="u-td-my bg-lightgreen" width="9%">{{
							pointObj.away.away.draw
						}}</u-td-my>
						<u-td-my class="u-td-my bg-lightgreen" width="9%">{{
							pointObj.away.away.lose
						}}</u-td-my>
						<u-td-my class="u-td-my" width="9%">{{
							pointObj.away.away.score
						}}</u-td-my>
						<u-td-my class="u-td-my" width="12%">{{
							pointObj.away.away.goals_against
						}}</u-td-my>
						<u-td-my class="u-td-my" width="10%">{{
							pointObj.away.away.points
						}}</u-td-my>
						<u-td-my class="u-td-my" width="11%">{{
							pointObj.away.away.position
						}}</u-td-my>
						<u-td-my class="u-td-my bg-pink" width="12%">{{
							pointObj.away.away.odds
						}}</u-td-my>
					</u-tr-my>
				</u-table-my>
			</template>
			<template v-else>
				<text>no data</text>
			</template>
		</template>
	</view>
</template>

<script>
	import { getPointsRecord } from '@/api/live'
	export default {
		name: 'Battle',
		props: ['game_id', 'teamInfo'],
		data() {
			return {
				pointObj: {}, // 积分近况
			}
		},
		created() {
			this.getPointsRecord(this.game_id)
		},
		methods: {
			getPointsRecord(match_id) {
				getPointsRecord({ match_id })
					.then((res) => {
						this.pointObj = res.info
						console.log('pointObj', this.pointObj)
					})
					.catch((err) => {
						console.log(err)
					})
			},
		},
	}
</script>

<style></style>
