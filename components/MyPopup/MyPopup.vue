<template>
	<view class="u-drawer" v-if="visibleSync">
		<u-mask
			:custom-style="maskCustomStyle"
			:maskClickAble="maskCloseAble"
			:z-index="1002"
			:show="showDrawer && mask"
			@click="maskClick"
		></u-mask>
		<!-- <view class="mask" v-show="showDrawer && mask" @click="maskClick"> </view> -->
		<view
			class="content"
			:style="{ left: pos.x + 'px', top: pos.y + 'px' }"
			@tap="modeCenterClose('center')"
			@tap.stop.prevent
			@touchmove.stop.prevent
		>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'MyPopup',
		props: {
			value: {
				type: Boolean,
				default: false,
			},
			show: {
				type: Boolean,
				default: false,
			},
			mask: {
				type: Boolean,
				default: true,
			},
			maskCloseAble: {
				type: Boolean,
				default: true,
			},
			maskCustomStyle: {
				type: Object,
				default() {
					return {
						backgroundColor: 'rgba(0,0,0,0.2)',
					}
				},
			},
			pos: {
				type: Object,
				default() {
					return {
						x: 0,
						y: 0,
					}
				},
			},
		},
		data() {
			return {
				visibleSync: false,
				showDrawer: false,
				closeFromInner: false, // value的值改变，是发生在内部还是外部
			}
		},

		watch: {
			value(val) {
				console.log('---value----value----value----value----value---')
				if (val) {
					this.open()
				} else if (!this.closeFromInner) {
					this.close()
				}
				this.closeFromInner = false
			},
		},

		mounted() {
			// 组件渲染完成时，检查value是否为true，如果是，弹出popup
			this.value && this.open()
		},
		methods: {
			modeCenterClose(mode) {
				if (mode != 'center' || !this.maskCloseAble) return
				this.close()
			},
			maskClick() {
				this.close()
				console.log('---1----1----1----1----1---')
			},
			close() {
				// 标记关闭是内部发生的，否则修改了value值，导致watch中对value检测，导致再执行一遍close
				// 造成@close事件触发两次
				this.closeFromInner = true
				this.change('showDrawer', 'visibleSync', false)
				console.log('---2----2----2----2----2---')
			},
			open() {
				this.change('visibleSync', 'showDrawer', true)
			},

			change(param1, param2, status) {
				// 如果this.popup为false，意味着为picker，actionsheet等组件调用了popup组件
				if (this.popup == true) {
					this.$emit('input', status)
				}
				this[param1] = status
				if (status) {
					// #ifdef H5 || MP
					this.timer = setTimeout(() => {
						this[param2] = status
						this.$emit(status ? 'open' : 'close')
					}, 50)
					// #endif
					// #ifndef H5 || MP
					this.$nextTick(() => {
						this[param2] = status
						this.$emit(status ? 'open' : 'close')
					})
					// #endif
				} else {
					this.timer = setTimeout(() => {
						this[param2] = status
						this.$emit(status ? 'open' : 'close')
					}, this.duration)
				}
			},
		},
	}
</script>

<style lang="scss">
	.u-drawer {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		z-index: 1001;
	}
	.mask {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background-color: rgba(0, 0, 0, 0.2);
	}
	.wrapper {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.content {
		position: absolute;
		z-index: 1002;
	}
</style>
