export default function create2DArray(arr, length) {
	/* 把获取的数据处理成二位数组的形式 */
	let smallArr = []
	let newArr = []
	let round = Math.ceil(arr.length / length) // 取商
	let curRound = 0 // 当前循环轮次

	for (let i = 0; i < round; i++) {
		smallArr = arr.slice(curRound * length, (curRound + 1) * length)
		newArr.push(smallArr)
		curRound += 1
	}

	return newArr
}
