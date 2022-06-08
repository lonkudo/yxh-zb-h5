<template>
  <t-table>
    <t-tr>
      <t-th width="80">Ranking</t-th>
      <t-th flexWidth="1" align="left">Team</t-th>
      <t-th width="80">Integral</t-th>
      <t-th width="100">Value(EUR)</t-th>
    </t-tr>
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
        <t-td width="100">{{ (item.market_value / 1000000).toFixed(1) }}M</t-td>
      </t-tr>
    </scroll-view>
  </t-table>
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
<style scoped lang="scss"></style>
