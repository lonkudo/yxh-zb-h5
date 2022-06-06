<template>
	<view>
		<u-navbar
			:is-back="true"
			:title="'Feedback'"
			:title-bold="true"
			:title-color="'#000'"
			:back-icon-color="'#000'"
			:back-icon-size="40"
		>
			<navigator :url="'add'" slot="right"
				><text class="margin-right-sm fc-g iconfont icon-add-bold"></text
			></navigator>
		</u-navbar>
		<scroll-view scroll-y :style="{ height: myHeight + 'rpx' }" class="b-f">
			<u-swipe-action
				:show="item.show"
				:index="index"
				@click="
					(index, index1) => {
						click(index, index1, item)
					}
				"
				@open="open(item)"
				:options="options"
				v-for="(item, index) in snippetList"
				:key="item.timestamp"
				btn-width="150"
			>
				<view class="margin-sm flex justify-between">
					<text class="fc-b-6 fs-24 f-hide w-500">{{ item.msg }}</text>
					<text
						class="fc-g fs-30 iconfont icon-bianji"
						@tap="go('add', item)"
					></text>
				</view>
			</u-swipe-action>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myHeight: 0,
				options: [
					{
						text: 'delete',
						style: {
							backgroundColor: '#dd524d',
						},
					},
				],
			}
		},
		onLoad() {
			this.myHeight = this.initScrollHeight(88)
		},
		onShow() {},
		computed: {
			snippetList: function () {
				return this.$store.state.snippet.snippetList
			},
		},
		methods: {
			click(index, index1, item) {
				this.$store.commit('del_sni', item)
			},
			open(item) {
				this.$store.commit('show_sni', item)
			},
			go(path, item) {
				if (path === 'add') {
					uni.navigateTo({
						url: 'add?item=' + JSON.stringify(item),
					})
				}
			},
		},
	}
</script>

<style lang="scss"></style>
