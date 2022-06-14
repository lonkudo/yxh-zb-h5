function check() {
	/**
	 * @param target 对应 methods 这个对象
	 * @param name 对应属性方法的名称
	 * @param descriptor 对应属性方法的描述信息，包括value(方法本身),writable(可否修改值,data descriptors only)等
	 */
	return function (target, name, descriptor) {
		const fn = descriptor.value
		descriptor.value = function (...rest) {
			// console.log(`这是调用方法【${name}】前打印的日志`)
			// console.log(target, name, descriptor, this)

			if (this.isEmpty(this.token)) {
				uni.navigateTo({
					url: '/pages/login/login',
				})
				return
			}

			// this.是vue对象

			fn.call(this, ...rest)
			// console.log(`这是调用方法【${name}】后打印的日志`)
		}
	}
}

export default check
