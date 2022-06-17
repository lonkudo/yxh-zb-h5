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

		<my-button
			:text="'Follow'"
			:falseText="'Followed'"
			mana
			:initActive="toNum(hostInfo.is_attention) === 0"
			@onTap="follow(hostInfo)"
		></my-button>
	</view>
</template>

<script>
	import MyButton from '@/components/MyButton/MyButton.vue'
	import { setAttent } from '@/api/live'
	import check from '@/utils/check'
	export default {
		name: 'SearchHostItem',
		props: ['hostInfo'],
		components: {
			MyButton,
		},
		data() {
			return {}
		},
		methods: {
			@check()
			follow(item) {
				const token = this.token
				const uid = this.uid
				setAttent(uid, token, item.id).then((res) => {
					if (res.code === 0) {
						if (res.info.isattent == '1') {
							this.$u.toast('Succeess Follow')
						} else {
							this.$u.toast('Cancel Follow')
						}
						item.is_attention = res.info.isattent
						// item = JSON.parse(JSON.stringify(item))
						// this.getList(this.$store.state.search.keyword);
					}
				})
			},
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
