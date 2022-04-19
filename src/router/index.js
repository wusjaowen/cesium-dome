import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login/index' //登录







Vue.use(Router)

export default new Router({
    routes: [{
        path: "/login",
        name: "Login",
        component: Login,
    }, ]
})