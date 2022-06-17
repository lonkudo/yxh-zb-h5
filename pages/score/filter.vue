<template>
	<view>
		<!-- 赛事筛选 -->
		<scroll-view :style="{ height: myHeight + 'rpx' }" scroll-y>
			<u-index-list :scrollTop="scrollTop" class="b-f">
				<!-- 原生checkbox直接隐藏了使用但是可以点击，直接使用自定义的样式具体看scss -->
				<checkbox-group @change="eventChecked">
					<view v-for="(event, index) in compeInfo" :key="index">
						<view @tap="eventGroup(index)">
							<u-index-anchor :index="event.title" style="background-color: #fff" />
						</view>
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
		</scroll-view>

		<view
			class="h-100 flex align-center justify-start padding-left-sm padding-right-sm b-f"
		>
			<text class="margin-left-lg margin-right-lg" @tap="handleCompe('all')"
				>All</text
			>
			<text class="margin-left-lg" @tap="handleCompe('inverse')">Inverse</text>
			<my-button
				mana
				:text="'Confirm'"
				class="margin-left-auto"
				@onTap="go('score')"
			></my-button>
		</view>
	</view>
</template>

<script>
	import { getCompe } from '@/api/score'
	import MyButton from '../../components/MyButton/MyButton.vue'
	import { FilterBus } from '@/utils/bus.js'

	export default {
		components: { MyButton },
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
				compeInfo: [],
				myHeight: 0,
				type: 1,
			}
		},
		async onLoad(options) {
			this.type = options.type
			this.compePage.type = options.type
			this.myHeight = this.initScrollHeight(188)
			await this.getCompe()
			if (options.type === '1') {
				if (!this.$store.state.filter.initOngoing) return
				this.eventChecked({
					detail: {
						value: this.$store.state.filter.ongoing,
					},
				})
			} else if (options.type === '2') {
				if (!this.$store.state.filter.initFinished) return
				this.eventChecked({
					detail: {
						value: this.$store.state.filter.finished,
					},
				})
			} else if (options.type === '3') {
				if (!this.$store.state.filter.initFuture) return
				this.eventChecked({
					detail: {
						value: this.$store.state.filter.future,
					},
				})
			}
		},
		methods: {
			go(val) {
				console.log('emit', this.eventsList)
				if (val === 'score') {
					if (this.eventsList.length === 0)
						return this.$u.toast('Choose one event at least')
					FilterBus.$emit('confirm', { compe_id: this.eventsList, type: this.type })
					uni.switchTab({
						url: '/pages/score/score',
					})
				}
			},
			onPageScroll(e) {
				this.scrollTop = e.scrollTop
			},
			getCompe() {
				/* 获取赛事筛选的列表 */
				this.compePage.time = this.formatGiven(new Date(), 'yyyyMMdd')
				// console.log('compePage.time', this.compePage)
				return new Promise((resolve, reject) => {
					getCompe(this.compePage)
						.then((res) => {
							this.compeInfo = res.info
							this.compeInfo = res.info
							this.compeInfo.selectAll = true
							this.eventsList = []
							this.allEvents = []
							this.compeInfo.forEach((ele) => {
								ele.selectAll = true
								ele.compe.forEach((element) => {
									element.isSelected = true
									this.eventsList.push(element.id)
									this.allEvents.push(element.id)
									// safe
								})
							})
							resolve()
						})
						.catch((err) => {
							console.log(err)
						})
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
			eventChecked(e) {
				console.log('eventChecked', e.detail.value)
				this.eventsList = e.detail.value
				console.log('---333----333----333----333----333---', this.compeInfo)
				this.compeInfo.forEach((ele) => {
					ele.compe.forEach((element) => {
						const index = this.eventsList.indexOf(element.id)
						console.log('---4----4----4----4----4---', index)
						if (index === -1) {
							element.isSelected = false
						} else {
							element.isSelected = true
						}
					})
				})
				this.compeInfo = JSON.parse(JSON.stringify(this.compeInfo))
			},
			eventGroup(index) {
				console.log('tap', index)
				/* 每组一起选中反选 */
				if (this.compeInfo[index].selectAll) {
					this.compeInfo[index].compe.forEach((ele) => {
						ele.isSelected = false
						let index = this.eventsList.findIndex((element) => {
							console.log('ele', ele.id)
							return element === ele.id
						})
						if (index !== -1) {
							this.eventsList.splice(index, 1)
						}
					})
					this.compeInfo[index].selectAll = false
				} else {
					this.compeInfo[index].compe.forEach((ele) => {
						ele.isSelected = true
						let index = this.eventsList.findIndex((element) => {
							return element === ele.id
						})
						if (index === -1) {
							this.eventsList.push(ele.id)
						}
					})
					this.compeInfo[index].selectAll = true
				}
				this.compeInfo = JSON.parse(JSON.stringify(this.compeInfo))
				console.log('this', this.eventsList)
			},
			handleCompe(event) {
				let flag = true
				if (event === 'all') {
					if (this.compeInfo.selectAll) {
						console.log('---2----2----2----2----2---')
						this.compeInfo.forEach((ele, outerIndex) => {
							ele.compe.forEach((element, index) => {
								element.isSelected = false
							})
						})
						console.log('---3----3----3----3----3---')
						this.eventsList = []
						this.compeInfo.selectAll = false
						console.log('this.', this.eventsList)
						flag = false
					} else {
						this.compeInfo.forEach((ele) => {
							ele.compe.forEach((element, index) => {
								element.isSelected = true
							})
						})
						this.eventsList = this.allEvents
						this.compeInfo.selectAll = true
						flag = true
						console.log('this.', this.eventsList)
					}
				} else if (event === 'inverse') {
					this.compeInfo.forEach((ele) => {
						ele.compe.forEach((element, index) => {
							element.isSelected = !element.isSelected
						})
					})
					let newArr = []
					this.allEvents.forEach((ele) => {
						if (!this.eventsList.includes(ele)) {
							newArr.push(ele)
						}
					})
					this.eventsList = newArr
				}
				this.compeInfo = JSON.parse(JSON.stringify(this.compeInfo))
				this.compeInfo.selectAll = flag
				console.log('this.compe', this.compeInfo)
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
