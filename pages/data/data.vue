<template>
  <view style="margin: 20upx 0">
    <view class="hot">
      <view class="padding-tb-sm padding-lr-xs title">Hot recommended</view>
      <u-row gutter="10">
        <u-col span="3" v-for="(item, index) of recommendLeagues" :key="index">
          <item :item="item"></item>
          <!-- <view class="demo-layout league-item">
            <view class="img-box">
              <image mode="aspectFit" :src="item.logo" alt="" />
            </view>
            <text>{{ item.name }}</text>
          </view> -->
        </u-col>
      </u-row>
    </view>
    <view class="content">
      <u-tabs-swiper
        ref="uTabs"
        :list="moldList"
        :current="modelCurrent"
        @change="modelTabsChange"
        :is-scroll="false"
        swiperWidth="750"
        active-color="#02b875"
        class="fix-top"
      ></u-tabs-swiper>
      <view class="mold-con"> The international 47 matches </view>
    </view>
  </view>
</template>

<script>
import Item from "./Item";
import { getDataIndex, getDataCategory } from "@/api/data";
export default {
  name: "Data",
  data() {
    return {
      recommendLeagues: [],
      moldList: [],
      modelCurrent: 0,
    };
  },
  components: {
    Item,
  },
  created() {
    this.getDataIndex();
  },
  methods: {
    getDataIndex() {
      getDataIndex({ p: 1, num: 20 }).then((res) => {
        const info = res.info;
        this.recommendLeagues = info.recommend.slice(0, info.recommend.length);
        this.moldList = info.mold;
        this.getDataCategory();
      });
    },
		getDataCategory(){
			
		},
    modelTabsChange(index) {
      this.modelCurrent = index;
    },
  },
};
</script>

<style lang="scss" scoped>
// @import "@/assets/styles/variables.scss";
.mold-con {
  border-top: 1px solid #e5e5e5;
  margin-top: 8rpx;
}
.content {
  background: #ffffff;
}
.hot {
  width: 96%;
  background: #ffffff;
  margin: 0 auto;
}
.title {
  font-size: 30rpx;
}
.league-item {
  margin: 28rpx 4rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
