<template>
	<view>
		<exp-header></exp-header>
		<card-con class="flex flex-direction">
			<navigator
				url=""
				v-for="(item, index) in menuList"
				:key="index"
				:url="item.url"
			>
				<view class="flex align-center justify-between margin-sm fs-24">
					<text>{{ item.label }}</text>
					<text class="iconfont icon-right fc-b-9"></text>
				</view>
			</navigator>
		</card-con>
		<view
			class="logout-btn flex align-center b-f margin-xs justify-center fc-b-3 fs-24"
			@tap="logOut"
		>
			<text class="fc-b-3">Logout</text>
		</view>
	</view>
</template>

<script>
	import ExpHeader from './my/ExpHeader/ExpHeader.vue'

	export default {
		data() {
			return {
				menuList: [
					{ name: 'task', label: 'Task Center', url: 'coins/coins' },
					{ name: 'collection', label: 'Collection', url: 'collection/collection' },
					{ name: 'apply', label: 'Apply for the Host', url: 'apply/apply' },
					{ name: 'feedback', label: 'Feedback', url: 'feedback/feedback' },
					{ name: 'messages', label: 'Messages', url: 'messages/messages' },
					{ name: 'report', label: 'Report', url: 'report/report' },
					{ name: 'About', label: 'about', url: 'about/about' },
				],
			}
		},
		computed: {},
		components: {
			ExpHeader,
		},
		created() {},
		computed: {
			token: function () {
				return this.$store.state.user.token || ''
			},
			uid: function () {
				return this.$store.state.user.uid || ''
			},
		},
		methods: {
			go() {
				console.log('go')
				uni.navigateTo({
					url: 'coins',
				})
			},
			logOut() {
				this.$store
					.dispatch('LogOut', { token: this.token, uid: this.uid })
					.then((res) => {})
			},
		},
	}
</script>

<style lang="scss">
	.logout-btn {
		height: 80rpx;
		border-radius: 80rpx;
		width: 730rpx;
		position: fixed;
		bottom: 120rpx;
	}
</style>
