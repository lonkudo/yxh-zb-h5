<template>
	<view class="u-td-my" :style="[tdStyle]">
		<slot></slot>
	</view>
</template>

<script>
	/**
	 * td td单元格
	 * @description 表格组件一般用于展示大量结构化数据的场景（搭配u-table-my使用）
	 * @tutorial https://www.uviewui.com/components/table.html#td-props
	 * @property {String Number} width 单元格宽度百分比或者具体带单位的值，如30%， 200rpx等，一般使用百分比，单元格宽度默认为均分tr的长度（默认auto）
	 * @example <u-td-my>二年级</u-td-my>
	 */
	export default {
		name: 'u-td-my',
		props: {
			// 宽度，百分比或者具体带单位的值，如30%， 200rpx等，一般使用百分比
			width: {
				type: [Number, String],
				default: 'auto',
			},
		},
		data() {
			return {
				tdStyle: {},
			}
		},
		created() {
			this.parent = false
		},
		mounted() {
			this.parent = this.$u.$parent.call(this, 'u-table-my')
			if (this.parent) {
				// 将父组件的相关参数，合并到本组件
				let style = {}
				if (this.width != 'auto') style.flex = `0 0 ${this.width}`
				style.textAlign = this.parent.align
				style.fontSize = this.parent.fontSize + 'rpx'
				style.padding = this.parent.padding
				if (this.parent.border) {
					style.borderBottom = `solid 1rpx ${this.parent.borderColor}`
				}
				style.color = this.parent.color
				this.tdStyle = style
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/uni_modules/uview-ui/libs/css/style.components.scss';
	.u-td-my {
		@include vue-flex;
		flex-direction: column;
		flex: 1;
		justify-content: center;
		font-size: 28rpx;
		color: $u-content-color;
		align-self: stretch;
		box-sizing: border-box;
		height: 100%;
	}
</style>
