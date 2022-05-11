<template>
	<view>
		<scroll-view scroll-y="true" class="middle">
			<discover-video></discover-video>
			<news></news>
		</scroll-view>
	</view>
</template>

<script>
	import DiscoverVideo from '@/components/DiscoverVideo/DiscoverVideo.vue'
	import News from '../../components/News/News.vue'
	export default {
		components: {
			DiscoverVideo,
			News,
		},
		data() {
			return {
				menu: [{ name: 'Video' }, { name: 'News' }],
				newsMenu: [
					{ name: 'All' },
					{ name: 'Journey' },
					{ name: 'Work' },
					{ name: 'Bonus' },
					{ name: 'Sexy-girl' },
					{ name: 'Self-made' },
					{ name: '	Journey' },
					{ name: 'Date' },
				],
				videoMenu: [
					{ name: 'All' },
					{ name: 'Journey' },
					{ name: 'Work' },
					{ name: 'Bonus' },
					{ name: 'Sexy-girl' },
					{ name: 'Self-made' },
					{ name: '	Journey' },
					{ name: 'Date' },
				],
			}
		},
	}
</script>

<style lang="scss">
	.middle {
		position: fixed;
		top: 176rpx;
		bottom: 100rpx;
		left: 0;
		right: 0;
	}
</style>
