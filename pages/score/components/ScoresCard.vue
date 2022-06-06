<script>
	export default {
		name: 'ScoresCard',
		props: {
			item: {
				type: Object,
				default: () => {},
			},
		},
		methods: {
			close(id) {
				console.log(id)
				this.$emit('close', id)
			},
		},
		render(h) {
			console.log('render========', this.item)
			return (
				<view
					class="ball-wrapper ball-wrapper-away away-wrapper"
					style={{ bottom: this.item.rank * 130 + 150 + 'rpx' }}
				>
					<view class="wrapper-item">
						<text
							class="wrapper-close iconfont icon-shezhi "
							onClick={() => this.close(this.item.id)}
						></text>
						<text class="wrapper-spliter "></text>
						<view class="team">
							{/*<h4>{item.competition_name}----------{item.id}</h4> */}
							{/* <h4>{this.item.competition_name}</h4> */}
							<view class="flex flex-direction  justify-between h-80">
								<view class="flex fs-20 f-hide">
									<text
										class={
											this.item.position == 1
												? 'red home-info margin-right-lg'
												: 'home-info margin-right-lg'
										}
									>
										{this.item.home_name}
									</text>
									<text
										class={this.item.position == 1 && this.item.type == 1 ? 'red' : ''}
									>
										{this.item.home_scores[0]}
									</text>
								</view>
								<view class="flex fs-20 f-hide">
									<text
										class={
											this.item.position == 2
												? 'red away-info margin-right-lg'
												: 'away-info margin-right-lg'
										}
									>
										{this.item.away_name}
									</text>
									<text
										class={this.item.position == 2 && this.item.type == 1 ? 'red' : ''}
									>
										{this.item.away_scores[0]}
									</text>
								</view>
							</view>
						</view>
						<text class={this.item.type == 1 ? 'jinqiu' : 'red-card'}></text>
						<text class="time maohao">{this.item.time}</text>
					</view>
				</view>
			)
		},
	}
</script>
<style scoped lang="scss">
	.ball-wrapper {
		position: fixed;
		// left: -480rpx;
		// top: 150rpx;
		// bottom: 0rpx;
		width: 686rpx;
		height: 120rpx;
		background-color: #ccf1e3;
		border-radius: 8rpx;
		z-index: 2;
		.wrapper-item {
			height: 100%;
			display: flex;
			align-items: center;
			.wrapper-close {
				cursor: pointer;
				height: 24rpx;
				line-height: 24rpx;
				width: 24rpx;
				color: #ffffff;
				background: #999999;
				border-radius: 50%;
				text-align: center;
				vertical-align: middle;
				position: absolute;
				right: 20rpx;
				svg {
					margin-top: 4rpx;
					height: 16rpx;
					width: 16rpx;
				}
			}
			.jinqiu {
				background: url(@/static/styles/png/hg2.png) no-repeat center center;
				// background-position: rpx -1rpx;
				height: 50rpx;
				width: 50rpx;
				transform: scale(1.2);
				border-radius: 50%;
			}
			.red-card {
				background: url(@/static/styles/png/rc.png) no-repeat center center;
				transform: rotate(15deg) scale(2);
				height: 40rpx;
				width: 40rpx;
			}
			.time {
				margin-right: 24rpx;
				margin-left: 14rpx;
				font-size: 30rpx;
				color: #eee;
				padding: 2rpx 10rpx;
				background-color: rgba($color: #000, $alpha: 0.3);
				border-radius: 10rpx;
			}
			.team {
				margin-left: 100rpx;
				width: 400rpx;
				view {
					display: flex;
					justify-content: space-between;
				}
				.home-info,
				.away-info {
					width: 300rpx;
					text-align: left;
					display: inline-block;
					word-break: break-word;
				}
				e4 {
					color: #999999;
					text-align: center;
					margin-bottom: 6rpx;
				}
				text {
					font-weight: bold;
					font-size: 14rpx;
					color: #666666;
				}
				.red {
					color: #f82c2c;
				}
				// text:nth-child(2) {
				//   color: #666666;
				// }
			}
		}
	}
	.ball-wrapper-away {
		background-color: #ccf1e3;
		// top: 300rpx;
		border-radius: 8rpx;
		.wrapper-item {
			justify-content: end;
			.wrapper-close {
				position: absolute;
				width: 50rpx;
				height: 50rpx;
				font-size: 50rpx;
				color: #333;
				background-color: #ccf1e3;
				top: 50rpx;
				left: 20rpx;
			}
			.wrapper-spliter {
				position: absolute;
				width: 2rpx;
				height: 50rpx;
				font-size: 50rpx;
				color: #333;
				background-color: #999;
				top: 39rpx;
				left: 90rpx;
			}
			.time {
				margin-right: 24rpx;
				margin-left: 14rpx;
				font-size: 30rpx;
				color: #eee;
				padding: 2rpx 10rpx;
				background-color: rgba($color: #000, $alpha: 0.3);
				border-radius: 10rpx;
			}
			.team {
				margin-right: 24rpx;
			}
		}
	}
	@keyframes twinkling {
		0% {
			// display: block;
			opacity: 1;
		}
		100% {
			opacity: 0;
			// display: none;
		}
	}
	.maohao::after {
		color: red;
		font-weight: 600;
		content: "'";
		animation: twinkling 1s ease-in-out infinite;
	}
	@keyframes homewrapper {
		0% {
			right: 0;
		}
		100% {
			right: 50%;
			transform: translateX(50%);
		}
	}
	.home-wrapper {
		right: 50%;
		transform: translateX(50%);
		// animation: homewrapper 1s ease-in-out infinite;
		// animation-iteration-count: 1; /*动画只执行一次*/
	}
	@keyframes awaywrapper {
		0% {
			left: 0;
		}
		100% {
			left: 50%;
			transform: translateX(-50%);
		}
	}
	.away-wrapper {
		left: 50%;
		transform: translateX(-50%);
		// animation: awaywrapper 1s ease-in-out infinite;
		// animation-iteration-count: 1; /*动画只执行一次*/
	}
</style>
