let product = [
    //产品管理
    {
      path: '/product',
      redirect: '/product/Reviewprocess'
    },
    {
      //审核流程控制
      path: '/product/Reviewprocess',
      component:  resolve => require(['@/components/subpage/product/Reviewprocess.vue'], resolve),
      meta: { title: '审核流程控制' }
    },
    {
      //参数配置
      path: '/product/paramconfig',
      component:  resolve => require(['@/components/subpage/product/paramConfig.vue'], resolve),
      meta: { title: '参数配置' }
    }
  ];
  export default product
   