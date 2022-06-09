<template>
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
								:class="['ava-60 flex align-center justify-center', bgColor(item.type)]"
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
</template>

<script>
	import { goldLog } from '@/api/my'
	import NoContent from '../../../components/NoContent/NoContent.vue'
	export default {
		components: { NoContent },
		data() {
			return {
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
				},
				myHeight: 0,
			}
		},
		onLoad() {
			this.getGoldLog()
			this.myHeight = this.initScrollHeight(0)
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
				goldLog({
					uid: this.uid,
					token: this.token,
					p: this.goldLogsPage.p,
					num: this.goldLogsPage.num,
				})
					.then((res) => {
						this.goldLogs = this.goldLogs.concat(res.info.data)
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
		},
		filters: {
			giftType(val) {
				switch (val) {
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
		},
	}
</script>

<style lang="scss"></style>
