<template>
	<view class="bg-white">
		<view class="flex justify-center border-b padding-tb">
			<view class="padding-sm bg-gray border-ra-lg" @click="preSeason(1)">
				<text class="iconfont icon-xiangshang xuanzuan-1"></text>
				<text class="">previous round</text>
			</view>
			<view
				class="padding-sm margin-lr-lg bg-gray border-ra-lg"
				@click="show = true"
			>
				<text class="iconfont icon-xiangshang xuanzuan-2"></text>
				<text class="">{{ activeStage.name }}</text>
			</view>
			<view class="padding-sm bg-gray border-ra-lg" @click="preSeason(2)">
				<text class="">next round</text>
				<text class="iconfont icon-xiangshang xuanzua-3"></text>
			</view>
		</view>
		<t-table>
			<scroll-view
				scroll-y
				@scrolltolower="onreachBottom"
				:style="{ height: myHeight + 'rpx' }"
			>
				<t-tr
					v-for="(item, i) in tableList"
					:key="item.id + i"
					@change="change(item)"
				>
					<t-td flexWidth="1">
						<view>
							<view>{{ item.match_time | formatGiven('MM-dd hh:ss') }}</view>
						</view>
					</t-td>
					<t-td width="140" align="right">
						<text>{{ item.home_team_name }}</text>
						<view class="table-cell-image">
							<image mode="aspectFit" :src="item.home_team_logo" />
						</view>
					</t-td>
					<t-td width="40"> {{ item.home_scores }}:{{ item.away_scores }} </t-td>
					<t-td width="140" align="left">
						<view class="table-cell-image">
							<image mode="aspectFit" :src="item.away_team_logo" />
						</view>
						<text>{{ item.away_team_name }}</text>
					</t-td>
				</t-tr>
			</scroll-view>
		</t-table>
		<u-popup v-model="show" mode="bottom" border-radius="14" height="480">
			<view>
				<view
					class="text-center padding-tb-sm"
					v-for="item of stageList"
					:key="item.id"
					@click="changeSeason(item)"
				>
					<text
						:class="{
							'text-green': item.id == activeStage.id,
						}"
					>
						{{ item.name }}
					</text>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
	import { getCompetitions } from '@/api/data'
	export default {
		name: 'LeagueSchedule',
		props: ['myHeight', 'value', 'leagueType', 'season_id'],
		components: {},
		data() {
			return {
				tableList: [],
				stageList: [],
				activeStage: {
					id: '',
				},
				show: false,
			}
		},
		watch: {
			season_id: {
				handler(newVal, oldVal) {
					// console.log(newVal);
					if (newVal) {
						this.activeStage.id = ''
						this.getCompetitions()
					}
				},
				immediate: true,
			},
		},
		methods: {
			preSeason(type) {
				let result = null
				if (type == 1) {
					this.stageList.find((item, index) => {
						if (item.id == this.activeStage.id) {
							result = this.stageList[index + 1]
						}
						return item.id == this.activeStage.id
					})
				} else {
					this.stageList.find((item, index) => {
						if (item.id == this.activeStage.id) {
							if (index > 0) result = this.stageList[index - 1]
						}
						return item.id == this.activeStage.id
					})
				}
				if (result) this.changeSeason(result)
			},
			changeSeason(item) {
				let param = item
				this.show = false
				this.activeStage = param
				this.getCompetitions()
			},
			change(item) {
				uni.navigateTo({
					url:
						'/pages/data/team/team?item=' + encodeURIComponent(JSON.stringify(item)),
				})
			},
			getCompetitions() {
				let stage_id = this.activeStage.id ? this.activeStage.id : ''
				let param
				if (stage_id) {
					param = {
						competition_id: this.value,
						season_id: this.season_id,
						type: this.leagueType,
						stage_id: stage_id,
					}
				} else {
					param = {
						competition_id: this.value,
						season_id: this.season_id,
						type: this.leagueType,
					}
				}
				getCompetitions(param).then((res) => {
					this.tableList = res.info.list
					let stage = res.info.stage
					this.stageList = stage.detail
					let result = this.stageList.find((item) => {
						return item.id === stage.stage_num
					})
					if (result) this.activeStage = result
					else this.activeStage = this.stageList[0]
					// console.log(this.activeStage);
				})
			},
			onreachBottom() {
				this.getCompetitions({ p: ++this.page })
			},
		},
	}
</script>
<style scoped lang="scss">
	.border-ra-lg {
		border-radius: 40upx;
	}
	.t-td {
		border: none;
	}
	.xuanzuan-1 {
		transform: rotate(-90deg);
		display: inline-block;
	}
	.xuanzuan-2 {
		transform: rotate(180deg);
		display: inline-block;
	}
	.xuanzua-3 {
		transform: rotate(90deg);
		display: inline-block;
	}
</style>
