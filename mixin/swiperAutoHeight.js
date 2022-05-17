// 配置swiper的自适应高度的 mixin。
// 除了data和mixin的设置，还有几个地方需要设置：

/* swiper设置动态高度 还有changeSwiper方法 */
// <swiper
// @change="changeSwiper"
// :style="{ height: swiperHeight + 'px' }"
//  ></swiper>

/* swiper-item设置key: */
// <swiper-item class="swiper-item" :key="0">

/* swiper-item里面的顶级容器设置 对应的id */
// <scroll-view
// 	:id="'content-wrap' + 0"
// >

/* swiperCurrent 是和u-tabs-swiper 所操作的swiperCurrent一样的 */

export default {
	onLoad() {
		this.$nextTick(() => {
			this.setSwiperHeight()
		})
	},

	data: function () {
		return {
			swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			swiperHeight: 0,
		}
	},
	methods: {
		//手动切换题目
		changeSwiper(e) {
			this.swiperCurrent = e.detail.current
			//动态设置swiper的高度，使用nextTick延时设置
			this.$nextTick(() => {
				this.setSwiperHeight()
			})
		},
		//动态设置swiper的高度
		setSwiperHeight() {
			let element = '#content-wrap' + this.swiperCurrent
			let query = uni.createSelectorQuery().in(this)
			query.select(element).boundingClientRect()
			query.exec((res) => {
				if (res && res[0]) {
					this.swiperHeight = res[0].height
				}
			})
		},
	},
}
