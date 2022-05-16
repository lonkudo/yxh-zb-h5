<template>
	<view
		class="margin-xs margin-top-sm margin-bottom-sm flex align-center justify-between"
		><text class="fc-b-0 fw-9">{{ title }}</text
		><text class="fc-b-9">More ></text></view
	>
</template>

<script>
	export default {
		name: 'HomeTitle',
		props: ['title'],
		data() {
			return {}
		},
	}
</script>

<style lang="scss">
	// @import '@/static/styles/css/ft.scss';
</style>
