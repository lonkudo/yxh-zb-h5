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
				<u-table-my
					font-size="20"
					:th-style="{
						fontSize: '20rpx',
						fontWeight: '400',
						backgroundColor: '#fff',
						color: '#777',
					}"
					:border="false"
				>
					<u-tr-my class="u-tr-my">
						<u-th-my class="u-th-my">Date</u-th-my>
						<u-th-my class="u-th-my">Event</u-th-my>
						<u-th-my class="u-th-my">Host Team</u-th-my>
						<u-th-my class="u-th-my">Score</u-th-my>
						<u-th-my class="u-th-my">Guest Team</u-th-my>
					</u-tr-my>
					<u-tr-my
						class="u-tr-my"
						v-for="(item, index) in battleOfThemList"
						:key="index"
					>
						<u-td-my class="u-td-my"
							><view class="flex flex-direction align-center justify-center h-50">{{
								item.match_time
							}}</view></u-td-my
						>
						<u-td-my class="u-td-my"
							><view class="flex flex-direction align-center justify-center h-50">{{
								item.competition_name
							}}</view></u-td-my
						>
						<u-td-my class="u-td-my"
							><view class="flex flex-direction align-center justify-center h-50">{{
								item.home_team.name
							}}</view></u-td-my
						>
						<u-td-my class="u-td-my flex flex-direction align-center justify-center">
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
						</u-td-my>
						<u-td-my class="u-td-my"
							><view class="flex flex-direction align-center justify-center h-50">{{
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
						// console.log('his', res)
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
