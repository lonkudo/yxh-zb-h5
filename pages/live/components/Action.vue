<template>
	<scroll-view
		scroll-y
		:style="{ height: myHeight + 'rpx' }"
		:id="'content-wrap' + 'Action'"
	>
		<template v-if="!this.isEmpty(teamInfo) && this.flag">
			<view :style="{ height: myHeight + 'rpx' }" class="b-f">
				<view class="padding-sm b-f">Technical statistics</view>
				<view class="b-f">
					<u-table border-color="#fff" font-size="20" padding="0">
						<u-tr class="margin-bottom-sm">
							<u-td width="8%"></u-td>
							<u-td width="27%">
								<view class="flex align-center justify-end">
									<text class="fs-16 margin-right-xs f-hide w-160">{{
										teamInfo.home.name
									}}</text>
									<image :src="teamInfo.home.logo" mode="" class="ava-40" />
								</view>
							</u-td>
							<u-td width="27%"></u-td>
							<u-td width="27%">
								<view class="flex align-center justify-start">
									<image :src="teamInfo.away.logo" mode="" class="ava-40" />
									<text class="fs-16 margin-left-xs f-hide text-left w-160">{{
										teamInfo.away.name
									}}</text>
								</view>
							</u-td>
							<u-td width="8%"></u-td>
						</u-tr>
						<u-tr
							class="margin-bottom-sm"
							v-for="(item, index) in stats"
							:key="index"
						>
							<u-td width="8%">
								<view class="flex justify-end align-center margin-right-xs">
									{{ item.home }}
								</view>
							</u-td>
							<u-td width="27%">
								<u-line-progress
									style="transform: rotate(180deg)"
									:percent="item.homePer"
									:round="false"
									:active-color="item.homeGood ? '#02b875' : '#666'"
									:show-percent="false"
									height="26"
								></u-line-progress>
							</u-td>

							<u-td width="27%"
								><view class="f-hide w-225 padding-left-xs padding-right-xs">
									{{ item.typeName }}</view
								></u-td
							>
							<u-td width="27%">
								<u-line-progress
									:percent="item.awayPer"
									:round="false"
									:active-color="item.homeGood ? '#666' : '#02b875'"
									:show-percent="false"
									height="26"
								></u-line-progress>
							</u-td>
							<u-td width="8%">
								<view class="flex justify-start align-center margin-left-xs">
									{{ item.away }}
								</view>
							</u-td>
						</u-tr>
					</u-table>
				</view>
			</view>
		</template>
		<template v-else>
			<no-content :height="myHeight">No informations yet</no-content>
		</template>
	</scroll-view>
</template>

<script>
	import { getMatchData } from '@/api/live'
	import NoContent from '../../../components/NoContent/NoContent.vue'

	export default {
		components: { NoContent },
		name: 'Action',
		props: ['game_id', 'teamInfo', 'myHeight'],
		data() {
			return {
				stats: [],
				flag: false,
			}
		},
		methods: {
			getMatchData() {
				getMatchData(this.game_id).then((res) => {
					if (JSON.stringify(res.info) !== '{}' && res.info.stats) {
						// this.stats = res.info.stats
						this.stats.forEach((element) => {
							this.setChildSort(element)
						})
						this.sortList()
						this.flag = true
						// console.log('res.info', this.stats)
					}
				})
			},
			insertSort(arr) {
				var preIndex = 0 //当前访问的元素的前一个索引
				for (var i = 1; i < arr.length; i++) {
					var temp = arr[i]
					preIndex = i - 1
					while (preIndex >= 0 && temp.order < arr[preIndex].order) {
						//若当前值小于前面的值，则交换，继续向前比较。这时候不能再用arr[i],应该用temp
						arr[preIndex + 1] = arr[preIndex]
						preIndex -= 1
					}
					arr[preIndex + 1] = temp //找到了要插入的位置
				}
				return arr
			},
			sortList() {
				this.stats.forEach((element) => {
					this.setChildSort(element)
				})
				let arr = this.insertSort(this.stats)
				return arr
			},
			setPercent(element) {
				if (element.home + element.away > 0) {
					element['homePer'] = (element.home / (element.home + element.away)) * 100
					element['awayPer'] = (element.away / (element.home + element.away)) * 100
				} else {
					element['homePer'] = 0
					element['awayPer'] = 0
				}
				if (element.type === 3 || element.type === 4) {
					if (element.home > element.away) {
						element['homeGood'] = false
					} else {
						element['homeGood'] = true
					}
				} else {
					if (element.home > element.away) {
						element['homeGood'] = true
					} else {
						element['homeGood'] = false
					}
				}
			},
			setChildSort(element) {
				// if(element.home) element.home = Number(element.home)
				// else element.home = Number(0)
				// if(element.away) element.away = Number(element.away)
				// else element.away = Number(0)
				switch (element.type) {
					case 25:
						element['typeName'] = 'Possession Percentage'
						element['order'] = 1
						this.setPercent(element)
						break
					case 21:
						element['typeName'] = 'Shots on Target'
						element['order'] = 2
						this.setPercent(element)
						break
					case 22:
						element['typeName'] = 'Shots off Target'
						element['order'] = 3
						this.setPercent(element)
						break
					case 8:
						element['typeName'] = 'Penalty'
						element['order'] = 4
						this.setPercent(element)
						break
					case 23:
						element['typeName'] = 'Attack'
						element['order'] = 5
						this.setPercent(element)
						break
					case 24:
						element['typeName'] = 'Dangerous Attack'
						element['order'] = 6
						this.setPercent(element)
						break
					case 2:
						element['typeName'] = 'Corner'
						element['order'] = 7
						this.setPercent(element)
						break
					case 3:
						element['typeName'] = 'Yellow Card'
						element['order'] = 8
						this.setPercent(element)
						break
					case 4:
						element['typeName'] = 'Red Card'
						element['order'] = 9
						this.setPercent(element)
						break
				}
			},
		},
		created() {
			this.getMatchData()
			// console.log('this', this.teamInfo)
			this.$nextTick(() => {
				// console.log('this', this.teamInfo)
			})
		},
	}
</script>

<style></style>
