<template>
  <info-data :info="teamInfo"></info-data>
</template>
<script>
import InfoData from '../InfoData';
export default {
  name: 'TeamData',
  components: { InfoData },
  props: {
    teamInfo: {
      type: Object,
    },
  },
};
</script>
