import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 路由元信息
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login'),
    meta:{
        title:"爱设管理端登录",
        auth:false
    }
  },
  {
    path:'/',
    name:'main',
    // @  ===> wuti/src
    component:()=> import('@/views/main/Main'),
      meta: {
        title:"爱设管理端",
        auth: true
      },
      children:[
          {path:'datacenter',name:'datacenter',
              component:()=> import('../views/datacenter/Datacenter'),
              meta:{ title:"数据中心"}
          },
          {path:'coursecate',name:'coursecate',
              component:()=> import('../views/coursecate/Coursecate'),
              meta:{ title:"课程分类"}
          },
          {path:'password',name:'password',
              component:()=> import('../views/password/Password'),
              meta:{ title:"修改密码"}
          },
          {path:'courseinsert',name:'courseinsert',
              component:()=> import('../views/course/Insert'),
              meta:{ title:"课程添加"}
          },
          {path:'courseindex',name:'courseindex',
              component:()=> import('../views/course/index'),
              meta:{ title:"课程查看"}
          },
          {path:'chapterindex',name:'chapterindex',
              component:()=> import('../views/chapter/Index'),
              meta:{ title:"章节管理"},
              children:[
                  {path:'chapterinsert',name:'chapterinsert',
                      component:()=> import('../views/chapter/Insert'),
                      meta:{ title:"章节添加"}
                  },
                  {path:'chapterquery',name:'chapterquery',
                      component:()=> import('../views/chapter/Query'),
                      meta:{ title:"章节查看"}
                  }
              ]
          }

      ]
  }
]

const router = new VueRouter({
  mode:'hash',
  routes
})

router.beforeEach((to, from, next)=>{
  let toName = to.name;
  document.title = to.meta.title || '爱设管理系统';
    // to.meta.auth
  if(  toName === 'login'){
     next();
  }else{
     let loginFlag = sessionStorage.getItem('islogin');
     if(loginFlag && loginFlag.trim().length){
        next();
     }else {
        next('/login')
     }
  }

})

export default router
