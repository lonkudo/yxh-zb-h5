<template>
  <view>
    <view
      v-for="newsInfo of newsList"
      :key="newsInfo.id"
      class="news-item padding-sm b-f br-8"
      @tap="go(newsInfo)"
    >
      <view class="flex justify-between">
        <view
          class="flex flex-direction justify-between padding-top-xs padding-bottom-xs"
        >
          <text class="fc-b-3 fs-30 f-hide-2 w-450">
            {{ newsInfo.caption }}
          </text>
          <view class="flex justify-between">
            <view class="flex">
              <text class="fc-blue fs-24 f-hide w-180">
                {{ newsInfo.competition }}
              </text>
              <text class="fc-b-9 fs-24 f-hide">
                {{ newsInfo.create_time }}
              </text>
            </view>
            <view>
              <text class="fc-b-9 fs-24 f-hide">
                Read:{{ newsInfo.views }}
              </text>
            </view>
          </view>
        </view>
        <view>
          <img :src="newsInfo.img" alt="" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getDynamic } from "@/api/data";
export default {
  name: "InfoNews",
  // props: ["newsInfo"],
  props: {
    params: {
      type: Object,
    },
  },
  data() {
    return {
      newsList: [],
    };
  },
  watch: {
    params: {
      handler: function (newVal) {
        if (typeof newVal === "object" && JSON.stringify(newVal).length > 0)
          this.getDynamic();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    getDynamic() {
      getDynamic(this.params).then((res) => {
        this.newsList = res.info;
      });
    },
    go(info) {
      uni.navigateTo({
        url: "detail/newsDetail?id=" + info.id,
      });
    },
  },
};
</script>

<style lang="scss">
.news-item {
  img {
    width: 211rpx;
    height: 140rpx;
    border-radius: 10rpx;
  }
}
</style>
