import Vue from 'vue';
import Router from 'vue-router';
import operation from "./operation/index";  //运营管理
import product from "./product/index";      //产品管理
import itegral from "./itegral/index";      //积分系统
import business from "./business/index";    //业务管理
import data from "./data/index";            //数据统计
import credit from "./credit/index";        //资信系统
import authority from "./authority/index";  //权限管理

let list = [
    {
        path: '/dashboard',
        component: resolve => require(['../components/page/Dashboard.vue'], resolve),
        meta: { title: '系统首页' }
    },
    {
        path: '/personal',
        component: resolve => require(['../components/page/PersonalCenter.vue'], resolve),
        meta: { title: '个人中心' }
    },                
    {
        path: '/mail',
        component: resolve => require(['../components/page/Mail.vue'], resolve),
        meta: { title: '邮件' }
    },                
    {
        path: '/message',
        component: resolve => require(['../components/page/Message.vue'], resolve),
        meta: { title: '即时通讯' }
    }
]

let base = [...list,...operation,...product,...itegral,...business,...data,...credit,...authority]

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/operation/bulletin'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children: base
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
