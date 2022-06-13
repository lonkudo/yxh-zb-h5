<template>
  <view class="item-container padding-tb">
    <view class=" text-center">
      <text>{{ label }}</text>
    </view>
    <view class="text-center margin-top">
      <text>{{ value }}</text>
    </view>
  </view>
</template>
<script>
export default {
  name: "DataItem",
  props: ["label", "value"],
};
</script>
<style scoped>
.item-container {
  width: 25%;
  box-sizing: border-box;
  padding: 6rpx;
}
</style>
