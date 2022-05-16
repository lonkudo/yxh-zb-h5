import Vue from 'vue'
import App from './App'

import store from './store/index.js'

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

import { formatGiven } from '@/utils/index.js'

Vue.filter('formatGiven', formatGiven)

import CardCon from '@/layout/CardCon/CardCon.vue'
Vue.component('card-con', CardCon)
import ImageLeft from '@/layout/ImageLeft/ImageLeft.vue'
Vue.component('image-left', ImageLeft)
import ImageRight from '@/layout/ImageRight/ImageRight.vue'
Vue.component('image-right', ImageRight)
import ImageInfo from '@/layout/ImageInfo/ImageInfo.vue'
Vue.component('image-info', ImageInfo)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	...App,
	store,
})

app.$mount()

// // #ifdef VUE3
// import { createSSRApp } from 'vue'
// export function createApp() {
// 	const app = createSSRApp(App)
// 	return {
// 		app,
// 	}
// }
// // #endif
