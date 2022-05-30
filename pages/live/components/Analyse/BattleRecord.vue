<template>
	<view class="flex flex-direction">
		<view class="padding-sm b-f6">Record Status</view>
		<view
			class="padding-left-sm padding-right-sm b-f flex justify-between padding-top-sm padding-bottom-sm p-r"
		>
		</view>
	</view>
</template>

<script>
	import { getBattleHistory } from '@/api/live'
	export default {
		name: 'BattleRecord',
		props: ['game_id'],
		data() {
			return {
				battleObj: {}, // 对战历史
			}
		},
		created() {
			this.getBattleHistory(this.game_id) // 获取到数据以后初始化对战历史
		},
		methods: {
			getBattleHistory(match_id) {
				getBattleHistory({ match_id })
					.then((res) => {
						this.battleObj = res.info
					})
					.catch((err) => {
						console.log(err)
					})
			},
		},
	}
</script>

<style></style>
