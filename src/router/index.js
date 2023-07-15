import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {
      name: 'home',
      path: '/home',
      component: ()=>import("@/views/Home.vue"),
      children: [
        {
          name: 'region',
          path: 'region',
          meta: '区域管理',
          component:()=>import("@/views/RegionView.vue")
        },
        {
          name: 'city',
          path: 'city',
          meta: '城市管理',
          component:()=>import("@/views/CityView.vue")
        },
        {
          name: 'addRegion',
          path: 'addRegion',
          meta: '新增/编辑区域',
          component:()=>import("@/views/AddRegion.vue")
        },
        {
          name: 'addCity',
          path: 'addCity',
          meta: '新增/编辑城市',
          component:()=>import("@/views/AddCity.vue")
        },
        {
          name: 'editRegion',
          path: 'editRegion/:id?',
          meta: '新增/编辑区域',
          component:()=>import("@/views/AddRegion.vue")
        },
        {
          name: 'editCity',
          path: 'editCity/:id',
          meta: '新增/编辑城市',
          component:()=>import("@/views/AddCity.vue")
        }
      ]
    },
    {
      path:"/white",
      name:'white',
      component:()=>import("@/views/White.vue")
    }
  ]
})

export default router