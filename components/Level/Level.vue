<script>
export default {
  name: "Level",
  functional: true,
  props: {
    level: {
      type: [String, Number],
      default: 1,
    },
  },
  render(h, context) {
    let { level } = context.props;
    const vnodes = [];
    if (typeof level === "string") level = parseInt(level);
    function getThemeColor(level) {
      switch (level) {
        case 1:
        case 2:
          return "#8E4DFB";
          break;
        case 3:
        case 4:
        case 5:
          return "#4D9BFB";
          break;
        case 6:
        case 7:
        case 8:
        case 9:
          return "#FB9B4D";
          break;
        case 10:
        case 11:
        case 12:
        case 13:
          return "#8E4DFB";
          break;
        case 14:
        case 15:
        case 16:
        case 17:
          return "#CF19F0";
          break;
        case 18:
        case 19:
        case 20:
          return "#FD2B2B";
          break;
        default:
          return "#FD2B2B";
          break;
      }
    }
    let themeColor = getThemeColor(level);
    vnodes.push(
	<view>
	<text class="level fs-10" style={{ backgroundColor: themeColor }}>
	<text class="iconfont icon-star-fill fs-10"></text>
	  Lv.{level}
	</text>
	</view>

    );
    return vnodes;
  },
};
</script>
<style scoped lang="scss">
.level {
  // display: inline-block;
  
  color: #fff;
  padding: 1rpx 8rpx;
  border-radius: 4rpx;
  svg {
    margin-right: 6rpx;
    width: 10rpx;
    height: 10rpx;
    vertical-align: 0;
  }
}
</style>
