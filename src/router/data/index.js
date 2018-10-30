let data = [
    //数据统计
    {
      path: '/data',
      redirect: '/data/business'
    },
    {
      //商户统计
      path: '/data/business',
      component:  resolve => require(['@/components/subpage/data/business.vue'], resolve),
      meta: { title: '商户统计' }
    },
    {
      //用户统计
      path: '/data/user',
      component:  resolve => require(['@/components/subpage/data/user.vue'], resolve),
      meta: { title: '用户统计' }
    },
    {
      //促销统计
      path: '/data/sales',
      component:  resolve => require(['@/components/subpage/data/sales.vue'], resolve),
      meta: { title: '促销统计' }
    },
    {
      //风控控制
      path: '/data/windcontrol',
      component:  resolve => require(['@/components/subpage/data/windcontrol.vue'], resolve),
      meta: { title: '风控控制' }
    },
    {
      //资金账户统计
      path: '/data/account',
      component:  resolve => require(['@/components/subpage/data/account.vue'], resolve),
      meta: { title: '资金账户统计' }
    },
    {
      //计划进程监控
      path: '/data/plan',
      component:  resolve => require(['@/components/subpage/data/plan.vue'], resolve),
      meta: { title: '计划进程监控' }
    },
    {
      //借款统计
      path: '/data/loan',
      component:  resolve => require(['@/components/subpage/data/loan.vue'], resolve),
      meta: { title: '借款统计' }
    },
    {
      //出借统计
      path: '/data/lending',
      component:  resolve => require(['@/components/subpage/data/lending.vue'], resolve),
      meta: { title: '出借统计' }
    },
    {
      //充值提现统计
      path: '/data/recharge',
      component:  resolve => require(['@/components/subpage/data/recharge.vue'], resolve),
      meta: { title: '充值提现统计' }
    }
  ];
  export default data
   