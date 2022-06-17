<template>
	<view class="wrapper">
		<image
			v-show="imgLoaded"
			:src="src"
			:mode="mode"
			@error="onErrorImg()"
			@load="onSuccessImg()"
			class="w100 h100"
		/>
		<image v-show="!imgLoaded" :src="loadingPic" :mode="mode" class="w100 h100" />
	</view>
</template>

<script>
	// 使用的时候直接在外面指定my-image组件宽高

	export default {
		name: 'MyImage',
		props: {
			mode: {
				type: String,
				default: 'aspectFill',
			},
			src: {
				type: String,
				default: '/static/styles/logo/loading_logo.png',
			},
			loadingPic: {
				type: String,
				default: '/static/styles/logo/loading_logo.png',
			},
		},
		data() {
			return {
				imgLoaded: false,
			}
		},
		methods: {
			onSuccessImg(item) {
				this.imgLoaded = true
			},
			onErrorImg(item) {
				this.imgLoaded = false
			},
		},
	}
</script>

<style lang="scss">
	.wrapper {
		overflow: hidden;
	}
</style>
