/**
 *@param {任意类型} val // 判断val是不是空的
 */
// console.log = function () {}

export default function (val) {
	if (typeof val === 'object') {
		try {
			return val.keys().length === 0
		} catch (error) {
			/* 计算computed里面的object的时候，会因为没有keys触发这个条件 */
			return JSON.stringify(val) === '{}' || JSON.stringify(val) === '[]'
		}
	}
	if (typeof val === 'string') {
		return val === ''
	}
	if (typeof val === 'array') {
		return val.length === 0
	}
}
