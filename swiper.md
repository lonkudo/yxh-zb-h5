# 关于 swiper 高度问题。

uniapp 的 swiper 的高度不会被内容自动撑起，所以需要用户设置。
这里有两种场景：

1、swiper 里面包裹 scroll-view，swiper 固定高度，里面 scroll-view 滚动。这种情况下用封装好的 this.initScrollHeight(height)。 height 是其他组件的高度，这个方法会读取设备的高度，然后减去 height 来获得指定高度。

使用的时候用。 let myHeight = await this.initScrollHeight(height), 然后把 myHeight 赋值给 swiper

2、还有一种是 swiper 里面的高度一直变化，整个页面可以滚动，这种情况用 swiperAutoHeight 这个 mixin 处理，详细看函数。
