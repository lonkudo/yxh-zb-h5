<template>
	<view>
		<exp-header></exp-header>
		<card-con class="flex flex-direction">
			<view
				class="flex align-center justify-between margin-sm fs-24"
				v-for="(item, index) in menuList"
				:key="index"
				@tap="go(item.url)"
			>
				<text>{{ item.label }}</text>
				<text class="iconfont icon-right fc-b-9"></text>
			</view>
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
	import { checkIsAnchor } from '@/api/my'

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
					{ name: 'about', label: 'About', url: 'about/about' },
				],
			}
		},
		onLoad() {
			console.log('scrollHeight', this.initScrollHeight(0))
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
			go(val) {
				if (this.isEmpty(this.token)) {
					uni.navigateTo({
						url: '/pages/login/login',
					})
				} else {
					if (val === 'apply/apply') {
						this.checkIsAnchor()
					} else {
						uni.navigateTo({
							url: '/pages/my/' + val,
						})
					}
				}
			},
			logOut() {
				this.$store
					.dispatch('LogOut', { token: this.token, uid: this.uid })
					.then((res) => {})
			},

			checkIsAnchor() {
				checkIsAnchor(this.uid, this.token)
					.then((res) => {
						console.log('this', res.info.status)
						let ret = this.toNum(res.info.status)
						switch (ret) {
							case -1:
								uni.navigateTo({
									url: '/pages/my/' + 'apply/apply',
								})
								break
							case 0:
								console.log('nav')
								uni.navigateTo({
									url: '/pages/my/' + 'apply/waiting',
								})
								break
							case 1:
								uni.navigateTo({
									url: '/pages/my/' + 'apply/success',
								})
								break
							case 2:
								uni.navigateTo({
									url: '/pages/my/' + 'apply/fail' + '?msg=' + res.info.msg,
								})
								break
							default:
								break
						}
					})
					.catch((err) => {
						console.log(err)
					})
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
