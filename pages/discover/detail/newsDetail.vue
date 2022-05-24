<template>
	<view class="b-f">
		<template v-if="!this.isEmpty(newsDetails)">
			<scroll-view
				scroll-y=""
				:style="{ height: myHeight + 'rpx' }"
				@scrolltolower="addMore"
			>
				<view class="flex flex-direction padding-sm">
					<text class="fs-30 fw-9">{{ newsDetails.caption }}</text>
					<text class="fs-20 fc-b-9 margin-bottom-sm">{{
						newsDetails.create_time
					}}</text>
					<view v-html="particular" class="richText"></view>
					<!-- <view class="richText"
						><img
							src="http://39.103.165.5//upload//admin/20220324/ffe627588e17be162d291bc98518406d.jpg"
							title="奶昔.jpg"
							alt="奶昔.jpg"
						/>
					</view> -->
				</view>
				<view class="b-f flex flex-direction padding-sm">
					<!-- 新闻推荐区 -->
					<text class="fs-30 fc-b-3">Related News</text>
					<view
						class="flex margin-top-sm justify-between"
						v-for="(item, index) in newsData.recommend"
						@tap="go('related', item)"
					>
						<view class="margin-left-xs flex flex-direction justify-end"
							><text class="f-hide w-400 fs-20 margin-bottom-auto">{{
								item.caption
							}}</text
							><text class="fc-b-9 fs-20">{{ item.user_name }}</text>
							<text class="fc-b-9 fs-20 w-500" style="text-align: right">{{
								item.create_time
							}}</text>
						</view>
						<image
							:src="item.img"
							mode="aspectFill"
							class="br-8"
							style="width: 180rpx; height: 110rpx"
						/>
					</view>
				</view>
				<!-- 评论区 -->
				<view class="flex flex-direction b-f padding-xs">
					<text class="fs-30 fc-b-3 margin-bottom-sm">Comments</text>
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
								<text class="fc-b-9 fs-20 margin-right-auto">{{ item.datetime }}</text>
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
											item.islike === '1' ? 'fc-g icon-dianzan1' : 'fc-b-3 icon-dianzan',
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
											><text class="fc-b-9">{{ reply.touserinfo.user_nicename }} :</text>
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
					<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
				</view>
			</scroll-view>
			<view
				class="bottom-input-group b-f padding-sm flex align-center justify-between"
			>
				<view class="flex input-con b-f6 align-center">
					<input
						type="text"
						:placeholder="inputMsg"
						v-model="inputContent"
						placeholder-style="color:#aaa"
						class="w-400"
						@confirm="send"
						confirm-type="send"
					/>
				</view>
				<view
					><text
						@tap="addLike"
						:class="[
							'iconfont  ',
							islike === '1' ? 'fc-g icon-dianzan1' : 'fc-b-6 icon-dianzan',
						]"
					></text
				></view>
				<view
					><text
						@tap="addCollection"
						:class="[
							'iconfont fs-30 ',
							iscollection === '1'
								? 'fc-red icon-shoucangxiao'
								: 'fc-b-6 icon-shoucang',
						]"
					></text
				></view>
				<view><text class="iconfont icon-zhuanfa" @tap="share"></text></view>
			</view>
		</template>
		<template v-else>
			<no-content :height="screenHeight"></no-content>
		</template>
	</view>
</template>

<script>
	import {
		getNewsDetails,
		getHotNewsList,
		addCommentLike,
		commentFunc,
		getComments,
		getReplys,
	} from '@/api/news'
	import NoContent from '../../../components/NoContent/NoContent.vue'
	import { setAttent } from '@/api/live'
	import { addLike, addCollection } from '@/api/video'

	export default {
		components: { NoContent },
		data() {
			return {
				newsData: {},
				newsDetails: {},
				particular: '',
				videoData: {},
				commentList: [], // 一级评论列表，用来渲染
				commentPage: 1,
				commentObj: {},
				total: 0,
				videoid: 0, // 新闻id
				iscollection: '',
				collection: '',
				islike: '',
				likeNum: '',
				isattent: '',
				inputMsg: 'comments',
				inputContent: '',
				chosen: {},
				MEDIA_TYPE: 2, // 1视频 2新闻
				myHeight: 0,
				screenHeight: 0,
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: 'pull up to load more',
					loading: 'loading',
					nomore: 'no more data',
				},
			}
		},
		async onLoad(options) {
			this.myHeight = await this.initScrollHeight(100)
			this.screenHeight = await this.initScrollHeight(0)

			this.videoid = options.id
			if (this.isEmpty(this.uid)) {
				await this.getNewsDetails(options.id, '100')
			} else {
				await this.getNewsDetails(options.id, this.uid)
			}
			await this.getComments(
				this.uid,
				this.videoid,
				this.commentPage,
				this.MEDIA_TYPE
			)
		},

		methods: {
			addMore() {
				console.log('bottom')
				if (this.commentPage >= this.total / 20) return (this.status = 'nomore')
				this.status = 'loading'
				this.commentPage = ++this.commentPage
				setTimeout(() => {
					let uid = 100
					if (!this.isEmpty(this.uid)) uid = this.uid
					this.getComments(uid, this.videoid, this.commentPage, this.MEDIA_TYPE)
					if (this.commentPage >= this.total / 20) this.status = 'nomore'
					else this.status = 'loading'
				}, 2000)
			},

			getNewsDetails(id, uid) {
				return new Promise((resolve, reject) => {
					getNewsDetails(id, uid)
						.then((res) => {
							console.log('getres', res)
							this.newsDetails = res.info.details
							this.newsData = res.info
							// this.showAuthor = true
							// // 富文本转义
							if (this.newsDetails.particular.length !== 0) {
								console.log('origin', this.newsDetails.particular)
								this.newsDetails.particular = this.newsDetails.particular
									.replace(/&amp;/g, '&')
									.replace(/&lt;/g, '<')
									.replace(/&gt;/g, '>')
									.replace(/&nbsp;/g, ' ')
									.replace(/&#39;/g, "'")
									.replace(/&quot;/g, '"')
									.replace(/<p>/g, '')
									.replace(/<\/p>/g, '')
									.replace(/script/g, 'text')
									.replace(/\<img/gi, '<img style="max-width:100%"')
							}
							console.log(this.newsDetails.particular)
							this.particular = this.newsDetails.particular
							// this.curNewsId = id
							// this.curNewsType = res.info.details.type
							this.islike = res.info.details.islike.toString()
							this.likeNum = res.info.details.likes
							this.iscollection = res.info.details.iscollection.toString()
							// this.addTrace('see')
							resolve(res)
						})
						.catch((err) => {
							console.log(err)
							reject(err)
						})
						.finally(() => {})
				})
			},
			// addMore() {
			// 	console.log('addMore')
			// },
			go(path, item) {
				if (path === 'related') {
					uni.navigateTo({
						url: 'newsDetail?id=' + item.id,
					})
				}
			},
			/* 获取评论列表 */
			getComments(uid, videoid, p, type) {
				getComments(uid, videoid, p, type)
					.then((res) => {
						this.commentObj = res.info
						this.commentList = this.commentList.concat(res.info.commentlist)
						this.total = parseInt(res.info.comments)

						console.log('commentObj', this.commentObj)
					})
					.catch((err) => {
						console.log(err)
					})
			},
			// addMore() {
			// 	this.commentPage += 1
			// 	this.getComments(this.uid, this.videoid, this.commentPage, this.MEDIA_TYPE)
			// 	console.log('pulldown')
			// },
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
				const uid = window.localStorage.getItem('uid') || 0
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
		},
	}
</script>

<style lang="scss">
	.bottom-input-group {
		position: relative;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		.input-con {
			height: 50rpx;
			width: 500rpx;
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
	.richText {
		width: 710rpx;
		image {
			width: 710rpx !important;
			height: auto;
		}
		img {
			width: 710rpx !important;
			height: auto;
		}
	}
</style>
