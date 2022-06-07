<script>
export default {
  name: 'HandicapTrend',
  props: {
    trendList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getProgress(num, total) {
      if (total > 0) return (num / total) * 100;
      else return 0;
    },
  },
  render(h) {
    return (
      <div class="progress-con">
        {this.trendList.map((trend) => {
          let homeProgress = this.getProgress(trend.up, trend.up + trend.down + trend.draw);
          let awayProgress = this.getProgress(trend.down, trend.up + trend.down + trend.draw);
          return (
            <el-row class="progress-row" gutter={32}>
              <el-col span={4} class="progress-left">
                {trend.name}
              </el-col>
              <el-col span={20}>
                <el-row>
                  <el-col span={8} class="red">
                    {trend.up} companies tend to rise
                  </el-col>
                  <el-col span={8} class="huise" style="text-align: center">
                    {trend.draw} unchanged
                  </el-col>
                  <el-col span={8} class="green" style="text-align: right">
                    {trend.down} tend to decline
                  </el-col>
                </el-row>
                <div class="time-line-bar">
                  <span class="red-line" style={{ width: homeProgress + '%' }}></span>
                  <span class="green-line" style={{ width: awayProgress + '%' }}></span>
                </div>
              </el-col>
            </el-row>
          );
        })}
      </div>
    );
  },
};
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
.progress-con {
  padding: 24px 0;
}
.progress-row {
  height: 60px;
  /* line-height: 60px; */
  display: flex;
  align-items: center;
}
.progress-left {
  border-right: 1px solid #d0cbcb;
  height: 100%;
  line-height: 60px;
  font-size: 14px;
  text-align: center;
  // font-weight: 550;
}

.huise,
.red,
.green {
  font-size: 16px;
  // font-weight: bold;
}
.huise {
  color: #d0cbcb;
}
.time-line-bar,
.red-line,
.green-line {
  height: 8px;
  border-radius: 10px;
}
.time-line-bar {
  position: relative;
  background: #999999;
  width: 100%;
  margin-top: 12px;
}
.red-line {
  // display: inline-block;
  position: absolute;
  left: 0;
  width: 30%;
  background: red;
}
.green-line {
  position: absolute;
  right: 0;
  width: 30%;
  background: $green;
}
.red {
  color: red;
}
.green {
  color: $green;
}
</style>
