/**
用于 插入DOM元素的时候 把rpx转化为px
*@param {Number} rpx // 单位rpx。  
*/

export default function (rpxVal) {
	var uniWidth = uni.getSystemInfoSync().screenWidth / 750
	return rpxVal * uniWidth
}
