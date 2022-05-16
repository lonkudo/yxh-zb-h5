<template>
  <view class="sys-informs margin-xs b-f align-center padding-sm flex br-5">
    <text class="iconfont icon-laba margin-right-sm fc-g"></text>
    <swiper
      class="informs-slider"
      :indicator-dots="false"
      :autoplay="true"
      :interval="5000"
      :duration="1000"
      vertical="true"
      :circular="true"
    >
      <swiper-item v-for="(item, index) in noticeList" :key="index">
        <view class="swiper-item flex align-center"
          ><text class="fc-b-9 fs-24 f-hide-2">{{ item.txt }}</text></view
        >
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  name: "SystemInformsSlider",
  props: {
    noticeList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.sys-informs {
  height: 100rpx;
}
.informs-slider {
  height: 80rpx;
  flex: 1;
}
.swiper-item {
  height: 80rpx;
  // 超出省略号
  text {
    padding-bottom: 3rpx; // 英文下面会有点显示不出。加个padding
  }
}
</style>
