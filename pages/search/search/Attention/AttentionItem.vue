<template>
	<view
		class="attention-item b-f br-5 flex flex-direction align-center margin-xs padding-sm justify-between"
	>
		<image :src="attentionInfo.avatar" mode="" />
		<text class="f-hide fc-b-6 fs-24 w-200 f-center">
			{{ attentionInfo.user_nicename }}</text
		>
		<my-button
			:text="'Follow'"
			:falseText="'Followed'"
			mana
			:initActive="toNum(attentionInfo.is_attention) === 0"
			@onTap="follow(attentionInfo)"
		></my-button>
	</view>
</template>

<script>
	import MyButton from '@/components/MyButton/MyButton.vue'
	import { setAttent } from '@/api/live'
	import check from '@/utils/check'

	export default {
		name: 'AttentionItem',
		components: {
			MyButton,
		},
		props: ['attentionInfo'],
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
	.attention-item {
		width: 228rpx;
		height: 220rpx;
		image {
			width: 88rpx;
			height: 88rpx;
			border-radius: 50%;
		}
	}
</style>
