<template>
	<view v-if="!this.isEmpty(teamInfo) && !this.isEmpty(battleLikeInfo)">
		<view class="flex flex-direction">
			<template v-if="openFlag">
				<view class="flex flex-direction full-vote h-200 bg-gold padding-lg">
					<view class="flex align-center justify-center">
						<view
							class="flex align-center"
							style="
								background-color: #ed0505;
								height: 50rpx;
								width: 250rpx;
								border-radius: 25rpx;
								padding: 0 10rpx;
							"
						>
							<view id="homeLikeCon" class="p-a">
								<text class="fs-36 iconfont icon-dianzan1 fc-b-f"></text>
								<!-- <transition-group name="flyUp">
									<image
										class="p-b ava-40"
										v-for="(item, index) in homeLike"
										:key="index"
										v-if="item"
										src="/static/styles/png/soccerball.png"
									></image>
								</transition-group> -->
							</view>
							<view
								class="b-f ava-50"
								style="box-sizing: border-box; border: 1rpx solid; margin: 0 10rpx"
							>
								<image :src="teamInfo.home.logo" mode="" class="ava-50" />
							</view>
							<text
								class="f-hide-2 w-150 fs-16 fc-b-f text-center"
								style="line-height: 25rpx"
							>
								{{ teamInfo.home.name }}
							</text>
						</view>
						<view class="margin-left-lg margin-right-lg">
							<text class="fs-30 fc-b-f">VS</text>
						</view>
						<view
							class="flex align-center"
							style="
								background-color: #1942b8;
								height: 50rpx;
								width: 250rpx;
								border-radius: 25rpx;
								padding: 0 10rpx;
							"
						>
							<text
								class="f-hide-2 w-150 fs-16 fc-b-f text-center"
								style="line-height: 25rpx"
							>
								{{ teamInfo.away.name }}
							</text>
							<view
								class="b-f ava-50"
								style="box-sizing: border-box; border: 1rpx solid; margin: 0 10rpx"
							>
								<image :src="teamInfo.away.logo" mode="" class="ava-50" />
							</view>
							<view id="awayLike">
								<text
									class="fs-36 iconfont icon-dianzan1 fc-b-f"
									style="transform: scaleX(-1)"
								></text>
							</view>
						</view>
					</view>
					<view class="line-vote flex align-center h-20" style="margin-top: 30rpx">
						<view class="flex-sub">
							<my-line-progress
								active-color="#ed0505"
								:percent="parseFloat(battleLikeInfo.home_percent)"
								:inactiveColor="'#1942B8'"
								:showPercent="false"
							>
								<text slot="left">{{ battleLikeInfo.home_percent }}</text>
								<text slot="right">{{ battleLikeInfo.away_percent }}</text>
							</my-line-progress>
						</view>
					</view>
					<view
						class="flex align-center justify-between padding-xs padding-left-sm padding-right-sm"
					>
						<text class="fc-b-f fs-16">{{ battleLikeInfo.home_team }}</text>
						<text class="fc-b-f fs-16">{{ battleLikeInfo.away_team }}</text>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="line-vote flex align-center padding-xs h-50 b-0">
					<text class="fc-b-f fs-16" style="padding-bottom: 5rpx">{{
						battleLikeInfo.home_team
					}}</text>
					<view class="flex-sub padding-xs">
						<my-line-progress
							active-color="#ed0505"
							:percent="parseFloat(battleLikeInfo.home_percent)"
							:inactiveColor="'#1942B8'"
							:showPercent="false"
						>
							<text slot="left">{{ battleLikeInfo.home_percent }}</text>
							<text slot="right">{{ battleLikeInfo.away_percent }}</text>
						</my-line-progress>
					</view>
					<text class="fc-b-f fs-16" style="padding-bottom: 5rpx">{{
						battleLikeInfo.away_team
					}}</text>
				</view>
			</template>
			<view class="flex justify-center">
				<view class="xiangxia-con w-80 text-center h-30" @tap="changeFlag">
					<view class="trapezoid">
						<!-- 梯形 -->
					</view>
					<text
						:class="[
							'iconfont  fs-28 fc-b-f p-a',
							openFlag ? 'icon-xiangshang' : 'icon-xiangxia',
						]"
						style="z-index: 10; left: 26rpx"
					></text
				></view>
			</view>
		</view>
	</view>
</template>

<script>
	import MyLineProgress from './my-line-progress/my-line-progress.vue'
	import BallIcon from '@/static/styles/png/soccerball.png'

	class SoccerBall {
		constructor(x, y, xDirection) {
			this.x = x
			this.y = y
			this.opacity = 1
			this.xDirection = true
		}

		flyUp() {
			this.y -= 1
			if (this.xDirection) {
				this.x += 1
				if (this.x > 30) {
					this.xDirection = false
				}
			} else {
				this.x -= 1
				if (this.x < -30) {
					this.xDirection = true
				}
			}
			this.opacity -= 0.01
		}
	}

	function step() {
		console.log('step', this, window)
		let top = parseFloat(this.style.top.replace('px'))
		this.style.top = top - 1 + 'px'
		if (top > 0) {
			window.requestAnimationFrame(step())
		}
	}

	export default {
		props: ['battleLikeInfo', 'teamInfo'],
		components: {
			MyLineProgress,
		},
		data() {
			return {
				homeLike: new Array(20).fill(false),
				homeLikeIndex: 0,
			}
		},
		name: 'BattleLike',
		computed: {
			openFlag: function () {
				console.log('??', this.$store.state.settings)
				return this.$store.state.live.battleLikeFlag
			},
		},
		methods: {
			changeFlag: function () {
				this.$store.commit('SET_BATTLE_LIKE_FLAG')
			},
			soccerBallFlyUp() {
				let parent = window.document.body
				console.log('parent', parent)
				let img = document.createElement('img')
				img.src = '/static/styles/png/soccerball.png'
				img.style.width = this.rpx2px(40) + 'px'
				img.style.height = this.rpx2px(40) + 'px'
				img.style.position = 'fixed'
				img.style.top = this.rpx2px(590) + 'px'
				img.style.left = this.rpx2px(80) + 'px'
				img.style.zIndex = '20000'
				parent.appendChild(img)
				setTimeout(() => {
					parent.removeChild(img)
				}, 2000)
				this.flyUp(img)
			},
			flyUp(element) {
				let fn = step.bind(element)
				fn()
			},
		},
		watch: {
			'battleLikeInfo.home_team': {
				handler: function (newVal) {
					// if (this.homeLikeIndex === this.homeLike.length) this.homeLikeIndex = 0
					// let index = this.homeLikeIndex
					// this.homeLike.splice(index, 1, true)
					// setTimeout(() => {
					// 	this.homeLike.splice(index, 1, false)
					// }, 500)
					// this.homeLikeIndex += 1
					// console.log('aaaaa', this.homeLike)
					this.soccerBallFlyUp()
				},
			},
		},
		created() {
			setTimeout(() => {
				console.log('battleLike', this.battleLikeInfo)
			}, 300)
		},
	}
</script>

<style lang="scss">
	.xiangxia-con {
		position: relative;
		/* background-color: rgba(0, 0, 0, 0.4); */
		.trapezoid {
			position: absolute;
			top: 0;
			left: 0;
			width: 50rpx !important;
			height: 0rpx !important;
			box-sizing: content-box;
			background: transparent;
			border-top: 30rpx solid rgba(0, 0, 0, 0.4);
			// border-bottom: 30rpx solid transparent;
			border-left: 15rpx solid transparent;
			border-right: 15rpx solid transparent;
		}
	}
	.line-vote {
		height: 40rpx;
	}
	.full-vote {
		background: url('/static/styles/png/bg-battle-like.png');
		background-size: auto 100%;
		background-repeat: no-repeat;
	}
	#homeLike,
	#awayLike {
		img {
			position: absolute;
		}
	}

	// .flyUp-enter-active {
	// 	animation: flyUp 3s;
	// }
	// .flyUp-leave-active {
	// 	// 激活状态的效果
	// 	animation: flyUp 3s;
	// }

	// @keyframes flyUp {
	// 	0% {
	// 		left: 0;
	// 		top: 0;
	// 		transform: scale(1);
	// 	}
	// 	10% {
	// 		left: -1rpx;
	// 		top: -10rpx;
	// 		transform: scale(1.3);
	// 	}
	// 	20% {
	// 		top: -2rpx;
	// 		left: -20rpx;
	// 		transform: scale(1);
	// 	}
	// 	30% {
	// 		top: -3rpx;
	// 		left: -10rpx;
	// 		transform: scale(1);
	// 	}
	// 	40% {
	// 		top: -4rpx;
	// 		left: 0rpx;
	// 		transform: scale(1);
	// 	}
	// 	50% {
	// 		top: -5rpx;
	// 		left: -10rpx;
	// 		transform: scale(1);
	// 	}
	// 	60% {
	// 		top: -6rpx;
	// 		left: -20rpx;
	// 		transform: scale(1);
	// 	}
	// 	70% {
	// 		top: -7rpx;
	// 		left: -10rpx;
	// 		transform: scale(1);
	// 	}
	// 	80% {
	// 		top: -8rpx;
	// 		left: 0;
	// 		transform: scale(1);
	// 	}
	// 	90% {
	// 		top: -9rpx;
	// 		left: 10rpx;
	// 		transform: scale(1);
	// 	}
	// 	100% {
	// 		top: -10rpx;
	// 		transform: scale(1);
	// 		left: 0;
	// 	}
	// }
</style>
