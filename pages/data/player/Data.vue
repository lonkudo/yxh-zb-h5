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
      <view>
        <text class="iconfont icon-xiangxia"></text>
      </view>
    </view>
    <scroll-view scroll-y :style="{ height: myHeight + 'rpx' }"> </scroll-view>
  </view>
</template>
<script>
import {
  getPlayerDataCompetitionSelect,
  getPlayerDataCompetition,
} from "@/api/data";
export default {
  name: "SData",
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
      competitionOptions: [],
      activeCompetition: {},
      tableData: [],
    };
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        console.log(newVal);
        if (newVal) {
          this.getPlayerDataCompetitionSelect();
        }
      },
      immediate: true,
    },
  },
  methods: {
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
