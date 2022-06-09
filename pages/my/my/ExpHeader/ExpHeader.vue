<template>
	<view>
		<view class="margin-xs b-f br-8 padding-sm">
			<view class="flex align-start flex-direction">
				<view class="flex align-center">
					<image
						@tap="go('modify')"
						class="ava-112"
						:src="userInfo.avatar || require('@/static/styles/png/avatar.png')"
						mode=""
					/>
					<view class="flex flex-direction margin-left-sm">
						<text class="fs-36">{{ userInfo.user_nicename || 'Please login' }}</text>
						<level class=""></level>
					</view>
				</view>
				<view class="flex align-center justify-around w100">
					<view class="flex flex-direction margin-top-lg align-center">
						<text class="margin-bottom-xs fs-24 fc-b-9">Coins</text>
						<text class="fs-24 fc-b-3 fw-6">{{ userInfo.coin || '0' }}</text>
					</view>
					<view class="flex flex-direction margin-top-lg align-center">
						<text class="margin-bottom-xs fs-24 fc-b-9">Followed</text>
						<text class="fs-24 fc-b-3 fw-6">{{ userInfo.follows || '0' }}</text>
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
		computed: {},
		created() {
			console.log('this aaa', JSON.stringify(this.$store.state))
		},
		methods: {
			go(val) {
				this.guard()
				if (this.isEmpty(this.uid)) return
				switch (val) {
					case 'modify':
						uni.navigateTo({
							url: '/pages/my/modify/modify',
						})
						break
					default:
						break
				}
			},
			logOut() {
				this.$store
					.dispatch('LogOut', { token: this.token, uid: this.uid })
					.then((res) => {
						this.clearData()
					})
			},
		},
	}
</script>

<style lang="scss"></style>
