<template>
	<view class="">
<no-data></no-data>
	</view>
</template>

<script>
	import NoData from '@/components/NoData/NoData.vue'
export default {
	components: {
		NoData
	},
	data() {
		return {
			form: {
				name: '',
			},
			rules: {

			}
		};
	},
	methods: {

	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		
	}
};
</script>