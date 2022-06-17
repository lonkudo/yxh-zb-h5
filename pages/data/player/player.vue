<template>
  <view>
    <team-head :info="playerInfo"></team-head>
    <view>
      <u-tabs-swiper
        ref="uTabs"
        :list="menu"
        :current="current"
        @change="tabsChange"
        :is-scroll="false"
        swiperWidth="750"
        active-color="#02b875"
        font-size="24"
        gutter="0"
      ></u-tabs-swiper>

      <swiper
        :current="swiperCurrent"
        @transition="transition"
        @animationfinish="animationfinish"
        :style="{ height: myHeight + 'rpx' }"
      >
        <swiper-item
          class="swiper-item"
          key="player-data"
          @touchmove.stop=""
          :style="{ height: myHeight + 'rpx' }"
        >
          <player-data :myHeight="myHeight" v-model="playerId"></player-data>
        </swiper-item>
        <swiper-item
          class="swiper-item"
          key="data"
          @touchmove.stop=""
          :style="{ height: myHeight + 'rpx' }"
        >
          <s-data :myHeight="myHeight" v-model="playerId"></s-data>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script>
import TeamHead from "../TeamHead";
import { SData, PlayerData, PlayerDynamic } from "./index";
import { swiperAutoHeight, swiperUTabs } from "@/mixin";
export default {
  name: "Player",
  mixins: [swiperAutoHeight, swiperUTabs],
  components: {
    TeamHead,
    SData,
    PlayerData,
    PlayerDynamic,
  },
  data() {
    return {
      playerInfo: {},
      playerId: "",
      menu: [{ name: "Player Data" }, { name: "Data" }, { name: "Dynamic" }],
      myHeight: 0,
    };
  },
  onLoad(option) {
    const player = JSON.parse(decodeURIComponent(option.item));
    if (player.player) this.playerInfo = player.player;
    else this.playerInfo = player;
    this.playerId = this.playerInfo.player_id;
    // console.log(this.playerId);
  },
  mounted() {
    this.myHeight = this.initScrollHeight(350);
  },
  method: {},
};
</script>
<style scoped lang="scss"></style>
