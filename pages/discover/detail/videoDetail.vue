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
					:style="{ height: myHeight + 'rpx' }"
				>
					<swiper-item class="swiper-item" :key="0" @touchmove.stop="">
						<scroll-view
							scroll-y
							:id="'content-wrap' + 0"
							class="fix-bottom"
							:style="{ height: myHeight + 'rpx' }"
						>
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
											:initActive="isattent === '1'"
											@onTap="guanzhu"
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
										<view @tap="addLike">
											<text
												:class="[
													'iconfont fs-30 ',
													islike === '1' ? 'fc-g icon-dianzan1' : 'fc-b-6 icon-dianzan',
												]"
											></text>
											<text class="fc-b-6 fs-24">{{ likeNum }}</text>
										</view>
										<view @tap="addCollection">
											<text
												:class="[
													'iconfont fs-30 ',
													iscollection === '1'
														? 'fc-red icon-shoucangxiao'
														: 'fc-b-6 icon-shoucang',
												]"
											></text>
											<text class="fc-b-6 fs-24">{{ collection }}</text>
										</view>
										<view @tap="share">
											<text class="iconfont fc-b-6 fs-30 icon-zhuanfa"></text>
											<!-- <text class="fc-b-6 fs-24">{{ videoData.detail.shares }}</text> -->
										</view>
									</view>
								</view>
								<view class="b-f flex flex-direction padding-sm">
									<text class="fs-30 fc-b-3">Related Videos</text>
									<view
										class="flex margin-top-sm"
										v-for="(item, index) in videoData.recommend"
										@tap="go('related', item)"
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
					<swiper-item
						class="swiper-item"
						:key="1"
						@touchmove.stop=""
						:style="{ height: myHeight + 'rpx' }"
					>
						<view :style="{ height: myHeight + 'rpx' }">
							<template v-if="commentList.length > 0">
								<scroll-view
									scroll-y
									:id="'content-wrap' + 1"
									:style="{ height: myHeight2 + 'rpx' }"
									@scrolltolower="addMore"
								>
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
													class="comment-content fc-b-3 fs-28 margin-top-xs h-100 w-660 f-hide-3"
													>{{ item.content }}</text
												>
												<view class="flex justify-end align-center w-660 margin-bottom-sm">
													<text class="fc-b-9 fs-20 margin-right-auto">{{
														item.datetime
													}}</text>
													<view
														class="flex align-center margin-right-lg"
														@tap="chooseReply(item)"
													>
														<text class="iconfont icon-pinglun fc-b-3"></text>
														<text class="fc-b-9 fs-20">reply</text>
													</view>
													<view class="flex align-center" @tap="likeComment(item)">
														<text
															:class="[
																'iconfont ',
																item.islike === '1'
																	? 'fc-g icon-dianzan1'
																	: 'fc-b-3 icon-dianzan',
															]"
														></text>
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
														<view class="flex align-center">
															<text class="fc-b-9 fs-20">
																{{ reply.userinfo.user_nicename }}
															</text>
															<template
																v-if="parseInt(reply.commentid) !== parseInt(reply.parentid)"
															>
																<text class="fc-b-3 margin-left-xs margin-right-xs">reply</text
																><text class="fc-b-9"
																	>{{ reply.touserinfo.user_nicename }} :</text
																>
															</template>
															<template v-else>
																<text>:</text>
															</template>
														</view>
														<text
															class="reply-content fc-b-3 fs-20 h-66 w-640 padding-top-xs padding-bottom-xs f-hide-2"
														>
															{{ reply.content }}
														</text>
														<view class="flex justify-end align-center margin-bottom-sm">
															<text class="fc-b-9 fs-20 margin-right-auto">{{
																item.datetime
															}}</text>
															<view
																class="flex align-center margin-right-lg"
																@tap="chooseReply(item, reply)"
															>
																<text class="iconfont icon-pinglun fc-b-3"></text>
																<text class="fc-b-9 fs-20">reply</text>
															</view>
															<view class="flex align-center" @tap="likeComment(reply)">
																<text
																	:class="[
																		'iconfont ',
																		reply.islike === '1'
																			? 'fc-g icon-dianzan1'
																			: 'fc-b-3 icon-dianzan',
																	]"
																></text>
																<text class="fc-b-9 fs-20">{{ reply.likes }}</text>
															</view>
														</view>
													</view>
													<text
														class="fc-b-3"
														v-if="
															parseInt(item.replys) > 3 &&
															item.replylist.length !== parseInt(item.replys)
														"
														@tap="getReplys(item)"
														>View all {{ item.replys }} replies</text
													>
												</view>
											</view>
										</view>
									</view>
									<u-loadmore
										:status="status"
										:icon-type="iconType"
										:load-text="loadText"
										bg-color="#fff"
									/>
								</scroll-view>
							</template>
							<template v-else>
								<no-content :height="myHeight"></no-content>
							</template>
							<view
								class="bottom-input-group b-f padding-sm flex align-center justify-between"
							>
								<view class="flex input-con b-f6 align-center">
									<input
										type="text"
										:placeholder="inputMsg"
										v-model="inputContent"
										placeholder-style="color:#aaa"
										class="w-550"
									/>
								</view>
								<text class="fc-b-3 margin-right-sm" @tap="send">send</text>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</template>
		<template v-else>
			<no-content :height="screenHeight"></no-content>
		</template>
	</view>
</template>

<script>
	import { swiperAutoHeight, swiperUTabs } from '@/mixin'

	import MyButton from '@/components/MyButton/MyButton.vue'
	import { getVideoDetails, addLike, addCollection } from '@/api/video'
	import {
		commentFunc,
		getComments,
		getReplys,
		addCommentLike,
	} from '@/api/news'
	import { setAttent } from '@/api/live'

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
				commentList: [], // 一级评论列表，用来渲染
				commentPage: 1,
				commentObj: {},
				myHeight: 0,
				myHeight2: 0,
				screenHeight: 0,
				videoid: 0,
				iscollection: '',
				collection: '',
				isLike: '',
				likeNum: '',
				isattent: '',
				inputMsg: 'comments',
				inputContent: '',
				chosen: {},
				MEDIA_TYPE: 1, // 1视频 2新闻
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: 'pull up to load more',
					loading: 'loading',
					nomore: 'no more data',
				},
				loadingFlag: false,
			}
		},
		async onLoad(options) {
			// console.log(this.videoData)
			this.screenHeight = await this.initScrollHeight(0)
			this.myHeight = await this.initScrollHeight(544)
			this.myHeight2 = await this.initScrollHeight(644)

			this.videoid = options.id
			if (this.isEmpty(this.uid)) {
				await this.getVideoDetails(options.id, '100')
			} else {
				await this.getVideoDetails(options.id, this.uid)
			}
			await this.getComments(
				this.uid,
				this.videoid,
				this.commentPage,
				this.MEDIA_TYPE
			)
		},
		onShow() {
			console.log('onshow')
		},
		methods: {
			getVideoDetails: async function (videoid, uid) {
				await getVideoDetails(videoid, uid).then((res) => {
					// console.log(res);
					// console.log('getres', res)s
					this.videoData = res.info
					// console.log('this', this.videoData)
					// const info = res.info
					// this.videoItem = info.detail
					// this.initPlayer(info.detail.href_w, false)
					this.islike = res.info.detail.islike.toString()
					this.likeNum = res.info.detail.likes
					this.iscollection = res.info.detail.iscollection.toString()
					this.collection = res.info.detail.collection.toString()
					this.isattent = res.info.detail.isattent
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
						this.commentList = this.commentList.concat(res.info.commentlist)
						this.$nextTick(() => {
							this.setSwiperHeight()
						})
						this.total = parseInt(res.info.comments)
						console.log('commentObj', this.commentObj)
						this.loadingFlag = false
					})
					.catch((err) => {
						console.log(err)
					})
			},
			addMore() {
				console.log('bottom')
				if (this.loadingFlag) return
				if (this.commentPage >= this.total / 20) return (this.status = 'nomore')
				console.log('---1----1----1----1----1---')
				this.status = 'loading'
				this.loadingFlag = true
				this.commentPage = ++this.commentPage
				setTimeout(() => {
					let uid = 100
					if (!this.isEmpty(this.uid)) uid = this.uid
					this.getComments(uid, this.videoid, this.commentPage, this.MEDIA_TYPE)
					console.log('this.total', this.total, this.commentPage, this.total / 20)
					if (this.commentPage >= this.total / 20) this.status = 'nomore'
					else this.status = 'loading'
				}, 2000)
			},
			getReplys(item) {
				getReplys(this.uid, item.id, 1, this.MEDIA_TYPE)
					.then((res) => {
						item.replylist = res.info
					})
					.catch((err) => {
						console.log(err)
					})
			},
			chooseReply(cInfo, rInfo) {
				this.guard()
				console.log('---333----333----333----333----333---')
				if (rInfo === undefined) {
					this.inputMsg = 'reply ' + cInfo.userinfo.user_nicename
				} else {
					this.inputMsg = 'reply ' + rInfo.userinfo.user_nicename
				}
				const infoObj = {
					// parentid 是用来筛选一级id的字段。 commentid是 二级评论里面用来找他回复了谁的id
					commentid: rInfo?.id || cInfo.commentid, // 我回复了这个评论，所以提交的commentid 是当前这个评论的id
					touid: rInfo?.uid || cInfo.uid, // 我回复了这个评论，所以提交的touid是当前这个评论的uid
					parentid: cInfo.id, // parentid 是所属的一级评论的id
					type: this.MEDIA_TYPE,
				}
				this.chosen = infoObj
			},
			postComment(args) {
				this.guard()
				this.commentFunc({ videoid: this.videoid, content: this.inputContent })
			},
			commentFunc(obj) {
				const uid = this.uid
				const token = this.token
				Object.assign(obj, {
					uid,
					token,
					type: this.MEDIA_TYPE,
					videoid: this.videoid,
				})
				commentFunc(obj)
					.then((res) => {
						if (res.code !== 0) return this.$u.toast(res.msg)
						this.commentList = []
						this.commentPage = 1
						this.getComments(uid, this.videoid, this.commentPage, this.MEDIA_TYPE)
						this.$u.toast('Comment posted!')
						this.inputContent = ''
					})
					.catch((err) => {
						console.log(err)
					})
			},
			send() {
				if (this.inputContent.trim().length === 0)
					return this.$u.toast("Content can't be empty")
				if (this.inputMsg === 'comments') {
					this.postComment()
				} else {
					this.postReply()
				}
			},
			/* 回复评论 */
			postReply() {
				this.guard()
				const uid = this.uid
				const token = this.token
				const replyObj = Object.assign(this.chosen, {
					uid,
					token,
					videoid: this.videoid,
					content: this.inputContent,
				})
				commentFunc(replyObj)
					.then((res) => {
						if (res.code !== 0) return this.$u.toast(res.msg)
						this.commentPage = 1
						this.commentList = []
						this.getComments(uid, this.videoid, this.commentPage, this.MEDIA_TYPE)
						this.$u.toast('Reply succeed!')
						this.inputMsg = 'comments'
						this.inputContent = ''
						this.chosen = {}
					})
					.catch((err) => {
						this.$u.toast('Please reply after login')
						console.log(err)
					})
			},
			likeComment(item) {
				this.guard()
				this.addCommentLike(item.id, this.MEDIA_TYPE, item.parentid, item) //  id,type,parentid
				// const uid = window.localStorage.getItem('uid') || 0
				// this.getComments(uid, this.curNewsId, this.commentPage, 2)
			},
			/* 添加喜欢（点赞） */
			addCommentLike(selfid, type, fatherid, item) {
				const uid = this.uid
				const token = this.token
				addCommentLike(uid, token, selfid, type)
					.then((res) => {
						console.log('res.info', res)
						item.likes = res.info.likes
						item.islike = res.info.islike
						if (item.islike === '1') {
							this.$u.toast('liked')
						} else {
							this.$u.toast('unliked')
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
			addCollection() {
				this.guard()
				const token = this.token
				const uid = this.uid
				addCollection({
					token,
					uid,
					mediaid: this.videoid,
					type: this.MEDIA_TYPE,
				})
					.then((res) => {
						// islike 1点赞  0 未点赞
						let info = res.info
						if (res.info.iscollection === '1') {
							this.$u.toast('collection added')
						} else {
							this.$u.toast('collection removed')
						}
						this.collection = res.info.collection
						this.iscollection = res.info.iscollection
					})
					.catch((err) => {
						this.$u.toast('login first')
					})
			},
			addLike() {
				this.guard()
				const token = this.token
				const uid = this.uid
				addLike({ token, uid, videoid: this.videoid, type: this.MEDIA_TYPE })
					.then((res) => {
						// islike 1点赞  0 未点赞
						let info = res.info
						this.islike = info.islike
						this.likeNum = info.likes
						if (info.islike === '1') {
							this.$u.toast('liked')
							// this.addTrace('like')
						} else {
							this.$u.toast('unliked')
							// this.addTrace('unlike')
						}
					})
					.catch((err) => {
						this.$u.toast('login first')
					})
			},
			share() {
				this.$u.toast('download app to share')
			},
			guanzhu() {
				this.guard()
				let token = this.token
				let uid = this.uid
				let touid = this.videoData.detail.userinfo.id
				console.log('---11----11----11----11----11---')
				setAttent(uid, token, touid).then((res) => {
					if (res.code !== 0) return this.$u.toast(res.msg)
					if (res.info.isattent == '1') {
						this.$u.toast('followed')
					} else {
						this.$u.toast('unfollowed')
					}
					this.isattent = res.info.isattent
				})
			},
			go(path, item) {
				if (path === 'related') {
					uni.navigateTo({
						url: 'videoDetail?id=' + item.id,
					})
				}
			},
			// fixScrollHeight(object) {
			// 	let { top, bottom } = object
			// 	if (!top) {
			// 		top = 0
			// 	} else {
			// 		top = top + 'rpx'
			// 	}
			// 	if (!bottom) {
			// 		bottom = 0
			// 	} else {
			// 		bottom = bottom + 'rpx'
			// 	}
			// 	return { position: 'fixed', top: top, bottom: bottom }
			// },
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
		// position: fixed;
		// top: 0rpx;
		// bottom: 0rpx;
	}
	.bottom-input-group {
		position: relative;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		.input-con {
			height: 50rpx;
			width: 600rpx;
			border-radius: 25rpx;
			line-height: 50rpx;
			padding: 0 20rpx;
		}
		.input-con > input {
			color: #333;
			font-size: 30rpx;
			&::placeholder {
			}
		}
	}
</style>
