<template>
	<view class="flex flex-direction">
		<template v-if="!this.isEmpty(futureObj)">
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
						<u-th class="u-th" width="30%">Event</u-th>
						<u-th class="u-th">Game</u-th>
					</u-tr>
					<template v-if="futureObj.home.length > 0">
						<u-tr class="u-tr" v-for="(item, index) in futureObj.home" :key="index">
							<u-td class="u-th" width="18%">{{ item.match_time }}</u-td>
							<u-td class="u-th" width="30%">{{ item.competition_name }}</u-td>
							<u-td class="u-th">{{ item.home_name }} vs {{ item.away_name }}</u-td>
						</u-tr>
					</template>
					<template v-else>
						<u-td class="u-td" width="100%"> no games</u-td>
					</template>
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
						<u-th class="u-th" width="30%">Event</u-th>
						<u-th class="u-th">Game</u-th>
					</u-tr>
					<template v-if="futureObj.away.length > 0">
						<u-tr class="u-tr" v-for="(item, index) in futureObj.away" :key="index">
							<u-td class="u-td" width="18%">{{ item.match_time }}</u-td>
							<u-td class="u-td" width="30%">{{ item.competition_name }}</u-td>
							<u-td class="u-td">{{ item.home_name }} vs {{ item.away_name }}</u-td>
						</u-tr>
					</template>
					<template v-else>
						<u-tr class="u-tr">
							<u-td class="u-td" width="100%"> no games</u-td>
						</u-tr>
					</template>
				</u-table>
			</view>
		</template>
	</view>
</template>

<script>
	import { getFutureGames } from '@/api/live'
	export default {
		name: 'FutureGames',
		props: ['game_id', 'teamInfo'],
		data() {
			return {
				futureObj: {}, // 未来比赛
			}
		},
		created() {
			this.getFutureGames(this.game_id)
		},
		methods: {
			getFutureGames(match_id) {
				getFutureGames({ match_id })
					.then((res) => {
						// console.log('this.pppp.future', res)
						this.futureObj = res.info
						// console.log('this.potinList.future', this.futureObj)
					})
					.catch((err) => {
						console.log(err)
					})
			},
		},
	}
</script>

<style></style>
