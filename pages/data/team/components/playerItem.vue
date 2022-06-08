<template>
  <view class="flex flex-wrap bg-white padding-lg">
    <view class="w-50-p flex padding-sm" v-for="item of list" :key="item.id">
      <view class="img-box">
        <image mode="aspectFit" :src="item.logo" alt="" />
      </view>
      <view class="padding-left-sm flex-sub">
        <text class="text-black text-very-black fs-32 break-all">
          {{ item.name }}
        </text>
        <view>{{ item.shirt_number }}</view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "PlayerItem",
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.img-box {
  width: 86rpx;
  height: 86rpx;
}
.break-all {
  word-break: break-all;
}
</style>
