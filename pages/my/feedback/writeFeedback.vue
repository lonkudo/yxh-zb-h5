<template>
	<view class="margin-xs b-f br-8 padding-xs">
		<u-form :model="form" ref="uForm">
			<u-form-item>
				<view>
					<text>Content:</text>
					<view>
						<u-input
							class="u-input"
							v-model="form.content"
							maxlength="700"
							type="textarea"
							placeholder="Please describe the bug you've encounterd. Or anything you want us to improve."
						/>
					</view>
				</view>
			</u-form-item>
			<u-form-item>
				<view>
					<text>Pictures:</text>
					<u-upload
						ref="uUpload"
						:action="action"
						:file-list="fileList"
						upload-text=""
						:form-data="passParams()"
						:multiple="false"
						@on-list-change="onListChanged"
						@on-uploaded="onUploaded"
					></u-upload>
					<view> </view>
				</view>
			</u-form-item>
			<u-form-item>
				<view>
					<text>Provide your contant information:</text>
					<view>
						<u-input
							class="u-input"
							v-model="form.model"
							maxlength="700"
							placeholder="Your contact info"
						/>
					</view>
				</view>
			</u-form-item>
		</u-form>
		<u-button @click="submit" class="margin-left-lg margin-right-lg"
			>submit</u-button
		>
	</view>
</template>

<script>
	import { sendFeedback } from '@/api/my'
	export default {
		data() {
			return {
				form: {
					fb_type: '1',
					model: '',
					content: '',
					thumb: '',
				},
				action: '/appapi/',
				fileList: [],
			}
		},
		methods: {
			passParams() {
				return {
					uid: this.uid,
					token: this,
					service: 'User.UpdateLiveimg',
				}
			},
			onListChanged(args) {
				if (args.length === 0) {
					this.form.thumb = ''
				} else {
				}
				console.log('form', this.form)
			},
			onUploaded(args) {
				this.form.thumb = args[0].response.data.info.avatar
			},
			submit() {
				if (this.form.content.trim().length === 0) {
					this.$u.toast('Please input your feedback content')
					return
				}
				Object.assign(this.form, { uid: this.uid, token: this.token, fb_type: 1 })

				sendFeedback(this.form)
					.then((res) => {
						this.$u.toast('Feedback succeed!')
						this.form = {
							fb_type: '1',
							model: '',
							content: '',
							thumb: '',
						}
						this.$refs.uUpload.clear()
					})
					.catch((err) => {})
			},
		},
	}
</script>

<style lang="scss">
	.u-input {
		width: 710rpx;
	}
</style>
