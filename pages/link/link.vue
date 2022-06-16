<template>
	<view class="flex flex-direction align-center justify-center margin-top-lg">
		<!-- <web-view :src="url" v-if="url !== ''" @></web-view> -->
		<!-- <text>link</text> -->
		<!-- <download :icon="'/static/styles/logo/logo_180.png'"></download> -->
		<image :src="downloadUrl" mode="" class="w-200 h-200" />
		<text class="margin-lg">Can't not open this page.</text>
		<text class="w-500 text-center"
			>Please scan the QR code above to download APP.</text
		>
	</view>
</template>

<script>
	// import Download from '@/components/BarCode/Download.vue'
	export default {
		// components: {
		// 	Download,
		// },
		data() {
			return {
				url: '',
				downloadUrl: '',
				isCORS: false, // 可以通过同源策略
			}
		},
		onLoad(options) {
			console.log('options', options.url)
			// 跨域没通过找不到API判断，用正则判断网址又很容易出错，所以干脆直接不显示了。
			this.url = options.url
			this.platformDownload()
		},
		methods: {
			platformDownload() {
				let platform = uni.getSystemInfoSync().platform
				console.log('playform', platform)
				if (platform == 'ios') {
					this.downloadUrl = this.$store.state.settings.siteInfo.ipa_ewm
				} else if (platform == 'android') {
					this.downloadUrl = this.$store.state.settings.siteInfo.apk_ewm
				}
				console.log('url', this.downloadUrl)
			},
		},
	}
</script>

<style lang="scss"></style>
