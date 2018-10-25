import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/userList',
                    component: resolve => require(['../components/page/UserList.vue'], resolve),
                    meta: { title: '用户列表' }
                },
                {
                    path: '/merchantList',
                    component: resolve => require(['../components/page/MerchantList.vue'], resolve),
                    meta: { title: '商户列表' }
                },
                {
                    path: '/openMerchant',
                    component: resolve => require(['../components/page/OpenMerchant.vue'], resolve),
                    meta: { title: '商户开通' }
                },
                {
                    path: '/siteSetting',
                    component: resolve => require(['../components/page/SiteSetting.vue'], resolve),
                    meta: { title: '网站设置' }
                },
                {
                    path: '/itemAudit',
                    component: resolve => require(['../components/page/ItemAudit.vue'], resolve),
                    meta: { title: '投标审核' }
                },
                {
                    path: '/itemList',
                    component: resolve => require(['../components/page/ItemList.vue'], resolve),
                    meta: { title: '投标列表' }
                },
                {
                    path: '/accountList',
                    component: resolve => require(['../components/page/AccountList.vue'], resolve),
                    meta: { title: '账户一览' }
                },
                {
                    path: '/merchantMoney',
                    component: resolve => require(['../components/page/MerchantMoney.vue'], resolve),
                    meta: { title: '资金进程' }
                },
                {
                    path: '/withdrawList',
                    component: resolve => require(['../components/page/WithdrawList.vue'], resolve),
                    meta: { title: '充值提现' }
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
