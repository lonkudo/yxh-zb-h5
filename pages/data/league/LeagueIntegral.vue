<template>
  <view class="bg-white">
    <scroll-view scroll-y :style="{ height: myHeight + 'rpx' }">
      <t-table v-for="(table, i) in tableData" :key="i">
        <t-tr bgColor="#f0f0f0">
          <t-th flexWidth="1" align="left">{{ table.head }} Group Team</t-th>
          <t-th width="50">Game</t-th>
          <t-th width="80">
            <view style="word-break: break-all">Win/Flat/Lose</view>
          </t-th>
          <t-th width="80">
            <view style="word-break: break-all">Score/Loss/Net</view>
          </t-th>
          <t-th width="50">
            <view style="word-break: break-all">Integral</view>
          </t-th>
        </t-tr>
        <t-tr
          @change="change(item)"
          v-for="item of table.list"
          :key="item.id"
          :bgColor="getRowStyle(item)"
          className="t-tr-new"
        >
          <t-td flexWidth="1" className="t-td-new">
            <view class="flex">
              {{ item.position }}
              <view class="table-cell-image padding-tb-s">
                <image mode="aspectFit" :src="item.team_logo" />
              </view>
              {{ item.team_name }}
            </view>
          </t-td>
          <t-td width="50">
            {{ item.total }}
          </t-td>
          <t-td width="80">
            {{ item.won }}/{{ item.draw }}/{{ item.loss }}
          </t-td>
          <t-td width="80">
            {{ item.goals }}/{{ item.goals_against }}/{{ item.goal_diff }}
          </t-td>
          <t-td width="50">
            {{ item.points }}
            <view
              class="last-cell-promo"
              v-if="item.promotion.show"
              :style="{
                backgroundColor: set16ToRgb(item.promotion.color, 0.6),
              }"
              >{{ item.promotion.name }}
            </view>
          </t-td>
        </t-tr>
      </t-table>
    </scroll-view>
  </view>
</template>
<script>
import { getColorStr } from "@/utils/index";
import { getLeagueRankPoint } from "@/api/data";
import TTd from "../../../components/t-table/t-td.vue";
export default {
  name: "LeagueIntegral",
  props: ["value", "season_id", "myHeight"],
  components: { TTd },
  data() {
    return {
      tableData: [],
      stageList: [],
      activeStage: {
        id: "",
      },
      show: false,
      colors: [],
    };
  },
  watch: {
    season_id: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.getLeagueRankPoint();
        }
      },
      immediate: true,
    },
  },
  methods: {
    preSeason(type) {
      let result = null;
      if (type == 1) {
        this.stageList.find((item, index) => {
          if (item.id == this.activeStage.id) {
            result = this.stageList[index + 1];
          }
          return item.id == this.activeStage.id;
        });
      } else {
        this.stageList.find((item, index) => {
          if (item.id == this.activeStage.id) {
            if (index > 0) result = this.stageList[index - 1];
          }
          return item.id == this.activeStage.id;
        });
      }
      if (result) this.changeSeason(result);
    },
    changeSeason(item) {
      let param = item;
      this.show = false;
      this.activeStage = param;
      this.getLeagueRankPoint();
    },
    getLeagueRankPoint() {
      getLeagueRankPoint(this.value, this.season_id).then((res) => {
        this.tableData = res.info;
        this.colors = [];
        this.tableData.forEach((table) => {
          table.list.forEach((item, index) => {
            // if (item.team_name === 'Canada') console.log(item);
            if (JSON.stringify(item.promotion) !== "{}") {
              // 如果后台没有返回颜色,前端随机生成
              let result = this.colors.find((color) => {
                return color.name === item.promotion.name;
              });
              if (result) {
                item.promotion.color = result.color;
              } else {
                if (!item.promotion.color) {
                  const colorItem = {
                    name: item.promotion.name,
                    color: getColorStr(),
                  };
                  item.promotion.color = colorItem.color;
                  this.colors.push(colorItem);
                } else {
                  const colorItem = {
                    name: item.promotion.name,
                    color: item.promotion.color,
                  };
                  item.promotion.color = colorItem.color;
                  this.colors.push(colorItem);
                }
              }
              if (index > 0) {
                if (
                  item.promotion.name ===
                  this.tableData[index - 1].promotion.name
                )
                  item.promotion["show"] = false;
                else item.promotion["show"] = true;
              } else {
                item.promotion["show"] = true;
              }
            } else {
              item.promotion["show"] = false;
            }
          });
        });
        // console.log(this.tableData);
      });
    },
    change(item) {
      uni.navigateTo({
        url:
          "/pages/data/team/team?item=" +
          encodeURIComponent(JSON.stringify(item)),
      });
    },
    getRowStyle(args) {
      if (args.promotion && args.promotion.color) {
        const bgColor = this.set16ToRgb(args.promotion.color, 0.2);
        return bgColor;
      } else {
        return "";
      }
    },
    set16ToRgb(str, opacity) {
      if (!str) return;
      var reg = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
      if (!reg.test(str)) {
        return;
      }
      let newStr = str.toLowerCase().replace(/\#/g, "");
      let len = newStr.length;
      if (len == 3) {
        let t = "";
        for (var i = 0; i < len; i++) {
          t += newStr.slice(i, i + 1).concat(newStr.slice(i, i + 1));
        }
        newStr = t;
      }
      let arr = []; //将字符串分隔，两个两个的分隔
      for (var i = 0; i < 6; i = i + 2) {
        let s = newStr.slice(i, i + 2);
        arr.push(parseInt("0x" + s));
      }
      return "rgba(" + arr.join(",") + "," + opacity + ")";
    },
  },
};
</script>
<style scoped lang="scss">

.padding-tb-s {
  padding: 0 8rpx;
  margin-top: -8rpx;
}
.t-td-new {
  justify-content: flex-start !important;
}
.t-tr-new {
  position: relative;
}
.t-td {
  border: none;
}
.last-cell-promo {
  position: absolute;
  right: 0;
  top: 0;
  padding: 0 14px;
  height: 16px;
  line-height: 16px;
  color: #ffffff;
  // color: red;
  white-space: pre;
}
</style>
