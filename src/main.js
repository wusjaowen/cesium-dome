// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import Vuex from "vuex"
import store from "./store"
import 'element-ui/lib/theme-chalk/index.css';
import Qs from "qs"
import request from "./utils/request.js"
import url from "./utils/url.js"
import '@/assets/iconfont.css'
import '@/assets/fonts/iconfont.css'

// import '@/assets/css/common.css'

import animated from 'animate.css'
Vue.use(animated)

Vue.config.productionTip = false
Vue.prototype.$http = request

Vue.prototype.global = url

Vue.use(ElementUI);

import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: 'e36d7cd84a2b4321dfadd79b2c78db66',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Walking', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    // 默认高德 sdk 版本为 1.4.4
    // v: '1.4.4'
});

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
    // NProgress.start(); // 开启Progress
    var token = localStorage.getItem('token') || ''

    if (to.meta.title) {
        // document.title = to.meta.title
    }

    if (localStorage.getItem('token')) {
        console.log("undfine")
        next()
    } else {
        if (to.path === "/login") {
            next()
        } else {
            next('/login')
        }
        // NProgress.done()
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})