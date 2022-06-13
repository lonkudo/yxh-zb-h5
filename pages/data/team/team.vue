<template>
  <view>
    <team-head :info="teamInfo">
      <template v-slot:leagueName>
        <view @tap="goPage()">
          <text class="text-white margin-right">League</text>
        </view>
      </template>
      <template v-slot:data>
        <view class="text-white text-center margin-tb" v-if="isCountryTeam">
          Ranking&nbsp;{{ rankInfo.ranking }}
        </view>
        <view class="text-white text-center margin-tb" v-else>
          {{ rankInfo.competition.name_en }}
        </view>
        <view class="flex margin-lr-lg">
          <view class="text-white flex-sub">
            <view class="text-center">
              {{ rankInfo.won ? rankInfo.won : 0 }}&nbsp;win /{{
                rankInfo.draw ? rankInfo.draw : 0
              }}&nbsp;draw /{{ rankInfo.loss ? rankInfo.loss : 0 }}&nbsp;loss
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
          <dynamic
            v-model="teamId"
            :myHeight="myHeight"
            :isCountryTeam="isCountryTeam"
          ></dynamic>
        </swiper-item>
        <swiper-item
          class="swiper-item"
          @touchmove.stop=""
          :key="'schedule'"
          :style="{ height: myHeight + 'rpx' }"
        >
          <schedule
            :teamId="teamId"
            :competition_id="
              rankInfo.competition_id ? rankInfo.competition_id : 0
            "
            :season_id="rankInfo.season_id"
            :season_year="rankInfo.season_year"
            :myHeight="myHeight"
            :isCountryTeam="isCountryTeam"
          ></schedule>
        </swiper-item>
        <swiper-item
          class="swiper-item"
          :key="'team-data'"
          @touchmove.stop=""
          :style="{ height: myHeight + 'rpx' }"
        >
          <team-data :teamInfo="teamInfo"></team-data>
        </swiper-item>
        <swiper-item
          class="swiper-item"
          @touchmove.stop=""
          :key="'team-player'"
          :style="{ height: myHeight + 'rpx' }"
        >
          <team-player v-model="teamId" :myHeight="myHeight" :isCountryTeam="isCountryTeam"></team-player>
        </swiper-item>
        <swiper-item
          class="swiper-item"
          @touchmove.stop=""
          :style="{ height: myHeight + 'rpx' }"
        >
          <team-transfer v-model="teamId"></team-transfer>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script>
import TeamHead from "../TeamHead";
import { swiperAutoHeight, swiperUTabs } from "@/mixin";
import { Dynamic, Schedule, TeamData, TeamPlayer, TeamTransfer } from "./index";
import {
  getTeamDetailBasicInfo,
  getTeamLeagueRank,
  getCountryInfo,
  getCountryDetail,
} from "@/api/data";
export default {
  name: "Team",
  mixins: [swiperAutoHeight, swiperUTabs],
  components: {
    TeamHead,
    Dynamic,
    Schedule,
    TeamData,
    TeamPlayer,
    TeamTransfer,
  },
  data() {
    return {
      teamId: "",
      teamInfo: {
        competition_id: "",
        coach: {
          name: "",
        },
        country: {
          name: "",
        },
        venue: {
          name_en: "",
          capacity: "",
        },
      },
      isCountryTeam: false,
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
    let item = JSON.parse(decodeURIComponent(option.item));
    // this.teamInfo = JSON.parse(decodeURIComponent(option.item));
    this.teamId = item.id;
    // console.log(this.teamInfo);
    if (item.isCountryTeam) {
      this.isCountryTeam = true;
      this.getCountryInfo();
      this.getCountryDetail();
    } else {
      this.teamInfo.competition_id = item.competition_id;
      this.getTeamInfo();
      this.getTeamLeagueRank();
    }
  },
  mounted() {
    this.myHeight = this.initScrollHeight(350);
  },
  methods: {
    goPage() {
      let item = { team_id: this.teamInfo.competition_id };
      uni.navigateTo({
        url:
          "/pages/data/league/league?item=" +
          encodeURIComponent(JSON.stringify(item)),
      });
    },
    getCountryDetail() {
      getCountryDetail(this.teamId).then((res) => {
        this.rankInfo = res.info;
        // console.log(this.rankInfo.five_match);
      });
    },
    getCountryInfo() {
      getCountryInfo(this.teamId).then((res) => {
        // console.log(res.info);
        // this.teamInfo = res.info;
        this.teamInfo.coach.name = res.info.coach;
        this.teamInfo.foundation_time = res.info.foundation_time;
        this.teamInfo.country.name = res.info.country;
        this.teamInfo.venue.name_en = res.info.venue_name;
        this.teamInfo.venue.capacity = res.info.venue_capacity;
        this.teamInfo.honor_list = res.info.honor_list;
        console.log(666666666666, this.teamInfo);
      });
    },
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
          return "blue";
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
          return "loss";
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
