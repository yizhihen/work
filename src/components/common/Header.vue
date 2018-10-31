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
                <el-menu-item v-for="(item,idx) in list" :key="idx" :index="item.index">
                    <template slot="title">
                        <i :class="['iconfont', item.icon]"></i>
                        <span>{{item.title}}</span>
                    </template>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="right-manage">
            <span class="item-container">
                <el-badge class="item">
                    <el-button @click="goPage('/personal',false)" icon="iconfont icon-gerenzhongxin" circle></el-button>
                </el-badge>
                <el-badge :value="message" class="item">
                    <el-button @click="goPage('/mail',false)" icon="iconfont icon-youjian2" circle></el-button>
                </el-badge>
                <el-badge :value="message" class="item">
                    <el-button @click="goPage('/message',false)" icon="iconfont icon-xiaoxi" circle></el-button>
                </el-badge>
            </span>            
            <el-button type="" icon="iconfont icon-tuichu1" circle></el-button>
        </div>               
    </div>
</template>
<script> 
    import bus from '../common/bus';
    export default {
        props: {
            menu: String,
            list: Array
        },
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: 'linxin',
                message: 2,
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
