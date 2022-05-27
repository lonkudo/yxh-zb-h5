<template>
	<view class="flex flex-direction align-center margin-top-lg">
		<u-form :model="loginForm" ref="uForm">
			<view class="input-con flex align-center padding-xs">
				<text class="fs-28 margin-left-xs margin-right-sm fc-b-3">+84</text>
				<text class="vertical-spliter margin-right-sm"></text>
				<u-form-item
					><u-input
						v-model="loginForm.user_login"
						class="w-450"
						placeholder="Input Phone Number"
						@blur="checkUser"
				/></u-form-item>
			</view>
			<view class="input-con flex align-center padding-xs margin-top-lg">
				<u-form-item
					><u-input
						v-model="loginForm.user_pass"
						class="w-400 margin-left-sm"
						placeholder="Input Code"
						@blur="checkPass"
				/></u-form-item>
				<text
					@tap="getCode"
					:class="[
						'fs-28 margin-left-auto margin-right-sm  fc-b-3',
						isActive ? 'active-font' : '',
						this.codeCounter === 0 ? '' : 'sending-font',
					]"
					>{{ this.codeCounter === 0 ? 'Get Code' : this.codeCounter + 's' }}
				</text>
			</view>
			<view
				:class="[
					'login-con flex align-center padding-xs margin-top-lg justify-center',
					isBtnActive ? 'active-btn' : '',
				]"
				@tap="handleLogin"
			>
				<text class="fc-b-f">Login</text>
			</view>
		</u-form>
	</view>
</template>

<script>
	import { getCode } from '@/api/login'

	export default {
		props: {
			loginMethod: {
				type: Function,
				default: function () {},
			},
		},
		data() {
			return {
				form: {
					name: '',
					phone: '',
				},
				isUserEmpty: false,
				isPassEmpty: false,
				//
				isLogin: false,
				loginForm: {
					user_login: '',
					user_pass: '',
					loginType: 'code',
				},
				loginVisible: false,
				msgStatus: false, // false 未发送 ture 发送中
				codeCounter: 0,
				expired: false,
			}
		},
		methods: {
			show() {
				uni.showToast({
					title: 'Verificaiton code has been sent, valid for 5 minutes.',
					duration: 2000,
					icon: 'none',
				})
			},
			getCode() {
				if (this.msgStatus) return
				if (!this.loginForm.user_login) {
					this.isUserEmpty = true
					uni.showToast({
						title: 'Account can not be empty',
						duration: 2000,
						icon: 'none',
					})
					return
				} else {
					this.isUserEmpty = false
				}
				if (this.loginForm.user_login.length !== 10) {
					uni.showToast({
						title: 'Account length should be 10',
						duration: 2000,
						icon: 'none',
					})
					return
				}
				getCode(this.loginForm.user_login).then((res) => {
					uni.showToast({
						title: res.msg,
						duration: 2000,
					})
					this.msgStatus = true
					this.codeCounter = 60
					/* 1分钟倒计时 */
					let timer = setInterval(() => {
						this.codeCounter -= 1
						if (this.codeCounter === 0) {
							clearInterval(timer)
							this.msgStatus = false
						}
					}, 1000)
					/* 5分钟倒计时，每次发送都会重置 */
					if (this.codeTimer) {
						clearTimeout(this.codeTimer)
						this.codeTimer = null
						this.expired = false
					}
					this.codeTimer = setTimeout(() => {
						this.expired = true
					}, 300000)

					// this.loginForm.user_pass = res.info.code;
				})
			},
			checkUser(e) {
				if (this.loginForm.user_login) this.isUserEmpty = false
				else this.isUserEmpty = true
			},
			checkPass(e) {
				// console.log('checkPass')
				if (this.loginForm.user_pass) this.isPassEmpty = false
				else this.isPassEmpty = true
			},
			logout() {
				this.$store
					.dispatch('LogOut', this.loginForm)
					.then(() => {})
					.catch(() => {})
			},
			handleLogin() {
				if (!this.loginForm.user_login) {
					this.isUserEmpty = true
					uni.showToast({
						title: 'Account can not be empty',
						duration: 2000,
						icon: 'none',
					})
					return
				} else {
					this.isUserEmpty = false
				}
				if (!this.loginForm.user_pass) {
					this.isPassEmpty = true
					let msg = 'Password'
					if (this.loginForm.loginType === 'code') {
						msg = 'Verification Code'
					}
					uni.showToast({
						title: msg + ' can not be empty',
						duration: 2000,
						icon: 'none',
					})
					return
				} else {
					this.isPassEmpty = false
				}
				if (this.loginForm.loginType === 'code') {
					const regCode = new RegExp(/^\d{6}$/)
					let isCode = regCode.test(this.loginForm.user_pass)
					// console.log('ret', regCode.test(this.loginForm.user_pass))
					if (!isCode) {
						uni.showToast({
							title: 'Verification Code' + 'should be 6 digits',
							duration: 2000,
							icon: 'none',
						})
						return
					}
				}
				this.$store
					.dispatch('Login', this.loginForm)
					.then((res) => {
						if (res.code === 0) {
							this.loginVisible = false
							let info = res.info
							this.avatar = info.avatar
							this.nicename = info.nicename
							// this.token = info.token
							// this.userInfo = info
							this.$store.dispatch('GetInfo', {
								uid: info.id,
								token: info.token,
							})
							this.$store.dispatch('GetUserLevel', {
								uid: info.id,
								token: info.token,
							})
							this.$store.dispatch('search/changeKeyword', {
								key: 'keyword',
								value: '',
							})
							uni.navigateBack({
								delta: 1,
							})
						} else {
							this.$message({
								message: 'error' + res.msg,
								type: 'warning',
							})
						}
					})
					.catch(() => {
						uni.showToast({
							title: 'Verification Code ' + 'error',
							duration: 2000,
							icon: 'none',
						})
					})
					.finally(() => {
						this.loginMethod()
					})
			},
		},
		computed: {
			isActive: function () {
				// console.log('userLogin', this.loginForm.user_login.length)
				if (this.loginForm.user_login.length === 10) {
					// console.log('in true')
					return true
				} else {
					return false
				}
			},
			isBtnActive: function () {
				if (
					this.loginForm.user_login.length === 10 &&
					this.loginForm.user_pass.length > 0
				) {
					return true
				} else {
					return false
				}
			},
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
		margin-top: 100rpx;
	}
	.vertical-spliter {
		height: 100%;
		width: 1px;
		background-color: #999;
	}
	.active-btn {
		background-color: #02b875 !important;
	}
	.active-font {
		color: #02b875 !important;
	}
	.sending-font {
		color: #b8e2d0 !important;
	}
</style>
