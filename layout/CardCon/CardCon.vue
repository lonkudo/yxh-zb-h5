<template>
	<view class="card-con margin-xs padding-xs br-8" :style="{backgroundColor: bg}">
		<slot></slot>
	</view>	
</template>

<script>
	export default {
		name: 'CardCon',
		props: {
			bg: {
				type: String,
				default: '#fff',
			}
		}
	}
</script>

<style>
</style>