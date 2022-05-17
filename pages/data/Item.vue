<template>
  <view class="demo-layout league-item">
    <view class="img-box">
      <image mode="aspectFit" :src="item.logo" alt="" />
    </view>
    <text>{{ item.name }}</text>
  </view>
</template>
<script>
export default {
  name: "Item",
  props: ["item"],
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
