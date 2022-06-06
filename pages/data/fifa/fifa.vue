<template>
  <view>
    <team-head :info="league"> </team-head>
  </view>
</template>
<script>
import Club from "./Club";
import Country from "./Country";
import TeamHead from "../TeamHead";
export default {
  name: "Fifa",
  components: {
    Club,
    Country,
    TeamHead,
  },
  data() {
    return {
      league: {},
    };
  },
  onLoad(option) {
    this.league = JSON.parse(decodeURIComponent(option.league));
    console.log(this.league);
  },
  method: {},
};
</script>
<style scoped lang="scss"></style>
