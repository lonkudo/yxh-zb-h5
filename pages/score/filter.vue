<template>
	<u-index-list :scrollTop="scrollTop" class="b-f">
		<checkbox-group @change="eventChecked">
			<view v-for="(event, index) in indexList" :key="index">
				<u-index-anchor :index="event.title" style="background-color: #fff" />
				<view class="flex flex-wrap">
					<label
						class="uni-list-cell uni-list-cell-pd"
						v-for="item in event.compe"
						:key="item.id"
					>
						<view
							:class="[
								'w-300 f-hide compe-item text-center',
								item.isSelected ? 'active' : 'in-active',
							]"
						>
							<checkbox
								:value="item.id"
								:checked="item.isSelected"
								style="display: none"
								:id="item.id"
							></checkbox>
							<view class="f-hide">{{ item.name }}</view>
						</view>
					</label>
				</view>
			</view>
		</checkbox-group>
	</u-index-list>
</template>

<script>
	import { getCompe } from '@/api/score'
	export default {
		data() {
			return {
				compePage: {
					type: 1,
					time: '',
				},
				eventsList: [],
				allEvents: [],
				lagHideInfo: '',
				initFlag: true,
				selectable: true,
				scrollTop: 0,
				indexList: [],
			}
		},
		onLoad() {
			this.getCompe()
		},
		methods: {
			onPageScroll(e) {
				this.scrollTop = e.scrollTop
			},
			getCompe() {
				/* 获取赛事筛选的列表 */
				this.compePage.time = this.formatGiven(new Date(), 'yyyyMMdd')
				// console.log('compePage.time', this.compePage)
				getCompe(this.compePage)
					.then((res) => {
						this.compeInfo = res.info
						this.indexList = res.info
						console.log('res', res.info)
						this.compeInfo.selectAll = false
						this.eventsList = []
						this.allEvents = []
						this.compeInfo.forEach((ele) => {
							ele.selectAll = false
							ele.compe.forEach((element) => {
								element.isSelected = true
								this.eventsList.push(element.id)
								this.allEvents.push(element.id)
								// safe
							})
						})
					})
					.catch((err) => {
						console.log(err)
					})
			},
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				//console.log(e);
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				// console.log(e);
			},
			// 全选
			checkedAll() {
				this.list.map((val) => {
					val.checked = true
				})
			},
			eventChecked(e, detail) {
				console.log('item', e)
				console.log('item', e.detail.value)
			},
		},
	}
</script>

<style lang="scss">
	.box {
		position: relative;
		checkbox {
			width: 300rpx;
		}
	}
	checkbox .uni-checkbox-input {
		width: 300rpx;
		border-radius: 50%;
	}
	checkbox .uni-chechbox::before {
		display: none;
	}
	checkbox .uni-checkbox::before {
		/* font-family: 'cuIcon'; */
		content: '';
		position: absolute;
		color: #ffffff !important;
		top: 50%;
		margin-top: -8px;
		right: 5px;
		font-size: 15px;
		line-height: 16px;
		pointer-events: none;
		-webkit-transform: scale(1, 1);
		transform: scale(1, 1);
		transition: all 0.3s ease-in-out 0s;
		z-index: 9;
	}
	.uni-checkbox > div > div {
		display: none;
	}
	.compe-item {
		font-size: 20rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 20rpx;
		padding: 0 10rpx;
		margin: 15rpx 20rpx;
	}
	.compe-item.active {
		background-color: #02b875;
		color: #fff;
	}
	.compe-item.in-active {
		background-color: #fff;
		color: #999;
		border: 1rpx solid #999;
	}
	.u-index-anchor {
		background-color: #fff !important;
	}
</style>
