<template>
	<view>
		<view
			class="top-card margin-xs br-8 padding-xs flex justify-between bg-custom padding-top-lg"
		>
			<view>
				<text class="flex flex-direction fc-b-f fs-20 margin-bottom-xs"
					>My coins</text
				>
				<text class="fc-b-f fs-30 fw-9">2</text>
			</view>
			<view class="fc-b-f fs-20">Gold Record ></view>
		</view>
		<view class="margin-xs br-8 padding-xs b-f">
			<view class="margin-bottom-sm flex justify-between">
				<view>
					<text class="fc-b-3 fs-20">My coins</text>
				</view>
				<view class="fc-b-9 fs-20">Sign-in Rules ></view>
			</view>
			<view class="flex align-center justify-around">
				<view
					v-for="(item, index) in coinList"
					:key="index"
					class="flex flex-direction align-center"
				>
					<coin class="my-coin" :num="'5'"></coin>
					<text class="fs-16 fc-b-9 date">{{ item.label }}</text>
				</view>
			</view>
		</view>
		<view class="b-f">
			<u-tabs-swiper
				ref="uTabs"
				:list="menu"
				:current="current"
				@change="tabsChange"
				:is-scroll="false"
				swiperWidth="750"
				active-color="#02b875"
			></u-tabs-swiper>
			<swiper
				:current="swiperCurrent"
				@transition="transition"
				@animationfinish="animationfinish"
				style="height: 400rpx"
			>
				<swiper-item class="swiper-item" :key="0" style="height: 100%">
					<scroll-view
						scroll-y
						style="width: 100%; height: 100%"
						@scrolltolower="onreachBottom"
					>
						<view class="flex flex-direction">
							<view
								class="margin-xs flex align-center justify-between"
								v-for="(item, index) in taskList"
								:key="index"
							>
								<view class="flex">
									<view
										class="bg-green icon flex align-center justify-around margin-right-xs"
									>
										<text :class="['iconfont fs-36', item.icon]"></text>
									</view>
									<view class="flex flex-direction">
										<text class="fs-10 fc-b-3">{{ item.name }}</text>
										<text class="fs-10 fc-b-9">{{ item.details }}</text>
									</view>
								</view>
								<my-button-reverse
									:text="'To Complete'"
									:falseText="'Completed'"
								></my-button-reverse>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import Coin from '@/components/Coin/Coin.vue'
	import MyButtonReverse from '@/components/MyButtonReverse/MyButtonReverse.vue'
	export default {
		components: {
			Coin,
			MyButtonReverse,
		},
		data() {
			return {
				coinList: [
					{ label: 'Today' },
					{ label: '05-17' },
					{ label: '05-17' },
					{ label: '05-17' },
					{ label: '05-17' },
					{ label: '05-17' },
					{ label: '05-17' },
				],
				/* tabs+swiper内容 */
				menu: [{ name: 'Daily Task' }, { name: 'Live Task' }],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				taskList: [
					{
						name: 'browse 2 articles',
						details: 'Earn 15 Gold Coins',
						icon: 'icon-quanburenwu',
					},
					{
						name: 'browse 2 articles',
						details: 'Earn 15 Gold Coins',
						icon: 'icon-quanburenwu',
					},
					{
						name: 'browse 2 articles',
						details: 'Earn 15 Gold Coins',
						icon: 'icon-yunhang',
					},
					{
						name: 'browse 2 articles',
						details: 'Earn 15 Gold Coins',
						icon: 'icon-baobiao',
					},
				],
			}
		},
		methods: {
			tabsChange(index) {
				this.swiperCurrent = index
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx
				this.$refs.uTabs.setDx(dx)
			},
			animationfinish(e) {
				let current = e.detail.current
				this.$refs.uTabs.setFinishCurrent(current)
				this.swiperCurrent = current
				this.current = current
			},
		},
	}
</script>

<style lang="scss">
	.top-card {
		height: 200rpx;
	}
	.bg-custom {
		background-image: url('@/static/styles/png/bg-my.png');
		background-size: 100% auto;
		background-color: pink;
	}
	.my-coin {
		transform: scale(0.6);
	}
	.date {
		margin-left: -5rpx;
	}
	.icon {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}
</style>
