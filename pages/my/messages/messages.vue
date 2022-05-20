<template>
	<view class="b-f padding-xs">
		<view
			@tap="go(item.name)"
			class="flex align-center"
			v-for="(item, index) in menuList"
			:key="index"
		>
			<view
				:class="[
					'ava-80 flex align-center justify-center margin-xs',
					item.iconBgColor,
				]"
				><text :class="['iconfont fs-40', item.icon]"></text
			></view>
			<text>{{ item.label }}</text>
			<text class="iconfont icon-right margin-left-auto fc-b-9"></text>
		</view>
		<u-button @click="submit" class="margin-left-lg margin-right-lg"
			>submit</u-button
		>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuList: [
					{
						name: 'comments',
						label: 'Comments',
						icon: 'icon-pinglun',
						iconBgColor: 'bg-green',
					},
					{
						name: 'likes',
						label: 'Likes',
						icon: 'icon-dianzan',
						iconBgColor: 'bg-orange',
					},
					{
						name: 'systemMsgs',
						label: 'System Messages',
						icon: 'icon-lingdang1',
						iconBgColor: 'bg-red',
					},
				],
			}
		},
		methods: {
			go(val) {
				uni.navigateTo({
					url: val,
				})
			},
		},
	}
</script>

<style lang="scss"></style>
