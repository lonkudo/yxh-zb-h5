<template>
	<scroll-view scroll-y="" :id="'content-wrap' + 'Analyse'">
		<weather :game_id="game_id"></weather>
	</scroll-view>
</template>

<script>
	import {
		getBattleHistory,
		getPointsRecord,
		getFutureGames,
		getBattleHistoryOfThem,
	} from '@/api/live'
	import Weather from './Weather.vue'
	export default {
		name: 'Analyse',
		components: { Weather },
		props: ['myHeight', 'game_id'],
		data() {
			return {
				battleObj: {}, // 对战历史
				battleOfThemList: [], // 对战历史
				pointObj: {}, // 积分近况
				futureObj: {}, // 未来比赛
			}
		},
		computed: {
			weatherImgUrl: function () {
				if (JSON.stringify(this.env) === '{}') return this.weatherPic[4].pic
				let index = 0
				if (this.env.weather === 0) {
					return this.weatherPic[0].pic
				} else {
					index = this.env.weather - 1
					return this.weatherPic[index].pic
				}
			},
			weatherName: function () {
				if (JSON.stringify(this.env) === '{}') return this.weatherPic[0].name
				let index = 0
				if (this.env.weather === 0) {
					return 'no info'
				} else {
					index = this.env.weather - 1
					return this.weatherPic[index].name
				}
			},
		},
		created() {
			this.getBattleHistory(this.game_id) // 获取到数据以后初始化对战历史
			this.getPointsRecord(this.game_id)
			this.getFutureGames(this.game_id)
			this.getBattleHistoryOfThem(this.game_id) // 获取到数据以后初始化对战历史
			this.getWeather(this.game_id) // 获取天气
		},
		methods: {
			getBattleHistoryOfThem(match_id) {
				getBattleHistoryOfThem({ match_id })
					.then((res) => {
						console.log('his', res)
						this.battleOfThemList = res.info.list
						// console.log("this.battleOfThemList", this.battleOfThemList);
					})
					.catch((err) => {
						console.log(err)
					})
			},
			getPointsRecord(match_id) {
				getPointsRecord({ match_id })
					.then((res) => {
						this.pointObj = res.info
					})
					.catch((err) => {
						console.log(err)
					})
			},
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
			getBattleHistory(match_id) {
				getBattleHistory({ match_id })
					.then((res) => {
						this.battleObj = res.info
					})
					.catch((err) => {
						console.log(err)
					})
			},
			getWeather(match_id) {
				getWeather({ match_id })
					.then((res) => {
						this.env = res.info
					})
					.catch((err) => {
						console.log(err)
					})
			},
		},
	}
</script>

<style>
	#weather-board {
		background-size: 100% 100%;
	}
</style>
