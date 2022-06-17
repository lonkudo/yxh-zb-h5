/**
用于 固定定位的时候 scroll-view高度的计算。
*@param {Number} height // 单位rpx。 去除scroll-view剩下的其他组件的高度。
* 用设备高度来减去其他组件的高度来获取scroll-view的高度。
* 
*/

export default function (height) {
	// var Height = uni.getSystemInfoSync().screenHeight
	// var Width = uni.getSystemInfoSync().screenWidth
	var Height = uni.getSystemInfoSync().windowHeight
	var Width = uni.getSystemInfoSync().windowWidth

	console.log('windowWidth', Width, Height)
	// console.log('initScorll', Height, Width)
	const unit = Width / 750
	console.log('unit', unit)
	return Math.floor(Height / unit) - height
}
