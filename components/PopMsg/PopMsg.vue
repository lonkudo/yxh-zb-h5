<template>
	<view class="popMsg">
		<transition-group name="slide">
			<view v-for="(item, index) in tempList" :key="index" style="display: block">
				<pop-msg-item :info="item" class="margin-bottom-xs"></pop-msg-item>
			</view>
		</transition-group>
	</view>
</template>

<script>
	class Temp {
		constructor() {
			this.tempList = []
		}
		addItem(item) {
			const tmpItem = new TempItem(item, this)
			this.tempList.push(tmpItem)
			// console.log('this.tempList', this.tempList)
		}
		removeItem(tmpItem) {
			const index = this.tempList.findIndex((ele) => {
				return ele === tmpItem
			})
			this.tempList[index] = null
			this.tempList.splice(index, 1)
			// console.log('this.tempList', this.tempList)
		}
		resetCountdown(tempItem) {
			const index = this.tempList.findIndex((ele, index) => {
				return ele.id === tempItem.id
			})
			this.tempList[index].countdown = 5
		}
		findItem(item) {
			const index = this.tempList.findIndex((ele, index) => {
				return ele.id === item.id
			})
			if (index === -1) {
				return null
			} else {
				return this.tempList[index]
			}
		}
		dealItem(item) {
			const index = this.tempList.findIndex((ele, index) => {
				// console.log('ele')
				return ele.id === item.id
			})
			/* 先查找暂存数组里面有没有这个item */
			if (index === -1) {
				/* 没有就添加item */
				this.addItem(item)
			} else {
				/* 有的话获取到tempItem和新item比对 */
				console.log('giftId', this.tempList[index].giftId, item.giftId)
				if (this.tempList[index].giftId === item.giftId) {
					this.tempList[index].addGiftNum(item.giftInfo.giftNum)
				} else {
					console.log('---3----3----3----3----3---')
					this.tempList[index].changeGift(item)
				}
			}
		}
	}
	class TempItem {
		constructor(item, myTemp) {
			this.item = item
			this.countdown = 5
			var timer = setInterval(() => {
				if (this.countdown === 0) {
					this.destory()
					clearInterval(timer)
				}
				this.down()
			}, 1000)
			this.myTemp = myTemp
		}
		down() {
			this.countdown -= 1
			// console.log('down', this.countdown, this.item)
		}
		reset() {
			this.countdown = 5
			// console.log('reset', this.countdown)
		}
		get id() {
			return this.item.id
		}
		get giftId() {
			return this.item.giftId
		}
		addGiftNum(giftNum) {
			this.item.giftInfo.giftNum += giftNum
			this.reset()
		}
		changeGift(item) {
			console.log('---11----11----11----11----11---')
			this.item = JSON.parse(JSON.stringify(item))
			console.log('---22----22----22----22----22---')
			this.reset()
		}
		destory() {
			// console.log('this', this.myTemp)
			this.myTemp.removeItem(this)
		}
	}

	import { GiftPoolBus } from '@/utils/bus.js'
	import PopMsgItem from './PopMsgItem.vue'
	export default {
		name: 'PopMsg',
		components: { PopMsgItem },
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
			GiftPoolBus.$on('push', (item) => {
				tmp.dealItem(item)
			})
		},
		computed: {
			tempList: function () {
				let arr = []
				this.myTemp.tempList.forEach((element) => {
					arr.push(element.item)
				})
				return arr
			},
		},
	}
</script>

<style lang="scss">
	.popMsg {
		position: fixed;
		top: 400rpx;
		left: 0;
		right: 0;
		bottom: 100rpx;
		background-color: rgba(0, 0, 0, 0.1);
		z-index: 10;
	}
	.slide-enter-active {
		animation: slidein 0.5s;
	}
	.slide-leave-active {
		// 激活状态的效果
		animation: slideout 0.5s;
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
	.bounce-enter-active {
		animation: bounce-in 500ms;
	}
	.bounce-leave-active {
		animation: bounce-in 500ms reverse;
	}
	@keyframes bounce-in {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.25);
		}
		100% {
			transform: scale(1);
		}
	}
	.fade-enter-active {
		animation: bounce-in 500ms;
	}
	.fade-leave-active {
		animation: bounce-in 500ms reverse;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}

	// .slide-enter-from, // 起始和最终离开的效果
	// .slide-leave-to {
	// 	margin-left: -100%;
	// 	width: 300%;
	// }
	// .slide-enter-to,
	// .slide-leave-from {
	// 	margin-left: 0%;
	// 	width: 100%;
	// }
</style>
