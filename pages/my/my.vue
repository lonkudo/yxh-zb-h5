<template>
	<view>
		<exp-header></exp-header>
		<card-con class="flex flex-direction">
			<view
				v-for="(item, index) in menuList"
				:key="index"
				class="flex align-center justify-between margin-sm fs-24"
			>
				<text>{{ item.label }}</text>
				<text class="iconfont icon-right fc-b-9"></text>
			</view>
		</card-con>
		<view
			class="logout-btn flex align-center b-f margin-xs justify-center fc-b-3 fs-24"
		>
			<text class="fc-b-3">Logout</text>
		</view>
	</view>
</template>

<script>
	import ExpHeader from './my/ExpHeader/ExpHeader.vue'
	// import MyNavigator from './components/MyNavigator.vue'

	export default {
		data() {
			return {
				menuList: [
					{ name: 'task', label: 'Task Center' },
					{ name: 'collection', label: 'Collection' },
					{ name: 'apply', label: 'Apply for the Host' },
					{ name: 'feedback', label: 'Feedback' },
					{ name: 'messages', label: 'Messages' },
					{ name: 'report', label: 'Report' },
					{ name: 'About', label: 'about' },
				],
			}
		},
		components: {
			ExpHeader,
			// MyNavigator,
		},
		created() {
			this.testPost()
			// this.$http({})
		},
		computed: {},
		methods: {
			testGet() {
				uni.request({
					url: '/appapi/?service=Discover.GetNewsList', //仅为示例，并非真实接口地址。
					method: 'GET',
					data: {
						p: 1,
						num: 20,
						// type: 3,
						// time: 20220512,
						// compe_id: ['429', '1716', '2798'],
						uid: 321,
						lan: 1,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
					},
					success: (res) => {
						console.log(res)
						this.text = 'request success'
					},
					sslVerify: false,
				})
			},
			testPost() {
				uni.request({
					url: '/appapi/?service=Match.Index', //仅为示例，并非真实接口地址。
					method: 'POST',
					data: {
						p: 1,
						num: 20,
						type: 3,
						time: 20220512,
						compe_id: ['429', '1716', '2798'],
						uid: 321,
						lan: 1,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
					},
					success: (res) => {
						console.log(res)
						this.text = 'request success'
					},
					sslVerify: false,
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
