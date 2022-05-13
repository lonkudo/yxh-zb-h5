<template>
	<view class="my-container">
		<exp-header></exp-header>
		<my-navigator></my-navigator>
	</view>
</template>

<script>
	import ExpHeader from '@/components/ExpHeader/ExpHeader.vue'
	import MyNavigator from './components/MyNavigator.vue'
	export default {
		data() {
			return {}
		},
		components: {
			ExpHeader,
			MyNavigator,
		},
		created() {
			// uni.request({
			// 	url: '/appapi/?service=Discover.GetNewsList', //仅为示例，并非真实接口地址。
			// 	method: 'GET',
			// 	data: {
			// 		p: 1,
			// 		num: 20,
			// 		// type: 3,
			// 		// time: 20220512,
			// 		// compe_id: ['429', '1716', '2798'],
			// 		uid: 321,
			// 		lan: 1,
			// 	},
			// 	header: {
			// 		'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
			// 	},
			// 	success: (res) => {
			// 		console.log(res)
			// 		this.text = 'request success'
			// 	},
			// 	sslVerify: false,
			// })
		},
	}
</script>

<style lang="scss"></style>
