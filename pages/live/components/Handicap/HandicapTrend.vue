<script>
	export default {
		name: 'HandicapTrend',
		props: {
			trendList: {
				type: Array,
				default: () => [],
			},
		},
		methods: {
			getProgress(num, total) {
				console.log('num', total)
				if (total > 0) return (num / total) * 100
				else return 0
			},
		},
		render(h) {
			return (
				<view class="progress-con">
					{this.trendList.map((trend) => {
						let homeProgress = this.getProgress(
							trend.up,
							trend.up + trend.down + trend.draw
						)
						let awayProgress = this.getProgress(
							trend.down,
							trend.up + trend.down + trend.draw
						)
						return (
							<view class="progress-row fs-14">
								<view class="progress-left fs-14 w-150">{trend.name}</view>
								<view>
									<view>
										<view class="red fs-14">{trend.up} companies tend to rise</view>
										<view class="huise fs-14" style="text-align: center">
											{trend.draw} unchanged
										</view>
										<view class="green fs-14" style="text-align: right">
											{trend.down} tend to decline
										</view>
									</view>
									<div class="time-line-bar fs-14">
										<span
											class="red-line fs-14"
											style={{ width: homeProgress + '%' }}
										></span>
										<span
											class="green-line fs-14"
											style={{ width: awayProgress + '%' }}
										></span>
									</div>
								</view>
							</view>
						)
					})}
				</view>
			)
		},
	}
</script>
<style lang="scss" scoped>
	@import '~@/static/styles/css/variables.scss';
	.progress-con {
		padding: 10rpx 0;
	}
	.progress-row {
		height: 60rpx;
		/* line-height: 60rpx; */
		display: flex;
		align-items: center;
	}
	.progress-left {
		height: 100%;
		line-height: 60rpx;
		font-size: 14rpx;
		text-align: center;
		// font-weight: 550;
	}

	.huise,
	.red,
	.green {
		font-size: 16rpx;
		// font-weight: bold;
	}
	.huise {
		color: #d0cbcb;
	}
	.time-line-bar,
	.red-line,
	.green-line {
		height: 8rpx;
		border-radius: 10rpx;
	}
	.time-line-bar {
		position: relative;
		background: #999999;
		width: 100%;
	}
	.red-line {
		// display: inline-block;
		position: absolute;
		left: 0;
		width: 30%;
		background: red;
	}
	.green-line {
		position: absolute;
		right: 0;
		width: 30%;
		background: $green;
	}
	.red {
		color: red;
	}
	.green {
		color: $green;
	}
</style>
