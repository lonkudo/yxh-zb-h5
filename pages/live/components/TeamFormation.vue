<template>
	<scroll-view
		scroll-y
		:id="'content-wrap' + 'Squad'"
		:style="{ height: myHeight + 'rpx' }"
	>
		<template v-if="homeFormation.length > 0">
			<view class="flex flex-direction">
				<view class="padding-sm b-f6">Staring</view>
				<view class="flex b-f padding-sm justify-around">
					<view class="margin-right-lg">
						<view class="flex align-center justify-end margin-bottom-sm">
							<text class="fs-16 margin-right-xs w-250 f-hide text-right">{{
								homeInfo.name
							}}</text>
							<image :src="homeInfo.logo" mode="" class="ava-40" />
						</view>
						<view
							v-for="(item, index) in homeFormation"
							:key="index"
							class="flex align-center justify-end margin-bottom-sm"
						>
							<text class="fs-16 margin-right-xs w-250 f-hide text-right">{{
								item.name
							}}</text>
							<image :src="item.logo" mode="" class="ava-40" />
						</view>
					</view>
					<view class="margin-left-lg">
						<view class="flex align-center justify-start margin-bottom-sm">
							<image :src="awayInfo.logo" mode="" class="ava-40" />
							<text class="fs-16 margin-left-xs w-250 f-hide">{{
								awayInfo.name
							}}</text>
						</view>
						<view
							v-for="(item, index) in awayFormation"
							:key="index"
							class="flex align-center justify-start margin-bottom-sm"
						>
							<image :src="item.logo" mode="" class="ava-40" />
							<text class="fs-16 margin-left-xs w-250 f-hide">{{ item.name }}</text>
						</view>
					</view>
				</view>
				<view class="padding-sm b-f6">Substitute</view>
				<view class="flex b-f padding-sm justify-around">
					<view class="margin-right-lg">
						<view class="flex align-center justify-end margin-bottom-sm">
							<text class="fs-16 margin-right-xs w-250 f-hide text-right">{{
								homeInfo.name
							}}</text>
							<image :src="homeInfo.logo" mode="" class="ava-40" />
						</view>
						<view
							v-for="(item, index) in homeBenches"
							:key="index"
							class="flex align-center justify-end margin-bottom-sm"
						>
							<text class="fs-16 margin-right-xs w-250 f-hide text-right">{{
								item.name
							}}</text>
							<image :src="item.logo" mode="" class="ava-40" />
						</view>
					</view>
					<view class="margin-left-lg">
						<view class="flex align-center justify-start margin-bottom-sm">
							<image :src="awayInfo.logo" mode="" class="ava-40" />
							<text class="fs-16 margin-left-xs w-250 f-hide">{{
								awayInfo.name
							}}</text>
						</view>
						<view
							v-for="(item, index) in awayBenches"
							:key="index"
							class="flex align-center justify-start margin-bottom-sm"
						>
							<image :src="item.logo" mode="" class="ava-40" />
							<text class="fs-16 margin-left-xs w-250 f-hide">{{ item.name }}</text>
						</view>
					</view>
				</view>
				<view class="padding-sm b-f6">Wounded</view>
				<view class="flex b-f padding-sm justify-around">
					<view class="margin-right-lg">
						<view class="flex align-center justify-end margin-bottom-sm">
							<text class="fs-16 margin-right-xs w-250 f-hide text-right">{{
								homeInfo.name
							}}</text>
							<image :src="homeInfo.logo" mode="" class="ava-40" />
						</view>
						<view
							v-for="(item, index) in homeInjury"
							:key="index"
							class="flex align-center justify-end margin-bottom-sm"
						>
							<text class="fs-16 margin-right-xs w-250 f-hide text-right">{{
								item.name
							}}</text>
							<image :src="item.logo" mode="" class="ava-40" />
						</view>
					</view>
					<view class="margin-left-lg">
						<view class="flex align-center justify-start margin-bottom-sm">
							<image :src="awayInfo.logo" mode="" class="ava-40" />
							<text class="fs-16 margin-left-xs w-250 f-hide">{{
								awayInfo.name
							}}</text>
						</view>
						<view
							v-for="(item, index) in awayInjury"
							:key="index"
							class="flex align-center justify-start margin-bottom-sm"
						>
							<image :src="item.logo" mode="" class="ava-40" />
							<text class="fs-16 margin-left-xs w-250 f-hide">{{ item.name }}</text>
						</view>
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<no-content :height="myHeight">No informations yet</no-content>
		</template>
	</scroll-view>
</template>

<script>
	import { teamFormation } from '@/api/live'
	import NoContent from '../../../components/NoContent/NoContent.vue'
	export default {
		components: { NoContent },
		name: 'TeamFormation',
		props: ['game_id', 'myHeight'],
		data() {
			return {
				homeFormation: [],
				awayFormation: [],
				homeInfo: {},
				awayInfo: {},
				homeBenches: [],
				awayBenches: [],
				homeInjury: [],
				awayInjury: [],
			}
		},
		created() {
			this.getTeamFormation(this.game_id) // 获取到数据以后初始化teamformation
		},
		methods: {
			getTeamFormation(match_id) {
				teamFormation({ match_id })
					.then((res) => {
						this.homeFormation = res.info.home.mainForce
						this.awayFormation = res.info.away.mainForce
						this.homeBenches = res.info.home.substitute
						this.awayBenches = res.info.away.substitute
						this.homeInjury = res.info.home.injury
						this.awayInjury = res.info.away.injury
						this.homeInfo = res.info.home_team
						this.awayInfo = res.info.away_team
						console.log('homeInfo', this.homeInfo)
						if (this.homeFormation.length === 0) {
							this.squadFlag = false
						} else {
							this.squadFlag = true
						}
						// console.log('formation', res)
					})
					.catch((err) => {
						console.log(err)
					})
			},
		},
	}
</script>

<style></style>
