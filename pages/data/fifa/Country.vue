<template>
  <view class="bg-white">
    <t-table>
      <t-tr bgColor="#f0f0f0">
        <t-th width="80">Ranking</t-th>
        <t-th flexWidth="1" align="left">Team</t-th>
        <t-th width="100">Integral</t-th>
      </t-tr>
      <scroll-view
        scroll-y
        @scrolltolower="onreachBottom"
        :style="{ height: myHeight + 'rpx' }"
      >
        <t-tr
          v-for="(item, i) in tableList"
          :key="item.id + i"
          @change="goPage(item)"
        >
          <t-td width="80">{{ item.ranking }}</t-td>
          <t-td flexWidth="1" align="left">
            <view class="table-cell-image">
              <image mode="aspectFit" :src="item.logo" />
            </view>
            <text class="team-name">{{ item.name }}</text>
          </t-td>
          <t-td width="100">{{ item.points }}</t-td>
        </t-tr>
      </scroll-view>
    </t-table>
  </view>
</template>
<script>
import { getFifaRankCountry } from "@/api/data";
export default {
  name: "Country",
  props: ["myHeight"],
  components: {},
  data() {
    return {
      tableList: [],
      page: 1,
    };
  },
  mounted() {
    this.getFifaRankCountry();
  },
  methods: {
    goPage(item) {
      item.isCountryTeam = true;
      uni.navigateTo({
        url:
          "/pages/data/team/team?item=" +
          encodeURIComponent(JSON.stringify(item)),
      });
    },
    getFifaRankCountry({ p = this.page, num = 20 } = {}) {
      getFifaRankCountry({ p, num }).then((res) => {
        this.tableList = [...this.tableList, ...res.info];
      });
    },
    onreachBottom() {
      this.getFifaRankCountry({ p: ++this.page });
    },
  },
};
</script>
<style scoped lang="scss"></style>
