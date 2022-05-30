<template>
	<view class="flex flex-direction">
		<template v-if="battleOfThemList.length > 0">
			<view class="padding-sm b-f6">Battle History</view>
			<view class="b-f padding-xs flex flex-direction">
				<view class="flex justify-between align-center">
					<view class="flex align-center justify-start">
						<image :src="teamInfo.home.logo" mode="" class="ava-40" />
						<text class="fs-16 margin-left-xs w-200 f-hide">{{
							teamInfo.home.name
						}}</text>
					</view>
					<text class="fs-16">Last {{ this.statistics.total }} Encounters</text>
					<view class="flex align-center justify-end">
						<text class="fs-16 margin-right-xs w-200 f-hide text-right">{{
							teamInfo.away.name
						}}</text>
						<image :src="teamInfo.away.logo" mode="" class="ava-40" />
					</view>
				</view>
				<color-bar
					class="margin-top-xs margin-bottom-xs"
					:win="this.statistics.win"
					:draw="this.statistics.draw"
					:lose="this.statistics.loss"
				></color-bar>
				<u-table
					font-size="20"
					:th-style="{
						fontSize: '20rpx',
						fontWeight: '400',
						backgroundColor: '#fff',
						color: '#777',
					}"
					border-color="#fff"
				>
					<u-tr class="u-tr">
						<u-th class="u-th">Date</u-th>
						<u-th class="u-th">Event</u-th>
						<u-th class="u-th">Host Team</u-th>
						<u-th class="u-th">Score</u-th>
						<u-th class="u-th">Guest Team</u-th>
					</u-tr>
					<u-tr class="u-tr" v-for="(item, index) in battleOfThemList" :key="index">
						<u-td class="u-td"
							><view class="flex flex-direction align-center justify-center h-50">{{
								item.match_time
							}}</view></u-td
						>
						<u-td class="u-td"
							><view class="flex flex-direction align-center justify-center h-50">{{
								item.competition_name
							}}</view></u-td
						>
						<u-td class="u-td"
							><view class="flex flex-direction align-center justify-center h-50">{{
								item.home_team.name
							}}</view></u-td
						>
						<u-td class="u-td flex flex-direction align-center justify-center">
							<template v-if="teamInfo.home.id === item.home_team.id">
								<small-color-bar
									:home="item.home_team.score"
									:away="item.away_team.score"
								></small-color-bar>
							</template>
							<template v-else>
								<small-color-bar
									:home="item.home_team.score"
									:away="item.away_team.score"
									reverse
								></small-color-bar>
							</template>
						</u-td>
						<u-td class="u-td"
							><view class="flex flex-direction align-center justify-center h-50">{{
								item.away_team.name
							}}</view></u-td
						>
					</u-tr>
				</u-table>
			</view>
		</template>
	</view>
</template>

<script>
	import { getBattleHistoryOfThem } from '@/api/live'
	import ColorBar from '@/components/ColorBar/ColorBar.vue'
	import SmallColorBar from '@/components/ColorBar/SmallColorBar.vue'

	export default {
		name: 'Battle',
		components: { ColorBar, SmallColorBar },
		props: ['game_id'],
		data() {
			return {
				battleOfThemList: [], // 对战历史
				teamInfo: {},
				statistics: {},
			}
		},
		created() {
			this.getBattleHistoryOfThem(this.game_id) // 获取到数据以后初始化对战历史
		},
		methods: {
			getBattleHistoryOfThem(match_id) {
				getBattleHistoryOfThem({ match_id })
					.then((res) => {
						console.log('his', res)
						this.battleOfThemList = res.info.list
						this.teamInfo = res.info.team
						this.statistics = res.info.statistics
						this.$emit('receiveInfo', res.info.team)
						// console.log("this.battleOfThemList", this.battleOfThemList);
					})
					.catch((err) => {
						console.log(err)
					})
			},
		},
	}
</script>

<style></style>
