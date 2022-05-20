<template>
	<view>
		<template v-if="!this.isEmpty(videoData)">
			<view class="video-container">
				<video id="myVideo" :src="videoData.detail.href" object-fit=""></video>
			</view>
			<view>
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
					@change="changeSwiper"
					:style="{ height: swiperHeight + 'px' }"
				>
					<swiper-item class="swiper-item" :key="0" @touchmove.stop="">
						<scroll-view scroll-y :id="'content-wrap' + 0" class="fix-bottom">
							<view class="flex flex-direction">
								<view class="b-f padding-xs flex flex-direction margin-bottom-sm">
									<view class="flex margin-bottom-sm">
										<image
											:src="videoData.detail.userinfo.avatar"
											class="ava-60"
											mode=""
										/>
										<view class="flex flex-direction margin-left-xs">
											<text class="fs-20 fc-b-3">{{
												videoData.detail.userinfo.user_nicename
											}}</text>
											<text class="fs-16 fc-b-9">{{
												videoData.detail.addtime | formatGiven('yyyy-MM-dd hh:ss')
											}}</text>
										</view>
										<my-button
											class="margin-left-auto"
											:text="'Follow'"
											:false-text="'Followed'"
											mana
										></my-button>
									</view>
									<view class="margin-bottom-sm f-hide w-700">
										<text>{{ videoData.detail.title }}</text>
									</view>
									<view class="flex align-center margin-bottom-sm">
										<view class="flex align-center">
											<text class="iconfont icon-shipin fc-b-9 fs-30"> </text>
											<text class="fc-b-9 fs-24">
												{{ videoData.detail.views }}
											</text>
										</view>

										<text class="fs-14 fc-b-9 margin-left-lg">{{
											videoData.detail.class_name
										}}</text>
									</view>
									<view class="flex align-center justify-between">
										<view>
											<text
												:class="[
													'iconfont fs-30 ',
													videoData.detail.islike === '1'
														? 'fc-g icon-dianzan1'
														: 'fc-b-6 icon-dianzan',
												]"
											></text>
											<text class="fc-b-6 fs-24">{{ videoData.detail.likes }}</text>
										</view>
										<view>
											<text
												:class="[
													'iconfont fs-30 ',
													videoData.detail.iscollection === '1'
														? 'fc-red icon-shoucangxiao'
														: 'fc-b-6 icon-shoucang',
												]"
											></text>
											<text class="fc-b-6 fs-24">{{ videoData.detail.collection }}</text>
										</view>
										<view>
											<text class="iconfont fc-b-6 fs-30 icon-zhuanfa"></text>
											<text class="fc-b-6 fs-24">{{ videoData.detail.shares }}</text>
										</view>
									</view>
								</view>
								<view class="b-f flex flex-direction padding-sm">
									<text class="fs-30 fc-b-3">Related Videos</text>
									<view
										class="flex margin-top-sm"
										v-for="(item, index) in videoData.recommend"
									>
										<image
											:src="item.thumb"
											mode="aspectFill"
											class="br-8"
											style="width: 280rpx; height: 130rpx"
										/>
										<view class="margin-left-xs flex flex-direction justify-end"
											><text class="f-hide w-400 fs-20 margin-bottom-auto">{{
												item.title
											}}</text
											><text class="fc-b-9 fs-20">{{
												item.userinfo.user_nicename || 'user does not exist'
											}}</text>
											<text class="fc-b-9 fs-20">{{
												item.addtime | formatGiven('yyyy-MM-dd hh:ss')
											}}</text>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
					<swiper-item class="swiper-item" :key="1" @touchmove.stop="">
						<scroll-view scroll-y :id="'content-wrap' + 1" style="height: 300rpx">
							<view class="flex flex-direction padding-xs b-f">
								<view
									class="comment flex margin-bottom-sm"
									v-for="(item, index) in commentList"
									:key="index"
								>
									<view>
										<image :src="item.userinfo.avatar" mode="" class="ava-60" />
									</view>
									<view class="flex flex-direction margin-left-xs">
										<text class="fc-b-6 fs-20">{{ item.userinfo.user_nicename }}</text>
										<text
											class="comment-content fc-b-3 fs-28 margin-top-xs h-100 w-660"
											>{{ item.content }}</text
										>
										<view class="flex justify-end align-center w-660 margin-bottom-sm">
											<text class="fc-b-9 fs-20 margin-right-auto">{{
												item.datetime
											}}</text>
											<view class="flex align-center margin-right-lg">
												<text class="iconfont icon-pinglun fc-b-3"></text>
												<text class="fc-b-9 fs-20">reply</text>
											</view>
											<view class="flex align-center">
												<text class="iconfont icon-dianzan fc-b-3"></text>
												<text class="fc-b-9 fs-20">{{ item.likes }}</text>
											</view>
										</view>
										<view
											class="br-8 padding-xs b-f6 flex flex-direction"
											v-if="item.replylist.length > 0"
										>
											<view
												class="flex flex-direction"
												v-for="(reply, index) in item.replylist"
												:key="'r' + index"
											>
												<text class="fc-b-9 fs-20">
													{{ reply.userinfo.user_nicename }}:
												</text>
												<text
													class="reply-content fc-b-3 fs-20 h-66 w-640 padding-top-xs padding-bottom-xs"
												>
													{{ reply.content }}
												</text>
												<view class="flex justify-end align-center margin-bottom-sm">
													<text class="fc-b-9 fs-20 margin-right-auto">{{
														item.datetime
													}}</text>
													<view class="flex align-center margin-right-lg">
														<text class="iconfont icon-pinglun fc-b-3"></text>
														<text class="fc-b-9 fs-20">reply</text>
													</view>
													<view class="flex align-center">
														<text class="iconfont icon-dianzan fc-b-3"></text>
														<text class="fc-b-9 fs-20">{{ reply.likes }}</text>
													</view>
												</view>
											</view>
											<text v-if="parseInt(item.replys) > 3"
												>View all {{ item.replys }} replies</text
											>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</template>
		<template v-else>
			<no-content></no-content>
		</template>
	</view>
</template>

<script>
	import { swiperAutoHeight, swiperUTabs } from '@/mixin'
	import data from './data.js'
	import commentData from './commentData'
	import MyButton from '@/components/MyButton/MyButton.vue'
	import { getVideoDetails, addLike, addCollection } from '@/api/video'
	import {
		commentFunc,
		getComments,
		getReplys,
		addCommentLike,
	} from '@/api/news'

	import NoContent from '@/components/NoContent/NoContent.vue'
	export default {
		mixins: [swiperAutoHeight, swiperUTabs],
		components: {
			MyButton,
			NoContent,
		},
		data() {
			return {
				videoData: {},
				menu: [{ name: 'Introduction' }, { name: 'Comments' }],
				commentList: commentData.commentlist, // 一级评论列表，用来渲染
				commentPage: 1,
				commentObj: {},
			}
		},
		onLoad(options) {
			// console.log(this.videoData)
			console.log('options', options.id)
			this.getVideoDetails(options.id, this.uid)
			this.getComments(this.uid, options.id, this.commentPage, 1)

			this.initScrollHeight()
			this.$nextTick(() => {
				this.setSwiperHeight()
			})
		},
		methods: {
			getVideoDetails: async function (videoid, uid) {
				await getVideoDetails(videoid, uid).then((res) => {
					// console.log(res);
					console.log('getres', res)
					this.videoData = res.info
					console.log('this', this.videoData)
					// const info = res.info
					// this.videoItem = info.detail
					// this.initPlayer(info.detail.href_w, false)
					// this.islike = res.info.detail.islike.toString()
					// this.likeNum = res.info.detail.likes
					// this.iscollection = res.info.detail.iscollection.toString()
					// this.videoList = info.recommend
					// this.addTrace('see')
					this.$nextTick(() => {
						this.setSwiperHeight()
					})
					return Promise.resolve()
				})
				// console.log(tt);
				// this.checkAttent();
			},
			/* 获取评论列表 */
			getComments(uid, videoid, p, type) {
				getComments(uid, videoid, p, type)
					.then((res) => {
						this.commentObj = res.info
						this.commentList = res.info.commentlist
						this.$nextTick(() => {
							this.setSwiperHeight()
						})
						// this.total = parseInt(res.info.comments)
						console.log('commentObj', this.commentObj)
					})
					.catch((err) => {
						console.log(err)
					})
			},
			initScrollHeight() {
				uni.getSystemInfo({
					success: function (res) {
						console.log(res.model)
						console.log(res.pixelRatio)
						console.log(res.windowWidth)
						console.log(res.windowHeight)
						console.log(res.language)
						console.log(res.version)
						console.log(res.platform)
					},
				})
			},
		},
	}
</script>

<style lang="scss">
	.video-container {
		width: 750rpx;
		height: 464rpx;
	}
	#myVideo {
		width: 100%;
		height: 100%;
	}
	.comment-content {
		width: 100%; /*盒子宽自己设置想要的宽度*/
		height: auto; /*高度自动*/
		display: inline-block; /*转为行内块元素*/
		white-space: pre-wrap; /*处理元素内的空白,保留空白符序列，但是正常地进行换行*/
		word-wrap: break-word; /*允许长单词或 URL 地址换行到下一行,在长单词或 URL 地址内部进行换行*/
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		line-height: 33rpx;
	}
	.reply-content {
		width: 100%; /*盒子宽自己设置想要的宽度*/
		height: auto; /*高度自动*/
		display: inline-block; /*转为行内块元素*/
		white-space: pre-wrap; /*处理元素内的空白,保留空白符序列，但是正常地进行换行*/
		word-wrap: break-word; /*允许长单词或 URL 地址换行到下一行,在长单词或 URL 地址内部进行换行*/
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-height: 28rpx;
	}
	.fix-bottom {
		position: fixed;
		top: 0rpx;
		bottom: 0rpx;
	}
</style>
