<template>
    <div>
        <div class="new-container clearfix">
            <div class="align-left">
                <div class="form-top">
                    <el-form ref="form" :model="form" label-width="60px">
                        <el-form-item label="To：">
                            <el-input size="small" v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="Cc：" v-if="boo.isCc">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <div class="add-btn">
                            <el-button type="text" @click="boo.isCc = !boo.isCc">{{boo.isCc ? '删除抄送' : '添加抄送'}}</el-button>
                        </div>
                        <el-form-item label="主题：">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="ue-container clearfix">
                    <p class="title fl">正文：</p>
                    <div class="editor">
                        <vue-editor></vue-editor>
                    </div>
                </div>            
            </div>
            <div class="align-right">
                <p class="top-title">联系人</p>
                <div class="user-list">
                    <p class="user">王小明</p>
                    <p class="user">王小明</p>
                    <p class="user">王小明</p>
                    <p class="user">王小明</p>
                    <p class="user">王小明</p>
                    <p class="user">王小明</p>
                    <p class="user">王小明</p>
                    <p class="user">王小明</p>
                    <p class="user">王小明</p>
                    <p class="user">王小明</p>
                    <p class="user">王小明</p>
                    <p class="user">王小明</p>
                    <p class="user">王小明</p>
                    <p class="user">王小明</p>
                    <p class="user">王小明</p>
                    <p class="user">王小明</p>
                    <p class="user">王小明</p>
                    <p class="user">王小明</p>
                    <p class="user">王小明</p>
                    <p class="user">王小明</p>
                    <p class="user">王小明</p>
                </div>
            </div>
        </div>
        <div class="btn-container">
            <el-button type="">发送</el-button>
            <el-button type="">存草稿</el-button>
            <el-button type="" @click="tohome">返回</el-button>
        </div>
    </div>
</template>

<script>
    import VueEditor from '../../common/VueEditor.vue'
    export default {
        name: 'new',
        data(){
            return {
                ue1: 'ue1',
                config: { //富文本配置
                    initialFrameWidth: 900,
                    initialFrameHeight: null,
                    toolbars: [[
                    'undo', 'redo', '|', 'fontsize', '|', 'blockquote', 'horizontal', '|', 
                    'removeformat', 'formatmatch', '|','bold', 'italic', 'underline', 'forecolor', 'backcolor', '|', 
                    'indent', '|','insertorderedlist', 'insertunorderedlist'
                    ]],
                },
                itemDetail: {
                    item_content: '',//富文本默认信息
                },
                form: {
                    senduser: '',// 发送人列表
                    ccuser: '', // 抄送人列表
                },
                boo: {
                    isCc: false,                    
                }
            }
        },
        components: {
            VueEditor
        },
        methods: {
            rowclick(val){
                console.log(val)
                let _self = this
                _self.boo.showhome = false
            },
            tohome(val){                
                this.$emit('tohome',false)
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
    .align-left{
        width: 960px;
        float: left;
        .add-btn{
            margin-top: -15px;
            margin-left: 60px;
        }
        .ue-container{
            .title{
                width: 60px;
                text-align: right;
                font-size: 14px;
                color: #666;
                line-height: 32px;
                padding-right: 12px;
                box-sizing: border-box;
            }
            .editor{
                margin-left: 60px
            }
        }
    }
    .align-right{
        margin-left: 980px; //960 ue宽   20px 空隙值
        height: 524px;
        overflow:hidden;
        font-size: 14px;
        color:#666;
        border: 1px solid rgba(225,225,225,.5);
        box-sizing: border-box;
        .top-title{
            padding: 8px 15px;
            background: #f5f7fa;
        }
        .user-list{
            padding: 8px 15px;
            height: 450px;
            overflow-y: scroll;
        }
        .user{
            margin: 8px 0;
            cursor: pointer;
        }
    }
    .btn-container{
        padding: 15px 0;
        text-align: center;
    }
</style>
