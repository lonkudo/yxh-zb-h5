<template>
	<view class="flex flex-direction">
		<view class="padding-sm b-f6">Weather</view>
		<view
			class="padding-left-sm padding-right-sm b-f flex justify-between padding-top-sm padding-bottom-sm p-r"
			id="weather-board"
		>
			<image
				:src="weatherImgUrl"
				mode="aspectFill"
				class="w100 h100 p-a top-0 left-0"
				style="z-index: 1"
			/>
			<view class="flex flex-direction w-400 f-hide" style="z-index: 2">
				<view class="flex justify-between align-center margin-xs">
					<text class="fc-b-f fs-20 fs-shadow">Referee:</text>
					<text class="fc-b-f fs-20 fs-shadow">{{
						env.referee === '' ? 'No Info' : env.referee
					}}</text>
				</view>
				<view class="flex justify-between align-center margin-xs">
					<text class="fc-b-f fs-20 fs-shadow">Air Pressure:</text>
					<text class="fc-b-f fs-20 fs-shadow">{{
						env.pressure === '' ? 'no info' : env.pressure
					}}</text>
				</view>
				<view class="flex justify-between align-center margin-xs">
					<text class="fc-b-f fs-20 fs-shadow">Weather:</text>
					<text class="fc-b-f fs-20 fs-shadow">{{ weatherName }}</text>
				</view>
				<view class="flex justify-between align-center margin-xs">
					<text class="fc-b-f fs-20 fs-shadow">Venue:</text>
					<text class="fc-b-f fs-20 fs-shadow">{{
						env.venue === '' ? 'no info' : env.venue
					}}</text>
				</view>
			</view>
			<view class="flex flex-direction w-400 f-hide" style="z-index: 2">
				<view class="flex justify-between align-center margin-xs">
					<text class="fc-b-f fs-20 fs-shadow">Wind Speed:</text>
					<text class="fc-b-f fs-20 fs-shadow">{{
						env.wind === '' ? 'no info' : env.wind
					}}</text>
				</view>
				<view class="flex justify-between align-center margin-xs">
					<text class="fc-b-f fs-20 fs-shadow">Humidity:</text>
					<text class="fc-b-f fs-20 fs-shadow">{{
						env.humidity === '' ? 'no info' : env.humidity
					}}</text>
				</view>
				<view class="flex justify-between align-center margin-xs">
					<text class="fc-b-f fs-20 fs-shadow">Temperatrue:</text>
					<text class="fc-b-f fs-20 fs-shadow">{{
						env.temperature === '' ? 'no info' : env.temperature
					}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let weatherPics = [
		{
			name: 'Partly cloudy',
			pic: '/static/styles/png/weather-cloudy.png',
		},
		{ name: 'Cloudy', pic: '/static/styles/png/weather-cloudy.png' },
		{
			name: 'Partly cloudy/rain',
			pic: '/static/styles/png/weather-raining.png',
		},
		{ name: 'Snow', pic: '/static/styles/png/weather-snowy.png' },
		{ name: 'Sunny', pic: '/static/styles/png/weather-sunny.png' },
		{
			name: 'Overcast with rain/partial thunderstorm',
			pic: '/static/styles/png/weather-thunder.png',
		},
		{ name: 'Overcast', pic: '/static/styles/png/weather-raining.png' },
		{ name: 'Misty', pic: '/static/styles/png/weather-foggy.png' },
		{
			name: 'Overcast and rainy',
			pic: '/static/styles/png/weather-drizzle.png',
		},
		{
			name: 'Cloudy with rain',
			pic: '/static/styles/png/weather-drizzle.png',
		},
		{
			name: 'Cloudy with rain/partial thunderstorm',
			pic: '/static/styles/png/weather-raining.png',
		},
		{
			name: 'Partial cloud/rain and thunderstorm',
			pic: '/static/styles/png/weather-raining.png',
		},
		{ name: 'Fog', pic: '/static/styles/png/weather-foggy.png' },
	]

	import { getWeather } from '@/api/live'
	export default {
		name: 'Weather',
		props: ['game_id'],
		data() {
			return {
				env: {},
				weatherPic: weatherPics,
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
			this.getWeather(this.game_id) // 获取天气
		},
		methods: {
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
