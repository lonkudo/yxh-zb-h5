<template>
  <view>
    <team-head :info="league"> </team-head>
    <view>11111111111{{ myHeight }}</view>
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
          :key="'Squad'"
          @touchmove.stop=""
          :style="{ height: myHeight + 'rpx' }"
        >
          <club :myHeight="myHeight"></club>
        </swiper-item>
        <swiper-item
          class="swiper-item"
          :key="'Analyse'"
          @touchmove.stop=""
          :style="{ height: myHeight + 'rpx' }"
        >
          <country></country>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script>
import Club from "./Club";
import Country from "./Country";
import TeamHead from "../TeamHead";
import { swiperAutoHeight, swiperUTabs } from "@/mixin";
export default {
  name: "Fifa",
  mixins: [swiperAutoHeight, swiperUTabs],
  components: {
    Club,
    Country,
    TeamHead,
  },
  data() {
    return {
      league: {},
      menu: [{ name: "Club" }, { name: "Countries" }],
      myHeight: 0,
    };
  },
  onLoad(option) {
    this.league = JSON.parse(decodeURIComponent(option.league));
    console.log(this.league);
  },
  mounted() {
    this.myHeight = this.initScrollHeight(350);
  },
  method: {},
};
</script>
<style scoped lang="scss"></style>
