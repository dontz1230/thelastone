// 導入組件
import Vue from 'vue'
import VueRouter from 'vue-router'


import Home from './components/home/Index.vue'
import Signin from './components/Signin/Signin.vue'
import Dashboard from './components/Dashboard/Dashboard.vue'

import MainDashboard from './components/Dashboard/Dashmain.vue';
import Addposts from './components/Dashboard/AddPosts.vue'
import Postslist from './components/Dashboard/ListPosts.vue'
import Postview from './components/Post/Post.vue'
import PageNotFound from './components/404/404.vue'

import store from './components/Store/store.js'


// 安裝VueRouter
Vue.use(VueRouter);
// 配置安裝VueRouter
export default new VueRouter({
    // mode:'history',
    scrollBehavior(from,to,savedPosition){
        return {x:0, y:0}
    },
    routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/dashboard',
      component: Dashboard,
        children:[
          { path:'/', component: MainDashboard },
          { path:'add_posts', component: Addposts },
          { path:'posts_list', component: Postslist }
        ],
      //authGuard
      beforeEnter: (to,from, next) => {
        if(store.state.admin.token){
          next()
        } else {
          next('/')
        }
      }
    },
    { 
      path:'/post/:id',
      component: Postview 
    },
    {
      path:'*',
      component: PageNotFound
    }

  ]
});