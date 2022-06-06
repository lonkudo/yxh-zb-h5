<template>
  <t-table>
    <t-tr>
      <t-th>序号</t-th>
      <t-th>姓名</t-th>
      <t-th>年龄</t-th>
      <t-th>爱好</t-th>
    </t-tr>
    <t-tr v-for="item in tableList" :key="item.id">
      <t-td>{{ item.id + 1 }}</t-td>
      <t-td>{{ item.name }}</t-td>
      <t-td>{{ item.age }}</t-td>
      <t-td>{{ item.hobby }}</t-td>
    </t-tr>
  </t-table>
</template>
<script>
import { tTable, tTh, tTr, tTd } from "@/components/t-table";
export default {
  name: "Country",
  components: {
    tTable,
    tTh,
    tTr,
    tTd,
  },
  data() {
    return {
      tableList: [
        {
          id: 0,
          name: "张三",
          age: "19",
          hobby: "游泳",
        },
        {
          id: 1,
          name: "李四",
          age: "21",
          hobby: "绘画",
        },
        {
          id: 2,
          name: "王二",
          age: "29",
          hobby: "滑板",
        },
        {
          id: 3,
          name: "码字",
          age: "20",
          hobby: "蹦极",
        },
      ],
    };
  },
  method: {},
};
</script>
<style scoped lang="scss"></style>
