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
						<u-upload
							ref="idFront"
							:action="action"
							:file-list="fileList"
							upload-text=""
							:customBtn="true"
							@tap="uploadFunc(item.ref)"
							width="300"
							height="170"
							:form-data="passParams()"
							:header="{ 'x-token': '321' }"
							:multiple="false"
							@on-list-change="
								(args) => {
									onListChanged(item, args)
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
						</u-upload>
						<view class="flex justify-center">
							<text class="fs-20 fc-b-9 upload-text">{{ item.label }}</text>
						</view>
					</view>
				</view>
			</view>
			<u-form-item>
				<view>
					<text>Pictures:</text>
					<u-upload :action="action" :file-list="fileList" upload-text=""></u-upload>
					<view> </view>
				</view>
			</u-form-item>
			<u-form-item>
				<view>
					<text>Provide your contant information:</text>
					<view>
						<u-input
							class="u-input"
							v-model="form.info"
							maxlength="700"
							placeholder="Your contact info"
						/>
					</view>
				</view>
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					contact: '',
					info: '',
				},
				action: '/appapi',
				fileList: [],
				uploadGroup: [
					{
						ref: 'idFront',
						img: '/static/styles/png/idFront.png',
						label: 'Front Face of ID Card',
						show: true,
					},
					{
						ref: 'idBack',
						img: '/static/styles/png/idBack.png',
						label: 'Back of ID Card',
						show: true,
					},
					{
						ref: 'idHand',
						img: '/static/styles/png/idHand.png',
						label: 'ID Card in Hand',
						show: true,
					},
				],
			}
		},
		methods: {
			uploadFunc(ref) {
				console.log('this.$refs', this.$refs[ref])
				// this.$refs[ref].upload()
				// this.$refs[ref].upload()
				console.log('taped')
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
				} else {
					item.show = false
				}
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
			background-color: pink;
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
</style>
