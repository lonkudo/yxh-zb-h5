<template>
	<view class="flex flex-direction">
		<view class="padding-sm b-f6">Future Games</view>
		<view
			class="padding-left-sm padding-right-sm b-f flex justify-between padding-top-sm padding-bottom-sm p-r"
		>
		</view>
	</view>
</template>

<script>
	import { getFutureGames } from '@/api/live'
	export default {
		name: 'FutureGames',
		props: ['game_id'],
		data() {
			return {
				futureObj: {}, // 未来比赛
			}
		},
		created() {
			this.getFutureGames(this.game_id)
		},
		methods: {
			getFutureGames(match_id) {
				getFutureGames({ match_id })
					.then((res) => {
						// console.log('this.pppp.future', res)
						this.futureObj = res.info
						// console.log('this.potinList.future', this.futureObj)
					})
					.catch((err) => {
						console.log(err)
					})
			},
		},
	}
</script>

<style></style>
