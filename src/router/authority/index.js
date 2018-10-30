let authority = [
    //权限管理
    {
      path: '/authority',
      redirect: '/authority/staff'
    },
    {
      //员工列表
      path: '/authority/staff',
      component:  resolve => require(['@/components/subpage/authority/staff.vue'], resolve),
      meta: { title: '员工列表' }
    },
    {
      //角色与权限
      path: '/authority/competence',
      component:  resolve => require(['@/components/subpage/authority/competence.vue'], resolve),
      meta: { title: '角色与权限' }
    }
  ];
  export default authority
   