<template>
  <view class="bg-white">
    <view class="flex justify-center border-b padding-sm">
      <view class="flex-sub" @click="preSeason(1)">
        <text class="text-green">Last Season</text>
      </view>
      <view class="flex-sub text-center" @click="show = true">
        <text class="">{{ seasonYear }}</text>
        <text class="iconfont icon-xiangshang xuanzuan-2"></text>
      </view>
      <view class="flex-sub text-right" @click="preSeason(2)">
        <text class="text-green">next Season</text>
      </view>
    </view>
    <t-table>
      <scroll-view scroll-y :style="{ height: myHeight - 76 + 'rpx' }">
        <view v-for="table in tableData" :key="table.date">
          <view class="text-center bg-gray padding-sm">
            {{ table.date }}
          </view>
          <view v-if="isCountryTeam">
            <t-tr
              v-for="(item, i) in table.list"
              :key="item.id + i"
              @change="change(item)"
            >
              <t-td flexWidth="1">
                <view>
                  <view>{{ item.day }} {{ item.time }}</view>
                  <view class="f-hide w-160">
                    {{ item.competition_name }}
                  </view>
                </view>
              </t-td>
              <t-td width="120" align="right">
                <text>{{ item.home_team_name }}</text>
                <view class="table-cell-image">
                  <image mode="aspectFit" :src="item.home_team_logo" />
                </view>
              </t-td>
              <t-td width="40">
                {{ item.home_scores }}:{{ item.away_scores }}
              </t-td>
              <t-td width="120" align="left">
                <view class="table-cell-image">
                  <image mode="aspectFit" :src="item.away_team_logo" />
                </view>
                <text>{{ item.away_team_name }}</text>
              </t-td>
            </t-tr>
          </view>
          <view v-else>
            <t-tr
              v-for="(item, i) in table.list"
              :key="item.id + i"
              @change="change(item)"
            >
              <t-td flexWidth="1">
                <view>
                  <view>{{ item.day }} {{ item.time }}</view>
                  <view class="f-hide w-160">
                    {{ item.competition_name }}
                  </view>
                </view>
              </t-td>
              <t-td width="120" align="right">
                <text>{{ item.home_team.name }}</text>
                <view class="table-cell-image">
                  <image mode="aspectFit" :src="item.home_team.logo" />
                </view>
              </t-td>
              <t-td width="40">
                {{ item.home_team.score }}:{{ item.away_team.score }}
              </t-td>
              <t-td width="120" align="left">
                <view class="table-cell-image">
                  <image mode="aspectFit" :src="item.away_team.logo" />
                </view>
                <text>{{ item.away_team.name }}</text>
              </t-td>
            </t-tr>
          </view>
        </view>
      </scroll-view>
    </t-table>
    <u-popup v-model="show" mode="bottom" border-radius="14" height="780">
      <view v-if="isCountryTeam">
        <view
          class="text-center padding-tb-sm"
          v-for="item of yearOptions"
          :key="item.id"
          @click="changeSeason(item)"
        >
          <text :class="{ 'text-green': item.id == seasonId }">
            {{ item.name }}
          </text>
        </view>
      </view>
      <view v-else>
        <view
          class="text-center padding-tb-sm"
          v-for="item of yearOptions"
          :key="item.id"
          @click="changeSeason(item)"
        >
          <text :class="{ 'text-green': item.id == seasonId }">
            {{ item.year }}
          </text>
        </view>
      </view>
    </u-popup>
  </view>
</template>
<script>
import {
  getLeagueSeasonTime,
  getTeamDetailSchedule,
  getCountrySchedule,
} from "@/api/data";
export default {
  name: "Schedule",
  props: [
    "myHeight",
    "teamId",
    "competition_id",
    "season_id",
    "season_year",
    "isCountryTeam",
  ],
  components: {},
  data() {
    return {
      show: false,
      tableData: [],
      yearOptions: [],
      page: 1,
      competitionId: this.competition_id,
      seasonId: this.season_id,
      seasonYear: this.season_year,
    };
  },
  watch: {
    season_id: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.seasonId = newVal;
          this.seasonYear = this.season_year;
        }
      },
      immediate: true,
    },
    // 国家队获取赛程
    teamId: {
      handler(newVal, oldVal) {
        // console.log(this.isCountryTeam);
        if (newVal) {
          if (this.isCountryTeam) {
            this.getCountrySchedule();
          }
        }
      },
      immediate: true,
    },
    // 普通球队获取赛程
    competition_id: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.competitionId = newVal;
          this.getLeagueSeasonTime();
          this.getTeamDetailSchedule();
        }
      },
      immediate: true,
    },
  },
  methods: {
    preSeason(type) {
      let result = null;
      if (type == 1) {
        this.yearOptions.find((item, index) => {
          if (item.id == this.seasonId) {
            if (index > 0) result = this.yearOptions[index - 1];
          }
          return item.id == this.seasonId;
        });
      } else {
        this.yearOptions.find((item, index) => {
          if (item.id == this.seasonId) {
            result = this.yearOptions[index + 1];
          }
          return item.id == this.seasonId;
        });
      }
      if (result) this.changeSeason(result);
    },
    changeSeason(item) {
      let param = item;
      this.show = false;
      if (this.isCountryTeam) {
        this.seasonId = param.id;
        this.seasonYear = param.name;
        this.getCountrySchedule();
      } else {
        this.seasonId = param.id;
        this.seasonYear = param.year;
        this.getTeamDetailSchedule();
      }
    },
    change(item) {
      uni.navigateTo({
        url:
          "/pages/data/team/team?item=" +
          encodeURIComponent(JSON.stringify(item)),
      });
    },
    getCountrySchedule() {
      this.tableData = [];
      getCountrySchedule(this.teamId, this.seasonId).then((res) => {
        this.tableData = res.info.list;
        this.yearOptions = res.info.year;
        if (!this.seasonId) {
          this.seasonId = this.yearOptions[0].id;
          this.seasonYear = this.yearOptions[0].name;
        }
      });
    },
    getTeamDetailSchedule() {
      this.tableData = [];
      getTeamDetailSchedule(
        this.teamId,
        this.competitionId,
        this.seasonId
      ).then((res) => {
        this.tableData = res.info;
      });
    },
    getLeagueSeasonTime() {
      getLeagueSeasonTime(this.competitionId).then((res) => {
        this.yearOptions = res.info;
      });
    },
  },
};
</script>
<style scoped lang="scss">
.table-cell-image {
  image {
    width: 40rpx;
    height: 40rpx;
  }
}
.border-ra-lg {
  border-radius: 40upx;
}
.t-td {
  border: none;
}
.xuanzuan-1 {
  transform: rotate(-90deg);
  display: inline-block;
}
.xuanzuan-2 {
  transform: rotate(180deg);
  display: inline-block;
}
.xuanzua-3 {
  transform: rotate(90deg);
  display: inline-block;
}
</style>
