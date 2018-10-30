let credit = [
    //资信系统
    {
      path: '/credit',
      redirect: '/credit/evaluation'
    },
    {
      //资信评估
      path: '/credit/evaluation',
      component:  resolve => require(['@/components/subpage/credit/evaluation.vue'], resolve),
      meta: { title: '资信评估' }
    },
    {
      //评估控制
      path: '/credit/evaluatecontrol',
      component:  resolve => require(['@/components/subpage/credit/evaluatecontrol.vue'], resolve),
      meta: { title: '评估控制' }
    }
  ];
  export default credit
   