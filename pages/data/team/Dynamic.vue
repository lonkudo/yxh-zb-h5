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
  name: "Dynamic",
  props: ["myHeight", "value", "isCountryTeam"],
  data() {
    return {
      newsList: [],
      page: 1,
      params: {},
    };
  },
  watch: {
    isCountryTeam: {
      handler(newVal, oldVal) {
        // console.log(newVal);
        if (newVal) {
          this.params = {
            type: "4",
            country_id: this.value,
          };
        } else {
          this.params = {
            type: "2",
            team_id: this.value,
          };
        }
      },
      immediate: true,
    },
  },
};
</script>
<style scoped lang="scss"></style>
