<template>
  <scroll-view scroll-y :style="{ height: myHeight - 76 + 'rpx' }">
    <view>
      <view class="text-center bg-gray padding-sm fs-36"> Coach </view>
      <view class="flex flex-wrap bg-white padding-lg">
        <view class="w-50-p flex">
          <view class="img-box">
            <image mode="aspectFit" :src="tableData.coach.logo" alt="" />
          </view>
          <view class="padding-left-sm">
            <view class="text-very-black">{{ tableData.coach.name }}</view>
            <view></view>
          </view>
        </view>
      </view>
    </view>
    <view>
      <view class="text-center bg-gray padding-sm fs-36"> Foward </view>
      <player-item :list="tableData.player_F"></player-item>
      <view class="text-center bg-gray padding-sm fs-36"> Modifield </view>
      <player-item :list="tableData.player_M"></player-item>
      <view class="text-center bg-gray padding-sm fs-36"> Defender </view>
      <player-item :list="tableData.player_D"></player-item>
      <view class="text-center bg-gray padding-sm fs-36"> Coalkeeper </view>
      <player-item :list="tableData.player_G"></player-item>
      <view class="text-center bg-gray padding-sm fs-36"> Unknown </view>
      <player-item :list="tableData.player_N"></player-item>
    </view>
  </scroll-view>
</template>
<script>
import { getTeamDetailPlayerList } from "@/api/data";
import PlayerItem from "./components/playerItem.vue";
export default {
  name: "TeamPlayer",
  components: {
    PlayerItem,
  },
  props: ["value", "myHeight"],
  data() {
    return {
      tableData: [],
    };
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.getTeamDetailPlayerList();
        }
      },
      immediate: true,
    },
  },
  // mounted() {
  //   this.getTeamDetailPlayerList();
  // },
  methods: {
    getTeamDetailPlayerList() {
      getTeamDetailPlayerList(this.value).then((res) => {
        this.tableData = res.info;
        // console.log(this.tableData);
        // console.log(this.tableData.player_F);
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
</style>
