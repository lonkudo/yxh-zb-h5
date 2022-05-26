<template>
	<view class="b-f">
		<u-navbar
			:is-back="true"
			:title="'Add Snippet'"
			:title-bold="true"
			:title-color="'#000'"
			:back-icon-color="'#000'"
			:back-icon-size="40"
		>
			<text slot="right" class="margin-right-sm fc-g" @tap="saveSnippet"
				>save</text
			>
		</u-navbar>
		<view :style="{ height: myHeight + 'rpx' }">
			<view class="margin-sm">
				<u-input
					v-model="value"
					:type="type"
					:border="border"
					:height="height"
					:auto-height="autoHeight"
					placeholder="Please input the snippet you want to add"
				/>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myHeight: 0,
				value: '',
				type: 'textarea',
				border: true,
				height: 100,
				autoHeight: true,
				item: null,
			}
		},
		onLoad(options) {
			this.myHeight = this.initScrollHeight(88)
			console.log('options', options)
			if (options.item) {
				this.item = JSON.parse(options.item)
				this.value = this.item.msg
			}
		},
		methods: {
			saveSnippet() {
				if (this.value.trim().length === 0)
					return this.$u.toast("content can't be empty")

				if (this.item) {
					this.item.msg = this.value
					this.$store.commit('mod_sni', this.item)
				} else {
					setTimeout(() => {
						this.$store.commit('add_sni', this.value)
						this.value = ''
					}, 50)
				}
				// uni.navigateTo({
				// 	url: 'snippet',
				// })
				uni.navigateBack({
					delta: 1,
				})
			},
		},
	}
</script>

<style lang="scss"></style>
