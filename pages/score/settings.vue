<template>
	<view class="flex flex-direction">
		<view class="padding-xs padding-top-lg padding-left-lg">
			<text>GOAL TIPS</text>
		</view>
		<view class="b-f br-8 flex flex-direction margin-sm padding-sm margin-top-xs">
			<view class="flex justify-between align-center margin-bottom-sm">
				<text>Goal sound</text>
				<u-switch
					v-model="checked"
					active-color="#02b875"
					inactive-color="#eee"
				></u-switch>
			</view>
			<view class="flex justify-between align-center margin-bottom-sm">
				<view class="flex align-center">
					<text class="fs-20 fc-b-9">Home team</text>
					<view
						@tap="raiseHome($event)"
						class="input-con padding-left-xs padding-right-sm flex align-center justify-center margin-left-sm"
						><text class="fs-20 sound-option">{{ homeSound }}</text></view
					>
				</view>
				<view class="flex align-center">
					<text class="fs-20 fc-b-9">Away team</text>
					<view
						@tap="raiseAway($event)"
						class="input-con padding-left-xs padding-right-sm flex align-center justify-center margin-left-sm"
						><text class="fs-20 sound-option">{{ awaySound }}</text></view
					>
				</view>
			</view>
			<view class="flex justify-between align-center margin-bottom-sm">
				<text>Vibration</text>
				<u-switch
					v-model="checked"
					active-color="#02b875"
					inactive-color="#eee"
				></u-switch>
			</view>
			<view class="flex justify-between align-center">
				<text>Popup</text>
				<u-switch
					v-model="checked"
					active-color="#02b875"
					inactive-color="#eee"
				></u-switch>
			</view>
		</view>
		<view class="padding-xs padding-top-lg padding-left-lg">
			<text>GOAL TIPS</text>
		</view>
		<view class="b-f br-8 flex flex-direction margin-sm padding-sm margin-top-xs">
			<view class="flex justify-between align-center margin-bottom-sm">
				<text>Goal sound</text>
				<u-switch
					v-model="checked"
					active-color="#02b875"
					inactive-color="#eee"
				></u-switch>
			</view>

			<view class="flex justify-between align-center margin-bottom-sm">
				<text>Vibration</text>
				<u-switch
					v-model="checked"
					active-color="#02b875"
					inactive-color="#eee"
				></u-switch>
			</view>
			<view class="flex justify-between align-center">
				<text>Popup</text>
				<u-switch
					v-model="checked"
					active-color="#02b875"
					inactive-color="#eee"
				></u-switch>
			</view>
		</view>
		<view class="padding-xs padding-top-lg padding-left-lg">
			<text>GOAL TIPS</text>
		</view>
		<view class="b-f br-8 flex flex-direction margin-sm padding-sm margin-top-xs">
			<view class="flex justify-between align-center margin-bottom-sm">
				<text>Goal sound</text>
				<u-switch
					v-model="checked"
					active-color="#02b875"
					inactive-color="#eee"
				></u-switch>
			</view>

			<view class="flex justify-between align-center margin-bottom-sm">
				<text>Vibration</text>
				<u-switch
					v-model="checked"
					active-color="#02b875"
					inactive-color="#eee"
				></u-switch>
			</view>
			<view class="flex justify-between align-center">
				<text>Popup</text>
				<u-switch
					v-model="checked"
					active-color="#02b875"
					inactive-color="#eee"
				></u-switch>
			</view>
		</view>
		<my-popup v-model="showHome" @close="showHome = false" :pos="homePos">
			<view class="options-list flex flex-direction padding-sm b-f popup-content">
				<text
					v-for="(item, index) in optionsList"
					:key="index"
					class="fs-20 fc-b-9"
					@tap="chooseSound('home', item)"
				>
					{{ item }}
				</text>
			</view>
		</my-popup>
		<my-popup v-model="showAway" @close="showAway = false" :pos="awayPos">
			<view class="options-list flex flex-direction padding-sm b-f popup-content2">
				<text
					v-for="(item, index) in optionsList"
					:key="index"
					class="fs-20 fc-b-9"
					@tap="chooseSound('away', item)"
				>
					{{ item }}
				</text>
			</view>
		</my-popup>
	</view>
</template>

<script>
	import MyPopup from '@/components/MyPopup/MyPopup.vue'
	export default {
		components: { MyPopup },
		data() {
			return {
				optionsList: [
					'Mute',
					'Default',
					'Whistle',
					'Drum',
					'Broadcast',
					'Bugle',
					'Victory',
				],
				checked: false,
				showHome: false,
				showAway: false,
				homeSound: 'Victory',
				awaySound: 'Default',
				homePos: {},
				awayPos: {},
			}
		},
		methods: {
			chooseSound(team, item) {
				if (team === 'home') {
					this.homeSound = item
					this.showHome = false
				} else {
					this.awaySound = item
					this.showAway = false
				}
			},
			raiseHome(e) {
				console.log('e', e.detail)
				console.log('e', e)
				this.homePos = e.detail
				this.showHome = true
			},
			raiseAway(e) {
				console.log('e', e.detail)
				console.log('e', e)
				this.awayPos = e.detail
				this.showAway = true
			},
		},
	}
</script>

<style lang="scss">
	.input-con {
		border: 1rpx solid #999;
	}
	.sound-option {
		position: relative;
	}
	.sound-option ::after {
		content: '▾';
		font-size: 30rpx;
		position: absolute;
		right: -20rpx;
		top: -5rpx;
	}
	.options-list {
		text:nth-child(n) {
			border-bottom: 1rpx solid #999;
			padding: 10rpx 0;
		}
		text:nth-last-child(1) {
			border-bottom: 0;
			padding: 10rpx 0 0 0;
		}
		text:nth-child(1) {
			padding: 0 0 10rpx 0;
		}
		width: 140rpx;
	}
	.popup-content {
		transform: translate(-50%, 30%);
	}
	.popup-content2 {
		transform: translate(-50%, 30%);
	}
</style>
