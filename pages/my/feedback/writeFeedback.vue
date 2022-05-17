<template>
	<view class="margin-xs b-f br-8 padding-xs">
		<u-form :model="form" ref="uForm">
			<u-form-item>
				<view>
					<text>Content:</text>
					<view>
						<u-input
							class="u-input"
							v-model="form.contact"
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
			}
		},
	}
</script>

<style lang="scss">
	.u-input {
		width: 710rpx;
	}
</style>
