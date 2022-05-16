<template>
	<view> rewjirew 
	<text>{{$store.state.user.token}}</text>
	<card-con>ok</card-con>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		created() {
			this.testPost()
		},
		computed: {
			
		},
		methods: {
			testGet(){
				uni.request({
					url: '/appapi/?service=Discover.GetNewsList', //仅为示例，并非真实接口地址。
					method: 'GET',
					data: {
						p: 1,
						num: 20,
						// type: 3,
						// time: 20220512,
						// compe_id: ['429', '1716', '2798'],
						uid: 321,
						lan: 1,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
					},
					success: (res) => {
						console.log(res)
						this.text = 'request success'
					},
					sslVerify: false,
				})
			},
			testPost(){
				uni.request({
					url: '/appapi/?service=Match.Index', //仅为示例，并非真实接口地址。
					method: 'POST',
					data: {
						p: 1,
						num: 20,
						type: 3,
						time: 20220512,
						compe_id: ['429', '1716', '2798'],
						uid: 321,
						lan: 1,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
					},
					success: (res) => {
						console.log(res)
						this.text = 'request success'
					},
					sslVerify: false,
				})
			},
		},
	}
</script>

<style lang="scss"></style>
