// 引入路由包
import Vue from "vue";
import VueRouter from "vue-router"
// 注册/挂载插件
Vue.use(VueRouter);

const router = new VueRouter({
    mode:'hash',
    routes:[
        {path:'/',name:'home',component:()=>import('@/views/index/index'),meta:{title:'AIJIN|爱金'}},
        {path:'/courselist',name:'courselist',component:()=>import('@/views/index/courselist'),meta:{title:'爱金课程列表'}},
        {path:'/coursedetail',name:'coursedetail',component:()=>import('@/views/index/details'),meta:{title:'爱金课程详情'}}
    ]
})


// 暴露路由
export default router;
