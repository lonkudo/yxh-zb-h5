import { getDataIndex, getDataCategory, } from '@/api/data'

const data = {
  state: {
    menuList: [],
  },
  mutations: {
    SET_MENULIST: (state, menuList) => {
      state.menuList = menuList
    },
  },
  actions: {
    // 登录
    GetMenuList({ commit }) {
      const recommend = new Promise((resolve, reject) => {
        getDataIndex({ p: 1, num: 20 }).then((res) => {
          // console.log(res.info);
          const info = res.info
          //  顶部热门推荐
          let recommend = info.recommend
          recommend.forEach((element) => {
            element.index =
              element.id +
              '_' +
              element.name +
              '_' +
              Math.round(Math.random() * 1000000)
          })
          resolve(recommend)
        })
      })
      recommend.then(recom => {
        getDataCategory().then((res) => {
          let info = res.info
          deepInfo(info)
          const menulist = [...recom, ...info]
          window.sessionStorage.setItem('MENULIST', JSON.stringify(menulist));
          // console.log(menulist);
          // commit('SET_MENULIST', menulist)
        })
      })
    },
  },
}
function deepInfo(menuList) {
  menuList.forEach((menu) => {
    menu.index =
      menu.id + '_' + menu.name + '_' + Math.round(Math.random() * 1000000)
    if (menu.data && menu.data.length > 0) {
      deepInfo(menu.data)
    }
  })
}

export default data
