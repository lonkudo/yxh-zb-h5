<template>
  <view class="demo-layout league-item">
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
