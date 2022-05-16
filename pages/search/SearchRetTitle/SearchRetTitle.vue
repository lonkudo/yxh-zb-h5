<template>
	<view
		class="margin-xs margin-top-sm margin-bottom-sm flex align-center justify-start"
		><text class="fc-b-3 fs-24 fw-9 padding-right-sm">{{ title }}</text>
		<text class="fc-b-9 fs-24">></text>
	</view>
</template>

<script>
	export default {
		name: 'SearchRetTitle',
		props: ['title'],
		data() {
			return {}
		},
	}
</script>

<style lang="scss"></style>
