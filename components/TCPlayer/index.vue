<template name="tc-player">
	<div class="tc-player-main">
		<div class="cview-video-container" id="id-video-container"></div>
		<!-- <div class="tc-player-img" v-if="showLogo">
			<img src="@/static/styles/png/avatar.png" alt="" />
		</div> -->
	</div>
</template>
<script>
	// let tencentPlay = null;
	export default {
		name: 'Player',
		props: {
			isShow: {
				type: Boolean,
				default: false,
			},
		},
		mounted() {
			// this.$emit('playerMounted')
		},
		components: {},
		data() {
			return {
				tencentPlay: '',
				showLogo: false,
			}
		},
		// updated() {
		//   console.log("player---222----222----222----222----222---");
		//   this.init(path, (live = true), options);
		// },
		methods: {
			/***初始化直播播放器
    		@path {String} m3u8地址, 
    		@live {Boolean} true:直播  false:点播
    	*/
			init(path, live = true, options) {
				console.log('options', options)
				this.loadJS(path, live, options)
			},
			// init(path, live = true) {
			//   if (window.TcPlayer) {
			//     this.loadJS(path, live,params);
			//   } else {
			//     this.loadTcScript(() => {
			//       this.loadJS(path, live);
			//     });
			//   }
			// },
			loadTcScript(callback) {
				this.loadScript(callback, {
					id: 'tcPlayerScriptId',
					//url: 'https://cloudcache.tencent-cloud.com/open/qcloud/video/vcplayer/TcPlayer-2.3.3.js'
					// 引入本地TcPlayer-2.3.3.js文件，防止外网资源跨域
					url: '/utils/TcPlayer-module-2.4.1.js',
				})
			},
			loadScript(callback, params) {
				if (document.getElementById(params.id)) {
					// eslint-disable-next-line callback-return
					callback()
				} else {
					const script = document.createElement('script')
					script.async = true
					script.src = params.url
					script.id = params.id
					script.onload = () => {
						callback()
					}
					document.body.appendChild(script)
				}
			},
			loadJS(path, live, options) {
				console.log('path', path)
				let dom = document.getElementById('id-video-container')
				console.log(dom)
				while (dom.hasChildNodes()) {
					//当div下还存在子节点时 循环继续
					dom.removeChild(dom.firstChild)
					// this.player.destroy();
				}
				console.log('path', path)
				this.tencentPlay = new this.TcPlayer('id-video-container', {
					m3u8: path, // 原画m3u8 播放URL
					// m3u8_hd: path, // 高清m3u8 播放URL
					// m3u8_sd: path, // 标清m3u8 播放URL
					// flv: path, // 原画flv 播放URL
					// flv_hd: path, // 高清flv 播放URL
					// flv_sd: path, // 标清flv 播放URL
					mp4: path,
					// mp4_hd: path,
					// mp4_sd: path,
					// rtmp: path,
					// rtmp_hd: path,
					// rtmp_sd: path,
					width: '100%',
					height: '100%',
					volume: 0.6, // 设置初始音量
					live: false, // 设置视频是否为直播类型，将决定是否渲染时间轴等控件，以及区分点直播的处理逻辑
					autoplay: true, // 是否自动播放
					coverpic: { style: 'cover', src: '' }, // 预览封面，可以传入一个图片地址或者一个包含图片地址 src 和显示样式 style 的对象。
					controls: 'system', // default 显示默认控件，none 不显示控件，system 移动端显示系统控件
					// flash: 'true', // 是否优先使用 flash 播放视频，备注：该选项只对PC平台生效
					h5_flv: true, // 是否启用 flv.js 的播放 flv
					x5_player: true, // 是否启用 TBS 的播放 flv
					// x5_type: "h5", // 通过 video 属性 “x5-video-player-type” 声明启用同层H5播放器，支持的值：h5
					// x5_fullscreen: true, // 通过 video 属性 “x5-video-player-fullscreen” 声明视频播放时是否进入到 TBS 的全屏模式
					// x5_orientation: 1, // 通过 video 属性 “x5-video-orientation” 声明 TBS 播放器支持的方向，可选值：0（landscape 横屏）, 1：（portraint竖屏）, 2：（landscape | portrait跟随手机自动旋转）
					controlBar: {
						progressControl: false,
					},
					wording: {},
					listener: (msg) => {
						console.log(msg)
						if (msg.type == 'load') {
							this.showLogo = this.isShow
						}
						if (msg.type == 'ended') {
							//播放完成事件
							// this.close()
						}
						// 重新加载按钮
						if (msg.type === 'error') {
							document.getElementsByClassName('vcp-error-tips')[0].style.display =
								'none'
							this.$emit('loadVideoError', true)
							// setTimeout(() => {
							//   this.$emit('reload', true);
							// }, 1500);
						} else {
							this.$emit('loadVideoError', false)
							// this.$emit('reload', false);
						}
					},
				})
			},
			// 播放
			play() {
				if (this.tencentPlay) {
					// console.log(this.tencentPlay.play);
					this.tencentPlay.play()
				}
			},
			// 暂停
			pause() {
				if (this.tencentPlay) {
					this.tencentPlay.pause()
				}
			},
			// 销毁当前播放器
			destroy() {
				if (this.tencentPlay) {
					this.tencentPlay.destroy()
					this.tencentPlay = null
				}
			},
			// 关闭
			close() {
				this.$emit('on-close')
			},
		},
		destroyed() {
			console.log('player destoryed hook called')
		},
	}
</script>

<style lang="scss" scoped>
	$primary-background-blue: #266593;
	$primary-background-gray: #f1f2f5;
	$primary-color-black: #515a6e;
	$primary-color-blue: #266593;
	$primary-border-blue: #266593;
	$primary-btn-background: #ffffff;
	$primary-btn-background-yellow: #c8dc00;
	.tc-player-main {
		height: 100%;
		position: relative;
		.cview-video-container {
			height: 100%;
			border-radius: 4rpx;
			overflow: hidden;
		}
		.tc-player-img {
			position: absolute;
			top: 10rpx;
			right: 10rpx;
			// height: 40rpx;
			// width: 40rpx;
		}
	}
</style>
