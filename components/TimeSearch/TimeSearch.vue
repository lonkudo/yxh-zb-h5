<template>
	<view class="flex align-center justify-around h-80 b-f">
		<view
			:class="[
				'flex flex-direction fc-b-9 align-center',
				item.isActive ? 'active' : 'in-active',
			]"
			v-for="(item, index) in datelist"
			:key="index"
			@tap="choose(index)"
		>
			<template v-if="item.isToday">
				<text class="fs-20">Today</text>
			</template>
			<template v-else>
				<text class="fs-28">{{ item.date }}</text>
				<text class="fs-20">{{ item.dateW }}</text>
			</template>
		</view>
		<view @click="show = true">
			<text class="iconfont icon-rili fc-g"></text>
		</view>
		<my-calendar v-model="show" :mode="mode" @change="change"></my-calendar>
	</view>
</template>

<script>
	import moment from 'moment'
	import MyCalendar from '@/components/my-calendar/my-calendar.vue'

	export default {
		name: 'TimeSearch',
		components: { MyCalendar },
		data() {
			return {
				datelist: [],
				curDate: '',
				show: false,
				mode: 'date',
				today: '',
			}
		},
		created() {
			this.curDate = this.formatGiven(new Date(), 'yyyy-MM-dd')
			this.today = this.formatGiven(new Date(), 'yyyy-MM-dd')
			this.getList(this.curDate)
		},
		methods: {
			choose(index) {
				/* 点击列表日期 */
				this.datelist.forEach((ele) => {
					ele.isActive = false
				})
				this.datelist[index].isActive = true
				this.curDate = this.datelist.dateA
			},
			change(args) {
				/* 日期列表更换 */
				this.curDate = args.result
				this.getList(this.curDate)
			},
			getList(val) {
				/* 获取日期列表 */
				this.datelist = []
				for (var i = 0; i < 7; i++) {
					let dateW = this.getWeek(i, val)
					let item = {
						date: moment(val)
							.subtract(0 + i, 'days') // subtract 就是通过减去i 来获取新的moment()  .format就是格式化数据.
							.format('M-D'),
						dateA: moment(val)
							.subtract(0 + i, 'days')
							.format('YYYY-MM-DD'),
						dateW: dateW,
						// dateFull: moment(val)
						// 	.subtract(0 + i, 'days')
						// 	.format('YYYY-MM-DD (dddd)'),
						dateWanted: moment(val)
							.subtract(0 + i, 'days')
							.format('YYYYMMDD'),
						index: i,
						isActive: false,
					}
					if (item.dateA === this.today) {
						item.isToday = true
					} else {
						item.isToday = false
					}
					if (item.dateA === this.curDate) {
						item.isActive = true
					} else {
						item.isActive = false
					}
					console.log('item', item, this.today)
					this.datelist.unshift(item)
				}
			},
			getWeek(i, val) {
				let week = moment(val)
					.subtract(0 + i, 'days')
					.format('e')
				switch (week) {
					case '1':
						return 'MON'
					case '2':
						return 'TUE'
					case '3':
						return 'WED'
					case '4':
						return 'THU'
					case '5':
						return 'FRI'
					case '6':
						return 'SAT'
					case '0':
						return 'SUN'
				}
			},
		},
	}
</script>

<style>
	.active {
		color: #02b875 !important;
	}
	.in-active {
		color: #999 !important;
	}
</style>
