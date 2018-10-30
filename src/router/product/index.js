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
    }
  ];
  export default product
   