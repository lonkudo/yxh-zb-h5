<template>
	<view>
		<u-navbar
			:is-back="true"
			:title="'Gold details'"
			:title-bold="true"
			:title-color="'#000'"
			:back-icon-color="'#000'"
			:back-icon-size="40"
		>
			<text
				@tap="showDate = true"
				class="margin-right-lg iconfont icon-rili"
				slot="right"
			></text>
		</u-navbar>
		<view class="padding-top-sm padding-bottom-sm padding-left-xs b-f">
			<view class="flex align-center">
				<text class="fs-20 fc-b-9"></text>
				<view
					@tap="show = true"
					class="padding-left-xs padding-right-sm flex align-center justify-center margin-left-sm"
					><text class="fs-20 sound-option">
						{{ goldLogsPage.mod | expenseType }} - {{ goldLogsPage.type | giftType }}
					</text></view
				>
			</view>
		</view>

		<view
			class="flex justify-between padding-top-sm padding-bottom-sm padding-left-xs padding-right-xs b-f6"
		>
			<text class="fs-30">{{ goldLogsPage.range_time | timeDisplay }}</text>
			<view class="flex align-center">
				<view class="flex align-center margin-right-lg">
					<text class="fs-20 margin-right-xs fc-b-9">+{{ total.income }}</text>
					<image src="@/static/styles/png/jinbi.png" mode="" class="w-20 h-20" />
				</view>
				<view class="flex align-center">
					<text class="fs-20 margin-right-xs fc-b-9">-{{ total.expense }}</text>
					<image src="@/static/styles/png/jinbi.png" mode="" class="w-20 h-20" />
				</view>
			</view>
		</view>

		<scroll-view scroll-y="true">
			<view class="b-f">
				<template v-if="goldLogs.length > 0">
					<scroll-view
						scroll-y
						@scrolltolower="loadMore()"
						:style="{ height: myHeight + 'rpx' }"
					>
						<view
							v-for="(item, index) in goldLogs"
							:key="index"
							class="flex align-center padding-xs padding-top-sm padding-bottom-sm"
						>
							<view class="flex flex-direction w-130 align-center">
								<text class="fc-b-9 fs-20">{{ item.dateformat.date }}</text>
								<text class="fc-b-9 fs-20">{{ item.dateformat.time }}</text>
							</view>
							<view class="flex align-center">
								<view
									:class="[
										'ava-60 flex align-center justify-center',
										bgColor(item.type),
									]"
									><text :class="['iconfont  fc-b-f fs-36', iconType(item.type)]"></text
								></view>
								<text class="margin-left-xs">{{ item.type | giftType }}</text>
							</view>
							<text class="margin-left-auto"
								>{{ item.mod === '1' ? '+' : '-' }}{{ item.coin }}</text
							>
						</view>
						<u-loadmore
							class="h-100"
							:status="status"
							:icon-type="'flower'"
							:load-text="loadText"
						/>
					</scroll-view>
				</template>
				<template v-else>
					<no-content :style="{ height: myHeight + 'rpx' }"></no-content>
				</template>
			</view>
		</scroll-view>
		<!-- 新版goldLog还有选择类型和时间选择还有统计 -->
		<my-select
			v-model="show"
			mode="mutil-column-auto"
			:list="list"
			@confirm="confirm"
			:title="'Types'"
		></my-select>
		<my-select
			v-model="showDate"
			mode="mutil-column-auto"
			:list="dateList"
			@confirm="confirmDate"
			:title="'Date'"
		></my-select>
	</view>
</template>

<script>
	import { goldLog } from '@/api/my'
	import moment from 'moment'

	import NoContent from '../../../components/NoContent/NoContent.vue'
	import MySelect from '../../../components/my-select/my-select.vue'
	import fifaVue from '../../data/fifa/fifa.vue'

	export default {
		components: { NoContent, MySelect },
		data() {
			return {
				total: {
					income: '',
					expense: '',
				},
				goldLogs: [],
				status: 'loadmore',
				loadText: {
					loadmore: '',
					loading: 'loading',
					nomore: 'no more data',
				},
				loadingFlag: false,
				goldLogsPage: {
					p: 1,
					num: 20,
					isAll: false,
					mod: 0, // 0,1,2 所有，增加，减少
					type: 0, // 0,1,2,3,4,5,6,7
					range_time: moment().format('YYYYMM'), // 202205 月份
				},
				myHeight: 0,
				show: false,
				list: [
					{
						value: 0,
						label: 'All types',
						children: [
							{
								value: 0,
								label: 'All',
							},
							{
								value: 1,
								label: 'Sign In',
							},
							{
								value: 2,
								label: 'Daily tasks',
							},
							{
								value: 3,
								label: 'Live Task',
							},
							{
								value: 4,
								label: 'System Recharge',
							},
							{
								value: 5,
								label: 'User Recharge',
							},
							{
								value: 6,
								label: 'Brush Gifts',
							},
							{
								value: 7,
								label: 'Receive Gifts',
							},
						],
					},
					{
						value: 1,
						label: 'Income',
						children: [
							{
								value: 0,
								label: 'All',
							},
							{
								value: 1,
								label: 'Sign In',
							},
							{
								value: 2,
								label: 'Daily tasks',
							},
							{
								value: 3,
								label: 'Live Task',
							},
							{
								value: 4,
								label: 'System Recharge',
							},
							{
								value: 5,
								label: 'User Recharge',
							},
							{
								value: 7,
								label: 'Receive Gifts',
							},
						],
					},
					{
						value: 2,
						label: 'Expenditure',
						children: [
							{
								value: 0,
								label: 'All',
							},
							{
								value: 6,
								label: 'Brush Gifts',
							},
						],
					},
				],
				showDate: false,
				dateList: [
					{
						value: moment().get('year'),
						label: moment().get('year'),
						children: [
							{
								value: 0,
								label: 'January',
							},
							{
								value: 1,
								label: 'Fabruary',
							},
							{
								value: 2,
								label: 'March',
							},
							{
								value: 3,
								label: 'April',
							},
							{
								value: 4,
								label: 'May',
							},
							{
								value: 5,
								label: 'June',
							},
							{
								value: 6,
								label: 'July',
							},
							{
								value: 7,
								label: 'August',
							},
							{
								value: 8,
								label: 'September',
							},
							{
								value: 9,
								label: 'October',
							},
							{
								value: 10,
								label: 'November',
							},
							{
								value: 11,
								label: 'December',
							},
						],
					},
				],
			}
		},
		onLoad() {
			this.getGoldLog()
			this.myHeight = this.initScrollHeight(0)
			let year = moment().get('year')
		},
		methods: {
			loadMore() {
				if (this.loadingFlag) return
				this.loadingFlag = true // 防止重复发送请求
				if (this.goldLogsPage.isAll) return (this.status = 'nomore')
				this.status = 'loading'
				this.goldLogsPage.p += 1
				this.getGoldLog()
			},
			getGoldLog() {
				let data = Object.assign(this.goldLogsPage, {
					uid: this.uid,
					token: this.token,
				})
				goldLog(data)
					.then((res) => {
						this.goldLogs = this.goldLogs.concat(res.info.data)
						this.total = res.info.total
						console.log('this.goldLogs', res.info, this.goldLogs.length)
						if (this.goldLogs.length > res.info.count) {
							this.goldLogsPage.isAll = true
						}
						if (this.goldLogsPage.isAll) {
							this.status = 'nomore'
						} else {
							this.status = 'loadmore'
						}
						this.loadingFlag = false
					})
					.catch((err) => {
						console.log(err)
					})
			},
			bgColor(val) {
				switch (val) {
					case '1':
						return 'bg-gold'
						break
					case '2':
						return 'bg-green'
						break
					case '3':
						return 'bg-blue'
						break
					case '4':
						return 'bg-orange'
						break
					case '5':
						return 'bg-orange'
						break
					case '6':
						return 'bg-red'
						break
					case '7':
						return 'bg-red'
						break

					default:
						break
				}
			},
			iconType: function (val) {
				switch (val) {
					case '1':
						return 'icon-qiandao1'
						break
					case '2':
						return 'icon-yuedujilu'
						break
					case '3':
						return 'icon-w_luxiang'
						break
					case '4':
						return 'icon-zhanghuchongzhi'
						break
					case '5':
						return 'icon-zhanghuchongzhi'
						break
					case '6':
						return 'icon-liwu'
						break
					case '7':
						return 'icon-liwu'
						break
					default:
						break
				}
			},
			confirm(args) {
				/* 选择器确定 */
				console.log('args', args)
				this.goldLogsPage.mod = args[0].value
				this.goldLogsPage.type = args[1].value
				console.log('val', this.goldLogsPage)
			},
			confirmDate(args) {
				/* 选择器确定 */
				this.goldLogsPage.range_time =
					moment().get('year') + (args[1].value + 1).toString().padStart(2, '0')
			},
		},
		computed: {
			typeCombined: function () {
				return (
					this.goldLogsPage.type +
					'-' +
					this.goldLogsPage.mod +
					'-' +
					this.goldLogsPage.range_time
				)
			},
		},
		watch: {
			typeCombined: function () {
				this.goldLogs = []
				this.goldLogsPage.p = 1
				this.getGoldLog()
			},
		},
		filters: {
			expenseType(val) {
				switch (val) {
					case 0:
						return 'All Types'
						break
					case 1:
						return 'Income'
						break
					case 2:
						return 'Expenditure'
						break
					default:
						break
				}
			},
			giftType(val) {
				if (typeof val === 'number') val = val.toString()
				switch (val) {
					case '0':
						return 'All'
						break
					case '1':
						return 'Sign'
						break
					case '2':
						return 'Daily tasks'
						break
					case '3':
						return 'Live broadcast tasks'
						break
					case '4':
						return 'Admin charge'
						break
					case '5':
						return 'User charge'
						break
					case '6':
						return 'Send gifts'
						break
					case '7':
						return 'Receive gifts'
						break
					default:
						break
				}
			},
			timeDisplay(val) {
				console.log('display', typeof val)
				return moment(val).format('MMMM')
			},
		},
	}
</script>

<style lang="scss">
	.sound-option {
		position: relative;
	}
	.sound-option ::after {
		content: '▾';
		font-size: 30rpx;
		position: absolute;
		right: -20rpx;
		top: -5rpx;
	}
</style>
