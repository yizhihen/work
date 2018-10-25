<template>
    <div>
        <div class="crumbs">
            <span class="crumbs-text">邮件</span>
        </div>
        <div class="container">
            <transition name="move" mode="out-in">
                <home v-if="boo.showhome" @rowclick="rowclick"></home>
                <detail v-if="boo.showdetail" @tohome="tohome" @tonew="tonew"></detail>
                <newmail v-if="boo.shownew" @tohome="tohome"></newmail>
            </transition>
        </div>
    </div>
</template>

<script>
    import Home from '../subpage/mail/home.vue'
    import Detail from '../subpage/mail/detail.vue'
    import Newmail from '../subpage/mail/new.vue'
    export default {
        name: 'mail',
        data: function(){
            return {
                activeName: 'second',
                boo: {
                    showhome: true,
                    shownew: false,
                    showdetail: false
                }
            }
        },
        components: {
            home: Home,
            detail: Detail,
            newmail: Newmail
        },
        methods: {
            rowclick(val){
                console.log(val)
                let _self = this
                _self.boo.showhome = false
                _self.boo.showdetail = true
                _self.boo.shownew = false
            },
            tohome(val){
                let _self = this
                _self.boo.showhome = true
                _self.boo.showdetail = false
                _self.boo.shownew = false
            },
            tonew(val){
                //转发而来
                let _self = this
                _self.boo.showhome = false
                _self.boo.showdetail = false
                _self.boo.shownew = true
                console.log(132)
            }
        }
    }
</script>
<style scoped lang="scss">
    .c9{
        color: #C9C9C9 !important;
    }
    .slide{
        border-bottom: 1px solid rgba(225,225,225,1);
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
    .container{
        border: none;
        max-width: 1280px;
        margin: auto;
    }
    .mail-top{
        display: flex;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(225,225,225,1);
        .align-left{
            width: 85%;
            .mail-type{
                margin: 0 10px;
                width: 130px;
            }
            .mail-btn{
                padding: 0 15px;
                cursor: pointer;
                font-weight: 600;
            }
            .mail-btn-smail{
                font-size: 14px;
                padding-right: 10px;
                cursor: pointer;
                color: #666;
            }
            .slide{
                display: inline-block;
                width: 1px;
                height: 18px;
                background: #999;
                margin: 0 10px;
                vertical-align: sub;
            }
        }
        .align-right{
            // text-align: right;
        }
    }
    .page-container{
        text-align: center;
        padding: 30px 0 20px;
    }
</style>
