<template>
  <t-table @change="change">
    <t-tr>
      <t-th>Ranking</t-th>
      <t-th>Team</t-th>
      <t-th>Integral</t-th>
      <t-th>Value(EUR)</t-th>
    </t-tr>
    <scroll-view
      scroll-y=""
      class="flex flex-direction b-f6"
      :style="{ height: myHeight + 'rpx' }"
    >
      <t-tr v-for="item in tableList" :key="item.id">
        <t-td>{{ item.ranking }}</t-td>
        <t-td>
          <span class="team-info-cell">
            <image mode="aspectFit" :src="item.logo" />
            <span>{{ item.name }}</span>
          </span>
        </t-td>
        <t-td>{{ item.points }}</t-td>
        <t-td>{{ item.market_value }}</t-td>
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
    };
  },
  mounted() {
    this.getFifaRankClub();
  },
  methods: {
    getFifaRankClub({ p = 1, num = 20 } = {}) {
      getFifaRankClub({ p, num }).then((res) => {
        this.tableList = res.info;
      });
    },
  },
};
</script>
<style scoped lang="scss"></style>
