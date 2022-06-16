<template>
	<view :style="{ height: size + 'rpx', width: size + 'rpx' }">
		<tki-qrcode
			ref="qrcode"
			:cid="cid"
			:val="val"
			:size="size"
			:unit="unit"
			:background="background"
			:foreground="foreground"
			:pdground="pdground"
			:icon="icon"
			:iconSize="iconSize"
			:lv="lv"
			:onval="onval"
			:loadMake="loadMake"
			:usingComponents="usingComponents"
			:showLoading="showLoading"
			:loadingText="loadingText"
			@result="qrR"
		/>
	</view>
</template>

<script>
	export default {
		name: 'Download',
		props: {
			cid: {
				// 当单个页面有多个二维码需要指定该值
				type: String,
				default: 'Barcode_Download',
			},
			val: {
				//生成的内容
				type: String,
				default: 'http://39.103.165.5',
			},
			size: {
				//单位
				type: Number,
				default: 200,
			},
			unit: {
				// 大小使用的单位
				type: String,
				default: 'upx', // 就写upx就行了。rpx和upx一样。
			},
			background: {
				type: String,
				default: '#000000',
			},
			foreground: {
				//前景色
				type: String,
				default: '#ffffff',
			},
			pdground: {
				// 角标色
				type: String,
				default: '#ffffff',
			},
			icon: {
				// 图标
				type: String,
				default: '/static/logo.png', // 必须是本地的
			},
			iconSize: {
				type: Number,
				default: 40, // 图标大小
			},
			lv: {
				type: Number,
				default: 3, //容错级别，不用设置
			},
			onval: {
				type: Boolean,
				default: false, // 监听val变化重新生成二维码
			},
			loadMake: {
				type: Boolean,
				default: false, // 	组件初始化完成后自动生成二维码，val需要有值
			},
			usingComponents: {
				type: Boolean,
				default: true, // 	是否使用了自定义组件模式（主要是为了修复非自定义组件模式时 v-if 无法生成二维码的问题）
			},
			showLoading: {
				type: Boolean,
				default: true, // 	是否显示loading
			},
			loadingText: {
				type: String,
				default: 'loading..', //
			},
		},
		data() {
			return {}
		},
		mounted() {
			this.$refs['qrcode']._makeCode()
		},
		methods: {
			qrR(url) {
				console.log('qrR', url)
			},
		},
	}
</script>

<style lang="scss"></style>
