<template>
	<view class="flex flex-direction b-f padding-sm">
		<view class="flex align-center justify-between h-100">
			<view>
				<text>Head Portrait</text>
			</view>
			<view v-if="!uploaded">
				<my-upload
					ref="idFront"
					:action="action"
					:file-list="fileList"
					upload-text=""
					:customBtn="true"
					:showUploadList="false"
					width="100"
					height="100"
					:form-data="passParams()"
					:multiple="false"
					v-model="form[upload.ref]"
					:prop="upload.ref"
					@on-list-change="
						(args) => {
							onListChanged(upload, args)
						}
					"
					@on-uploaded="
						(args) => {
							onUploaded(upload.ref, args)
						}
					"
				>
					<view
						v-if="upload.show"
						slot="addBtn"
						:class="['slot-btn my-upload br-8 ', upload.ref]"
						hover-class="slot-btn__hover"
						hover-stay-time="150"
					>
						<view class="flex align-center">
							<view class="margin-right-sm">
								<image :src="userInfo.avatar" class="ava-80" mode="" />
							</view>
							<text class="iconfont icon-right"></text>
						</view>
					</view>
				</my-upload>
			</view>

			<view class="flex align-center" v-else>
				<view class="margin-right-sm">
					<image :src="userInfo.avatar" class="ava-80" mode="" />
				</view>
				<text class="iconfont icon-right"></text>
			</view>
		</view>
		<view class="flex align-center justify-between h-100" @tap="go">
			<view>
				<text>Nickname</text>
			</view>
			<view class="flex align-center">
				<text class="margin-right-sm">{{ userInfo.user_nicename }}</text>
				<text class="iconfont icon-right"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import { updateInfo } from '@/api/my'
	import check from '@/utils/check'
	export default {
		data() {
			return {
				action: '/appapi/',
				fileList: [],
				form: {
					avatar: '',
				},
				upload: {
					ref: 'avatar',
					img: '',
					label: '',
					show: true,
				},
				uploaded: false,
			}
		},
		methods: {
			go() {
				uni.navigateTo({
					url: 'nickname',
				})
			},
			passParams() {
				return {
					uid: this.uid,
					token: this,
					service: 'User.UpdateLiveimg',
				}
			},
			onListChanged(item, args) {
				if (args.length === 0) {
					item.show = true
					this.form[item.ref] = ''
				} else {
					item.show = false
				}

				console.log('this.', this.form)
			},
			onUploaded(ref, args) {
				console.log('---11----11----11----11----11---')
				this.form[ref] = args[0].response.data.info.avatar
				this.updateInfo()
			},
			@check()
			updateInfo() {
				updateInfo({
					uid: this.uid,
					token: this.token,
					fields: JSON.stringify(this.form),
				})
					.then((res) => {
						this.$u.toast('succeed')
						this.uploaded = true
						this.$store.dispatch('GetInfo', { uid: this.uid, token: this.token })
						// let that = this
						// setTimeout(function () {
						// 	that.go()
						// }, 1500)
						// //更新头像，修改昵称的任务
						this.$store.dispatch('FINISH_TASK', {
							type: 1,
							taskid: 5,
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
