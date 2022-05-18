<template>
	<view>
		<uni-swipe-action>
			<!-- 基础用法 -->
			<uni-swipe-action-item
				:right-options="options"
				:left-options="options"
				@click="onClick"
				@change="change"
			>
				<view>SwipeAction 基础使用场景</view>
			</uni-swipe-action-item>
			<!-- 使用插槽 （请自行给定插槽内容宽度）-->
			<uni-swipe-action-item>
				<template v-slot:left>
					<view><text>置顶</text></view>
				</template>
				<view>
					<text>使用插槽</text>
				</view>
				<template v-slot:right>
					<view><text>删除</text></view>
				</template>
			</uni-swipe-action-item>
			<!-- 混合用法 -->
			<uni-swipe-action-item :right-options="options">
				<template v-slot:left>
					<view><text>置顶</text></view>
				</template>
				<view><text>混合使用</text></view>
			</uni-swipe-action-item>
		</uni-swipe-action>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: [
					{
						text: '取消',
						style: {
							backgroundColor: '#007aff',
						},
					},
					{
						text: '确认',
						style: {
							backgroundColor: '#dd524d',
						},
					},
				],
			}
		},

		onLoad() {},
		methods: {
			onClick(e) {
				console.log(
					'点击了' +
						(e.position === 'left' ? '左侧' : '右侧') +
						e.content.text +
						'按钮'
				)
			},
			swipeChange(e, index) {
				console.log('当前状态：' + e + '，下标：' + index)
			},
			change() {
				console.log('change')
			},
		},
	}
</script>

<style lang="scss"></style>
