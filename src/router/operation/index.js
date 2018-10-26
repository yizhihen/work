let operation = [
    //运营管理
    // {
    //     path: '/operation',
    //     component: resolve => require(['@/components/subpage/operation/bulletin.vue'], resolve),
    //     meta: { title: '运营管理' },
    // },
    {
      //平台公告
      path: '/operation/bulletin',
      component:  resolve => require(['@/components/subpage/operation/bulletin.vue'], resolve),
      meta: { title: '平台公告' }
    },
    {
      //话题设置
      path: '/operation/topic',
      component:  resolve => require(['@/components/subpage/operation/topicSetting.vue'], resolve),
      meta: { title: '话题设置' }
    }
  ];
  export default operation
   