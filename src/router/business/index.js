let business = [
    //业务管理
    {
      path: '/business',
      redirect: '/business/sublist'
    },
    {
      //标的列表
      path: '/business/sublist',
      component:  resolve => require(['@/components/subpage/business/sublist.vue'], resolve),
      meta: { title: '标的列表' }
    },
    {
      //待审核标列表  风控
      path: '/business/pendinglistfk',
      component:  resolve => require(['@/components/subpage/business/pendinglistfk.vue'], resolve),
      meta: { title: '待审核标列表' }
    },
    {
      //审核记录   风控
      path: '/business/checklistfk',
      component:  resolve => require(['@/components/subpage/business/checklistfk.vue'], resolve),
      meta: { title: '审核记录' }
    },
    {
      //巡检计划   风控
      path: '/business/checkplanfk',
      component:  resolve => require(['@/components/subpage/business/checkplanfk.vue'], resolve),
      meta: { title: '巡检计划' }
    },
    {
      //档案管理   风控
      path: '/business/filemanagefk',
      component:  resolve => require(['@/components/subpage/business/filemanagefk.vue'], resolve),
      meta: { title: '档案管理' }
    },
    {
      //待审核列表 法务
      path: '/business/pendinglistfw',
      component:  resolve => require(['@/components/subpage/business/pendinglistfw.vue'], resolve),
      meta: { title: '待审核列表' }
    },
    {
      //审核记录  法务
      path: '/business/checklistfw',
      component:  resolve => require(['@/components/subpage/business/checklistfw.vue'], resolve),
      meta: { title: '审核记录' }
    },
    {
      //后置审批  法务
      path: '/business/rearapproval',
      component:  resolve => require(['@/components/subpage/business/rearapproval.vue'], resolve),
      meta: { title: '后置审批' }
    },
    {
      //后置档案管理  法务
      path: '/business/filemanagefw',
      component:  resolve => require(['@/components/subpage/business/filemanagefw.vue'], resolve),
      meta: { title: '后置档案管理' }
    },
    {
      //客服跟进列表
      path: '/business/followlist',
      component:  resolve => require(['@/components/subpage/business/followlist.vue'], resolve),
      meta: { title: '客服跟进列表' }
    },
    {
      //客服跟进历史
      path: '/business/followhistory',
      component:  resolve => require(['@/components/subpage/business/followhistory.vue'], resolve),
      meta: { title: '客服跟进历史' }
    },
    {
      //在线客服管理
      path: '/business/servicemanage',
      component:  resolve => require(['@/components/subpage/business/servicemanage.vue'], resolve),
      meta: { title: '在线客服管理' }
    },
    {
      //逾期跟进
      path: '/business/followoverdue',
      component:  resolve => require(['@/components/subpage/business/followoverdue.vue'], resolve),
      meta: { title: '逾期跟进' }
    }
  ];
  export default business
   