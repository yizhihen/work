<template>
    <div class="login-wrap">
        <div class="ms-title">Hi投平台端管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                url: this.apiUrl + '1300/login',
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var params = new URLSearchParams()
                        params.append('name', this.ruleForm.username)
                        params.append('password', this.ruleForm.password)
                        this.$axios.post(this.url, params).then((res) => {

                            // localStorage.setItem('ms_username',this.ruleForm.username);
                            // this.$router.push('/');


                            if( res['data']['retCode'] == '-1' ) {
                               this.$message.error(res['data']['retMsg']);
                            } else {
                                localStorage.setItem('ms_username',this.ruleForm.username);
                                localStorage.setItem('ms_token',res['data']['retObject']['token']);
                                this.$router.push('/');
                            }
                        })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background: url("../../../static/img/bg.jpg");
        background-position: center center;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:280px;
        height:150px;
        margin:-150px 0 0 -170px;
        padding:40px;
        border-radius: 4px;
        background: #fff;
    }
    .login-btn{
        margin-top: 30px;
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
