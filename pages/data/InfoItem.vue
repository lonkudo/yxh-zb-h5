<template>
  <view class="demo-layout league-item" @click="selectLeague()">
    <view class="img-box">
      <image mode="aspectFit" :src="infoItem.logo" alt="" />
    </view>
    <text>{{ infoItem.name }}</text>
  </view>
</template>
<script>
export default {
  name: "InfoItem",
  props: ["infoItem"],
  methods: {
    selectLeague() {
      if (this.infoItem.id == 999999) {
        uni.navigateTo({
          url:
            "/pages/data/fifa/fifa?league=" +
            encodeURIComponent(JSON.stringify(this.infoItem)),
        });
      } else {
        uni.navigateTo({
          url: "/pages/data/league/league",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.img-box {
  width: 106rpx;
  height: 106rpx;
  uni-image {
    height: 100%;
  }
}
text {
  margin-top: 12rpx;
  display: block;
  overflow: hidden; //溢出隐藏
  white-space: nowrap; //禁止换行
  text-overflow: ellipsis; //...
}
</style>
