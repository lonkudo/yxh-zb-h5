<template>
	<scroll-view
		scroll-y
		:style="{ height: myHeight + 'rpx' }"
		:id="'content-wrap' + 'Action'"
	>
		<!-- teamInfo不为空且加载完成才渲染 -->
		<template v-if="!isEmpty(teamInfo) && flag">
			<!-- 技术统计 -->
			<view :style="{ height: myHeight + 'rpx' }" class="b-f">
				<view class="padding-sm b-f">Technical statistics</view>
				<view class="b-f">
					<u-table border-color="#fff" font-size="20" padding="0">
						<u-tr class="margin-bottom-sm">
							<u-td width="8%"></u-td>
							<u-td width="27%">
								<view class="flex align-center justify-end">
									<text class="fs-16 margin-right-xs f-hide w-160 text-right">{{
										teamInfo.home.name
									}}</text>
									<image :src="teamInfo.home.logo" mode="" class="ava-40" />
								</view>
							</u-td>
							<u-td width="27%"></u-td>
							<u-td width="27%">
								<view class="flex align-center justify-start">
									<image :src="teamInfo.away.logo" mode="" class="ava-40" />
									<text class="fs-16 margin-left-xs f-hide text-left w-160">{{
										teamInfo.away.name
									}}</text>
								</view>
							</u-td>
							<u-td width="8%"></u-td>
						</u-tr>
						<u-tr
							class="margin-bottom-sm"
							v-for="(item, index) in result"
							:key="index"
						>
							<u-td width="8%">
								<view class="flex justify-end align-center margin-right-xs">
									{{ item.home }}
								</view>
							</u-td>
							<u-td width="27%">
								<u-line-progress
									style="transform: rotate(180deg)"
									:percent="item.homePer"
									:round="false"
									:active-color="item.homeGood ? '#02b875' : '#666'"
									:show-percent="false"
									height="26"
								></u-line-progress>
							</u-td>

							<u-td width="27%"
								><view class="f-hide w-225 padding-left-xs padding-right-xs">
									{{ item.typeName }}</view
								></u-td
							>
							<u-td width="27%">
								<u-line-progress
									:percent="item.awayPer"
									:round="false"
									:active-color="item.homeGood ? '#666' : '#02b875'"
									:show-percent="false"
									height="26"
								></u-line-progress>
							</u-td>
							<u-td width="8%">
								<view class="flex justify-start align-center margin-left-xs">
									{{ item.away }}
								</view>
							</u-td>
						</u-tr>
					</u-table>
				</view>
				<!-- 文字直播 -->
				<view class="b-f" v-if="pay.length > 0 && showTlive">
					<view class="h-20"></view>
					<view class="line">
						<view
							:class="activeIndex === index ? 'active' : ''"
							@click="changeTag(index, item)"
							v-for="(item, index) of tagList"
							:key="item.value"
							><text class="f-hide">{{ item.value }}</text></view
						>
					</view>
					<view class="margin-top-lg" v-show="activeIndex !== 0">
						<!-- my-timeline是根据u-timline改造，有左右布局和左中右布局两种 -->
						<my-timeline>
							<my-timeline-item v-for="(item, index) in tliveScript" :key="index">
								<template v-slot:node>
									<view class="ava-40 flex align-center justify-center bg-tlivegrey">
										<!-- 此处为uView的icon组件 -->
										<text class="fs-20">{{ item.time }}</text>
									</view>
								</template>
								<template v-slot:content>
									<view
										class="margin-right-sm margin-bottom-sm flex align-center"
										v-for="(event, idx) in item.events"
										:key="idx"
									>
										<image :src="getIcon(event.type)" mode="" class="w-40 h-40" />
										<view class="padding-sm br-8 bg-tlivegrey flex-sub margin-left-sm">{{
											event.data
										}}</view>
									</view>
								</template>
							</my-timeline-item>
						</my-timeline>
					</view>
					<view class="margin-top-lg" v-show="activeIndex === 0">
						<!-- 左中右布局的timeline -->
						<my-timeline-center>
							<view v-for="(item, index) in mainScript" :key="index">
								<my-timeline-item-left v-if="item.events[0].position === 1">
									<template v-slot:node>
										<view class="ava-40 flex align-center justify-center bg-tlivegrey">
											<!-- 此处为uView的icon组件 -->
											<text class="fs-20">{{ item.time }}</text>
										</view>
									</template>
									<template v-slot:content>
										<view
											class="margin-right-sm margin-bottom-sm flex align-center"
											v-for="(event, idx) in item.events"
											:key="idx"
										>
											<view
												class="padding-sm br-8 bg-tlivegrey flex-sub margin-right-sm margin-left-sm"
												>{{ event.data }}</view
											>
											<image :src="getIcon(event.type)" mode="" class="w-40 h-40" />
										</view>
									</template>
								</my-timeline-item-left>
								<my-timeline-item-right v-if="item.events[0].position === 2">
									<template v-slot:node>
										<view class="ava-40 flex align-center justify-center bg-tlivegrey">
											<!-- 此处为uView的icon组件 -->
											<text class="fs-20">{{ item.time }}</text>
										</view>
									</template>
									<template v-slot:content>
										<view
											class="margin-right-sm margin-bottom-sm flex align-center"
											v-for="(event, idx) in item.events"
											:key="idx"
										>
											<view class="margin-left-sm">
												<image :src="getIcon(event.type)" mode="" class="w-40 h-40" />
											</view>
											<view class="padding-sm br-8 bg-tlivegrey flex-sub margin-left-sm">{{
												event.data
											}}</view>
										</view>
									</template>
								</my-timeline-item-right>
							</view>
						</my-timeline-center>
						<view class="flex align-center justify-center">
							<view
								class="padding-xs padding-left-sm padding-right-sm"
								style="
									border: 1rpx solid #02b875;
									border-radius: 40rpx;
									margin: -20rpx 0 30rpx 0;
								"
							>
								<text class="fc-g fs-20">Game Start</text>
							</view>
						</view>
					</view>
					<view class="flex flex-wrap padding-left-sm padding-right-xs">
						<!-- 时间类型指示区 -->
						<image-left
							class="margin-bottom-sm"
							v-for="(item, index) in tliveIcons"
							:img="item.pic"
							:top="item.label"
							:size="40"
							:width="index === 9 ? 300 : 190"
						></image-left>
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<no-content :height="myHeight">No informations yet</no-content>
		</template>
	</scroll-view>
</template>

<script>
	import { getMatchData } from '@/api/live'
	import NoContent from '../../../components/NoContent/NoContent.vue'
	import { Mqtt } from '@/utils/mqtt'
	// import pay from './payload'
	import MyTimeline from '@/components/MyTimeline/MyTimeline.vue'
	import MyTimelineItem from '@/components/MyTimeline/MyTimelineItem.vue'
	import MyTimelineCenter from '@/components/MyTimelineCenter/MyTimelineCenter.vue'
	import MyTimelineItemLeft from '@/components/MyTimelineCenter/MyTimelineItemLeft.vue'
	import MyTimelineItemRight from '@/components/MyTimelineCenter/MyTimelineItemRight.vue'

	const tliveIcons = [
		{ label: 'Goal', pic: require('@/static/styles/icon/tlive/0.png') },
		{ label: 'Penalty', pic: require('@/static/styles/icon/tlive/1.png') },
		{ label: 'Penalty Missed', pic: require('@/static/styles/icon/tlive/2.png') },
		{ label: 'Own Goal', pic: require('@/static/styles/icon/tlive/3.png') },
		{ label: 'Assist', pic: require('@/static/styles/icon/tlive/4.png') },
		{ label: 'Corner', pic: require('@/static/styles/icon/tlive/5.png') },
		{ label: 'Substitute', pic: require('@/static/styles/icon/tlive/6.png') },
		{ label: 'Yellow Card', pic: require('@/static/styles/icon/tlive/7.png') },
		{ label: 'Red Card', pic: require('@/static/styles/icon/tlive/8.png') },
		{
			label: 'Second Yellow Card',
			pic: require('@/static/styles/icon/tlive/9.png'),
		},
	]

	export default {
		components: {
			NoContent,
			MyTimeline,
			MyTimelineItem,
			MyTimelineCenter,
			MyTimelineItemLeft,
			MyTimelineItemRight,
		},
		name: 'Action',
		props: ['game_id', 'teamInfo', 'myHeight'],
		data() {
			return {
				stats: [],
				flag: false,
				result: [],
				pay: [],
				// pay: pay,
				tliveIcons: tliveIcons,
				tagList: [
					{
						label: 'Important events',
						value: 'Important events',
					},
					{
						label: 'Live transcri',
						value: 'Live transcri',
					},
				],
				activeIndex: 0,
			}
		},
		methods: {
			changeTag(index, item) {
				this.activeIndex = index
			},
			getIcon(val) {
				switch (val) {
					case 1:
						return this.tliveIcons[0].pic
						break
					case 8:
						return this.tliveIcons[1].pic
						break
					case 16:
						return this.tliveIcons[2].pic
						break
					case 17:
						return this.tliveIcons[3].pic
						break
					case 18:
						return this.tliveIcons[4].pic
						break
					case 2:
						return this.tliveIcons[5].pic
						break
					case 9:
						return this.tliveIcons[6].pic
						break
					case 3:
						return this.tliveIcons[7].pic
						break
					case 4:
						return this.tliveIcons[8].pic
						break
					case 15:
						return this.tliveIcons[9].pic
						break
					default:
						return null
						break
				}
			},
			connectMqtt(host, username, password, clean, clientId, topics, callback) {
				this.mqLive = new Mqtt(host, topics, callback)
				this.mqLive.connect({
					username,
					password,
					clean, //离线时是否接收 QoS 1 和 2 的消息 false 为接收,true为不接收
					clientId,
					reconnectPeriod: 5000, //重连时间间隔
				})
			},
			// 处理文字直播消息
			connectMsg() {
				let topics = [this.game_id]
				this.connectMqtt(
					// process.env.VUE_APP_MQTT_SERVICE,
					this.$store.state.settings.siteInfo.mqttwsserver,
					'',
					'',
					true,
					// id 保证唯一
					'mqtitId-ongoing' + Math.random() * 1000,
					topics,
					this.dealMessage
				)
			},
			dealMessage(topic, payload) {
				/* mqtt建立以后通过这个函数来处理获取到实时数据 */
				// this.pay = JSON.parse(payload)
				let newPayload = JSON.parse(payload)

				this.renewStats(newPayload[0].stats) // 刷新数据统计
				this.pay = newPayload // 刷新文字直播
				console.log('payload', JSON.parse(payload))

				// 暂时关闭来测试
				// this.realTime(JSON.parse(payload))
			},
			renewStats(stats) {
				/* 技术统计刷新 */
				this.stats = stats
				this.stats.forEach((element) => {
					this.setChildSort(element)
				})
				this.result = this.sortList()
				this.flag = true
			},
			getMatchData() {
				getMatchData(this.game_id).then((res) => {
					// console.log('---res----res----res----res----res---', res)
					if (JSON.stringify(res.info) !== '{}' && res.info.stats) {
						// 下面都是技术统计的处理过程，result是结果，拿来渲染
						this.stats = res.info.stats
						this.stats.forEach((element) => {
							this.setChildSort(element)
						})
						this.result = this.sortList()
						this.flag = true
						// console.log('res.info', this.stats)
					}
				})
			},
			insertSort(arr) {
				var preIndex = 0 //当前访问的元素的前一个索引
				for (var i = 1; i < arr.length; i++) {
					var temp = arr[i]
					preIndex = i - 1
					while (preIndex >= 0 && temp.order < arr[preIndex].order) {
						//若当前值小于前面的值，则交换，继续向前比较。这时候不能再用arr[i],应该用temp
						arr[preIndex + 1] = arr[preIndex]
						preIndex -= 1
					}
					arr[preIndex + 1] = temp //找到了要插入的位置
				}
				return arr
			},
			sortList() {
				this.stats.forEach((element) => {
					this.setChildSort(element)
				})
				let arr = this.insertSort(this.stats)
				return arr
			},
			setPercent(element) {
				if (element.home + element.away > 0) {
					element['homePer'] = (element.home / (element.home + element.away)) * 100
					element['awayPer'] = (element.away / (element.home + element.away)) * 100
				} else {
					element['homePer'] = 0
					element['awayPer'] = 0
				}
				if (element.type === 3 || element.type === 4) {
					if (element.home > element.away) {
						element['homeGood'] = false
					} else {
						element['homeGood'] = true
					}
				} else {
					if (element.home > element.away) {
						element['homeGood'] = true
					} else {
						element['homeGood'] = false
					}
				}
			},
			setChildSort(element) {
				// if(element.home) element.home = Number(element.home)
				// else element.home = Number(0)
				// if(element.away) element.away = Number(element.away)
				// else element.away = Number(0)
				switch (element.type) {
					case 25:
						element['typeName'] = 'Possession Percentage'
						element['order'] = 1
						this.setPercent(element)
						break
					case 21:
						element['typeName'] = 'Shots on Target'
						element['order'] = 2
						this.setPercent(element)
						break
					case 22:
						element['typeName'] = 'Shots off Target'
						element['order'] = 3
						this.setPercent(element)
						break
					case 8:
						element['typeName'] = 'Penalty'
						element['order'] = 4
						this.setPercent(element)
						break
					case 23:
						element['typeName'] = 'Attack'
						element['order'] = 5
						this.setPercent(element)
						break
					case 24:
						element['typeName'] = 'Dangerous Attack'
						element['order'] = 6
						this.setPercent(element)
						break
					case 2:
						element['typeName'] = 'Corner'
						element['order'] = 7
						this.setPercent(element)
						break
					case 3:
						element['typeName'] = 'Yellow Card'
						element['order'] = 8
						this.setPercent(element)
						break
					case 4:
						element['typeName'] = 'Red Card'
						element['order'] = 9
						this.setPercent(element)
						break
				}
			},
		},
		created() {
			this.getMatchData()
			this.connectMsg()
		},
		computed: {
			tliveScript: function () {
				/* 文字直播（所有）处理成timeline渲染形式 */
				let arr = []
				let tmp = {
					time: null,
				}
				console.log('arr', this.pay)
				if (this.pay.length === 0) {
					return arr
				}
				this.pay[0].tlive.forEach((ele) => {
					if (ele.time !== tmp.time) {
						let timeItem = {
							time: ele.time,
							events: [ele],
						}
						arr.unshift(timeItem)
						tmp.time = ele.time
					} else {
						arr[0].events.unshift(ele)
					}
				})

				console.log('arr', arr)
				return arr
			},
			mainScript: function () {
				/* 文字直播（重要）处理成timeline-center渲染形式 */
				let mainArr = []
				let arr = []
				let tmp = {
					time: null,
				}
				console.log('arr', this.pay)
				if (this.pay.length === 0) {
					return arr
				}
				this.pay[0].tlive.forEach((ele) => {
					if (ele.main === 1) {
						mainArr.push(ele)
					}
				})

				mainArr.forEach((ele) => {
					if (ele.time !== tmp.time) {
						let timeItem = {
							time: ele.time,
							events: [ele],
						}
						arr.unshift(timeItem)
						tmp.time = ele.time
					} else {
						arr[0].events.unshift(ele)
					}
				})

				console.log('arr', arr)
				return arr
			},
		},
	}
</script>

<style lang="scss">
	.line {
		margin-top: 20rpx;
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
