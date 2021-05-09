import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login/Login";
import Home from "../views/Home/Home";
import Register from "../views/Register/Register";
import Index from "../views/Home/Index";
import Detail from "../views/Home/Detail";
import MyOrder from "../views/MyOrder/MyOrder";
import MyAddress from "../views/MyAddress/MyAddress";
import OpenStore from "../views/OpenStore/OpenStore";
import CheckOut from "../views/CheckOut/CheckOut";
import Cart from "../views/Home/Cart";
import Profile from "../views/Profile/Profile";

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
        path: '',
        component: Index
      },
      {
        path: 'index',
        name: 'index',
        component: Index
      },
      {
        path: 'detail/:id',
        name: 'detail',
        component: Detail
      },
      {
        path: 'cart',
        name: 'cart',
        component: Cart
      },
      {
        path:'/checkout',
        name: 'Checkout',
        component: CheckOut
      },
      {
        path: 'profile',
        name: "Profile",
        component: Profile
      },
      {
        path:'openStore',
        name: 'OpenStore',
        component: OpenStore
      },
    ]
  },
  {
    path:'/register',
    name: "Register",
    component: Register,
    hidden: false
  },
  {
    path:'/myOrder',
    name: "MyOrder",
    component: MyOrder,
  },
  {
    path:'/myAddress',
    name: 'MyAddress',
    component: MyAddress
  },



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
