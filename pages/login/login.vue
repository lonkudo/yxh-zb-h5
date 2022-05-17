<template>
	<view class="flex flex-direction align-center margin-top-lg">
		<u-form :model="form" ref="uForm">
			<view class="input-con flex align-center padding-xs">
				<text class="fs-28 margin-left-xs margin-right-sm fc-b-3">+84</text>
				<text class="vertical-spliter margin-right-sm"></text>
				<u-form-item><u-input v-model="form.name" class="w-450" placeholder="Input Phone Number"/></u-form-item>
			</view>
			<view class="input-con flex align-center padding-xs margin-top-lg">
				
				<u-form-item><u-input v-model="form.phone" class="w-400 margin-left-sm" placeholder="Input Code"/></u-form-item>
				<text class="fs-28 margin-left-xs margin-right-sm fc-b-3">Get Code</text>
			</view>
			<view class="login-con flex align-center padding-xs margin-top-lg justify-center">
					<text class="fc-b-f">Login</text>
			</view>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					phone: '',
				},
			}
		},
	}
</script>

<style lang="scss">
	.input-con {
		background-color: #fff;
		width: 600rpx;
		height: 80rpx;
		border-radius: 40rpx;
	}
	.login-con {
		background-color: #b8e2d0;
		width: 600rpx;
		height: 80rpx;
		border-radius: 40rpx;
		margin-top: 100rpx
	}
	.vertical-spliter {
		height: 100%;
		width: 1px;
		background-color: #999;
	}
</style>
