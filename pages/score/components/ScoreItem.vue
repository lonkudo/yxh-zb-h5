<template>
	<view
		class="flex flex-direction b-f padding-xs padding-top-sm"
		v-if="!this.isEmpty(info)"
		@tap="goLiving"
	>
		<view class="fs-14">
			<view class="flex align-center justify-center">
				<view class="flex align-center w-300 justify-start">
					<text
						class="fw-6 fc-blue margin-right-xs f-hide"
						:style="{
							maxWidth: '210rpx',
						}"
					>
						{{ info.competition_name }}</text
					>
					<text class="fc-b-9">{{ info.match_time | formatGiven('hh:ss') }}</text>
				</view>
				<view class="flex align-center fc-g w-150 justify-center text-center"
					><slot>Not Started</slot></view
				>
				<view class="flex align-center w-300 justify-end">
					<view class="flex align-center">
						<text class="fc-b-9">Half</text>
						<text class="fc-b-9 margin-left-xs"
							>{{ info.home_scores[1] }} - {{ info.away_scores[1] }}</text
						>
					</view>
					<view class="flex align-center margin-left-xs">
						<image src="@/static/styles/png/corner.png" class="h-30 w-30" mode="" />
						<text class="fc-b-9 margin-left-xs"
							>{{ info.home_scores[4] }} - {{ info.away_scores[4] }}</text
						>
					</view>
				</view>
			</view>
		</view>
		<view class="fs-24 margin-top-xs margin-bottom-xs">
			<view class="flex align-center">
				<view class="flex align-center justify-end w-300">
					<view
						class="margin-right-auto w-40"
						v-if="control[3]"
						@tap.stop="subscribe"
					>
						<text
							:class="[
								'iconfont icon-lingdang fs-40  ',
								info.is_appointment ? 'fc-g' : 'fc-b-c',
							]"
						></text>
					</view>
					<view class="flex align-center margin-left-xs">
						<view class="flex align-center">
							<text
								class="bg-red fc-b-f fs-14 margin-right-xs"
								v-if="control[0] && info.home_scores[2]"
								>{{ info.home_scores[2] }}</text
							>
							<text
								class="bg-gold fc-b-f fs-14 margin-right-xs"
								v-if="control[1] && info.home_scores[3]"
								>{{ info.home_scores[3] }}</text
							>
							<text
								class="fc-b-9 fs-14 margin-right-xs"
								v-if="control[2] && info.home_position"
								>{{ '[' + info.home_position + ']' }}</text
							>
						</view>
						<view class="text-right f-hide-2" :style="{ maxWidth: '150rpx' }">
							<text class="fw-6">{{ info.home_name }} </text></view
						>
					</view>
				</view>
				<view class="flex align-center w-150 justify-center"
					><text class="fc-red fw-6 fs-30"
						>{{ info.home_scores[0] }} - {{ info.away_scores[0] }}</text
					></view
				>
				<view class="flex align-center justify-start w-300">
					<view class="w-150 text-left">
						<text class="fw-6 f-hide-2" :style="{ maxWidth: '150rpx' }"
							>{{ info.away_name }}
						</text></view
					>
					<view class="flex align-center margin-right-xs">
						<view class="flex align-center">
							<text
								class="fc-b-9 fs-14 margin-left-xs"
								v-if="control[2] && info.away_position"
								>{{ '[' + info.away_position + ']' }}</text
							>
							<text
								class="bg-gold fc-b-f fs-14 margin-left-xs"
								v-if="control[1] && info.away_scores[3]"
								>{{ info.away_scores[3] }}</text
							>
							<text
								class="bg-red fc-b-f fs-14 margin-left-xs"
								v-if="control[0] && info.away_scores[2]"
								>{{ info.away_scores[2] }}</text
							>
						</view>
					</view>
					<view class="margin-left-auto w-40" v-if="control[4]">
						<text class="iconfont icon-shipin fs-40 fc-g"></text>
					</view>
				</view>
			</view>
		</view>
		<view
			class="fs-14 margin-bottom-xs flex align-center fc-b-9"
			v-if="control[5] && info.odds.asia_text"
		>
			<view class="w-350 text-right">
				<text>{{ info.odds.asia_text }}</text>
			</view>
			<view class="w-50 flex align-center justify-center">
				<view style="width: 1rpx; background-color: #999; height: 24rpx"></view>
			</view>
			<view class="w-350">
				<text>{{ info.odds.bs_text }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import pData from './data'
	export default {
		name: 'ScoreItem',
		props: {
			control: {
				// 用来人为控制部分区域的显示
				type: Array,
				default() {
					return [true, true, true, true, true, true] // 红牌 黄牌 排名 铃铛 视频 盘口指数
				},
			},
			info: {
				type: Object,
				default() {
					return {}
				},
			},
		},
		data() {
			return {}
		},
		created() {
			console.log('control', this.control)
		},
		methods: {
			subscribe() {
				/* 点击铃铛，触发订阅事件 */
				this.$emit('subscribe')
			},
			goLiving() {
				/* 点击视频前往直播间，触发订阅事件 */
				uni.navigateTo({
					url:
						'/pages/live/live?liveuid=' +
						'2' +
						'&game_id=' +
						this.info.id +
						'&stream=' +
						'2_' +
						this.info.id,
				})
				console.log('info', this.info)
			},
			getStatus: function (val) {
				// console.log('this', this)
				let num = this.toNum(val)
				if (val === 1) {
					return 'Not Started'
				} else if (val <= 8) {
					return 'Living'
				} else {
					return 'Ended'
				}
			},
		},
	}
</script>

<style></style>
