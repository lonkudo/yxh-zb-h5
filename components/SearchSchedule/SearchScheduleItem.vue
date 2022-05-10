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
				<image :src="scheduleInfo.home_team.logo" class="margin-right-sm" />
				<text class="fc-b-3 fs-24 f-hide w-350">{{
					scheduleInfo.home_team.name_en
				}}</text>
			</view>
		</view>
		<my-button
			:text="'Subscribe'"
			:falseText="'Reserved'"
			class="my-btn"
		></my-button
	></view>
</template>

<script>
	import MyButton from '@/components/MyButton/MyButton.vue'
	export default {
		name: 'SearchSchedule',
		components: {
			MyButton,
		},
		props: ['scheduleInfo'],
		data() {
			return {}
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
