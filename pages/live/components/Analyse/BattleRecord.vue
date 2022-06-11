<template>
	<view class="flex flex-direction">
		<template v-if="!this.isEmpty(battleObj)">
			<view class="padding-sm b-f6">Record Status</view>
			<view class="b-f padding-xs">
				<view class="flex align-center justify-start">
					<image :src="teamInfo.home.logo" mode="" class="ava-40" />
					<text class="fs-16 margin-left-xs w-200 f-hide">{{
						teamInfo.home.name
					}}</text>
				</view>
			</view>
			<view>
				<u-table-my
					font-size="16"
					:th-style="{
						fontSize: '16rpx',
						fontWeight: '400',
						backgroundColor: '#dde1ed',
						color: '#999',
						padding: '10rpx 0',
					}"
					:border="false"
				>
					<u-tr-my class="u-tr-my">
						<u-th-my class="u-th-my" width="18%">Data</u-th-my>
						<u-th-my class="u-th-my" width="18%">Event</u-th-my>
						<u-th-my class="u-th-my" width="26%">Home</u-th-my>
						<u-th-my class="u-th-my" width="12%">Score</u-th-my>
						<u-th-my class="u-th-my" width="26%">Away</u-th-my>
					</u-tr-my>
					<u-tr-my
						class="u-tr-my"
						v-for="(item, index) in battleObj.home_team"
						:key="index"
					>
						<u-td-my :class="index % 2 ? 'bg-lightgrey' : ''" width="18%"
							><view class="h-50 flex flex-direction justify-center align-center">{{
								item.match_time
							}}</view></u-td-my
						>
						<u-td-my :class="index % 2 ? 'bg-lightgrey' : ''" width="18%"
							><view class="h-50 flex flex-direction justify-center align-center">{{
								item.competition_name
							}}</view></u-td-my
						>
						<u-td-my :class="index % 2 ? 'bg-lightgrey' : ''" width="26%"
							><view class="h-50 flex flex-direction justify-center align-center">{{
								item.home_team.name
							}}</view></u-td-my
						>
						<u-td-my
							width="12%"
							:class="[
								'u-th-my',
								getColor(item.home_team.score, item.away_team.score),
								index % 2 ? 'bg-lightgrey' : '',
							]"
							><view class="h-50 flex flex-direction justify-center align-center"
								>{{ item.home_team.score }} - {{ item.away_team.score }}</view
							></u-td-my
						>
						<u-td-my :class="index % 2 ? 'bg-lightgrey' : ''" width="26%"
							><view class="h-50 flex flex-direction justify-center align-center">{{
								item.away_team.name
							}}</view></u-td-my
						>
					</u-tr-my>
				</u-table-my>
			</view>
			<view class="b-f padding-xs">
				<view class="flex align-center justify-start">
					<image :src="teamInfo.away.logo" mode="" class="ava-40" />
					<text class="fs-16 margin-left-xs w-200 f-hide">{{
						teamInfo.away.name
					}}</text>
				</view>
			</view>
			<view>
				<u-table-my
					font-size="16"
					:th-style="{
						fontSize: '16rpx',
						fontWeight: '400',
						backgroundColor: '#dde1ed',
						color: '#999',
						padding: '10rpx 0',
					}"
					:border="false"
				>
					<u-tr-my class="u-tr-my">
						<u-th-my class="u-th-my" width="18%">Data</u-th-my>
						<u-th-my class="u-th-my" width="18%">Event</u-th-my>
						<u-th-my class="u-th-my" width="26%">Home</u-th-my>
						<u-th-my class="u-th-my" width="12%">Score</u-th-my>
						<u-th-my class="u-th-my" width="26%">Away</u-th-my>
					</u-tr-my>
					<u-tr-my
						class="u-tr-my"
						v-for="(item, index) in battleObj.away_team"
						:key="index"
					>
						<u-td-my :class="index % 2 ? 'bg-lightgrey' : ''" width="18%"
							><view class="h-50 flex flex-direction justify-center align-center">{{
								item.match_time
							}}</view></u-td-my
						>
						<u-td-my :class="index % 2 ? 'bg-lightgrey' : ''" width="18%"
							><view class="h-50 flex flex-direction justify-center align-center">{{
								item.competition_name
							}}</view></u-td-my
						>
						<u-td-my :class="index % 2 ? 'bg-lightgrey' : ''" width="26%"
							><view class="h-50 flex flex-direction justify-center align-center">{{
								item.home_team.name
							}}</view></u-td-my
						>
						<u-td-my
							:class="[
								'u-th-my',
								getColor(item.home_team.score, item.away_team.score),
								index % 2 ? 'bg-lightgrey' : '',
							]"
							width="12%"
							><view class="h-50 flex flex-direction justify-center align-center"
								>{{ item.home_team.score }} - {{ item.away_team.score }}</view
							></u-td-my
						>
						<u-td-my :class="index % 2 ? 'bg-lightgrey' : ''" width="26%"
							><view class="h-50 flex flex-direction justify-center align-center">{{
								item.away_team.name
							}}</view></u-td-my
						>
					</u-tr-my>
				</u-table-my>
			</view>
		</template>
	</view>
</template>

<script>
	import { getBattleHistory } from '@/api/live'
	export default {
		name: 'BattleRecord',
		props: ['game_id', 'teamInfo'],
		data() {
			return {
				battleObj: {}, // 对战历史
			}
		},
		created() {
			this.getBattleHistory(this.game_id) // 获取到数据以后初始化对战历史
		},
		methods: {
			getBattleHistory(match_id) {
				getBattleHistory({ match_id })
					.then((res) => {
						this.battleObj = res.info
						console.log('', res)
					})
					.catch((err) => {
						console.log(err)
					})
			},
			getColor(a, b) {
				if (a > b) {
					return 'fc-red'
				} else if (a === b) {
					return 'fc-g'
				} else {
					return 'fc-blue'
				}
			},
		},
	}
</script>

<style></style>
