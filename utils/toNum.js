export default function (val) {
	/* 防止后台返回的值一下字符串一下数值。 */
	if (val === '') {
		return 0
	}
	if (typeof val === 'string') {
		return parseInt(val)
	}
	if (typeof val === 'number') {
		return val
	}
}
