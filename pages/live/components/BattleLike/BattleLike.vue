<template>
	<view v-if="!this.isEmpty(teamInfo) && !this.isEmpty(battleLikeInfo)">
		<view class="flex flex-direction">
			<template v-if="openFlag">
				<view class="flex flex-direction full-vote h-200 padding-lg">
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
							<view>
								<text
									class="fs-36 iconfont icon-dianzan1 fc-b-f"
									@tap="dianzan('home')"
								></text>
								<!-- <transition-group name="flyUp">
									<image
										class="p-b ava-40"
										v-for="(item, index) in homeLike"
										:key="index"
										v-if="item"
										src="@/static/styles/png/soccerball.png"
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
									@tap="dianzan('away')"
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
								:percent="percent"
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
							:percent="percent"
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
			<view class="flex justify-center b-f6">
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
		<!-- <transition-group name="flyUp">
			<image
				class="p-f ava-40"
				v-for="(item, index) in homeLike"
				:key="index"
				v-if="item"
				src="@/static/styles/png/soccerball.png"
			></image>
		</transition-group> -->
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
		// console.log('this', this)
		let top = parseFloat(this.ele.style.top.replace('px'))
		let left = parseFloat(this.ele.style.left.replace('px'))
		// let width = parseFloat(this.ele.style.width.replace('px'))
		// let height = parseFloat(this.ele.style.height.replace('px'))

		// 匀速直线
		// this.ele.style.top = top - this.rpx2px(5) + 'px'
		// if (this.flagX) {
		// 	this.ele.style.left = left - this.rpx2px(3) + 'px'
		// 	if (left < this.minX) {
		// 		this.flagX = !this.flagX
		// 	}
		// } else {
		// 	this.ele.style.left = left + this.rpx2px(3) + 'px'
		// 	if (left > this.maxX) {
		// 		this.flagX = !this.flagX
		// 	}
		// }

		// 刚弹出的时候放大然后缩小足球
		// if (width < this.rpx2px(60)) {
		// 	this.ele.style.width = width + this.rpx2px(3) + 'px'
		// 	this.ele.style.height = height + this.rpx2px(3) + 'px'
		// }

		// 贝赛尔曲线 描绘出移动轨迹，然后赋值给ele
		if (this.direction) {
			// console.log('---true----true----true----true----true---')
			this.ele.style.left =
				threebsr(
					this.t,
					this.bezier3.a1.x,
					this.bezier3.a2.x,
					this.bezier3.a3.x,
					this.bezier3.a4.x
				) + 'px'
			this.ele.style.top =
				threebsr(
					this.t,
					this.bezier3.a1.y,
					this.bezier3.a2.y,
					this.bezier3.a3.y,
					this.bezier3.a4.y
				) + 'px'
		} else {
			// console.log('---false----false----false----false----false---')
			this.ele.style.left =
				threebsr(
					this.t,
					this.bezier3Reverse.a1.x,
					this.bezier3Reverse.a2.x,
					this.bezier3Reverse.a3.x,
					this.bezier3Reverse.a4.x
				) + 'px'
			this.ele.style.top =
				threebsr(
					this.t,
					this.bezier3Reverse.a1.y,
					this.bezier3Reverse.a2.y,
					this.bezier3Reverse.a3.y,
					this.bezier3Reverse.a4.y
				) + 'px'
		}

		this.opacity -= 0.0098
		this.t += 0.01
		this.ele.style.opacity = this.opacity
		// console.log('ok', typeof this.ele.style.opacity)
		if (this.t < 1) {
			window.requestAnimationFrame(step.bind(this))
		}
	}

	function threebsr(t, a1, a2, a3, a4) {
		return (
			a1 * (1 - t) * (1 - t) * (1 - t) +
			3 * a2 * t * (1 - t) * (1 - t) +
			3 * a3 * t * t * (1 - t) +
			a4 * t * t * t
		)
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
				count: 0,
			}
		},
		name: 'BattleLike',
		computed: {
			openFlag: function () {
				// console.log('??', this.$store.state.settings)
				return this.$store.state.flag.battleLikeFlag
			},
			percent: function () {
				let a = parseFloat(this.battleLikeInfo.home_percent)
				let b = parseFloat(this.battleLikeInfo.away_percent)
				if (a == 0 && b == 0) {
					return 50
				} else {
					return a
				}
			},
		},
		methods: {
			dianzan(val) {
				this.$emit('dianzan', val)
			},
			changeFlag: function () {
				this.$store.commit('SET_BATTLE_LIKE_FLAG')
			},
			soccerBallFlyUp(team) {
				if (!this.openFlag) return
				let parent = window.document.body
				// console.log('parent', parent)
				let img = document.createElement('img')
				img.src = require('@/static/styles/png/soccerball.png')
				img.style.width = this.rpx2px(40) + 'px'
				img.style.height = this.rpx2px(40) + 'px'
				img.style.position = 'fixed'
				// img.style.top = this.rpx2px(590) + 'px'
				// img.style.left = this.rpx2px(80) + 'px'
				img.style.zIndex = '20000'
				parent.appendChild(img)
				setTimeout(() => {
					parent.removeChild(img)
					img = null
				}, 2000)
				this.flyUp(img, team)
			},
			flyUp(element, team) {
				let thisObj
				if (team === 'home') {
					thisObj = {
						ele: element,
						// maxX: this.rpx2px(60),
						// minX: this.rpx2px(20),
						rpx2px: this.rpx2px,
						// flagX: true,
						opacity: 1,
						bezier3: {
							a1: {
								// 起始点
								x: this.rpx2px(60),
								y: this.rpx2px(600),
							},
							a2: {
								x: this.rpx2px(0),
								y: this.rpx2px(500),
							},
							a3: {
								x: this.rpx2px(120),
								y: this.rpx2px(400),
							},
							a4: {
								x: this.rpx2px(60),
								y: this.rpx2px(360),
							},
						},
						bezier3Reverse: {
							a1: {
								// 起始点
								x: this.rpx2px(60),
								y: this.rpx2px(600),
							},
							a2: {
								x: this.rpx2px(120),
								y: this.rpx2px(500),
							},
							a3: {
								x: this.rpx2px(0),
								y: this.rpx2px(400),
							},
							a4: {
								x: this.rpx2px(60),
								y: this.rpx2px(360),
							},
						},
						direction: Math.random() > 0.5,
						t: 0, // 曲线进度，1是完成
					}
				} else {
					thisObj = {
						ele: element,
						// maxX: this.rpx2px(60),
						// minX: this.rpx2px(20),
						rpx2px: this.rpx2px,
						// flagX: true,
						opacity: 1,
						bezier3: {
							a1: {
								// 起始点
								x: this.rpx2px(640),
								y: this.rpx2px(600),
							},
							a2: {
								x: this.rpx2px(580),
								y: this.rpx2px(500),
							},
							a3: {
								x: this.rpx2px(700),
								y: this.rpx2px(400),
							},
							a4: {
								x: this.rpx2px(640),
								y: this.rpx2px(360),
							},
						},
						bezier3Reverse: {
							a1: {
								// 起始点
								x: this.rpx2px(640),
								y: this.rpx2px(600),
							},
							a2: {
								x: this.rpx2px(700),
								y: this.rpx2px(500),
							},
							a3: {
								x: this.rpx2px(580),
								y: this.rpx2px(400),
							},
							a4: {
								x: this.rpx2px(640),
								y: this.rpx2px(360),
							},
						},
						direction: Math.random() > 0.5,
						t: 0, // 曲线进度，1是完成
					}
				}

				step.call(thisObj)
				// step = step.bind(element)
				// step()
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
					this.soccerBallFlyUp('home')
				},
			},
			'battleLikeInfo.away_team': {
				handler: function (newVal) {
					// if (this.homeLikeIndex === this.homeLike.length) this.homeLikeIndex = 0
					// let index = this.homeLikeIndex
					// this.homeLike.splice(index, 1, true)
					// setTimeout(() => {
					// 	this.homeLike.splice(index, 1, false)
					// }, 500)
					// this.homeLikeIndex += 1
					// console.log('aaaaa', this.homeLike)
					this.soccerBallFlyUp('away')
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
		background: url('@/static/styles/png/bg-battle-like.png');
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
	// 		top: 10rpx;
	// 		transform: scale(1.3);
	// 	}
	// 	20% {
	// 		top: 20rpx;
	// 		left: 20rpx;
	// 		transform: scale(1);
	// 	}
	// 	30% {
	// 		top: 30rpx;
	// 		left: -10rpx;
	// 		transform: scale(1);
	// 	}
	// 	40% {
	// 		top: 40rpx;
	// 		left: 0rpx;
	// 		transform: scale(1);
	// 	}
	// 	50% {
	// 		top: 50rpx;
	// 		left: -10rpx;
	// 		transform: scale(1);
	// 	}
	// 	60% {
	// 		top: 60rpx;
	// 		left: -20rpx;
	// 		transform: scale(1);
	// 	}
	// 	70% {
	// 		top: 70rpx;
	// 		left: -10rpx;
	// 		transform: scale(1);
	// 	}
	// 	80% {
	// 		top: 80rpx;
	// 		left: 0;
	// 		transform: scale(1);
	// 	}
	// 	90% {
	// 		top: 90rpx;
	// 		left: 10rpx;
	// 		transform: scale(1);
	// 	}
	// 	100% {
	// 		top: 100rpx;
	// 		transform: scale(1);
	// 		left: 0;
	// 	}
	// }
</style>
