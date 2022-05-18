<template>
	<view class="margin-xs br-8 padding-xs b-f">
		<u-form :model="form" ref="uForm">
			<view>
				<text>Upload your ID card pictures:</text>
				<view
					class="flex flex-wrap justify-between padding-left-sm padding-right-sm margin-top-sm"
				>
					<view
						@tap="uploadFunc('idFront')"
						v-for="(item, index) in uploadGroup"
						:key="index"
						:class="['margin-bottom-sm', item.ref]"
					>
						<u-upload
							ref="idFront"
							:action="action"
							:file-list="fileList"
							upload-text=""
							:customBtn="true"
							@tap="uploadFunc(item.ref)"
						>
							<view
								slot="addBtn"
								class="slot-btn my-upload br-8 idFront"
								hover-class="slot-btn__hover"
								hover-stay-time="150"
							>
							</view>
						</u-upload>
						<text class="fs-20 fc-b-9 padding-left-lg upload-text">{{
							item.label
						}}</text>
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
				action: 'http://test.com',
				fileList: [],
				uploadGroup: [
					{
						ref: 'idFront',
						img: '/static/styles/png/idFront.png',
						label: 'Front Face of ID Card',
					},
					{
						ref: 'idBack',
						img: '/static/styles/png/idBack.png',
						label: 'Back of ID Card',
					},
					{
						ref: 'idHold',
						img: '/static/styles/png/idHold.png',
						label: 'Hold ID Card',
					},
				],
			}
		},
		methods: {
			uploadFunc(ref) {
				console.log('this.$refs', this.$refs[ref])
				this.$refs[ref].upload()
				// this.$refs[ref].upload()
				console.log('taped')
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
