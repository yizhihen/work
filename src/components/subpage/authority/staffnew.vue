<!-- 添加员工 -->
<template>
    <div class="new-staff" id="new_staff">
        <div class="header-container">
            <span class="user-header"><img class="response-img" :src="other.head" alt=""></span>
            <div class="item-container">
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <el-button type="primary" plain>上传头像</el-button>
                </el-upload>
            </div>
        </div>
        <div class="model slide">
            <div class="align align-left">                
                <div class="item">
                    <span class="item-title">名称：</span>
                    <span class="form-content">
                        <el-input placeholder="请输入名称" v-model="other.name"></el-input>
                    </span>
                </div>
                <div class="item">
                    <span class="item-title">所属部门：</span>
                    <span class="form-content">
                        <el-select v-model="other.department" placeholder="请选择部门">
                            <el-option
                            v-for="item in departmentList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </span>
                </div>
                <div class="item">
                    <span class="item-title">职位：</span>
                    <span class="form-content">
                        <el-select v-model="other.officer" placeholder="请选择职位">
                            <el-option
                            v-for="item in officerList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </span>
                </div>
            </div>
            <div class="align align-right">
                <div class="item">
                    <span class="item-title">电话：</span>
                    <span class="form-content"><el-input placeholder="请输入电话"></el-input></span>
                </div>
                <div class="item">
                    <span class="item-title">手机：</span>
                    <span class="form-content"><el-input placeholder="请输入手机号"></el-input></span>
                </div>
            </div>
        </div>
        <div class="model slide">
            <div class="align align-left">
                <div class="item">
                    <span class="item-title">学历：</span>
                    <span class="form-content">
                        <el-select v-model="other.Education" placeholder="请选择学历">
                            <el-option
                            v-for="item in EducationList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </span>
                </div>
                <div class="item">
                    <span class="item-title">毕业学校：</span>
                    <span class="form-content"><el-input placeholder="请输入毕业院校"></el-input></span>
                </div>
                <div class="item">
                    <span class="item-title">专业：</span>
                    <span class="form-content"><el-input placeholder="请输入专业名称"></el-input></span>
                </div>
            </div>
            <div class="align align-right">
                <div class="item">
                    <span class="item-title">出生年月：</span>
                    <span class="form-content">
                        <el-date-picker
                        v-model="other.birthday"
                        type="date"
                        placeholder="请选择出生年月">
                        </el-date-picker>
                    </span>
                </div>
                <div class="item">
                    <span class="item-title">性别：</span>
                    <span class="form-content">
                        <el-select v-model="other.sex" placeholder="请选择性别">
                            <el-option label="男" value="1"></el-option>
                            <el-option label="女" value="2"></el-option>
                        </el-select>
                    </span>
                </div>
                <div class="item">
                    <span class="item-title">婚姻状况：</span>
                    <span class="form-content">
                        <el-select v-model="other.marriage" placeholder="请选择婚姻状况">
                            <el-option label="未婚" value="1"></el-option>
                            <el-option label="已婚" value="2"></el-option>
                            <el-option label="其他" value="3"></el-option>
                        </el-select>
                    </span>
                </div>
            </div>
        </div>
        <div class="btn-container">
            <el-button type="" @click="tolist(false)">保存</el-button>
            <el-button type="" @click="tolist(true)">取消</el-button>
        </div>
    </div>
</template>
<script>
  export default {
    props: {
        staff: Object
    },
    data() {
      return {
        // other: {
        //     department: "1",
        //     officer: "1",
        //     Education: "1",
        //     sex: "1",
        //     marriage: "1",
        //     birthday: "",
        //     name: "",
        //     head: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3054730122,3618781773&fm=27&gp=0.jpg"
        // },
        other: this.staff,
        departmentList: [
            {label: "前端开发部", value: "1"},
            {label: "测试部", value: "2"},
            {label: "经理部", value: "3"},
            {label: "销售部", value: "4"}
        ],
        officerList: [
            {label: "前端开发工程师", value: "1"},
            {label: "测试工程师", value: "2"},
            {label: "总经理", value: "3"},
            {label: "销售经理", value: "4"}
        ],
        EducationList: [
            {label: "博士", value: "1"},
            {label: "硕士", value: "2"},
            {label: "本科", value: "3"},
            {label: "专科", value: "4"},
            {label: "其他", value: "5"}
        ] 
      };
    },
    components:{
        
    },
    methods: {
        // false 取消
        // true  确定
       tolist(boo){
           let _self = this
           if(boo){
               _self.$emit('tolist',this.other)
           }else{
               _self.$emit('tolist',false)
           }
       },
    }
  };
</script>
<style scoped lang="scss">
.new-staff{
    font-size: 14px;
}
.slide{
    border-bottom: 1px solid rgba(225,225,225,1);
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
        margin-bottom: 15px;
        .item-title{
            display: inline-block;
            width: 100px;
            text-align: right;
            padding-right: 15px;
        }
    }
    .form-content{
        display: inline-block;
    }
}
.btn-container{
    padding: 15px 0;
    text-align: center;
}
</style>
