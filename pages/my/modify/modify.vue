<template>
	<view class="flex flex-direction b-f padding-sm">
		<view class="flex align-center justify-between h-100">
			<view>
				<text>Head Portrait</text>
			</view>
			<view class="flex align-center">
				<view class="margin-right-sm">
					<image :src="userInfo.avatar" class="ava-80" mode="" />
				</view>
				<text class="iconfont icon-right"></text>
			</view>
		</view>
		<view class="flex align-center justify-between h-100" @tap="go">
			<view>
				<text>Nickname</text>
			</view>
			<view class="flex align-center">
				<text class="margin-right-sm">{{ userInfo.user_nicename }}</text>
				<text class="iconfont icon-right"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			go() {
				uni.navigateTo({
					url: 'nickname',
				})
			},
		},
	}
</script>

<style lang="scss"></style>
