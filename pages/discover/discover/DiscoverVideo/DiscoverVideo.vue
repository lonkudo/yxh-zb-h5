<template>
  <view class="padding-xs"
    ><discover-video-item
      v-for="(item, index) in videoList"
      :key="index"
      :videoInfo="item"
    ></discover-video-item
  ></view>
</template>

<script>
import DiscoverVideoItem from "./DiscoverVideoItem";
export default {
  name: "DiscoverVideo",
  components: {
    DiscoverVideoItem,
  },
  props: {
    videoList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss"></style>
