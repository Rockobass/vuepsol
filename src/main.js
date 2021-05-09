import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import {
  postRequest,
  deleteRequest,
  getRequest,
  postKeyValueRequest,
  putRequest
} from "./network/request";

import qs from 'qs'
import { InfiniteScroll } from 'element-ui';
Vue.use(InfiniteScroll)

Vue.use(ElementUI);

Vue.prototype.postRequest = postRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.$qs = qs;

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === "/register") {
    next();
  } else {
    if (window.sessionStorage.getItem("user")) {
      next();
    } else {
      next('/login?redirect=' + to.path);
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
