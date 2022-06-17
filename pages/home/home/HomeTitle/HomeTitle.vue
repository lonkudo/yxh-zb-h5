<template>
	<card-con
		class="margin-top-sm margin-bottom-sm flex align-center justify-between"
		:bg="'#f6f6f6'"
	>
		<text class="fc-b-0 fw-9">{{ title }}</text
		><text class="fc-b-9" @tap="tap">More ></text>
	</card-con>
</template>

<script>
	export default {
		components: {
			name: 'HomeTitle',
		},
		props: ['title'],
		data() {
			return {}
		},
		methods: {
			tap: function () {
				this.$emit('onTap')
			},
		},
	}
</script>

<style lang="scss">
	// @import '@/static/styles/css/ft.scss';
</style>
