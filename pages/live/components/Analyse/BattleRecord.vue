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
				<u-table
					font-size="16"
					:th-style="{
						fontSize: '16rpx',
						fontWeight: '400',
						backgroundColor: '#dde1ed',
						color: '#999',
						padding: '10rpx 0',
					}"
					border-color="none"
					border="0"
				>
					<u-tr class="u-tr">
						<u-th class="u-th" width="18%">Data</u-th>
						<u-th class="u-th" width="18%">Event</u-th>
						<u-th class="u-th" width="26%">Home</u-th>
						<u-th class="u-th" width="12%">Score</u-th>
						<u-th class="u-th" width="26%">Away</u-th>
					</u-tr>
					<u-tr
						class="u-tr"
						v-for="(item, index) in battleObj.home_team"
						:key="index"
					>
						<u-td class="u-th" width="18%">{{ item.match_time }}</u-td>
						<u-td class="u-th" width="18%">{{ item.competition_name }}</u-td>
						<u-td class="u-th" width="26%">{{ item.home_team.name }}</u-td>
						<u-td class="u-th" width="12%"
							>{{ item.home_team.score }} - {{ item.away_team.score }}</u-td
						>
						<u-td class="u-th" width="26%">{{ item.away_team.name }}</u-td>
					</u-tr>
				</u-table>
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
				<u-table
					font-size="16"
					:th-style="{
						fontSize: '16rpx',
						fontWeight: '400',
						backgroundColor: '#dde1ed',
						color: '#999',
						padding: '10rpx 0',
					}"
					border-color="none"
					border="0"
				>
					<u-tr class="u-tr">
						<u-th class="u-th" width="18%">Data</u-th>
						<u-th class="u-th" width="18%">Event</u-th>
						<u-th class="u-th" width="26%">Home</u-th>
						<u-th class="u-th" width="12%">Score</u-th>
						<u-th class="u-th" width="26%">Away</u-th>
					</u-tr>
					<u-tr
						class="u-tr"
						v-for="(item, index) in battleObj.away_team"
						:key="index"
					>
						<u-td class="u-th" width="18%">{{ item.match_time }}</u-td>
						<u-td class="u-th" width="18%">{{ item.competition_name }}</u-td>
						<u-td class="u-th" width="26%">{{ item.home_team.name }}</u-td>
						<u-td class="u-th" width="12%"
							>{{ item.home_team.score }} - {{ item.away_team.score }}</u-td
						>
						<u-td class="u-th" width="26%">{{ item.away_team.name }}</u-td>
					</u-tr>
				</u-table>
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
					})
					.catch((err) => {
						console.log(err)
					})
			},
		},
	}
</script>

<style></style>
