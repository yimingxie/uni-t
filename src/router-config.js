import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/bind-device",
      // name: "Test",
      // meta: {
      //   title: "测试",
      //   auto: false // 是否需要权限
      // },
      // component: (resolve) => require(['./views/Test.vue'], resolve)
    },
    {
      path: "/bind-device",
      name: "bind-device",
      meta: {
        title: "设备绑定",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/device/BindDevice.vue'], resolve)
    },
    {
      path: "/device-query",
      name: "device-query",
      meta: {
        title: "历史查询",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/device/DeviceQuery.vue'], resolve)
    },
  
  ]
})


// router.beforeEach((to, from, next) => {
//   // 判断当前的token是否存在
//   console.log(to.meta)
//   let token = window.localStorage.getItem("user-token")
//   if (to.matched.some(record => record.meta.auth) && (!token || token === null)) {
//     next({
//       path: "/login",
//       query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//     })
//   } else {
//     next()
//   }
// })


router.beforeEach((to, from, next) => {
  // 设置标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})


export default router

