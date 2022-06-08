<template>
  <view class="bg-white padding margin-top">
    <view class="flex justify-between fs-30">
      <view class="flex-sub">{{ transferName }}</view>
      <view class="w-160 text-right"> Transfer fee</view>
    </view>
    <view
      class="flex justify-between padding-tb"
      v-for="item of list"
      :key="item.id"
      @click="goPlayer(item)"
    >
      <view class="flex-sub flex">
        <view class="img-box">
          <image mode="aspectFit" :src="item.player.logo" alt="" />
        </view>
        <view class="padding-lr-sm w-300">
          <view class="text-very-black">{{ item.player.name }}</view>
          <view class="margin-top-sm">
            Age:&nbsp;{{ item.player.age }}-{{ item.player.position }}-{{
              item.player.nationality
            }}
          </view>
        </view>
        <view class="flex">
          <view class="transfer-in"></view>
          <view class="w-100 break-all padding-left-sm">{{
            item.to_team_name
          }}</view>
        </view>
      </view>
      <view class="w-160 text-right">
        {{ item.transfer_fee != 0 ? item.transfer_fee : "-" }}
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "TransferItem",
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    transferName: {
      type: String,
    },
  },
  methods: {
    goPlayer(item) {
      uni.navigateTo({
        url:
          "/pages/data/player/player?item=" +
          encodeURIComponent(JSON.stringify(item)),
      });
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
.transfer-in {
  height: 32rpx;
  width: 32rpx;
  // background-size:32rpx 32rpx;
  background: url("/static/styles/png/transfer_in.png") center no-repeat;
  background-size: cover;
}
</style>
