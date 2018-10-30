<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <span class="logo"><img src="static/img/logo2.png"></span>
        <div class="menu-container">
            <el-menu :default-active="menu" mode="horizontal"        
            background-color="#242f42"
            text-color="rgba(255,255,255,.5)"
            active-text-color="#FB6E2E"
            router>
                <el-menu-item v-for="(item,idx) in items" :key="idx" :index="item.index">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span>{{item.title}}</span>
                    </template>
                </el-menu-item>            
            </el-menu>
        </div>
        <div class="right-manage">
            <span class="item-container">
                <el-badge class="item">
                    <el-button type="text" @click="goPage('/personal',false)">个人中心</el-button>
                </el-badge>
                <el-badge :value="message" class="item">
                    <el-button type="text" @click="goPage('/mail',false)">邮件</el-button>
                </el-badge>
                <el-badge :value="message" class="item">
                    <el-button type="text" @click="goPage('/message',false)">消息</el-button>
                </el-badge>
            </span>            
            <el-button type="text"><i class="el-icon-upload el-icon--left"></i>退出登录</el-button>
        </div>               
    </div>
</template>
<script> 
    import bus from '../common/bus';
    export default {
        props: {
            menu: String
        },
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: 'linxin',
                message: 2,
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: '/operation',
                        title: '运营管理'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '/product',
                        title: '产品管理'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '/itegral',
                        title: '积分系统'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '/business',
                        title: '业务管理'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '/data',
                        title: '数据统计'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '/credit',
                        title: '资信系统'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '/authority',
                        title: '权限管理'
                    }
                ]
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        created(){},
        methods:{
            goPage(page,boo){
                let _self = this
                _self.$router.replace({path:page})
            },
        },
        mounted(){}
    }
</script>
<style scoped lang="scss">
    .el-menu--horizontal{
        border-bottom: none;
    }
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 60px;
        padding: 0 10px;
        min-width: 1366px;
        .menu-container{
            float: left;
        } 
        .right-manage{
            font-size: 14px;        
        }
    }
    .logo{
        float: left;
        height: 60px;
        line-height: 60px;
        img{
            height: 45px;
            padding-top: 8px
        }
    }
    .right-manage{
        float: right;
        line-height: 60px;
        color: #fff;
        padding-right: 2.5%;
        .item-container{
            padding-right: 40px;
        }
        .el-badge{
            line-height: initial;
            font-size: 14px;
        }
        .item+.item{
            margin-left: 20px;
        }
    }
</style>
