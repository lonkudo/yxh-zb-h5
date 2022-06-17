import Vue from 'vue'
import App from './App'

import store from './store/index.js'

import Request from '@/utils/request.js'

// let request = new Request().http
// Vue.prototype.$http = request

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// 二维码生成
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
Vue.component('tki-qrcode', tkiQrcode)

import { tTable, tTh, tTr, tTd } from '@/components/t-table'
Vue.component('t-table', tTable)
Vue.component('t-th', tTh)
Vue.component('t-tr', tTr)
Vue.component('t-td', tTd)

import UTableMy from '@/components/uTableMy/u-table-my/u-table-my.vue'
import UTrMy from '@/components/uTableMy/u-tr-my/u-tr-my.vue'
import UThMy from '@/components/uTableMy/u-th-my/u-th-my.vue'
import UTdMy from '@/components/uTableMy/u-td-my/u-td-my.vue'
Vue.component('u-table-my', UTableMy)
Vue.component('u-tr-my', UTrMy)
Vue.component('u-td-my', UTdMy)
Vue.component('u-th-my', UThMy)

import '@/static/styles/css/common.scss' // global css

import { formatGiven } from '@/utils/index.js'
Vue.filter('formatGiven', formatGiven)
Vue.prototype.formatGiven = formatGiven

import { TcPlayer } from '@/utils/TcPlayer-module-2.4.1'
Vue.prototype.TcPlayer = TcPlayer
import isEmpty from '@/utils/isEmpty.js'
Vue.prototype.isEmpty = isEmpty
import toNum from '@/utils/toNum.js'
Vue.prototype.toNum = toNum
import initScrollHeight from '@/utils/initScrollHeight.js'
Vue.prototype.initScrollHeight = initScrollHeight
import guard from '@/utils/guard.js'
Vue.prototype.guard = guard

import rpx2px from '@/utils/rpx2px.js'
Vue.prototype.rpx2px = rpx2px
import px2rpx from '@/utils/px2rpx.js'
Vue.prototype.px2rpx = px2rpx

import '@/mixin/userComputed.js' // 全局混入 computed的user相关信息

import CustomNavBar from '@/components/CustomNavBar/CustomNavBar.vue'
Vue.component('custom-nav-bar', CustomNavBar)
import CardCon from '@/layout/CardCon/CardCon.vue'
Vue.component('card-con', CardCon)
import ImageLeft from '@/layout/ImageLeft/ImageLeft.vue'
Vue.component('image-left', ImageLeft)
import ImageRight from '@/layout/ImageRight/ImageRight.vue'
Vue.component('image-right', ImageRight)
import ImageInfo from '@/layout/ImageInfo/ImageInfo.vue'
Vue.component('image-info', ImageInfo)
import MyImage from '@/components/MyImage/MyImage.vue'
Vue.component('my-image', MyImage)

import VueSocketIO from 'vue-socket.io'
store.dispatch('settings/GetSiteInfo').then((res) => {
	document.title = res.site_name
	let vueSocketIo = new VueSocketIO({
		debug: true,
		connection: res.chatserver, //
		// connection: "http://8.219.63.244:1988", //
	})
	// 监听connect事件，设置isSuccessConnect为true
	vueSocketIo.io.on('connect', () => {
		store.commit('settings/SET_ISSUCCESSCONNECT', true)
	})
	Vue.use(vueSocketIo)
})

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
