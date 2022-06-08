<template>
  <view class="bg-white">
    <view class="flex  justify-center border-b padding-tb">
      <view class="padding-sm bg-gray border-ra-lg">
        <text class="iconfont icon-xiangshang xuanzuan-1"></text>
        <text class="">previous round</text>
      </view>
      <view class="padding-sm margin-lr-lg bg-gray border-ra-lg">
        <text class="iconfont icon-xiangshang xuanzuan-2"></text>
        <text class="">Round 38</text>
      </view>
      <view class="padding-sm bg-gray border-ra-lg">
        <text class="">next round</text>
        <text class="iconfont icon-xiangshang xuanzua-3"></text>
      </view>
    </view>
    <t-table>
      <scroll-view
        scroll-y
        @scrolltolower="onreachBottom"
        :style="{ height: myHeight + 'rpx' }"
      >
        <t-tr
          v-for="(item, i) in tableList"
          :key="item.id + i"
          @change="change(item)"
        >
          <t-td width="80">{{ item.ranking }}</t-td>
          <t-td flexWidth="1" align="left">
            <view class="table-cell-image">
              <image mode="aspectFit" :src="item.logo" />
            </view>
            <text class="team-name">{{ item.name }}</text>
          </t-td>
          <t-td width="80">{{ item.points }}</t-td>
          <t-td width="100"
            >{{ (item.market_value / 1000000).toFixed(1) }}M</t-td
          >
        </t-tr>
      </scroll-view>
    </t-table>
  </view>
</template>
<script>
import { tTable, tTh, tTr, tTd } from "@/components/t-table";
import { getFifaRankClub } from "@/api/data";
export default {
  name: "Club",
  props: ["myHeight"],
  components: {
    tTable,
    tTh,
    tTr,
    tTd,
  },
  data() {
    return {
      tableList: [],
      page: 1,
    };
  },
  mounted() {
    this.getFifaRankClub();
  },
  methods: {
    change(item) {
      uni.navigateTo({
        url:
          "/pages/data/team/team?item=" +
          encodeURIComponent(JSON.stringify(item)),
      });
    },
    getFifaRankClub({ p = this.page, num = 20 } = {}) {
      getFifaRankClub({ p, num }).then((res) => {
        this.tableList = [...this.tableList, ...res.info];
      });
    },
    onreachBottom() {
      this.getFifaRankClub({ p: ++this.page });
    },
  },
};
</script>
<style scoped lang="scss">
.border-b {
  border-bottom: 1px solid #999999;
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
