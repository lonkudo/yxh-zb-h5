<template>
	<view
		class="margin-xs margin-top-sm margin-bottom-sm flex align-center justify-between"
		><text class="fc-b-9 fs-24">{{ title }}</text>
		<u-button
			type="info"
			:plain="true"
			:size="'mini'"
			:shape="'circle'"
			text="Change Btach"
			class="w-200 margin-0"
		></u-button>
	</view>
</template>

<script>
	export default {
		name: 'FindTitle',
		props: ['title'],
		data() {
			return {}
		},
	}
</script>

<style lang="scss"></style>
