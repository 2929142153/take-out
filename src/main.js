/*
入口js
*/
import Vue from 'vue'
import app from './App.vue'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'
import './mock/mockSever'    //加载mocksever即可
import './filters'  //加载过滤器
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'

//注册全局标签
Vue.component(Button.name, Button)  //<mt-button>

//图片懒加载
Vue.use(VueLazyload)
Vue.use(VueLazyload,{  //内部自定义一个lazy
  loading
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(app),
  router,  //使用上vue-router
  store, // 使用上vuex
})
