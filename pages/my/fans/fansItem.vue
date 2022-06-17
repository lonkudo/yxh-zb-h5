<template>
	<view
		class="margin-left-xs margin-right-xs margin-top-xs br-8 b-f flex align-center justify-between padding-sm"
	>
		<image-left
			:img="item.avatar"
			:top="item.user_nicename"
			:down="'Number of fans:' + item.fans"
			:size="100"
			:pad="10"
			:width="400"
		></image-left>
		<my-button
			:text="'Follow'"
			:falseText="'Followed'"
			mana
			:initActive="toNum(item.is_attention) === 0"
			@onTap="btnTap"
		></my-button>
	</view>
</template>

<script>
	import MyButton from '@/components/MyButton/MyButton.vue'
	export default {
		components: { MyButton },
		props: ['item'],
		name: 'FansItem',
		methods: {
			btnTap: function () {
				this.$emit('onTap')
			},
		},
	}
</script>

<style></style>
