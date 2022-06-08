<template>
	<scroll-view
		scroll-y
		:id="'content-wrap' + 'Handicap'"
		:style="{ height: myHeight + 'rpx' }"
	>
		<view class="flex flex-direction padding-top-sm b-f">
			<view class="line">
				<view
					:class="activeIndex === index ? 'active' : ''"
					@click="changeTag(index, item)"
					v-for="(item, index) of tagList"
					:key="item.value"
					><text>{{ item.value }}</text></view
				>
			</view>
			<view class="progress-con margin-bottom-xs">
				<handicap-trend :trendList="trendList"></handicap-trend>
			</view>
			<handicap-table
				:tableData="tableData"
				:columnLabel="columnLabel"
			></handicap-table>
		</view>
	</scroll-view>
</template>

<script>
	import { Mqtt } from '@/utils/mqtt'
	// import HuTable from '@/components/Table'
	// import DataBtm from './DataBtm'
	import HandicapTrend from './HandicapTrend.vue'
	import HandicapTable from './HandicapTable'
	import { getOdds } from '@/api/odds'

	const columnLabels = [
		['Home Wins', 'Draw', 'Away Wins'],
		['Big', 'Handicap', 'Small'],
	]
	export default {
		name: 'Handicap',
		props: ['game_id', 'myHeight'],
		components: {
			HandicapTrend,
			HandicapTable,
		},
		data() {
			return {
				columnLabels,
				columnLabel: columnLabels[0],
				mq: null,
				tableData: [],
				activeIndex: 0,
				tagList: [
					{ label: 'asia', value: 'ASIA' },
					{ label: 'bs', value: 'BS' },
					{ label: 'eu', value: 'EU' },
					{ label: 'cr', value: 'CR' },
				],
				resInfo: { asia: [], bs: [], eu: [], cr: [] },
				trendList: [
					{ name: columnLabels[0][0], up: 0, draw: 0, down: 0 },
					{ name: columnLabels[0][1], up: 0, draw: 0, down: 0 },
					{ name: columnLabels[0][2], up: 0, draw: 0, down: 0 },
				],
			}
		},
		async created() {
			this.getOdds()
			// this.connetOdds()
		},
		methods: {
			changeTag(index, item) {
				this.activeIndex = index
				if (this.activeIndex === 0 || this.activeIndex === 2) {
					this.columnLabel = this.columnLabels[0]
				} else {
					this.columnLabel = this.columnLabels[1]
				}
				this.checkData(item)
			},
			setTrendNum(classType, numType) {
				// console.log(classType, numType);
				switch (classType) {
					case 'home':
						// console.log(this.trendList[0][numType]);
						this.trendList[0][numType]++
						// console.log(this.trendList[0][numType]);
						// console.log(this.trendList);
						break
					default:
						break
					case 'equal':
						this.trendList[1][numType]++
						break
					case 'away':
						this.trendList[2][numType]++
						break
				}
			},
			resetTrendList() {
				this.trendList = [
					{ name: this.columnLabel[0], up: 0, draw: 0, down: 0 },
					{ name: this.columnLabel[1], up: 0, draw: 0, down: 0 },
					{ name: this.columnLabel[2], up: 0, draw: 0, down: 0 },
				]
			},
			trendType(chuVal, jsVal, classType) {
				if (jsVal > chuVal) {
					this.setTrendNum(classType, 'up')
				} else if (jsVal < chuVal) {
					this.setTrendNum(classType, 'down')
				} else {
					this.setTrendNum(classType, 'draw')
				}
			},

			// "2:"主胜 "3:"和局 " 4:"客胜 "
			setTrendList() {
				this.resetTrendList()
				if (!this.tableData) return
				this.tableData.forEach((ta) => {
					this.trendType(ta.chupan[2], ta.jishi[2], 'home')
					this.trendType(ta.chupan[3], ta.jishi[3], 'equal')
					this.trendType(ta.chupan[4], ta.jishi[4], 'away')
				})
			},
			getOdds() {
				getOdds(this.game_id).then((res) => {
					console.log('res', res)
					if (JSON.stringify(res.info) === '{}') {
						this.$emit('childMsg', false)
						return
					}
					this.resInfo = res.info
					this.checkData(this.tagList[0])
				})
			},
			checkData(item) {
				let key = item.label
				this.tableData = this.resInfo[key]
				// 获取走势数据
				this.setTrendList(this.tableData)
			},
			connetOdds() {
				// 指数订阅
				this.connectMqtt(
					// process.env.VUE_APP_MQTT_SERVICE,
					this.$store.state.settings.siteInfo.mqttwsserver,
					'',
					'',
					true,
					// id 保证唯一
					'mqtitId-live-odd' + Math.random() * 1000,
					['odds/' + this.value],
					this.dealMessageOdds
				)
			},
			// 连接MQTT服务器
			connectMqtt(host, username, password, clean, clientId, topics, callback) {
				this.mq = new Mqtt(host, topics, callback)
				this.mq.connect({
					username,
					password,
					clean, //离线时是否接收 QoS 1 和 2 的消息 false 为接收,true为不接收
					clientId,
					reconnectPeriod: 5000, //重连时间间隔
				})
			},
			// 数据处理
			dealMessageOdds(topic, payload) {
				// console.log('dealMessageOdds=========', topic, JSON.parse(payload));
				let item = JSON.parse(payload)
				// 获取激活的tab
				const activeTag = this.tagList.find((tag, index) => {
					return index === this.activeIndex
				})
				if (activeTag.label === item.odds_type) {
					this.tableData.forEach((tableItem) => {
						if (tableItem.company_id === item.company_id) {
							// console.log(item.odds_type+item.company_id,tableItem.chupan,"oldChupan=======newChupan",item.chupan);
							// console.log(item.odds_type, item.company_id, tableItem.jishi, 'oldjishi=======newjishi', item.jishi);
							// tableItem.chupan = item.chupan;
							// item.jishi[4] = 6
							tableItem.jishi = JSON.parse(JSON.stringify(item.jishi))
							this.setTrendList(this.tableData)
						}
						// return tableItem.company_id === item.company_id;
					})
				}
				// console.log(this.tableData);
			},
			tableHeaderCellStyle: function ({ row, column, rowIndex, columnIndex }) {
				if (columnIndex === 0) {
					return 'text-align: center;font-size: 8rpx;font-weight: normal;padding:0;color: #999'
				} else if (columnIndex === 2) {
					return 'text-align: center;font-size: 8rpx;font-weight: normal;padding-left:30rpx;color: #999'
				}
				return 'font-size: 8rpx;font-weight: normal;padding:0;color: #999'
			},
		},
	}
</script>

<style lang="scss">
	.line {
		margin: 20rpx 0;
		text-align: center;
		.tab-group {
			background-color: pink;
		}
		view {
			font-size: 20rpx;
			height: 50rpx;
			line-height: 50rpx;
			width: 150rpx;
			display: inline-block;
			font-weight: 600;
			background-color: #eee;
			box-sizing: border-box;
		}
		text {
			display: inline-block;
			width: 140rpx;
			margin: 5rpx;
			height: 40rpx;
			line-height: 40rpx;
		}
		view:nth-child(1) {
			border-top-left-radius: 15rpx;
			border-bottom-left-radius: 15rpx;
		}
		view:nth-child(4) {
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
