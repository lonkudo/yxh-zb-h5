<template>
	<view
		class="search-host-item margin-xs br-5 b-f padding-sm flex justify-between align-center"
	>
		<view class="flex">
			<image :src="hostInfo.avatar" mode="" />
			<view class="flex flex-direction justify-between margin-sm">
				<text class="fs-22 fc-b-3">{{ hostInfo.user_nicename }}</text>
				<text class="fs-18 fc-b-9">Number of fans: {{ hostInfo.fans }}</text>
			</view>
		</view>
		<my-button :text="'Follow'" :falseText="'Followed'"></my-button>
	</view>
</template>

<script>
	import MyButton from '@/components/MyButton/MyButton.vue'
	export default {
		name: 'SearchHostItem',
		props: ['hostInfo'],
		components: {
			MyButton,
		},
		data() {
			return {}
		},
	}
</script>

<style lang="scss">
	.search-host-item {
		image {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
		}
	}
</style>
