<template>
	<scroll-view
		scroll-y
		:id="'content-wrap' + 'Contribution'"
		:style="{ height: myHeight + 'rpx' }"
	>
		<template v-if="phblist.length > 0">
			<view
				v-for="(item, index) in phblist"
				:key="index"
				class="flex align-center justify-start b-f margin-xs br-8 padding-sm"
			>
				<view
					:class="[
						'margin-right-sm br-8 b-f6 w-40 h-40 flex align-center justify-center',
						myBg(index),
					]"
					><text class="fs-20 fc-b-f">{{ index + 1 }}</text></view
				>
				<image :src="item.user.avatar" mode="" class="ava-80" />
				<text class="margin-left-sm fw-6">{{ item.user.user_nicename }}</text>
				<text class="margin-left-auto">{{ item.total }}</text>
			</view>
		</template>
		<template v-else>
			<no-content :height="myHeight"> No one contributes yet </no-content>
		</template>
	</scroll-view>
</template>

<script>
	import { getRankList } from '@/api/live'
	import NoContent from '../../../components/NoContent/NoContent.vue'
	export default {
		components: { NoContent },
		props: ['myHeight', 'stream'],
		data() {
			return {
				phblist: [],
			}
		},
		created() {
			this.getRankList()
		},
		methods: {
			getRankList() {
				getRankList(this.stream).then((res) => {
					if (res.code == 0) {
						console.log('---1----1----1----1----1---')
						console.log('---22----22----22----22----22---')

						this.phblist = res.info
					}
				})
			},
			myBg: function (val) {
				switch (val) {
					case 0:
						return 'bg-red'
						break
					case 1:
						return 'bg-orange'
						break
					case 2:
						return 'bg-gold'
						break
					default:
						return 'bg-grey'
						break
				}
			},
		},
	}
</script>

<style></style>
