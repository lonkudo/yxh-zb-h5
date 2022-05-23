/**
用于 固定定位的时候 scroll-view高度的计算。
*@param {Number} height // 单位rpx。 去除scroll-view剩下的其他组件的高度。
* 用设备高度来减去其他组件的高度来获取scroll-view的高度。
*/

export default async function (height) {
	console.log('111111')
	const ret = await new Promise((resolve) => {
		uni.getSystemInfo({
			success: function (res) {
				/* 获取每个rpx对应的像素数量 */
				const unit = res.windowWidth / 750
				resolve(Math.ceil(res.windowHeight / unit) - height)
			},
		})
	})

	console.log('ret', ret)
	return ret
}
