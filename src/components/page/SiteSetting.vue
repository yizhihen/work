<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-edit-outline"></i> 设置</el-breadcrumb-item>
                <el-breadcrumb-item>网站设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-form ref="form" :model="form" label-width="120px" size="medium">
                <div class="plugins-tips">
                    标的参数设置
                </div>
                <el-form-item label="项目周期设置">
                    <el-col :span="4" class="mr10 mb10">
                        <el-input v-model="form.xmzq[0]" placeholder=""></el-input>
                    </el-col>
                    <el-col :span="4" class="mr10 mb10">
                        <el-input v-model="form.xmzq[1]" placeholder=""></el-input>
                    </el-col>
                    <el-col :span="4" class="mr10 mb10">
                        <el-input v-model="form.xmzq[2]" placeholder=""></el-input>
                    </el-col>
                    <el-col :span="4" v-show="index < xmzqIndex - 3 || ( form.xmzq[index+2] != '' && form.xmzq[index+2] != undefined ) || ( form.xmzq[index+3] != '' && form.xmzq[index+3] != undefined )" class="mr10 mb10" v-for="(xmzqEach, index) in xmzqList" :key="index">
                        <el-input v-model="form.xmzq[index+3]" placeholder=""></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="年化最小值">
                    <el-col :span="4" class="mr10 mb10">
                        <el-input placeholder=""></el-input>
                    </el-col>
                    <el-col :span="4" class="mr10 mb10">
                        <el-input placeholder=""></el-input>
                    </el-col>
                    <el-col :span="4" class="mr10 mb10">
                        <el-input placeholder=""></el-input>
                    </el-col>
                    <el-col :span="4" v-show="index < xmzqIndex - 3 || ( form.xmzq[index+2] != '' && form.xmzq[index+2] != undefined ) || ( form.xmzq[index+3] != '' && form.xmzq[index+3] != undefined )" class="mr10 mb10" v-for="(xmzqEach, index) in xmzqList" :key="index">
                        <el-input></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="融资费用">
                    <label class="el-form-item__label">融资金额</label>
                    <el-col :span="4" style="margin-right:10px;">
                        <el-input v-model="form.name" style="width:150px;" placeholder="融资金额的百分比"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="+ 固定金额" style="margin-left:70px;">
                    <el-col :span="4" style="margin-right:10px;">
                        <el-input v-model="form.name" placeholder="如1000" style="width:150px;"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="+ 融资金额" style="margin-left:70px;">
                    <el-col :span="4" style="margin-right:30px;">
                        <el-input v-model="form.name" placeholder="融资金额的百分比" style="width:150px;"></el-input>
                    </el-col> <label class="el-form-item__label">* 使用期限 / 调配系数</label>
                    <el-col :span="4" style="margin-right:20px;">
                        <el-input v-model="form.name" placeholder="如10000"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="+ 融资金额" style="margin-left:70px;">
                    <el-col :span="4" style="margin-right:30px;">
                        <el-input v-model="form.name" placeholder="融资金额的百分比" style="width:150px;"></el-input>
                    </el-col> <label class="el-form-item__label">* 使用期限 / 年化收益率 * 调配系数</label>
                    <el-col :span="4" style="margin-right:10px;">
                        <el-input v-model="form.name" placeholder="如0.01%"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="保底佣金">
                    <el-col :span="4" style="margin-right:30px;">
                        <el-input v-model="form.name" style="width:150px;" placeholder="如12%"></el-input>
                    </el-col>
                    <label class="el-form-item__label" style="color:red;font-size:12px;">（项目失败后，给客户的基础保障佣金）</label>
                </el-form-item>

                <el-form-item label="流标奖励金">
                    <label class="el-form-item__label">投标金额</label>
                    <el-col :span="4" style="margin-right:10px;">
                        <el-input v-model="form.name" placeholder="投标金额的百分比" style="width:150px;"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="+ 固定金额" style="margin-left:70px;">
                    <el-col :span="4" style="margin-right:10px;">
                        <el-input v-model="form.name" style="width:150px;" placeholder="如1000"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="+ 投标金额" style="margin-left:70px;">
                    <el-col :span="4" style="margin-right:30px;">
                        <el-input v-model="form.name" placeholder="投标金额的百分比" style="width:150px;"></el-input>
                    </el-col> <label class="el-form-item__label">* 预期收益率 *</label>
                    <el-col :span="4" style="margin-right:10px;">
                        <el-input v-model="form.name" placeholder="如5%"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'baseform',
        data: function(){
            return {
                xmzqIndex: 1,
                xmzqList: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
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
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: true,
                    type: ['步步高'],
                    resource: '小天才',
                    desc: '',
                    options: [],
                    xmzq: [],
                }
            }
        },
        methods: {
            onSubmit() {
                this.$message.success('提交成功！');
            },

            addInput() {

            }
        }
    }
</script>
<style>
#uploadItemPic .el-upload--text{border: none!important;}
</style>

<style scoped>
.plugins-tips{padding:10px 30px 10px 30px;}
.el-form-item{width: 80%;}
.mr10{margin-right: 10px;}
.mb10{margin-bottom: 10px;}
</style>

