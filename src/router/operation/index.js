let operation = [
    {
      path: '/operation',
      redirect: '/operation/bulletin'
    },    
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
    },
    {
      //话题内容审核
      path: '/operation/topiccheck',
      component:  resolve => require(['@/components/subpage/operation/topicCheck.vue'], resolve),
      meta: { title: '话题内容审核' }
    },
    {
      //学院设置
      path: '/operation/college',
      component:  resolve => require(['@/components/subpage/operation/collegeSetting.vue'], resolve),
      meta: { title: '学院设置' }
    },
    {
      //学院文章管理
      path: '/operation/articlemanage',
      component:  resolve => require(['@/components/subpage/operation/articleManage.vue'], resolve),
      meta: { title: '学院文章管理' }
    },
    {
      //合同&协议
      path: '/operation/agreement',
      component:  resolve => require(['@/components/subpage/operation/agreement.vue'], resolve),
      meta: { title: '合同&协议' }
    },
    {
      //产品介绍
      path: '/operation/products',
      component:  resolve => require(['@/components/subpage/operation/products.vue'], resolve),
      meta: { title: '产品介绍' }
    },
    {
      //数据披露
      path: '/operation/dataDisclosure',
      component:  resolve => require(['@/components/subpage/operation/dataDisclosure.vue'], resolve),
      meta: { title: '数据披露' }
    },
    {
      //促销规则设置
      path: '/operation/ruleSetting',
      component:  resolve => require(['@/components/subpage/operation/ruleSetting.vue'], resolve),
      meta: { title: '促销规则设置' }
    }
  ];
  export default operation
   