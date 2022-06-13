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
  name: "LeagueDynamic",
  props: ["myHeight", "value", "isCountryTeam"],
  computed: {
    params() {
      return {
        type: "1",
        competition_id: this.value,
      };
    },
  },
};
</script>
<style scoped lang="scss"></style>
