<template>
	<view>
		<image-info
			:img="videoInfo.thumb"
			:border="'top'"
			:showIcon="true"
			@onTap="go(videoInfo)"
		>
			<text slot="top">{{ videoInfo.title }}</text>
			<text slot="bottom">{{
				videoInfo.addtime | formatGiven('yyyy-MM-dd hh:ss')
			}}</text>
		</image-info>
		<view
			class="margin-top-sm margin-bottom-sm flex align-center justify-between"
		>
			<image-left
				:img="videoInfo.userinfo.avatar"
				:top="videoInfo.userinfo.user_nicename"
				:width="400"
			></image-left>
			<text class="fc-b-9 fs-18">Amount of Play: {{ videoInfo.views }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'DiscoverVideoItem',
		props: ['videoInfo'],
		data() {
			return {}
		},
		methods: {
			go(info) {
				uni.navigateTo({
					url: 'detail/videoDetail?id=' + info.id,
				})
				console.log('info', info)
			},
		},
	}
</script>

<style lang="scss"></style>
