import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login/Login";
import Home from "../views/Home/Home";
import Register from "../views/Register/Register";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: false
  },
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'index',
      },
      {
        path: 'detail/:id',
        name: 'detail'
      }
    ]
  },
  {
    path:'/register',
    name: "Register",
    component: Register,
    hidden: false
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
