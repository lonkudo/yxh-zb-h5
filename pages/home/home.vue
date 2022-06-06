<template>
	<view class="flex flex-direction">
		<search-header class="top"></search-header>
		<scroll-view scroll-y="true" class="middle b-f6">
			<recommend-slider></recommend-slider>
			<system-informs-slider :noticeList="noticeList"></system-informs-slider>
			<home-title :title="'Popular game'"></home-title>
			<popular-game :pdata="scheduleList"></popular-game>
			<home-title :title="'Live'"></home-title>
			<live :liveList="liveList"></live>
			<home-title :title="'Videos'"></home-title>
			<videos :videoList="videoList"></videos>
			<home-title :title="'Sport news'"></home-title>
			<news :newsList="newsList"></news>
		</scroll-view>
	</view>
</template>

<script>
	import SearchHeader from './home/SearchHeader/index.vue'
	import RecommendSlider from './home/RecommendSlider/RecommendSlider.vue'
	import SystemInformsSlider from './home/SystemInformsSlider/SystemInformsSlider.vue'
	import PopularGame from './home/PopularGame/PopularGame.vue'
	import Live from './home/Live/Live.vue'
	import Videos from './home/Videos/Videos.vue'
	import News from './home/News/News.vue'
	import HomeTitle from './home/HomeTitle/HomeTitle.vue'

	import { getHomeIndex } from '@/api/home'

	export default {
		components: {
			SearchHeader,
			RecommendSlider,
			SystemInformsSlider,
			PopularGame,
			Live,
			Videos,
			News,
			HomeTitle,
		},
		data() {
			return {
				noticeList: [],
				newsList: [],
				scheduleList: [],
				liveList: [],
				videoList: [],
			}
		},
		created() {
			this.getHomeIndex()
		},
		methods: {
			call() {
				console.log('call')
			},
			getHomeIndex() {
				getHomeIndex(
					1,
					20,
					uni.getStorageSync('uid'),
					uni.getStorageSync('token')
				).then((res) => {
					if (res.info.notice.length > 0) {
						const info = res.info
						this.noticeList = info.notice
						this.newsList = info.news.splice(1, 10)
						this.scheduleList = info.schedule
						this.liveList = info.live
						this.videoList = info.video
						let topics = []
						// 获取订阅者id
						this.scheduleList.forEach((element) => {
							if (element.status_id > 1 && element.status_id < 9) {
								topics.push(element.id)
							}
						})
						if (topics.length > 0)
							this.connectMqtt(
								this.$store.state.settings.siteInfo.mqttwsserver,
								'',
								'',
								true,
								// id 保证唯一
								'mqtitId-Home' + Math.random() * 1000,
								topics
							)
					}
				})
			},
		},
	}
</script>

<style lang="scss">
	.top {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}
	.middle {
		position: fixed;
		top: 90rpx;
		left: 0;
		right: 0;
		bottom: 100rpx;
		.slider {
		}
	}
</style>
