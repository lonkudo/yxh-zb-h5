<template>
	<view>
		<uni-forms :modelValue="formData">
			<uni-forms-item label="姓名" name="name">
				<uni-easyinput type="text" v-model="formData.a" placeholder="请输入姓名" />
			</uni-forms-item>
			<uni-forms-item required name="hobby" label="兴趣爱好"> </uni-forms-item>
		</uni-forms>
		<button @click="submitForm">Submit</button>
	</view>
</template>

<script>
	export default {
	   name: 'WriteFeedback',
	   data(){
	     formData:{
	       a: '',
	       b: '',
	     }
	   },
	 }
</script>

<style></style>
