import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login/index' //初始化默认模型

import index_two from '@/page/login/index_glb' // 载入glb模型


import index_three from '@/page/login/index_3dtit' // 载入glb模型




Vue.use(Router)

export default new Router({
    routes: [{
        path: "/login",
        name: "Login",
        component: Login,
    }, {
        path: "/login-two",
        name: "Login-two",
        component: index_two,
    }, {
        path: "/login-three",
        name: "Login-three",
        component: index_three,
    }, ]
})