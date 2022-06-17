<template>
	<view class="schedule-item br-5 b-f margin-xs padding-sm flex align-center">
		<view class="flex flex-direction justify-center margin-right-sm">
			<text class="fc-b-3 fs-24">{{
				scheduleInfo.match_time | formatGiven('MM-dd')
			}}</text>
			<text class="fc-b-3 fs-24">{{
				scheduleInfo.match_time | formatGiven('hh:ss')
			}}</text>
		</view>
		<view class="flex flex-direction justify-between">
			<view class="flex align-center padding-xs">
				<image :src="scheduleInfo.home_team.logo" class="margin-right-sm" />
				<text class="fc-b-3 fs-24 f-hide w-350">{{
					scheduleInfo.home_team.name_en
				}}</text>
			</view>
			<view class="flex align-center padding-xs">
				<image :src="scheduleInfo.away_team.logo" class="margin-right-sm" />
				<text class="fc-b-3 fs-24 f-hide w-350">{{
					scheduleInfo.away_team.name_en
				}}</text>
			</view>
		</view>
		<my-button
			:text="'Subscribe'"
			:falseText="'Reserved'"
			mana
			:initActive="toNum(scheduleInfo.is_appointment) === 0"
			@onTap="subscribe(scheduleInfo)"
		></my-button>
	</view>
</template>

<script>
	import MyButton from '@/components/MyButton/MyButton.vue'
	import { addAppointment } from '@/api/score'
	import check from '@/utils/check'
	export default {
		name: 'SearchSchedule',
		components: {
			MyButton,
		},
		props: ['scheduleInfo'],
		data() {
			return {}
		},
		created() {},
		methods: {
			@check()
			subscribe(item) {
				/* 订阅赛事 */
				addAppointment({ uid: this.uid, game_id: item.id, token: this.token })
					.then((res) => {
						if (res.info.isappointment === '0') {
							item.is_appointment = 0
							this.$u.toast('unsubscribed')
						} else if (res.info.isappointment === 1) {
							item.is_appointment = 1
							this.$u.toast('subscribed')
							this.$store.dispatch('FINISH_TASK', {
								type: 1,
								taskid: 7,
								that: this,
							})
						}
					})
					.catch((err) => {
						console.log('err', err)
					})
			},
		},
	}
</script>

<style lang="scss">
	.schedule-item {
		image {
			width: 40rpx;
			height: 40rpx;
		}
	}
	.my-btn {
		margin-left: auto;
	}
</style>
