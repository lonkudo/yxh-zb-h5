<template>
	<view>
		<view id="upper">
			<team-head :info="leagueInfo">
				<template v-slot:data>
					<view class="flex justify-end">
						<view class="padding-lr padding-tb-sm text-white" @click="show = true">{{
							activeYearOption.year
						}}</view>
					</view>
				</template>
			</team-head>
		</view>
		<view>
			<u-tabs-swiper
				ref="uTabs"
				:list="menu"
				:current="current"
				:is-scroll="false"
				swiperWidth="750"
				@change="tabsChange"
				active-color="#02b875"
				font-size="24"
				gutter="0"
			></u-tabs-swiper>
			<swiper
				:current="swiperCurrent"
				@transition="transition"
				@animationfinish="animationfinish"
				:style="{ height: myHeight + 'rpx' }"
			>
				<swiper-item
					class="swiper-item"
					key="dynamic"
					@touchmove.stop=""
					:style="{ height: myHeight + 'rpx' }"
				>
					<league-dynamic
						v-model="competition_id"
						:myHeight="myHeight"
					></league-dynamic>
				</swiper-item>
				<swiper-item
					class="swiper-item"
					@touchmove.stop=""
					key="schedule"
					:style="{ height: myHeight + 'rpx' }"
				>
					<league-schedule
						v-model="competition_id"
						:season_id="activeYearOption.id"
						:leagueType="leagueInfo.type"
						:myHeight="myHeight"
					></league-schedule>
				</swiper-item>
				<swiper-item
					class="swiper-item"
					key="integral"
					@touchmove.stop=""
					:style="{ height: myHeight + 'rpx' }"
				>
					<league-integral
						v-model="competition_id"
						:season_id="activeYearOption.id"
						:myHeight="myHeight"
					></league-integral>
				</swiper-item>
				<swiper-item
					class="swiper-item"
					@touchmove.stop=""
					key="league-player"
					:style="{ height: myHeight + 'rpx' }"
				>
					<league-player
						v-model="competition_id"
						:season_id="activeYearOption.id"
						:myHeight="myHeight"
					></league-player>
				</swiper-item>
				<swiper-item
					class="swiper-item"
					@touchmove.stop=""
					key="league-team"
					:style="{ height: myHeight + 'rpx' }"
				>
					<league-team
						v-model="competition_id"
						:season_id="activeYearOption.id"
						:myHeight="myHeight"
					></league-team>
				</swiper-item>
			</swiper>
		</view>
		<u-popup v-model="show" mode="bottom" border-radius="14" height="580">
			<view>
				<view
					class="text-center padding-tb-sm"
					v-for="item of yearOptions"
					:key="item.id"
					@click="changeSeason(item)"
				>
					<text :class="{ 'text-green': item.id == activeYearOption.id }">
						{{ item.year }}
					</text>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
	import { swiperAutoHeight, swiperUTabs } from '@/mixin'
	import TeamHead from '../TeamHead'
	import { getLeagueSeasonTime } from '@/api/data'
	import {
		LeagueDynamic,
		LeagueSchedule,
		LeagueIntegral,
		LeaguePlayer,
		LeagueTeam,
	} from './index'
	export default {
		name: 'League',
		mixins: [swiperAutoHeight, swiperUTabs],
		components: {
			TeamHead,
			LeagueDynamic,
			LeagueSchedule,
			LeagueIntegral,
			LeaguePlayer,
			LeagueTeam,
		},
		data() {
			return {
				leagueInfo: {},
				competition_id: '',
				yearOptions: [],
				activeYearOption: {},
				show: false,
				myHeight: 0,
				menu: [
					{ name: 'Dynamic' },
					{ name: 'Schedule' },
					{ name: 'Integral' },
					{ name: 'Players' },
					{ name: 'Team' },
				],
			}
		},
		onLoad(option) {
			this.leagueInfo = JSON.parse(decodeURIComponent(option.item))
			this.$nextTick(() => {
				this.getDownHeight()
			})
			console.log(this.leagueInfo)
			this.competition_id = this.leagueInfo.id
			this.getLeagueSeasonTime()
		},
		mounted() {
			// this.myHeight = this.initScrollHeight(350)
		},
		methods: {
			preSeason(type) {
				let result = null
				if (type == 1) {
					this.yearOptions.find((item, index) => {
						if (item.id == this.seasonId) {
							if (index > 0) result = this.yearOptions[index - 1]
						}
						return item.id == this.seasonId
					})
				} else {
					this.yearOptions.find((item, index) => {
						if (item.id == this.seasonId) {
							result = this.yearOptions[index + 1]
						}
						return item.id == this.seasonId
					})
				}
				if (result) this.changeSeason(result)
			},
			changeSeason(item) {
				let param = item
				this.show = false
				this.activeYearOption = param
			},
			getLeagueSeasonTime() {
				getLeagueSeasonTime(this.competition_id).then((res) => {
					this.yearOptions = res.info
					if (JSON.stringify(this.activeYearOption) === '{}') {
						if (res.info.length > 0) this.activeYearOption = res.info[0]
					}
				})
			},
			getDownHeight() {
				// let slotHeight = this.$refs.TeamHeadSlot.style.height
				setTimeout(() => {
					var view = uni.createSelectorQuery().in(this).select('#upper')
					view
						.boundingClientRect((data) => {
							this.recHeight = this.px2rpx(data.height)
							this.myHeight = this.initScrollHeight(this.recHeight + 80)
							console.log('recHeight', data.height, this.recHeight, this.myHeight)
							console.log('data', data)
						})
						.exec()
				}, 200)
			},
		},
	}
</script>
<style scoped lang="scss"></style>
