<template>
    <div id="vue_charting">
        <div class="crumbs">
            <span class="crumbs-text">消息</span>
        </div>
        <Msg></Msg>        
    </div>
</template>

<script>
    import Msg from '../common/chart.vue'; //使用即时通讯
    export default {
        name: 'message',
        data(){
            return {}
                     
        },
        components: {
            Msg
        },
        created(){},
        mounted(){},
        methods: {}
    }
</script>
<style scoped lang="scss">
    .c9{
        color: #C9C9C9 !important;
    }
    .crumbs{
        max-width: 1340px;
        margin : 0 auto 20px;
    }
    .crumbs-text{
        display: block;
        color: #999;
        font-size: 14px;
        position: relative;
        padding-left: 10px;
        &::before{
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            content: "";
            width: 5px;
            height: 15px;
            background: #e67a1b
        }
    }
</style>
