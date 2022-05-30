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
				<u-table
					font-size="16"
					:th-style="{
						fontSize: '16rpx',
						fontWeight: '400',
						backgroundColor: '#fff',
						color: '#777',
					}"
					border-color="#fff"
				>
					<u-tr class="u-tr">
						<u-th class="u-th">Class</u-th>
						<u-th class="u-th">Game</u-th>
						<u-th class="u-th">Win</u-th>
						<u-th class="u-th">Draw</u-th>
						<u-th class="u-th">Loss</u-th>
						<u-th class="u-th">Goals</u-th>
						<u-th class="u-th">Goals Against</u-th>
						<u-th class="u-th">Points</u-th>
						<u-th class="u-th">Ranking</u-th>
						<u-th class="u-th">Win Rate</u-th>
					</u-tr>
					<u-tr class="u-tr">
						<u-th class="u-th">Total</u-th>
						<u-th class="u-th">{{ pointObj.home.total.total }}</u-th>
						<u-th class="u-th">{{ pointObj.home.total.win }}</u-th>
						<u-th class="u-th">{{ pointObj.home.total.draw }}</u-th>
						<u-th class="u-th">{{ pointObj.home.total.lose }}</u-th>
						<u-th class="u-th">{{ pointObj.home.total.score }}</u-th>
						<u-th class="u-th">{{ pointObj.home.total.goals_against }}</u-th>
						<u-th class="u-th">{{ pointObj.home.total.points }}</u-th>
						<u-th class="u-th">{{ pointObj.home.total.position }}</u-th>
						<u-th class="u-th">{{ pointObj.home.total.odds }}</u-th>
					</u-tr>
					<u-tr class="u-tr">
						<u-th class="u-th">Home</u-th>
						<u-th class="u-th">{{ pointObj.home.home.total }}</u-th>
						<u-th class="u-th">{{ pointObj.home.home.win }}</u-th>
						<u-th class="u-th">{{ pointObj.home.home.draw }}</u-th>
						<u-th class="u-th">{{ pointObj.home.home.lose }}</u-th>
						<u-th class="u-th">{{ pointObj.home.home.score }}</u-th>
						<u-th class="u-th">{{ pointObj.home.home.goals_against }}</u-th>
						<u-th class="u-th">{{ pointObj.home.home.points }}</u-th>
						<u-th class="u-th">{{ pointObj.home.home.position }}</u-th>
						<u-th class="u-th">{{ pointObj.home.home.odds }}</u-th>
					</u-tr>
					<u-tr class="u-tr">
						<u-th class="u-th">Away</u-th>
						<u-th class="u-th">{{ pointObj.home.away.total }}</u-th>
						<u-th class="u-th">{{ pointObj.home.away.win }}</u-th>
						<u-th class="u-th">{{ pointObj.home.away.draw }}</u-th>
						<u-th class="u-th">{{ pointObj.home.away.lose }}</u-th>
						<u-th class="u-th">{{ pointObj.home.away.score }}</u-th>
						<u-th class="u-th">{{ pointObj.home.away.goals_against }}</u-th>
						<u-th class="u-th">{{ pointObj.home.away.points }}</u-th>
						<u-th class="u-th">{{ pointObj.home.away.position }}</u-th>
						<u-th class="u-th">{{ pointObj.home.away.odds }}</u-th>
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
			<u-table
				font-size="16"
				:th-style="{
					fontSize: '16rpx',
					fontWeight: '400',
					backgroundColor: '#fff',
					color: '#777',
				}"
				border-color="#fff"
			>
				<u-tr class="u-tr">
					<u-th class="u-th">Class</u-th>
					<u-th class="u-th">Game</u-th>
					<u-th class="u-th">Win</u-th>
					<u-th class="u-th">Draw</u-th>
					<u-th class="u-th">Loss</u-th>
					<u-th class="u-th">Goals</u-th>
					<u-th class="u-th">Goals Against</u-th>
					<u-th class="u-th">Points</u-th>
					<u-th class="u-th">Ranking</u-th>
					<u-th class="u-th">Win Rate</u-th>
				</u-tr>
				<u-tr class="u-tr">
					<u-th class="u-th">Total</u-th>
					<u-th class="u-th">{{ pointObj.away.total.total }}</u-th>
					<u-th class="u-th">{{ pointObj.away.total.win }}</u-th>
					<u-th class="u-th">{{ pointObj.away.total.draw }}</u-th>
					<u-th class="u-th">{{ pointObj.away.total.lose }}</u-th>
					<u-th class="u-th">{{ pointObj.away.total.score }}</u-th>
					<u-th class="u-th">{{ pointObj.away.total.goals_against }}</u-th>
					<u-th class="u-th">{{ pointObj.away.total.points }}</u-th>
					<u-th class="u-th">{{ pointObj.away.total.position }}</u-th>
					<u-th class="u-th">{{ pointObj.away.total.odds }}</u-th>
				</u-tr>
				<u-tr class="u-tr">
					<u-th class="u-th">Home</u-th>
					<u-th class="u-th">{{ pointObj.away.home.total }}</u-th>
					<u-th class="u-th">{{ pointObj.away.home.win }}</u-th>
					<u-th class="u-th">{{ pointObj.away.home.draw }}</u-th>
					<u-th class="u-th">{{ pointObj.away.home.lose }}</u-th>
					<u-th class="u-th">{{ pointObj.away.home.score }}</u-th>
					<u-th class="u-th">{{ pointObj.away.home.goals_against }}</u-th>
					<u-th class="u-th">{{ pointObj.away.home.points }}</u-th>
					<u-th class="u-th">{{ pointObj.away.home.position }}</u-th>
					<u-th class="u-th">{{ pointObj.away.home.odds }}</u-th>
				</u-tr>
				<u-tr class="u-tr">
					<u-th class="u-th">Away</u-th>
					<u-th class="u-th">{{ pointObj.away.away.total }}</u-th>
					<u-th class="u-th">{{ pointObj.away.away.win }}</u-th>
					<u-th class="u-th">{{ pointObj.away.away.draw }}</u-th>
					<u-th class="u-th">{{ pointObj.away.away.lose }}</u-th>
					<u-th class="u-th">{{ pointObj.away.away.score }}</u-th>
					<u-th class="u-th">{{ pointObj.away.away.goals_against }}</u-th>
					<u-th class="u-th">{{ pointObj.away.away.points }}</u-th>
					<u-th class="u-th">{{ pointObj.away.away.position }}</u-th>
					<u-th class="u-th">{{ pointObj.away.away.odds }}</u-th>
				</u-tr>
			</u-table>
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
