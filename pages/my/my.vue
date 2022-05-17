<template>
	<view>
		<exp-header></exp-header>
		<card-con class="flex flex-direction">
			<view
				v-for="(item, index) in menuList"
				:key="index"
				class="flex align-center justify-between margin-sm fs-24"
				@tap="go()"
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
		computed: {},
		components: {
			ExpHeader,
		},
		created() {},
		computed: {},
		methods: {
			go() {
				console.log('go')
				uni.navigateTo({
					url: 'coins/coins',
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
