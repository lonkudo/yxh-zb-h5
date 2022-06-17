<script>
	import { getOddsHistory } from '@/api/odds'
	import { formatGiven } from '@/utils/index.js'
	/* 指数历史页面。由于u-table等u-view组件是easycom按需加载的，按需加载的组件在JSX中无法使用，必须是全局加载。所以封装了u-table-my等组件 */

	export default {
		data() {
			return {
				oddsPage: {
					match_id: 0,
					company_id: 0,
					odds_type: '',
					p: 1,
					num: 40,
					isAll: false,
				},
				tableData: [],
				myHeight: 0,
				company_name: '',
				activeIndex: 0,
				trendTable: [],
			}
		},
		onLoad(options) {
			console.log('options', options)
			this.oddsPage.odds_type = options.odds_type
			this.oddsPage.company_id = options.company_id
			this.oddsPage.match_id = options.match_id
			this.getOddsHistory()
			this.myHeight = this.initScrollHeight(80)
			this.company_name = options.company_name
		},
		methods: {
			moreOdds() {
				this.oddsPage.p += 1
				this.getOddsHistory()
			},
			getOddsHistory() {
				getOddsHistory(this.oddsPage)
					.then((res) => {
						this.tableData = res.info
						if (this.oddsPage.p === 1) {
							this.trendTable = []
							this.isAll = false
						}
						this.trendTable = this.trendTable.concat(res.info.data)
						if (res.info.data.length === 0) {
							this.oddsPage.isAll = true
						}
						console.log(res)
					})
					.catch((err) => {
						console.log(err)
					})
			},
			changeCompany(index) {
				this.activeIndex = index
				this.oddsPage.company_id = this.tableData.company[index].id
				this.oddsPage.p = 1
				this.oddsPage.isAll = false
				this.getOddsHistory()
			},
			getFontColor(a, b) {
				if (a === b) {
					return ''
				} else if (a > b) {
					return 'fc-red'
				} else {
					return 'fc-g'
				}
			},
			formatGiven(time, fmt) {
				// 按制定格式格式化时间
				if (!time) return
				// console.log('time', time, typeof time)
				if (typeof time === 'string') {
					time = new Date(parseInt(time + '000'))
				}
				// console.log('time', time, typeof time)
				var o = {
					'M+': time.getMonth() + 1, //月份
					'd+': time.getDate(), //日
					'h+': time.getHours(), //小时
					'm+': time.getMinutes(), //分
					's+': time.getSeconds(), //秒
					'q+': Math.floor((time.getMonth() + 3) / 3), //季度
					'S+': time.getMilliseconds(), //毫秒
				}
				if (/(y+)/.test(fmt)) {
					fmt = fmt.replace(
						RegExp.$1,
						(time.getFullYear() + '').substr(4 - RegExp.$1.length)
					)
				}
				for (var k in o) {
					if (new RegExp('(' + k + ')').test(fmt)) {
						fmt = fmt.replace(
							RegExp.$1,
							RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
						)
					}
				}
				return fmt
			},
		},
		render(h) {
			return (
				<view class="b-f">
					<view class="navBar flex justify-between b-f h-80 align-center fs-30">
						<text class="iconfont icon-left fw-6 padding-left-sm w-250"></text>
						<text class="fw-6  w-250 text-center">
							{this.oddsPage.odds_type.toUpperCase()}
						</text>
						<text class=" w-250"></text>
					</view>
					{this.tableData.length !== 0 ? (
						<view class="flex">
							<view class="w-150 flex flex-direction">
								{this.tableData.company.map((com, index) => {
									return (
										<view
											class="flex align-center justify-center h-80 fs-20"
											style={{
												backgroundColor: index === this.activeIndex ? '#fff' : '#dde1ed',
											}}
											onClick={() => {
												this.changeCompany(index)
											}}
										>
											<text>{com.name}</text>
										</view>
									)
								})}
							</view>
							<view
								class="w-600 fs-20"
								scroll-y
								style={{ height: this.myHeight + 'rpx', overflowY: 'auto' }}
							>
								<u-table-my
									th-style={{ backgroundColor: '#fff', fontWeight: '400' }}
									padding={'15rpx 0'}
								>
									<u-tr-my>
										<u-th-my>
											<view class="flex align-center justify-center w-150">
												<text class="fs-20 fc-b-9">Home team</text>
											</view>
										</u-th-my>
										<u-th-my>
											<view class="flex align-center justify-center  w-150">
												<text class="fs-20 fc-b-9">Trend</text>
											</view>
										</u-th-my>
										<u-th-my>
											<view class="flex align-center justify-center w-150">
												<text class="fs-20 fc-b-9">Away team</text>
											</view>
										</u-th-my>
										<u-th-my>
											<view class="flex align-center justify-center  w-150">
												<text class="fs-20 fc-b-9 ">Update time</text>
											</view>
										</u-th-my>
									</u-tr-my>
									{this.trendTable.map((line) => {
										return (
											<u-tr-my>
												<u-td-my>
													<view class="flex align-center justify-center w-150">
														<text
															class={[
																' fs-20 f-hide',
																this.getFontColor(
																	line.home_team,
																	this.tableData.chupan.home_team
																),
															]}
														>
															{line.home_team}
														</text>
													</view>
												</u-td-my>
												<u-td-my>
													<view class="flex align-center justify-center w-150">
														<text
															class={[
																' fs-20 f-hide',
																this.getFontColor(line.home_team, this.tableData.chupan.trend),
															]}
														>
															{line.trend}
														</text>
													</view>
												</u-td-my>
												<u-td-my>
													<view class="flex align-center justify-center w-150">
														<text
															class={[
																' fs-20 f-hide',
																this.getFontColor(
																	line.home_team,
																	this.tableData.chupan.away_team
																),
															]}
														>
															{line.away_team}
														</text>
													</view>
												</u-td-my>
												<u-td-my>
													<view class="flex align-center justify-center w-150">
														<text class={[' fs-20 f-hide']}>
															{this.formatGiven(line.tiem + '000', 'MM-dd hh:ss')}
														</text>
													</view>
												</u-td-my>
											</u-tr-my>
										)
									})}

									<u-tr-my>
										<u-td-my>
											<view class="flex align-center justify-center w-150">
												<text class=" fs-20 f-hide">{this.tableData.chupan.home_team}</text>
											</view>
										</u-td-my>
										<u-td-my>
											<view class="flex align-center justify-center w-150">
												<text class=" fs-20 f-hide">{this.tableData.chupan.trend}</text>
											</view>
										</u-td-my>
										<u-td-my>
											<view class="flex align-center justify-center w-150">
												<text class=" fs-20 f-hide f-hide">
													{this.tableData.chupan.away_team}
												</text>
											</view>
										</u-td-my>
										<u-td-my>
											<view class="flex align-center justify-center w-150">
												<text class=" fs-20 f-hide">
													{this.formatGiven(
														this.tableData.chupan.tiem + '000',
														'MM-dd hh:ss'
													)}
												</text>
											</view>
										</u-td-my>
									</u-tr-my>

									<u-tr-my>
										<u-td-my>
											{this.oddsPage.isAll ? (
												<view
													class="flex align-center justify-center"
													onClick={this.moreOdds}
												>
													<text class="">No more data</text>
												</view>
											) : (
												<view
													class="flex align-center justify-center"
													onClick={this.moreOdds}
												>
													<text class="iconfont icon-xiangxia "></text>
												</view>
											)}
										</u-td-my>
									</u-tr-my>
								</u-table-my>
							</view>
						</view>
					) : (
						<view></view>
					)}
				</view>
			)
		},
	}
</script>

<style></style>
