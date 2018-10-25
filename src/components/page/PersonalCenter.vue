<template>
    <div>
        <div class="crumbs">
            <span class="crumbs-text">个人中心</span>
        </div>
        <div class="container">
            <div class="header-container">
                <span class="user-header"><img class="response-img" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3054730122,3618781773&fm=27&gp=0.jpg" alt=""></span>
                <div class="item-container">
                    <p class="user-name">鸡蛋哥</p>
                    <p class="c9 sign-content">
                        <span class="user-sign"> 鸡蛋哥鸡蛋哥鸡蛋哥鸡蛋哥鸡蛋哥鸡蛋 </span> 
                        <i class="el-icon-edit btn-edit" @click="boo.open_sign = true"></i> 
                    </p>
                </div>
            </div>
            <div class="model slide">
                <div class="align align-left">
                    <div class="item"><span class="item-title">开通日期：</span><span>2018-05-31</span></div>
                    <div class="item"><span class="item-title">所属部门：</span><span>综合管理部</span></div>
                    <div class="item"><span class="item-title">职位：</span><span>总经理</span></div>
                </div>
                <div class="align align-right">
                    <div class="item"><span class="item-title">电话：</span><span>0551-34210783</span></div>
                    <div class="item"><span class="item-title">手机：</span><span>13052191937</span></div>
                </div>
            </div>
            <div class="model slide">
                <div class="align align-left">
                    <div class="item"><span class="item-title">学历：</span><span>硕士</span></div>
                    <div class="item"><span class="item-title">毕业学校：</span><span>华中科技大学</span></div>
                    <div class="item"><span class="item-title">专业：</span><span>金融</span></div>
                </div>
                <div class="align align-right">
                    <div class="item"><span class="item-title">出生年月：</span><span class="user-date">1984-02-01</span><span class="c9">仅自己可见</span></div>
                    <div class="item"><span class="item-title">性别：</span><span>男</span></div>
                    <div class="item"><span class="item-title">婚姻状况：</span><span>未婚</span></div>
                </div>
            </div>
            <div class="model">
                <div class="align align-left">
                    <div class="item"><span class="item-title">系统权限：</span><span>综合管理部-业务经理</span></div>
                    <div class="item">
                        <span class="item-title">登陆密码：</span>
                        <span @click="boo.open_code = true" class="btn-revise" type="text">修改密码</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 签名修改弹框 open_sign-->
        <el-dialog
            title="修改签名"
            :visible.sync="boo.open_sign"
            width="35%">
            <el-input type="textarea" 
                v-model="formLabelAlign.name" placeholder="请输入新的签名"
                :autosize="{ minRows: 3, maxRows: 4}"
                maxlength="120"
                ></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="boo.open_sign = false">取 消</el-button>
                <el-button type="primary" @click="boo.open_sign = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 密码修改弹框 open_code-->
        <el-dialog
            title="修改密码"
            :visible.sync="boo.open_code"
            width="35%">
            <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
                <el-form-item label="请输入密码">
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="请输入新密码">
                    <el-input v-model="formLabelAlign.region"></el-input>
                </el-form-item>
                <el-form-item label="请确认密码">
                    <el-input v-model="formLabelAlign.type"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="boo.open_code = false">取 消</el-button>
                <el-button type="primary" @click="boo.open_code = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'baseform',
        data: function(){
            return {
                boo: {
                    open_code: false,
                    open_sign: false,
                },
                options:[
                    {
                        value: 'guangdong',
                        label: '广东省',
                        children: [
                            {
                                value: 'guangzhou',
                                label: '广州市',
                                children: [
                                    {
                                        value: 'tianhe',
                                        label: '天河区'
                                    },
                                    {
                                        value: 'haizhu',
                                        label: '海珠区'
                                    }
                                ]
                            },
                            {
                                value: 'dongguan',
                                label: '东莞市',
                                children: [
                                    {
                                        value: 'changan',
                                        label: '长安镇'
                                    },
                                    {
                                        value: 'humen',
                                        label: '虎门镇'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: 'hunan',
                        label: '湖南省',
                        children: [
                            {
                                value: 'changsha',
                                label: '长沙市',
                                children: [
                                    {
                                        value: 'yuelu',
                                        label: '岳麓区'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                labelPosition: 'right',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                }
            }
        },
        methods: {
            onSubmit() {
                this.$message.success('提交成功！');
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
    .sign-content{
        position: relative;
        .user-sign{
            display: inline-block;
            max-width: 850px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        .btn-edit{
            position: absolute;
            right: -25px;
            top: 15%;
            color: #409EFF;
            cursor: pointer;
        }
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
        border: 1px solid #f1f1f1;
        background: #fff;
        font-size: 14px;
        color: #666;
        max-width: 1280px;
        margin: auto;
    }
    .header-container{
        display: flex;
        align-items: center;
        line-height: 1.8;
        .user-header{
            background: #999;
            height: 80px;
            width: 80px;
            border-radius: 50%;
            overflow: hidden;
            img{
                height: 80px;
            }
        }
        .item-container{
            padding-left: 25px;
        }
    }
    .model{        
        display: flex;
        padding: 25px 10px;
        .align{
            width: 50%;
            .user-date{
                display: inline-block;
                width: 100px;
            }
        }
        .item{
            line-height: 2.4;
            .item-title{
                display: inline-block;
                width: 100px;
                text-align: right;
                padding-right: 15px;
            }
        }
        .btn-revise{
            color: #409EFF;
            cursor: pointer;
        }
    }
</style>
