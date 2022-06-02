<template>
	<view class="popMsg">
		<!-- <transition-group name="slide"> -->
		<view
			v-for="(element, index) in tempList"
			:key="index"
			style="display: block"
		>
			<transition name="slide">
				<pop-goal-msg-item
					v-if="element"
					:info="element.item"
					class="margin-bottom-xs"
				></pop-goal-msg-item>
			</transition>
			<transition name="height">
				<view v-if="!element" class="margin-bottom-xs holder"></view>
			</transition>
		</view>
		<button>test</button>
		<!-- </transition-group> -->
	</view>
</template>

<script>
	import { Temp, TempItem } from './poolGoalMsg.js'

	import { GoalPoolBus } from '@/utils/bus.js'
	import PopGoalMsgItem from './PopGoalMsgItem.vue'
	export default {
		name: 'PopGoalMsg',
		components: { PopGoalMsgItem },
		computed: {},
		props: {
			pool: {
				type: Array,
				default() {
					return []
				},
			},
		},
		data() {
			return {
				myTemp: null,
				show: false,
			}
		},
		created() {
			const tmp = new Temp()
			this.myTemp = tmp
			GoalPoolBus.$on('push', (item) => {
				tmp.dealItem(item)
			})
		},
		computed: {
			tempList: function () {
				let arr = []
				this.myTemp.display.displayList.forEach((element) => {
					arr.push(element)
				})
				// this.myTemp.tempList.forEach((element) => {
				// 	arr.push(element.item)
				// })
				return arr
			},
		},
	}
</script>

<style lang="scss">
	.popMsg {
		position: fixed;
		top: 300rpx;
		left: 0;
		right: 0;
		bottom: 200rpx;
		// background-color: rgba(0, 0, 0, 0.1);
		pointer-events: none;
		z-index: 10;
	}
	.slide-enter-active {
		animation: slidein 0.5s;
	}
	.slide-leave-active {
		// 激活状态的效果
		animation: slideout 0.5s;
	}

	@keyframes slideout {
		from {
			margin-left: 0%;
			width: 100%;
		}
		to {
			margin-left: -100%;
			width: 300%;
		}
	}
	@keyframes slidein {
		from {
			margin-left: -100%;
			width: 300%;
		}

		to {
			margin-left: 0%;
			width: 100%;
		}
	}

	.holder {
		height: 100rpx;
	}

	.height-enter-active {
		animation: heightin 0.5s;
	}
	.height-leave-active {
		// 激活状态的效果
		animation: heightout 0.5s;
	}

	@keyframes heightin {
		from {
			height: 0rpx;
		}
		to {
			height: 0rpx;
		}
	}
	@keyframes heightout {
		from {
			height: 0rpx;
		}
		to {
			height: 0rpx;
		}
	}
</style>
