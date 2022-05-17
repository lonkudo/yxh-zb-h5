<template>
	<view>
		<view class="margin-xs b-f br-8 padding-sm">
			<view class="flex align-start flex-direction">
				<view class="flex align-center">
					<image
						class="ava-112"
						:src="userInfo.avatar || require('@/static/styles/png/avatar.png')"
						mode=""
					/>
					<view class="flex flex-direction margin-left-sm">
						<text class="fs-36">{{ userInfo.user_nicename }}</text>
						<level class=""></level>
					</view>
				</view>
				<view class="flex align-center justify-around w100">
					<view class="flex flex-direction margin-top-lg align-center">
						<text class="margin-bottom-xs fs-24 fc-b-9">Coins</text>
						<text class="fs-24 fc-b-3">{{ userInfo.coin || '0' }}</text>
					</view>
					<view class="flex flex-direction margin-top-lg align-center">
						<text class="margin-bottom-xs fs-24 fc-b-9">Followed</text>
						<text class="fs-24 fc-b-3">{{ userInfo.follows || '0' }}</text>
					</view>
					<view class="flex flex-direction margin-top-lg align-center">
						<text class="margin-bottom-xs fs-24 fc-b-9">Fans</text>
						<text class="fs-24 fc-b-3 fw-6">{{ userInfo.fans || '0' }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Level from '@/components/Level/Level.vue'
	export default {
		name: 'ExpHeader',
		components: {
			Level,
		},
		data() {
			return {}
		},
		computed: {
			userInfo: function () {
				return this.$store.state.user.userinfo || {}
			},
		},
		created() {
			console.log('this aaa', JSON.stringify(this.$store.state))
		},
	}
</script>

<style lang="scss"></style>
