<template>
    <div class="wrapper">
        <v-head :menu="menuName" :list="menuList"></v-head>
        <transition name="move" mode="out-in">
            <v-sidebar :submenu="submenuList" v-if="showSidebar"></v-sidebar>
        </transition>
        <div :class="['content-box',collapse ? 'content-collapse' : '',showSidebar ? '': 'no--hasSidebar']">
            <v-tags v-if="false"></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
            <footer class="foot-container">
                <p>Copyright © www.Hitou.com, All Rights Reserved.</p>
                <p>Email : xxxxx</p>
            </footer>
        </div>
    </div>
</template>

<script>
    import submenu from './menu.json'
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from './bus';
    export default {
        data(){
            return {
                tagsList: [],
                collapse: false,
                menuList: submenu.list
            }
        },
        components:{
            vHead, vSidebar, vTags
        },
        computed : {
            // 是否显示侧边栏 slidebar
            showSidebar(){
                return this.$showSidebar(this)
            },
            // 主菜单当前活跃项
            menuName(){
                return this.$getMenu(this)
            },
            // 侧边栏当前列表
            submenuList(){
                return this.$getSubmenu(this,this.menuList)
            }
        },
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })            
        },
        methods: {}
    }
</script>
<style scoped>
    .no--hasSidebar{
        min-width: 1366px;
        left: 0;
    }
    .foot-container{
        text-align: center;
        color: #999;
        font-size: 12px;
        line-height: 1.8;
    }
</style>

