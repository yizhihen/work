let itegral = [
    //积分系统
    {
      path: '/itegral',
      redirect: '/itegral/itegralmanage'
    },
    {
      //积分管理
      path: '/itegral/itegralmanage',
      component:  resolve => require(['@/components/subpage/itegral/itegralmanage.vue'], resolve),
      meta: { title: '积分管理' }
    },
    {
      //商品管理
      path: '/itegral/goodsmanage',
      component:  resolve => require(['@/components/subpage/itegral/goodsmanage.vue'], resolve),
      meta: { title: '商品管理' }
    },
    {
      //积分商城订单
      path: '/itegral/ordermanage',
      component:  resolve => require(['@/components/subpage/itegral/ordermanage.vue'], resolve),
      meta: { title: '积分商城订单' }
    }
  ];
  export default itegral
   