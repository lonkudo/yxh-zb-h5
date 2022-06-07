<template>
  <view>
    <team-head :info="teamInfo">
      <template v-slot:leagueName>
        <text class="text-white margin-right">League</text>
      </template>
      <template v-slot:data>
        <view class="text-white text-center margin-tb">
          {{ rankInfo.competition.name_en }}
        </view>
        <view class="flex margin-lr-lg">
          <view class="text-white flex-sub">
            <view class="text-center">
              {{ rankInfo.won }}&nbsp;win /{{ rankInfo.draw }}&nbsp;draw /{{
                rankInfo.loss
              }}&nbsp;loss
            </view>
            <view class="text-center margin-top-sm">Record</view>
          </view>
          <view class="flex-sub">
            <view class="text-center">
              <text
                class="five-match"
                v-for="(value, i) of rankInfo.five_match"
                :key="i"
                :class="getClass(value)"
              >
                {{ value | filterFiveMatch }}
              </text>
            </view>
            <view class="text-white text-center margin-top-sm"
              >The Last Five Games</view
            >
          </view>
        </view>
      </template>
    </team-head>
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
          :key="'dynamic'"
          @touchmove.stop=""
          :style="{ height: myHeight + 'rpx' }"
        >
          <dynamic v-model="teamId" :myHeight="myHeight"></dynamic>
        </swiper-item>
        <swiper-item
          class="swiper-item"
          @touchmove.stop=""
          :style="{ height: myHeight + 'rpx' }"
        >
        </swiper-item>
        <swiper-item
          class="swiper-item"
          @touchmove.stop=""
          :style="{ height: myHeight + 'rpx' }"
        >
        </swiper-item>
        <swiper-item
          class="swiper-item"
          @touchmove.stop=""
          :style="{ height: myHeight + 'rpx' }"
        >
        </swiper-item>
        <swiper-item
          class="swiper-item"
          @touchmove.stop=""
          :style="{ height: myHeight + 'rpx' }"
        >
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script>
import TeamHead from "../TeamHead";
import { swiperAutoHeight, swiperUTabs } from "@/mixin";
import { Dynamic } from "./index";
import {
  getTeamDetailBasicInfo,
  getLeagueRankPoint,
  getFifaRankClub,
  getTeamLeagueRank,
} from "@/api/data";
export default {
  name: "Team",
  mixins: [swiperAutoHeight, swiperUTabs],
  components: {
    TeamHead,
    Dynamic,
  },
  data() {
    return {
      teamId: "",
      teamInfo: {},
      rankInfo: {
        competition: {
          name_en: "",
        },
      },
      menu: [
        { name: "Dynamic" },
        { name: "Schedule" },
        { name: "Data" },
        { name: "Players" },
        { name: "Transfer" },
      ],
      myHeight: 0,
    };
  },
  onLoad(option) {
    this.teamInfo = JSON.parse(decodeURIComponent(option.item));
    this.teamId = this.teamInfo.id;
    this.getTeamInfo();
    this.getTeamLeagueRank();
  },
  mounted() {
    this.myHeight = this.initScrollHeight(350);
  },
  methods: {
    getTeamInfo() {
      getTeamDetailBasicInfo(this.teamId).then((res) => {
        this.teamInfo = res.info;
      });
    },
    getTeamLeagueRank() {
      const competition_id = this.teamInfo.competition_id;
      getTeamLeagueRank(competition_id, this.teamId).then((res) => {
        this.rankInfo = res.info;
      });
    },
    getClass(value) {
      switch (value) {
        case 1:
          return "red";
        case 0:
          return "yellow";
        case -1:
          return "loss";
      }
    },
  },
  filters: {
    filterFiveMatch(value) {
      switch (value) {
        case 1:
          return "win";
        case 0:
          return "draw";
        case -1:
          return "blue";
      }
    },
  },
};
</script>
<style scoped lang="scss">
.five-match {
  padding-right: 6rpx;
}
.five-match::after {
  content: "/";
}
.five-match:last-child::after {
  content: "";
}
.red {
  color: red;
}
.yellow {
  color: #fcb01f;
}
.blue {
  color: #130881;
}
</style>
