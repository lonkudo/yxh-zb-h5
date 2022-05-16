<template>
  <view class="slider b-f margin-xs">
    <u-swiper
      :list="list1"
      @change="change"
      @click="click"
      mode="dot"
    ></u-swiper>
  </view>
</template>

<script>
import { getBanner } from "@/api/home";
export default {
  name: "RecommendSlider",
  data() {
    return {
      list1: [
        
      ],
    };
  },
  created() {
    this.getBanner();
  },
  methods: {
		getBanner(){
			getBanner().then(res => {
				res.info.forEach(element => {
					this.list1.push(element.slide_pic)
				});
			})
		},
    change() {},
    click() {},
  },
};
</script>

<style lang="scss"></style>
