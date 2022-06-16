<template>
	<view class="margin-xs" @tap="go">
		<image-info :img="videoInfo.thumb" :showIcon="true">
			<text slot="top">{{ videoInfo.title }}</text>
			<text slot="bottom">{{
				videoInfo.addtime | formatGiven('yyyy-MM-dd hh:ss')
			}}</text>
		</image-info>
	</view>
</template>

<script>
	export default {
		name: 'VideoItem',
		props: ['videoInfo'],
		mouted() {},
		data() {
			return {}
		},
		methods: {
			go() {
				uni.navigateTo({
					url: '/pages/discover/detail/videoDetail?id=' + this.videoInfo.id,
				})
			},
		},
	}
</script>

<style lang="scss"></style>
