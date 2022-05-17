<template>
	<view>
		<u-navbar :is-back="true" back-text="back" title="">
			<view slot="right"><slot name="right"></slot></view>
		</u-navbar>
		<view class="content">
			<!-- 正文内容 -->
			{{ prevName }}
		</view>
	</view>
</template>

<script>
	export default {
		porps: [],
		data() {
			return {
				background: {
					backgroundColor: '#fff',
				},
				pages: null,
				page: null,
				prevPage: 1,
				prevName: '',
			}
		},
		mounted() {
			// this.pages = getCurrentPages() //关于获取页面的官方文档https://uniapp.dcloud.io/api/window/window
			// this.page = this.pages[this.pages.length - 1]
			// this.prevPage = this.pages[this.pages.length - 2]
			// console.log('pages', this.page)
			// console.log('---3----3----3----3----3---')
			// this.prevName = this.getName(this.page)
			// console.log('---4----4----4----4----4---', this.getName(this.page))
		},
		methods: {
			// getName(page) {
			// 	let arr = page.route.split('/')
			// 	console.log('arr', arr[arr.length - 1])
			// 	return arr[arr.legnth - 1]
			// },
		},
		computed: {
			// prevName: function () {
			// 	console.log('---2----2----2----2----2---', this.prevPage)
			// 	if (this.prevPage) {
			// 		return this.getName(this.page)
			// 	} else {
			// 		return ''
			// 	}
			// },
		},
		watch: {},
	}
</script>
