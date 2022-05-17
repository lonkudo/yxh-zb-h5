// 配置swiper和 u-tabs-swiper联动 的 mixin

/* swiper添加以下配置 */
// :current="swiperCurrent"
// @transition="transition"
// @animationfinish="animationfinish"

/* u-tabs-swiper添加下面配置 */
// :current="current"
// @change="tabsChange"
// swiperWidth="750"

export default {
	data: function () {
		return {
			current: 0, // tabs组件的current值，表示当前活动的tab选项
			swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
		}
	},
	methods: {
		tabsChange(index) {
			this.swiperCurrent = index
		},
		// swiper-item左右移动，通知tabs的滑块跟随移动
		transition(e) {
			let dx = e.detail.dx
			this.$refs.uTabs.setDx(dx)
		},
		animationfinish(e) {
			let current = e.detail.current
			this.$refs.uTabs.setFinishCurrent(current)
			this.swiperCurrent = current
			this.current = current
		},
	},
}
