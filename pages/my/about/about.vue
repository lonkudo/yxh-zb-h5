<template>
	<view>
		<web-view :src="aboutUrl" allow></web-view>
		<!-- <template v-if="JSON.stringify(siteInfo) !== '{}'">
			<iframe id="aboutFrame" :src="siteInfo.about_us_url"></iframe>
		</template> -->
	</view>
</template>

<script>
	import { site } from '@/api/common'
	export default {
		data() {
			return {
				aboutUrl: '',
			}
		},
		methods: {},
		onLoad() {
			site()
				.then((res) => {
					this.aboutUrl = res.info.about_us_url
				})
				.catch((err) => {
					console.log(err)
				})
		},
		computed: {},
		watch: {},
	}
</script>

<style lang="scss"></style>
