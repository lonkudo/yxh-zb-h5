<template>
	<view class="flex flex-direction b-f padding-sm">
		<view class="flex justify-between">
			<text class="fs-30 fc-b-9">Nickname</text>
			<text class="fs-30 fc-g" @tap="saveNickname">Save</text>
		</view>
		<u-input v-model="form.user_nicename" />
	</view>
</template>

<script>
	import { updateInfo } from '@/api/my'

	export default {
		data() {
			return {
				form: {
					user_nicename: '',
				},
			}
		},
		onLoad() {
			this.guard()
			this.form.user_nicename = this.userInfo.user_nicename
		},
		methods: {
			saveNickname() {
				if (this.form.user_nicename.trim().length === 0) {
					return this.$u.toast("Nickname can't be empty")
				}
				this.updateInfo()
			},
			updateInfo() {
				this.guard()
				updateInfo({
					uid: this.uid,
					token: this.token,
					fields: JSON.stringify(this.form),
				})
					.then((res) => {
						this.$u.toast('succeed')
						this.$store.dispatch('GetInfo', { uid: this.uid, token: this.token })
						// let that = this
						// setTimeout(function () {
						// 	that.go()
						// }, 1500)
						// //更新头像，修改昵称的任务

						this.$store.dispatch('FINISH_TASK', {
							type: 1,
							taskid: 6,
							that: this,
						})
					})
					.catch((err) => {
						console.log(err)
					})
			},
		},
	}
</script>

<style lang="scss"></style>
