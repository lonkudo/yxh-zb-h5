<template>
  <view class="bg-white flex">
    <view class="w-230">
      <scroll-view scroll-y :style="{ height: myHeight + 'rpx' }">
        <view class="bg-white">
          <view
            class="padding-tb-xl padding-tb-s text-center"
            v-for="item of typeMenus"
            :key="item.type"
            :class="type === item.type ? 'active-type' : 'bg-gray'"
            @click="changeType(item)"
          >
            <text>{{ item.label }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="flex-sub">
      <t-table>
        <t-tr>
          <t-th width="70">Ranking</t-th>
          <t-th flexWidth="1" align="left">Players/Team</t-th>
          <t-th width="50">
            <view style="word-break: break-all">Total</view>
          </t-th>
        </t-tr>
        <scroll-view
          scroll-y
          :style="{ height: myHeight + 'rpx' }"
          @scrolltolower="onreachBottom"
        >
          <t-tr
            @change="change(item)"
            v-for="(item, index) of tableData"
            :key="item.id"
            className="t-tr-new"
          >
            <t-td width="70">
              {{ index + 1 }}
            </t-td>
            <t-td flexWidth="1" className="t-td-new">
              <view class="flex align-center">
                <view class="table-cell-image padding-tb-s">
                  <image mode="aspectFit" :src="item.logo" />
                </view>
                <view>
                  {{ item.name }}
                </view>
              </view>
            </t-td>
            <t-td width="50">{{ item.num }} </t-td>
          </t-tr>
        </scroll-view>
      </t-table>
    </view>
  </view>
</template>
<script>
import { getLeagueTeamRank } from "@/api/data";
const typeMenus = [
  { type: 1, label: "Goal" },
  { type: 2, label: "Conceded" },
  { type: 3, label: "Penalty" },
  { type: 4, label: "Shoot" },
  { type: 5, label: "Shoot in Target" },
  { type: 6, label: "Key Pass" },
  { type: 7, label: "Intercept" },
  { type: 8, label: "Block" },
  { type: 9, label: "Clearance Kick" },
  { type: 10, label: "Yellow Card" },
  { type: 11, label: "Red Card" },
];
export default {
  name: "LeagueTeam",
  props: ["value", "season_id", "myHeight"],
  components: {},
  data() {
    return {
      typeMenus: typeMenus,
      tableData: [],
      type: 1,
      page: 1,
    };
  },
  watch: {
    season_id: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.getLeagueTeamRank();
        }
      },
      immediate: true,
    },
  },
  methods: {
    // France => French Ligue 1
    getLeagueTeamRank() {
      getLeagueTeamRank(
        this.page,
        20,
        this.value,
        this.season_id,
        this.type
      ).then((res) => {
        this.tableData = [...this.tableData, ...res.info];
      });
    },
    changeType(item) {
      this.type = item.type;
      this.tableData = [];
      this.page = 1;
      this.getLeagueTeamRank();
    },
    change(item) {
      item["competition_id"] = this.value;
      uni.navigateTo({
        url:
          "/pages/data/team/team?item=" +
          encodeURIComponent(JSON.stringify(item)),
      });
    },
    onreachBottom() {
      ++this.page;
      this.getLeagueTeamRank();
    },
  },
};
</script>
<style scoped lang="scss">
.bg-gray-t {
  background-color: red;
}
.active-type {
  background-color: #ffffff;
}
.padding-tb-s {
  padding-left: 8rpx;
  padding-right: 8rpx;
}
.t-td {
  border: none;
}
.t-td-new {
  justify-content: flex-start !important;
}
.table-cell-image {
  image {
    width: 60rpx;
    height: 60rpx;
  }
}
</style>
