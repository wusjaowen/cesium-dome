import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login/index' //初始化默认模型

import index_two from '@/page/login/index_glb' // 载入glb模型


import index_three from '@/page/login/index_3dtit' // 载入glb模型

import index_line from '@/page/login/index_line' //绘制 点 线 矩形 加入 图片 label

import index_color from '@/page/login/index_color' //替换颜色

import visualFly from "@/page/login/visualFly" //视角飞行 移动摄像头

import modalFly from "@/page/login/modalFly" //移动模型位置

import addWmts from '@/page/login/addWmts' //加载天地图数据

import primitiveORentities from '@/page/login/primitiveORentities' //primitive与entities方法构造集合体

import dome from '@/page/login/dome' //尝试


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
    }, {
        path: "/index_line",
        name: "index_line",
        component: index_line,
    }, {
        path: "/index_color",
        name: "index_color",
        component: index_color,
    }, {
        path: "/visualFly",
        name: "visualFly",
        component: visualFly,
    }, {
        path: "/dome",
        name: "dome",
        component: dome,
    }, {
        path: "/modalFly",
        name: "modalFly",
        component: modalFly,
    }, {
        path: "/addWmts",
        name: "addWmts",
        component: addWmts,
    }, {
        path: "/primitiveORentities",
        name: "primitiveORentities",
        component: primitiveORentities,
    }]
})