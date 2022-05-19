<template>
	<view>
		<view></view>
		<template v-if="JSON.stringify(siteInfo) !== '{}'">
			<iframe id="aboutFrame" :src="siteInfo.about_us_url"></iframe>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			getIframe() {
				const query = uni.createSelectorQuery().in(this)
				const aboutFrame = query.select('#aboutFrame')
				// if (aboutFrame === null || window.location.hostname === 'localhost') return
				// let that = this
				console.log('---1----1----1----1----1---', aboutFrame)
				console.log('---2----2----2----2----2---', this.siteInfo)
				aboutFrame.onload = function () {
					// onload是里面的东西加在完毕才会调用，而不是这个组件挂载上去就调用。
					that.getContain()
				}
			},
			getContain() {
				const aboutFrame = window.document.getElementById('aboutFrame')
				let HTMLbody = aboutFrame.contentWindow.document.querySelector('.container')
				let myContent = window.document.querySelector('.my-content')
				myContent.appendChild(HTMLbody)
				let content = window.document.querySelector('.about-content')
				content.removeChild(aboutFrame)
			},
		},
		onLoad() {
			this.getIframe()
		},
		computed: {
			siteInfo: function () {
				return this.$store.state.settings.siteInfo || {}
			},
		},
		watch: {
			siteInfo: {
				handler: function (newVal, oldVal) {
					if (JSON.stringify(newVal) !== '{}') {
						this.$nextTick(() => {
							this.getIframe()
						})
					}
				},
				immediate: true,
				deep: true,
			},
		},
	}
</script>

<style lang="scss"></style>
