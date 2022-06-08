<template>
	<view class="u-tr-my" @tap="trClicked">
		<slot></slot>
	</view>
</template>

<script>
	/**
	 * tr 表格行标签
	 * @description 表格组件一般用于展示大量结构化数据的场景（搭配<u-table-my>使用）
	 * @tutorial https://www.uviewui.com/components/table.html
	 * @example <u-tr-my></u-tr-my>
	 */
	export default {
		name: 'u-tr-my',
		methods: {
			trClicked: function () {
				this.$emit('tap')
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/uni_modules/uview-ui/libs/css/style.components.scss';
	.u-tr-my {
		@include vue-flex;
	}
</style>
