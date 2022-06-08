<template>
  <view class="bg-white">
    <view class="text-center bg-gray padding-sm"> The Team Information </view>
    <view class="padding-sm">
      <view class="infomation-item">
        <img src="@/static/styles/png/team_date_host.png" alt="" />
        <text>Coach:{{ info.coach.name }}</text>
      </view>
      <view class="infomation-item">
        <img src="@/static/styles/png/team_date_time.png" alt="" />
        <text>Set up the time:{{ info.foundation_time }}</text>
      </view>
      <view class="infomation-item">
        <img src="@/static/styles/png/team_date_country.png" alt="" />
        <text>Countries:{{ info.country.name }}</text>
      </view>
      <view class="infomation-item">
        <img src="@/static/styles/png/team_date_area.png" alt="" />
        <text>Stadium:{{ info.venue.name_en }}</text>
      </view>
      <view class="infomation-item">
        <img src="@/static/styles/png/team_date_area.png" alt="" />
        <text>Capacity:{{ info.venue.capacity }}</text>
      </view>
    </view>
    <view class="text-center bg-gray padding-sm"> Hornor </view>
    <view>
      <view
        class="honor-item"
        v-for="(honor, index) of info.honor_list"
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
</template>
<script>
export default {
  name: "InfoData",
  components: {},
  props: {
    info: {
      type: Object,
    },
  },
};
</script>
<style lang="scss" scoped>
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
