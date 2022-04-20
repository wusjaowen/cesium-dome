import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login/index' //

import index_two from '@/page/login/index_two' //







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
    }, ]
})