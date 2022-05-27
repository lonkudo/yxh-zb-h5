export class Temp {
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
			// console.log('giftId', this.tempList[index].giftId, item.giftId)
			if (this.tempList[index].giftId === item.giftId) {
				this.tempList[index].addGiftNum(item.giftInfo.giftNum)
			} else {
				this.tempList[index].changeGift(item)
			}
		}
	}
}
export class TempItem {
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
		this.item = JSON.parse(JSON.stringify(item))
		this.reset()
	}
	destory() {
		this.myTemp.removeItem(this)
	}
}
