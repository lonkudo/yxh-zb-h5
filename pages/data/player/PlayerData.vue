<template>
  <scroll-view scroll-y :style="{ height: myHeight + 'rpx' }">
    <view class="bg-white">
      <view class="text-center bg-gray padding-sm"> Basic Information </view>
      <view class="padding-lg border-b flex align-center team">
        <view class="img-box">
          <image :src="team.logo" mode="aspectFit" />
        </view>
        <text class="text-very-black fs-40 margin-left-sm">
          {{ team.name }}
        </text>
        <text class="margin-left-sm">
          {{ info.market_value }}&nbsp;{{ info.market_value_currency }}
        </text>
      </view>
      <view class="padding-sm flex">
        <view class="w-450">
          <view class="infomation-item">
            <img src="@/static/styles/png/player_location.png" alt="" />
            <text>
              <text class="text-very-black padding-right-sm">Location:</text>
              {{ info.position | filterPosion }}
            </text>
          </view>
          <view class="infomation-item">
            <img src="@/static/styles/png/player_birthday.png" alt="" />
            <text>
              <text class="text-very-black padding-right-sm">Birthday:</text>
              {{ info.birthday }}
            </text>
          </view>
          <view class="infomation-item">
            <img src="@/static/styles/png/player_region.png" alt="" />
            <text>
              <text class="text-very-black padding-right-sm">Region:</text>
              {{ info.country.name }}
            </text>
          </view>
          <view class="infomation-item">
            <img src="@/static/styles/png/player_contract.png" alt="" />
            <text>
              <text class="text-very-black padding-right-sm"
                >Contract Expires:</text
              >
              {{ info.contract_until }}
            </text>
          </view>
        </view>
        <view class="flex-sub">
          <view class="infomation-item">
            <img src="@/static/styles/png/player_height.png" alt="" />
            <text>
              <text class="text-very-black padding-right-sm">Height:</text>
              {{ info.height }}
            </text>
          </view>
          <view class="infomation-item">
            <img src="@/static/styles/png/player_age.png" alt="" />
            <text>
              <text class="text-very-black padding-right-sm">Age:</text>
              {{ info.age }}
            </text>
          </view>
          <view class="infomation-item">
            <img src="@/static/styles/png/player_foot.png" alt="" />
            <text>
              <text class="text-very-black padding-right-sm">Idiomatic:</text>
              {{ info.preferred_foot | filterFoot }}
            </text>
          </view>
        </view>
      </view>
      <view class="echart-a">
        <view style="width: 100%; height: 300px" id="chart"></view>
      </view>
      <view class="text-center bg-gray padding-sm"> The Transfer Record </view>
      <view>
        <t-tr v-for="item in transferList" :key="item.id">
          <t-td flexWidth="1">
            <view>
              <view>{{ item.transfer_time }}</view>
            </view>
          </t-td>
          <t-td width="130" align="right">
            <text>{{ item.from_team_name }}</text>
            <view class="table-cell-image">
              <image mode="aspectFit" :src="item.from_team_logo" />
            </view>
          </t-td>
          <t-td width="40">
            <image
              style="height: 50rpx; width: 50rpx"
              mode="aspectFit"
              src="@/static/styles/png/player_transfer.png"
            />
          </t-td>
          <t-td width="130" align="left">
            <view class="table-cell-image">
              <image mode="aspectFit" :src="item.to_team_logo" />
            </view>
            <text>{{ item.to_team_name }}</text>
          </t-td>
        </t-tr>
      </view>
      <view class="text-center bg-gray padding-sm"> Hornor </view>
      <view>
        <view
          class="honor-item"
          v-for="(honor, index) of honor_list"
          :key="index"
        >
          <view class="img-box">
            <img :src="honor.info.logo" alt="" />
          </view>
          <view class="mess-r">
            <view>{{ honor.info.name }} *{{ honor.count }}</view>
            <view>{{ honor.season }}</view>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>
<script>
const echarts = require("echarts");
import { getPlayerInfo, getPlayerTeamMate } from "@/api/data";
export default {
  name: "PlayerData",
  components: {},
  props: {
    value: {
      type: String,
    },
    myHeight: {
      type: Number,
    },
  },
  data() {
    return {
      info: {},
      team: {},
      honor_list: [],
      transferList: [],
    };
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        console.log(newVal);
        if (newVal) {
          this.getPlayerInfo();
        }
      },
      immediate: true,
    },
  },
  methods: {
    getPlayerInfo() {
      getPlayerInfo(this.value).then((res) => {
        const info = res.info;
        this.info = info.player;
        this.team = info.team;
        this.honor_list = info.honor_list;
        this.transferList = info.transfer;
        this.$nextTick(() => {
          this.initChar(info.player.ability);
        });
        // console.log(info.transfer);
      });
    },
    initChar(ability) {
      // 能力评分字段说明：1-扑救 save 2-预判 anticipation 3-处理球 Handling 4-空中 air
      // 5-战术 tactical 6-进攻 attack 7-防守 defensive
      // 8-创造力 creativity 9-技术 technology key是评分项目，value是分数值
      let indicator = [];
      let values = [];
      // indicator.push({ name: "save_" });
      Object.keys(ability).forEach(function (key) {
        values.push(ability[key]);
        switch (key) {
          case "1":
            indicator.push({ name: "Save_" + ability[key], max: 100 });
            break;
          case "2":
            indicator.push({ name: "Anticipation_" + ability[key], max: 100 });
            break;
          case "3":
            indicator.push({ name: "Handling_" + ability[key], max: 100 });
            break;
          case "4":
            indicator.push({ name: "Air_" + ability[key], max: 100 });
            break;
          case "5":
            indicator.push({ name: "Tactical_" + ability[key], max: 100 });
            break;
          case "6":
            indicator.push({ name: "Attack_" + ability[key], max: 100 });
            break;
          case "7":
            indicator.push({ name: "Defensive_" + ability[key], max: 100 });
            break;
          case "8":
            indicator.push({ name: "Creativity_" + ability[key], max: 100 });
            break;
          case "9":
            indicator.push({ name: "Technology_" + ability[key], max: 100 });
            break;
          default:
            return;
        }
      });
      // let myChart = echarts.init(this.$refs.chart);
      let myChart = echarts.init(document.getElementById("chart"));
      let option = {
        // center: ["75%", "50%"],
        radar: {
          radius: "50%",
          indicator: indicator,
          axisName: {
            padding: [0, -10], // 控制文字padding
            fontSize: 11,
            formatter: function (params) {
              const label = params.split("_")[0];
              const value = params.split("_")[1];
              return "{a|" + label + "} {b|[" + value + "]}";
            },
            rich: {
              b: {
                color: "#02b875",
                lineHeight: 10,
              },
            },
          },
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: values,
                // 背景区域颜色
                areaStyle: {
                  color: "#02B875",
                  opacity: 1,
                },
                // 拐点样式
                itemStyle: {
                  // borderType: "dotted",
                  opacity: 0,
                },
                // 线条样式
                lineStyle: {
                  opacity: 0,
                },
              },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  filters: {
    filterPosion(type) {
      switch (type) {
        case "F":
          return "striker";
        case "M":
          return "The midfield";
        case "D":
          return "defender";
        case "G":
          return "The goalkeeper";
        default:
          return "";
      }
    },
    filterFoot(type) {
      switch (type) {
        case "1":
          return "Left Foot";
        case "2":
          return "Right Foot";
        case "3":
          return "Foot";
        default:
          return "Unknown";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.team {
  .img-box {
    width: 68rpx;
    height: 68rpx;
    img {
      object-fit: cover;
    }
  }
}
.honor-item {
  padding: 24rpx 0;
  display: flex;
  .img-box {
    width: 160rpx;
    height: 160rpx;
    img {
      object-fit: cover;
    }
  }
  .mess-r {
    flex: 1;
    padding-left: 50rpx;
    :nth-child(2) {
      background: #f6f6f8;
      padding: 8rpx 16rpx;
      margin-top: 20rpx;
    }
  }
}
.infomation-item {
  // display: inline-block;
  height: 68rpx;
  line-height: 68rpx;
  margin-bottom: 16px;
  img {
    width: 52rpx;
    height: 52rpx;
    vertical-align: middle;
    margin-right: 12rpx;
  }
}
</style>
