<template>
  <view class="bg-white">
    <view class="flex align-center justify-between padding-lr">
      <view class="flex align-center">
        <view class="img-box">
          <image :src="activeCompetition.logo" mode="aspectFit" />
        </view>
        <text class="text-very-black fs-28 margin-left-sm">
          {{ activeCompetition.name }}
        </text>
      </view>
      <view @click="show = true">
        <text class="iconfont icon-xiangxia"></text>
      </view>
    </view>
    <scroll-view scroll-y :style="{ height: myHeight + 'rpx' }">
      <view v-for="item of tableData" :key="item.year">
        <view class="text-center bg-gray padding-sm flex space-between">
          <view>{{ item.year }}</view>
          <view>
            <text>{{ item.list.competition_name }}</text>
            <text class="margin-left">{{ item.list.team_name }}</text>
          </view>
        </view>
        <view class="flex flex-wrap">
          <data-item label="First" v-model="item.list.first"></data-item>
          <data-item
            label="MinutesPlayed"
            v-model="item.list.minutes_played"
          ></data-item>
          <data-item label="Goals" v-model="item.list.goals"></data-item>
          <data-item label="Assists" v-model="item.list.assists"></data-item>
          <data-item
            label="DribbleSucc"
            v-model="item.list.dribble_succ"
          ></data-item>
          <data-item label="DuelsWon" v-model="item.list.duels_won"></data-item>
          <data-item
            label="Dispossessed"
            v-model="item.list.dispossessed"
          ></data-item>
          <data-item label="Fouls" v-model="item.list.fouls"></data-item>
          <data-item label="Tackles" v-model="item.list.tackles"></data-item>
          <data-item
            label="Interceptions"
            v-model="item.list.interceptions"
          ></data-item>
          <data-item
            label="BlockedShots"
            v-model="item.list.blocked_shots"
          ></data-item>
          <data-item
            label="Clearances"
            v-model="item.list.clearances"
          ></data-item>
          <data-item label="Penalty" v-model="item.list.penalty"></data-item>
          <data-item label="GavGold" v-model="item.list.gav_gold"></data-item>
          <data-item
            label="KeyPassesGav"
            v-model="item.list.key_passes_gav"
          ></data-item>
          <data-item
            label="PassesAccracy"
            v-model="item.list.passes_accuracy"
          ></data-item>
          <data-item
            label="LongBallAccuracy"
            v-model="item.list.long_balls_accuracy"
          ></data-item>
          <data-item label="Crosses" v-model="item.list.crosses"></data-item>
          <data-item
            label="CrossesAccuracy"
            v-model="item.list.crosses_accuracy"
          ></data-item>
        </view>
      </view>
    </scroll-view>
    <u-popup v-model="show" mode="bottom" border-radius="14" height="780">
      <view
        class="text-center padding-tb-sm"
        v-for="item of competitionOptions"
        :key="item.id"
        @click="changePop(item)"
      >
        <text
          :class="{
            'text-green':
              item.competition_id == activeCompetition.competition_id,
          }"
        >
          {{ item.name }}
        </text>
      </view>
    </u-popup>
  </view>
</template>
<script>
import {
  getPlayerDataCompetitionSelect,
  getPlayerDataCompetition,
} from "@/api/data";
import DataItem from "./components/DataItem.vue";
export default {
  name: "SData",
  components: {
    DataItem,
  },
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
      competitionOptions: [],
      activeCompetition: {},
      tableData: [],
      show: false,
    };
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        // console.log(newVal);
        if (newVal) {
          this.getPlayerDataCompetitionSelect();
        }
      },
      immediate: true,
    },
  },
  methods: {
    changePop(item) {
      console.log(item);
      this.activeCompetition = item;
      this.show = false;
      this.getPlayerDataCompetition();
    },
    getPlayerDataCompetition() {
      getPlayerDataCompetition(this.value, this.activeCompetition.id).then(
        (res) => {
          this.tableData = res.info;
        }
      );
    },
    getPlayerDataCompetitionSelect() {
      getPlayerDataCompetitionSelect(this.value).then((res) => {
        this.competitionOptions = res.info;
        if (this.competitionOptions.length > 0) {
          this.activeCompetition = this.competitionOptions[0];
          this.getPlayerDataCompetition();
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.img-box {
  width: 68rpx;
  height: 68rpx;
  img {
    object-fit: cover;
  }
}
</style>
