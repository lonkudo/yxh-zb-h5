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
					<view>{{ newsDetails.particular }}</view>
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
					/>
				</view>
				<view><text class="iconfont icon-dianzan"></text></view>
				<view><text class="iconfont icon-shoucang"></text></view>
				<view><text class="iconfont icon-zhuanfa"></text></view>
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
	export default {
		components: { NoContent },
		data() {
			return {
				newsData: {},
				newsDetails: {},
				videoData: {},
				commentList: [], // 一级评论列表，用来渲染
				commentPage: 1,
				commentObj: {},
				videoid: 0,
				iscollection: '',
				collection: '',
				islike: '',
				likeNum: '',
				isattent: '',
				inputMsg: 'comments',
				inputContent: '',
				chosen: {},
				MEDIA_TYPE: 1, // 1视频 2新闻
				myHeight: 0,
				screenHeight: 0,
			}
		},
		async onLoad(options) {
			this.myHeight = await this.initScrollHeight(100)
			this.screenHeight = await this.initScrollHeight(0)
			if (this.isEmpty(this.uid)) {
				await this.getNewsDetails(options.id, '100')
			} else {
				await this.getNewsDetails(options.id, this.uid)
			}
		},
		methods: {
			getNewsDetails(id, uid) {
				return new Promise((resolve, reject) => {
					getNewsDetails(id, uid)
						.then((res) => {
							console.log('getres', res)
							this.newsDetails = res.info.details
							// this.showAuthor = true
							// // 富文本转义
							if (this.newsDetails.particular.length !== 0) {
								this.newsDetails.particular = this.newsDetails.particular
									.replace(/&amp;/g, '&')
									.replace(/&lt;/g, '<')
									.replace(/&gt;/g, '>')
									.replace(/&nbsp;/g, ' ')
									.replace(/&#39;/g, "'")
									.replace(/&quot;/g, '"')
									.replace(/<p>/g, '<text>')
									.replace(/<\/p>/g, '</text>')
							}
							console.log(this.newsDetails.particular)
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
</style>
