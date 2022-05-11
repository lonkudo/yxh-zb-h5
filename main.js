import App from './App'

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

import { formatGiven } from '@/utils/index.js'

Vue.filter('formatGiven', formatGiven)

import ImageLeft from '@/components/ImageLeft/ImageLeft.vue'
Vue.component('image-left', ImageLeft)
import ImageRight from '@/components/ImageRight/ImageRight.vue'
Vue.component('image-right', ImageRight)
import MyUTabs from '@/components/MyUTabs/MyUTabs.vue'
Vue.component('my-u-tabs', MyUTabs)
import ImageInfo from '@/components/ImageInfo/ImageInfo.vue'
Vue.component('image-info', ImageInfo)

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app,
	}
}
// #endif
