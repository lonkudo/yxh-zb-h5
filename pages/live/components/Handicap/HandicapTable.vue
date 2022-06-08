<script>
	export default {
		name: 'HandicapTable',
		components: {},
		props: {
			columnLabel: {
				type: Array,
			},
			tableData: {
				type: Array,
			},
		},
		data() {
			return {
				thStyle: {
					backgroundColor: 'red',
					color: 'red',
				},
			}
		},
		methods: {
			getClass(chuVal, jsVal, type) {
				if (jsVal > chuVal) {
					return 'fc-red'
				} else if (jsVal < chuVal) {
					return 'fc-g'
				}
			},
		},
		render(h) {
			if (this.tableData) {
				return (
					<u-table-my
						th-style={{
							fontSize: '20rpx',
							fontWeight: '400',
							color: '#999',
							backgroundColor: '#dde1ed',
						}}
						font-size={20}
					>
						<u-tr-my>
							<u-th-my>Company</u-th-my>
							<u-th-my></u-th-my>
							{this.columnLabel.map((label) => {
								return (
									<u-th-my>
										<text>{label}</text>
									</u-th-my>
								)
							})}
						</u-tr-my>
						{this.tableData.map((row) => {
							return (
								<u-tr-my>
									<u-td-my>
										<view class="flex flex-direction h-50 justify-center align-center">
											<text>{row.company_name}</text>
										</view>
									</u-td-my>
									<u-td-my>
										<view class="flex flex-direction h-50  justify-center align-center">
											<text>Initial</text>
											<text>Instant</text>
										</view>
									</u-td-my>
									<u-td-my>
										<view class="flex flex-direction h-50 justify-center align-center ">
											<text>{row.chupan[2]}</text>
											<text class={this.getClass(row.chupan[2], row.jishi[2])}>
												{row.jishi[2]}
											</text>
										</view>
									</u-td-my>
									<u-td-my>
										<view class="flex flex-direction h-50  justify-center align-center">
											<text>{row.chupan[3]}</text>
											<text class={this.getClass(row.chupan[3], row.jishi[3])}>
												{row.jishi[3]}
											</text>
										</view>
									</u-td-my>
									<u-td-my>
										<view class="flex flex-direction h-50  justify-center align-center p-r">
											<text>{row.chupan[4]}</text>
											<text class={this.getClass(row.chupan[4], row.jishi[4])}>
												{row.jishi[4]}
											</text>
											<text class="iconfont icon-right p-a fc-b-9 right-0"></text>
										</view>
									</u-td-my>
								</u-tr-my>
							)
						})}
					</u-table-my>
				)
			} else {
				return (
					<u-table-my
						th-style={{
							fontSize: '20rpx',
							fontWeight: '400',
							color: '#999',
							backgroundColor: '#dde1ed',
						}}
						font-size={20}
					>
						<u-tr-my>
							<u-th-my>Company</u-th-my>
							<u-th-my></u-th-my>
							{this.columnLabel.map((label) => {
								return (
									<u-th-my>
										<text>{label}</text>
									</u-th-my>
								)
							})}
						</u-tr-my>

						<u-tr-my>
							<u-td-my>
								<text>No data</text>
							</u-td-my>
						</u-tr-my>
					</u-table-my>
				)
			}
		},
	}
</script>
<style scoped lang="scss">
	@import '~@/static/styles/css/mixin.scss';
	// @include updown;
</style>
