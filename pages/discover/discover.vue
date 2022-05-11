<template>
	<view>
		<my-u-tabs :tabs="menu"></my-u-tabs>
		<my-u-tabs :tabs="newsMenu" :scrollable="true"></my-u-tabs>
		<scroll-view scroll-y="true" class="middle">
			<discover-video></discover-video>
		</scroll-view>
	</view>
</template>

<script>
	import DiscoverVideo from '@/components/DiscoverVideo/DiscoverVideo.vue'
	export default {
		components: {
			DiscoverVideo,
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
