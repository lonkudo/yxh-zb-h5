<template>
	<view>
		<img :src="anchorInfo.avatar" alt="">
		<text>{{anchorInfo.name}}</text>
	</view>
</template>

<script>
	export default {
		name:"Anchor",
		data() {
			return {
				anchorInfo: {
					avatar: require('@/static/logo.png'),
					name: 'ewqeqw'
				}
			};
		}
	}
</script>

<style lang="scss">

</style>