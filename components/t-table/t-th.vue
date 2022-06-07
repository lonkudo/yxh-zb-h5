<template>
  <view
    class="t-th"
    :style="{
      width: customWidth + 'px',
      color: color,
      'justify-content': thAlignCpd,
      'flex-grow': flexWidth,
    }"
  >
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    width: {
      type: [String, Number],
      default: "",
    },
    flexWidth: {
      type: [String, Number],
      default: 0,
    },
    align: {
      type: String,
      default: "center",
    },
  },
  data() {
    return {
      thBorder: "1",
      borderColor: "#d0dee5",
      fontSize: "15",
      color: "#3b4246",
      thAlign: "center",
    };
  },
  inject: ["table", "tr"],

  created() {
    this.thBorder = this.table.border;
    this.borderColor = this.table.borderColor;
    this.fontSize = this.tr.fontSize;
    this.color = this.tr.color;
    if (this.align) {
      this.thAlign = this.align;
    } else {
      this.thAlign = this.tr.align;
    }
  },

  computed: {
    // 根据props中的width属性 自动匹配当前th的宽度(px)
    customWidth() {
      if (typeof this.width === "number") {
        return this.width;
      } else if (typeof this.width === "string") {
        let regexHaveUnitPx = new RegExp(/^[1-9][0-9]*px$/g);
        let regexHaveUnitRpx = new RegExp(/^[1-9][0-9]*rpx$/g);
        let regexHaveNotUnit = new RegExp(/^[1-9][0-9]*$/g);
        if (this.width.match(regexHaveUnitPx) !== null) {
          // 携带了 px
          return this.width.replace("px", "");
        } else if (this.width.match(regexHaveUnitRpx) !== null) {
          // 携带了 rpx
          let numberRpx = Number(this.width.replace("rpx", ""));
          let widthCoe = uni.getSystemInfoSync().screenWidth / 750;
          return Math.round(numberRpx * widthCoe);
        } else if (this.width.match(regexHaveNotUnit) !== null) {
          // 未携带 rpx或px 的纯数字 String
          return this.width;
        } else {
          // 不符合格式
          return "";
        }
      } else {
        return "";
      }
    },
    thAlignCpd() {
      let nameAlign = "";
      switch (this.thAlign) {
        case "left":
          nameAlign = "flex-start";
          break;
        case "center":
          nameAlign = "center";
          break;
        case "right":
          nameAlign = "flex-end";
          break;
        default:
          nameAlign = "center";
          break;
      }
      return nameAlign;
    },
  },
};
</script>

<style>
.t-th {
  display: flex;
  padding: 24rpx 12rpx;
  font-size: 28rpx;
  color: #909399;
  text-align: center;
}
</style>
