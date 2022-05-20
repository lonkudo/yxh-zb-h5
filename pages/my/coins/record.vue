<template>
	<scroll-view scroll-y="true">
		<view class="b-f">
			<template v-if="goldLogs.length > 0">
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
			</template>
			<template v-else>
				<no-content></no-content>
			</template>
		</view>
	</scroll-view>
</template>

<script>
	import { goldLog } from '@/api/my'
	import NoContent from '../../../components/NoContent/NoContent.vue'
	export default {
		components: { NoContent },
		data() {
			return {
				goldLogs: [],
			}
		},
		onLoad() {
			this.getGoldLog()
		},
		methods: {
			getGoldLog() {
				goldLog({ uid: this.uid, token: this.token })
					.then((res) => {
						this.goldLogs = res.info
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
