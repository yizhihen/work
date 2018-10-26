<template>
    <div class="sidebar">
        <!-- <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu> -->

        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
    text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title" >
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <template v-if="subItem.subs">
                                <el-submenu :index="subItem.index" :key="subItem.index">
                                    <template slot="title">{{ subItem.title }}</template>
                                    <el-menu-item v-for="(subItem2,i) in subItem.subs" :index="subItem2.index" :key="i">{{ subItem2.title }}</el-menu-item>
                                </el-submenu>
                            </template>
                            <template v-else>
                                <el-menu-item :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
                            </template>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'dashboard',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-view',
                        index: 'user',
                        title: '用户',
                        subs: [
                            {
                                index: 'userList',
                                title: '用户列表'
                            },
                            {
                                index: 'merchantList',
                                title: '商户列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-edit-outline',
                        index: 'charts',
                        title: '设置',
                        subs: [
                            {
                                index: 'openMerchant',
                                title: '商户开通'
                            },
                            {
                                index: 'siteSetting',
                                title: '网站设置'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'setting',
                        title: '资金',
                        subs: [
                            {
                                index: 'itemAudit',
                                title: '投标管理',
                                subs: [
                                    {
                                        index: 'itemAudit',
                                        title: '投标审核'
                                    },
                                    {
                                        index: 'itemList',
                                        title: '投标列表'
                                    }
                                ]
                            },
                            {
                                index: 'accountList',
                                title: '资金管理',
                                subs: [
                                    {
                                        index: 'accountList',
                                        title: '账户一览'
                                    },
                                    {
                                        index: 'merchantMoney',
                                        title: '资金进程'
                                    },
                                    {
                                        index: 'withdrawList',
                                        title: '提现处理'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
