/**
用于  把px转化为rpx
*@param {Number} px // 单位px。  
*/

export default function (pxVal) {
	var uniWidth = uni.getSystemInfoSync().screenWidth / 750
	return pxVal / uniWidth
}
