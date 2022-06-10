<template>
  <scroll-view
    scroll-y
    @scrolltolower="onreachBottom"
    :style="{ height: myHeight + 'rpx' }"
  >
    <info-news :params="params"></info-news>
  </scroll-view>
</template>
<script>
import InfoNews from "../InfoNews";
export default {
  components: { InfoNews },
  name: "PlayerDynamic",
  props: ["myHeight", "value"],
  data() {
    return {
      newsList: [],
      page: 1,
    };
  },
  computed: {
    params() {
      return {
        type: "3",
        player_id: this.value,
      };
    },
  },
};
</script>
<style scoped lang="scss"></style>
