<template>
	<view class="slider b-f margin-xs">
		<u-swiper :list="list1" @change="change" @click="click" mode="dot"></u-swiper>
	</view>
</template>

<script>
	// import { getBanner } from '@/api/home'
	export default {
		name: 'RecommendSlider',
		data() {
			return {
				list1: [],
			}
		},
		props: {
			banner: {
				type: Array,
				default() {
					return []
				},
			},
		},
		watch: {
			banner: function (newVal) {
				this.list1 = []
				console.log('---newVAl----newVAl----newVAl----newVAl----newVAl---', newVal)
				newVal.forEach((element) => {
					this.list1.push({ image: element.slide_pic, url: element.slide_url })
				})
			},
		},
		created() {
			// this.getBanner()
		},
		methods: {
			// getBanner() {
			// 	getBanner().then((res) => {
			// 		res.info.forEach((element) => {
			// 			this.list1.push({ image: element.slide_pic, url: element.slide_url })
			// 		})
			// 	})
			// },
			change() {},
			click(index) {
				this.list1[index].url
				uni.navigateTo({
					url: '/pages/link/link?url=' + this.list1[index].url,
				})
			},
		},
	}
</script>

<style lang="scss"></style>
