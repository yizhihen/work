import Vue from 'vue';
import Router from 'vue-router';
import operation from "./operation/index";
import product from "./product/index";

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

let base = [...list,...operation,...product]

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
