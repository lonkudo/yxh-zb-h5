<template>
	<!-- 直播列表，单独页面  -->
	<scroll-view scroll-y :style="{ height: myHeight + 'rpx' }">
		<view>
			<live :liveList="liveList"></live>
		</view>
	</scroll-view>
</template>

<script>
	import { getListByType } from '@/api/live'
	import Live from '@/pages/home/home/Live/Live.vue'

	export default {
		components: {
			Live,
		},
		data() {
			return { liveList: [], myHeight: 0 }
		},
		onLoad() {
			this.myHeight = this.initScrollHeight(0)
			this.getListByType({ p: 1 })
		},
		methods: {
			getListByType({ p = 1, game_type = '', version = 1 } = {}) {
				getListByType({ p, game_type, version })
					.then((res) => {
						if (res.code === 0) {
							this.liveList = res.info.list.splice(0, 7)
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
		},
	}
</script>

<style lang="scss"></style>
