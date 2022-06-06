<template>
  <div>
    <team-head :info="info"> </team-head>
  </div>
</template>
<script>
import TeamHead from "../TeamHead";
export default {
  name: "League",
  components: {
    TeamHead,
  },
  data() {
    return {
      info: {},
    };
  },
  method: {},
};
</script>
<style scoped lang="scss"></style>
