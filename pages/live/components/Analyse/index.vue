<template>
	<scroll-view
		scroll-y
		:id="'content-wrap' + 'Analyse'"
		:style="{ height: myHeight + 'rpx' }"
	>
		<weather :game_id="game_id"></weather>
		<battle-of-them
			:game_id="game_id"
			@receiveInfo="receiveInfo"
		></battle-of-them>
		<template v-if="!this.isEmpty(teamInfo)">
			<league-stand :game_id="game_id" :teamInfo="teamInfo"></league-stand>
			<battle-record :game_id="game_id"></battle-record>
			<future-games :game_id="game_id"></future-games>
		</template>
		<template v-else>loading</template>
	</scroll-view>
</template>

<script>
	import Weather from './Weather.vue'
	import BattleOfThem from './BattleOfThem.vue'
	import LeagueStand from './LeagueStand.vue'
	import BattleRecord from './BattleRecord.vue'
	import FutureGames from './FutureGames.vue'
	export default {
		name: 'Analyse',
		components: { Weather, BattleOfThem, LeagueStand, BattleRecord, FutureGames },
		props: ['myHeight', 'game_id'],
		data() {
			return {
				teamInfo: {},
			}
		},
		computed: {},
		created() {},
		methods: {
			receiveInfo(val) {
				console.log('val', val)
				console.log('---1----1----1----1----1---')
				this.teamInfo = val
			},
		},
	}
</script>

<style>
	#weather-board {
		background-size: 100% 100%;
	}
</style>
