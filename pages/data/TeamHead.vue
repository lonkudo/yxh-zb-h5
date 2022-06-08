<template>
  <div :style="{ backgroundColor: bgColor }" class="team-head">
    <view class="goback flex align-center justify-between" @tap="back()">
      <text class="iconfont icon-left fs-40 fc-b-f margin-sm"></text>
      <slot name="leagueName"></slot>
    </view>
    <view class="team-head-content">
      <view class="img-box">
        <image mode="aspectFit" :src="info.logo" alt="" />
      </view>
      <view class="margin-top-sm">{{ info.name }}</view>
    </view>
    <slot name="data"></slot>
  </div>
</template>
<script>
export default {
  name: "TeamHead",
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          logo: "",
          name: "",
        };
      },
    },
    bgColor: {
      type: String,
      default: "#2251A1",
    },
  },
  data() {
    return {
      // bgColor: "",
    };
  },
  methods: {
    back() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },
};
</script>
<style scoped lang="scss">
.team-head {
  padding: 30rpx 0;
}
.img-box {
  width: 106rpx;
  height: 106rpx;
  margin: 0 auto;
  uni-image {
    height: 100%;
  }
}
.team-head-content {
  text-align: center;
  color: #ffffff;
  text {
    margin-top: 12rpx;
  }
}
</style>
