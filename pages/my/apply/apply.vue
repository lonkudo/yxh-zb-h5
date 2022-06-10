<template>
	<view class="margin-xs br-8 padding-xs b-f">
		<u-form :model="form" ref="uForm">
			<view>
				<text>Upload your ID card pictures:</text>
				<view
					class="flex flex-wrap justify-between padding-left-sm padding-right-sm margin-top-sm"
				>
					<view
						v-for="(item, index) in uploadGroup"
						:key="index"
						class="margin-bottom-sm"
					>
						<u-form-item>
							<my-upload
								ref="idFront"
								:action="action"
								:file-list="fileList"
								upload-text=""
								:customBtn="true"
								width="300"
								height="170"
								:form-data="passParams()"
								:multiple="false"
								v-model="form[item.ref]"
								:prop="item.ref"
								@on-list-change="
									(args) => {
										onListChanged(item, args)
									}
								"
								@on-uploaded="
									(args) => {
										onUploaded(item.ref, args)
									}
								"
							>
								<view
									v-if="item.show"
									slot="addBtn"
									:class="['slot-btn my-upload br-8 ', item.ref]"
									hover-class="slot-btn__hover"
									hover-stay-time="150"
								>
								</view>
							</my-upload>
						</u-form-item>

						<view class="flex justify-center">
							<text class="fs-20 fc-b-9 upload-text">{{ item.label }}</text>
						</view>
					</view>
				</view>
			</view>
			<u-form-item>
				<view class="flex align-center justify-between">
					<text>Name:</text>
					<view>
						<u-input
							class="u-input margin-left-320"
							v-model="form.name"
							placeholder="Input Name"
							input-align="right"
							prop="name"
						/>
					</view>
				</view>
			</u-form-item>
			<u-form-item>
				<view class="flex align-center justify-start">
					<text>Id Card Number:</text>
					<u-input
						class="u-input margin-left-200"
						v-model="form.idNumber"
						placeholder="Input Id Card "
						input-align="right"
						prop="idNumber"
					/>
				</view>
			</u-form-item>
		</u-form>
		<u-button @click="submit" class="margin-left-lg margin-right-lg margin-top-lg"
			>submit</u-button
		>
	</view>
</template>

<script>
	import MyUpload from '@/components/my-upload/my-upload.vue'
	import { applyLive } from '@/api/my'

	export default {
		data() {
			return {
				action: '/appapi/',
				fileList: [],
				uploadGroup: [
					{
						ref: 'idFront',
						img: '@/static/styles/png/idFront.png',
						label: 'Front Face of ID Card',
						show: true,
					},
					{
						ref: 'idBack',
						img: '@/static/styles/png/idBack.png',
						label: 'Back of ID Card',
						show: true,
					},
					{
						ref: 'idHand',
						img: '@/static/styles/png/idHand.png',
						label: 'ID Card in Hand',
						show: true,
					},
				],
				form: {
					idFront: '',
					idBack: '',
					idHand: '',
					name: '',
					idNumber: '',
				},
			}
		},
		onLoad() {},
		methods: {
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
				this.form[ref] = args[0].response.data.info.avatar
				console.log('this.', this.form)
			},
			submit() {
				if (this.form.idFront.length === 0) {
					this.$u.toast('Please upload' + this.uploadGroup[0].label)
					return
				}
				if (this.form.idBack.length === 0) {
					this.$u.toast('Please upload' + this.uploadGroup[1].label)
					return
				}
				if (this.form.idHand.length === 0) {
					this.$u.toast('Please upload' + this.uploadGroup[2].label)
					return
				}
				if (this.form.name.trim().length === 0) {
					this.$u.toast('Please input your name')
					return
				}
				if (this.form.idNumber.trim().length === 0) {
					this.$u.toast('Please input your ID card number')
					return
				}
				let { idFront, idBack, idHand, name, idNumber } = this.form
				this.applyLive(
					this.uid,
					this.token,
					idFront,
					idBack,
					idHand,
					name,
					idNumber
				)
			},
			applyLive(uid, token, positive, back, hold, name, number) {
				applyLive(uid, token, positive, back, hold, name, number)
					.then((res) => {
						this.$u.toast('Apply succeed!')
						setTimeout(() => {
							uni.navigateBack({
								delta: 1,
							})
						}, 1000)
					})
					.catch((err) => {
						console.log(err)
					})
			},
		},
	}
</script>

<style lang="scss">
	.my-upload {
		width: 300rpx;
		height: 170rpx;
		background-size: 100% 100%;
		view: {
			border-bottom: 0;
		}
	}
	.idFront {
		background-image: url('@/static/styles/png/idFront.png');
	}
	.idBack {
		background-image: url('@/static/styles/png/idBack.png');
	}
	.idHand {
		background-image: url('@/static/styles/png/idHand.png');
	}
	.upload-item {
		padding: 0;
		> view {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
	.u-form-item--right__content__slot {
		border-bottom: 0;
	}
	.u-form-item__body {
		border-bottom: 0;
	}
	.upload-text {
		line-height: 60rpx;
	}
	.margin-left-200 {
		margin-left: 200rpx;
	}
	.margin-left-250 {
		margin-left: 250rpx;
	}
	.margin-left-300 {
		margin-left: 300rpx;
	}
	.margin-left-320 {
		margin-left: 320rpx;
	}
</style>
