<template>
  <view class="bg-white">
    <view class="flex justify-center border-b padding-sm">
      <view class="flex-sub" @click="preSeason(1)">
        <text class="text-green">Previous Year</text>
      </view>
      <view class="flex-sub text-center" @click="show = true">
        <text class="">{{ seasonYear }}</text>
        <text class="iconfont icon-xiangshang xuanzuan-2"></text>
      </view>
      <view class="flex-sub text-right" @click="preSeason(2)">
        <text class="text-green">Next Year</text>
      </view>
    </view>
    <t-table>
      <scroll-view scroll-y :style="{ height: myHeight - 76 + 'rpx' }">
        <view v-if="tableData.lease.length > 0">
          <transfer-item
            :list="tableData.lease"
            transferName="Lease"
          ></transfer-item>
        </view>
        <template v-if="tableData.loan.length > 0">
          <transfer-item
            :list="tableData.loan"
            transferName="Loan ends"
          ></transfer-item>
        </template>
        <template v-if="tableData.transfer.length > 0">
          <transfer-item
            :list="tableData.transfer"
            transferName="Transfer"
          ></transfer-item>
        </template>
        <template v-if="tableData.retired.length > 0">
          <transfer-item
            :list="tableData.retired"
            transferName="Retired"
          ></transfer-item>
        </template>
        <template v-if="tableData.draft.length > 0">
          <transfer-item
            :list="tableData.draft"
            transferName="Draft"
          ></transfer-item>
        </template>
        <template v-if="tableData.cancelled.length > 0">
          <transfer-item
            :list="tableData.cancelled"
            transferName="Cancelled"
          ></transfer-item>
        </template>
        <template v-if="tableData.signed.length > 0">
          <transfer-item
            :list="tableData.signed"
            transferName="Signed"
          ></transfer-item>
        </template>
        <template v-if="tableData.unknown.length > 0">
          <transfer-item
            :list="tableData.unknown"
            transferName="Unknown"
          ></transfer-item>
        </template>
      </scroll-view>
    </t-table>
    <u-popup v-model="show" mode="bottom" border-radius="14" height="780">
      <view
        class="text-center padding-tb-sm"
        v-for="item of yearOptions"
        :key="item.id"
        @click="changeSeason(item)"
      >
        <text :class="{ 'text-green': item.id == seasonId }">
          {{ item.name }}
        </text>
      </view>
    </u-popup>
  </view>
</template>
<script>
import { getTransferTime, getTeamDetailTransfer } from "@/api/data";
import TransferItem from "./components/TransferItem";
export default {
  name: "TeamTransfer",
  props: ["myHeight", "value"],
  components: {
    TransferItem,
  },
  data() {
    return {
      show: false,
      tableData: {
        lease: [],
        loan: [],
        transfer: [],
        draft: [],
        retired: [],
        cancelled: [],
        signed: [],
        unknown: [],
      },
      yearOptions: [],
      page: 1,
      seasonId: "",
      seasonYear: "",
    };
  },
  watch: {
    // value: {
    //   handler(newVal, oldVal) {
    //     console.log(newVal);
    //     if (newVal) {
    //       this.getTeamDetailTransfer();
    //     }
    //   },
    //   immediate: true,
    // },
  },
  mounted() {
    this.getTransferTime();
  },
  methods: {
    preSeason(type) {
      let result = null;
      if (type == 1) {
        this.yearOptions.find((item, index) => {
          if (item.timestamp == this.seasonId) {
            result = this.yearOptions[index + 1];
          }
          return item.id == this.seasonId;
        });
      } else {
        this.yearOptions.find((item, index) => {
          if (item.timestamp == this.seasonId) {
            if (index > 0) result = this.yearOptions[index - 1];
          }
          return item.id == this.seasonId;
        });
      }
      if (result) this.changeSeason(result);
    },
    changeSeason(item) {
      console.log(item);
      let param = item;
      this.seasonId = param.timestamp;
      this.seasonYear = param.name;
      this.show = false;
      this.getTeamDetailTransfer();
    },
    change(item) {
      uni.navigateTo({
        url:
          "/pages/data/team/team?item=" +
          encodeURIComponent(JSON.stringify(item)),
      });
    },
    resetTableData() {
      this.tableData = {
        lease: [],
        loan: [],
        transfer: [],
        draft: [],
        retired: [],
        cancelled: [],
        signed: [],
        unknown: [],
      };
    },
    getTeamDetailTransfer() {
      this.resetTableData();
      getTeamDetailTransfer(this.value, this.seasonId).then((res) => {
        let info = res.info;
        if (JSON.stringify(res.info) !== "{}") {
          info.forEach((element) => {
            this.transferType(element);
          });
        }
      });
    },
    transferType(element) {
      if (typeof element.transfer_type === "string")
        element.transfer_type = parseInt(element.transfer_type);
      switch (element.transfer_type) {
        case 1:
          this.tableData.lease.push(element);
          break;
        case 2:
          this.tableData.loan.push(element);
          break;
        case 3:
          this.tableData.transfer.push(element);
          break;
        case 4:
          this.tableData.retired.push(element);
          break;
        case 5:
          this.tableData.draft.push(element);
          break;
        case 6:
          this.tableData.cancelled.push(element);
          break;
        case 7:
          this.tableData.signed.push(element);
          break;
        case 8:
          this.tableData.unknown.push(element);
          break;
        default:
          break;
      }
    },
    getTransferTime() {
      getTransferTime().then((res) => {
        this.yearOptions = res.info;
        this.seasonId = this.yearOptions[0].timestamp;
        this.seasonYear = this.yearOptions[0].name;
        this.getTeamDetailTransfer();
      });
    },
  },
};
</script>
<style scoped lang="scss">
.table-cell-image {
  image {
    width: 40rpx;
    height: 40rpx;
  }
}
.border-ra-lg {
  border-radius: 40upx;
}
.t-td {
  border: none;
}
.xuanzuan-1 {
  transform: rotate(-90deg);
  display: inline-block;
}
.xuanzuan-2 {
  transform: rotate(180deg);
  display: inline-block;
}
.xuanzua-3 {
  transform: rotate(90deg);
  display: inline-block;
}
</style>
