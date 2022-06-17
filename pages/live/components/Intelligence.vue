<template>
	<!-- 重要情报 -->
	<scroll-view
		scroll-y
		:id="'content-wrap' + 'Intelligence'"
		:style="{ height: myHeight + 'rpx' }"
	>
		<template v-if="!isEmpty(teamInfo) && flag">
			<view class="container b-f padding-top-sm padding-bottom-sm">
				<view class="line">
					<view
						:class="activeIndex === index ? 'active' : ''"
						@click="changeTag(index, item)"
						v-for="(item, index) of tagList"
						:key="item.value"
						><text class="f-hide">{{ item.value }}</text></view
					>
				</view>
				<view class="team-con" v-show="activeIndex === 0">
					<!-- <view class="title">
						<img :src="teamInfo.home.logo" alt="" />
						<text>{{ teamInfo.home.name }}</text>
					</view> -->
					<view class="favorable">
						<h2>Favorable Information ({{ home.good.length }})</h2>
						<view>
							<view
								v-for="(goo, index) of home.good"
								:key="'goo' + index"
								class="flex align-center justify-center padding-sm padding-top-xs padding-bottom-xs"
								style="text-align: justify"
							>
								<view class="margin-right-xs">
									<text class="circle"></text>
								</view>
								<text>
									{{ goo.content }}
								</text>
							</view>
						</view>
					</view>
					<view class="not-favorable">
						<h2>Unfavorable Information ({{ home.bad.length }})</h2>
						<view>
							<view
								v-for="(bad, index) of home.bad"
								:key="'bad' + index"
								class="flex align-center justify-center padding-sm padding-top-xs padding-bottom-xs"
								style="text-align: justify"
							>
								<view class="margin-right-xs">
									<text class="circle"></text>
								</view>
								<text>
									{{ bad.content }}
								</text>
							</view>
						</view>
					</view>
					<view class="neutral">
						<h2>Neutral Intelligence ({{ neutral.length }})</h2>
						<view>
							<view
								v-for="(neu, index) of neutral"
								:key="'neu' + index"
								class="flex align-center justify-center padding-sm padding-top-xs padding-bottom-xs"
								style="text-align: justify"
							>
								<view class="margin-right-xs">
									<text class="circle"></text>
								</view>
								<text>
									{{ neu.content }}
								</text>
							</view>
						</view>
					</view>
				</view>
				<view class="team-con" v-show="activeIndex !== 0">
					<!-- <view class="title">
						<img :src="teamInfo.away.logo" alt="" />
						<text>{{ teamInfo.away.name }}</text>
					</view> -->
					<view class="favorable">
						<h2>Favorable Information ({{ away.good.length }})</h2>
						<view>
							<view
								v-for="(goo, index) of away.good"
								:key="'goo' + index"
								class="flex align-center justify-center padding-sm padding-top-xs padding-bottom-xs"
								style="text-align: justify"
							>
								<view class="margin-right-xs">
									<text class="circle"></text>
								</view>
								<text>
									{{ goo.content }}
								</text>
							</view>
						</view>
					</view>
					<view class="not-favorable">
						<h2>Unfavorable Information ({{ away.bad.length }})</h2>
						<view>
							<view
								v-for="(bad, index) of away.bad"
								:key="'bad' + index"
								class="flex align-center justify-center padding-sm padding-top-xs padding-bottom-xs"
								style="text-align: justify"
							>
								<view class="margin-right-xs">
									<text class="circle"></text>
								</view>
								<text>
									{{ bad.content }}
								</text>
							</view>
						</view>
					</view>
					<view class="neutral">
						<h2>Neutral Intelligence ({{ neutral.length }})</h2>
						<view>
							<view
								v-for="(neu, index) of neutral"
								:key="'neu' + index"
								class="flex align-center justify-center padding-sm padding-top-xs padding-bottom-xs"
								style="text-align: justify"
							>
								<view class="margin-right-xs">
									<text class="circle"></text>
								</view>
								<text>
									{{ neu.content }}
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<no-content></no-content>
		</template>
	</scroll-view>
</template>
<script>
	// console.log = function () {}

	import { getIntelligence } from '@/api/live'
	import NoContent from '../../../components/NoContent/NoContent.vue'
	export default {
		components: { NoContent },
		name: 'Intelligence',
		props: ['game_id', 'teamInfo', 'myHeight'],
		data() {
			return {
				home: { bad: [], good: [] },
				away: { bad: [], good: [] },
				neutral: [],
				tagList: [],
				activeIndex: 0,
				flag: false,
			}
		},
		created() {
			console.log('team', this.teamInfo)
		},
		watch: {
			teamInfo: {
				handler: function (newVal) {
					this.tagList = [
						{
							label: newVal.home.name,
							value: newVal.home.name,
						},
						{
							label: newVal.away.name,
							value: newVal.away.name,
						},
					]
				},
			},
		},
		mounted() {
			this.getIntelligence()
		},
		methods: {
			getIntelligence() {
				getIntelligence(this.game_id).then((res) => {
					if (
						res.info !== null &&
						typeof res.info === 'object' &&
						JSON.stringify(res.info) !== '{}'
					) {
						this.home = res.info.home
						this.away = res.info.away
						this.neutral = res.info.neutral
						this.flag = true
					} else {
						this.$emit('childMsg', true)
					}
				})
			},
			changeTag(index, item) {
				this.activeIndex = index
			},
		},
	}
</script>
<style lang="scss" scoped>
	.title {
		img {
			width: 40rpx;
			display: block;
			float: left;
		}
		text {
			margin-left: 12rpx;
			height: 40rpx;
			line-height: 40rpx;
			color: #333333;
		}
	}
	h2 {
		font-size: 14rpx;
		margin-top: 30rpx;
		margin-bottom: 20rpx;
		background-color: #f7f7f7;
		padding: 20rpx 10rpx;
		font-weight: 400;
	}
	.circle {
		display: inline-block;
		width: 12rpx;
		height: 12rpx;
		background: #02b875;
		border: 1rpx solid #02b875;
		border-radius: 50%;
	}
	li {
		line-height: 2;
	}
	.favorable {
		h2 {
			color: #fe3f3f;
		}
	}
	.not-favorable {
		h2 {
			color: #386ffa;
		}
	}
	.neutral {
		h2 {
			color: #333333;
		}
	}
	.line {
		text-align: center;
		view {
			font-size: 24rpx;
			height: 80rpx;
			line-height: 80rpx;
			width: 300rpx;
			display: inline-block;
			font-weight: 600;
			background-color: #eee;
			box-sizing: border-box;
		}
		text {
			display: inline-block;
			width: 290rpx;
			margin: 5rpx;
			height: 70rpx;
			line-height: 70rpx;
		}
		view:nth-child(1) {
			border-top-left-radius: 15rpx;
			border-bottom-left-radius: 15rpx;
		}
		view:nth-child(2) {
			border-top-right-radius: 15rpx;
			border-bottom-right-radius: 15rpx;
		}
	}
	.active {
		text {
			background-color: white;
			border-radius: 8rpx;
			box-shadow: 0 0 4rpx 2rpx rgba(0, 0, 0, 0.1);
		}
	}
</style>
