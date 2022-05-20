<template>
	<view class=""> </view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				form: {
					name: '',
				},
				rules: {},
			}
		},
		methods: {},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {},
	}
</script>
