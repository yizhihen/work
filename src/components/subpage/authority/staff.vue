<!-- 员工列表 -->
<template>
    <div class="container">
        <el-tabs v-if="boo.showList" v-model="other.activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(tab,idx) in tablist" :label="tab.title" :name="tab.name" :key="idx">
                <div class="top-container">                        
                    <div class="align-content clearfix">
                        <h4 class="title fl">部门：</h4>
                        <div class="align-content">
                            <span v-for="(item,index) in departmentList" @click="selectOther(true,item)" :key="index" 
                            :class="['item', other.department == item.id ? 'active' : '']">{{item.name}}</span>
                        </div>
                    </div>
                    <div class="align-content clearfix">
                        <h4 class="title fl">状态：</h4>
                        <div class="align-content">
                            <span v-for="(item,index) in stateList" @click="selectOther(false,item)" :key="index" 
                            :class="['item', other.state == item.id ? 'active' : '']">{{item.name}}</span>
                        </div>
                    </div>
                    <div v-if="other.activeName == 'first'" class="action-content">
                        <el-button type="primary" @click="opennew({})">添加员工</el-button>
                    </div>
                </div>
                <el-table
                :data="tableData"
                style="width: 100%"
                >
                <el-table-column
                prop="num"
                label="工号"
                width="80">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="100">
                </el-table-column>
                <el-table-column
                prop="entryTime"
                label="入职日期"
                width="130">
                </el-table-column>
                <el-table-column
                prop="days"
                label="在职天数（天）"
                align="center"
                width="120">
                </el-table-column>
                <el-table-column
                prop="department"
                label="部门"
                width="100">
                </el-table-column>
                <el-table-column
                prop="officer"
                label="职位"
                width="150">
                </el-table-column>
                <el-table-column
                prop="state"
                label="状态"
                width="100">
                </el-table-column>
                <el-table-column
                prop="authority"
                label="权限名称"
                width="100">
                </el-table-column>                
                <el-table-column
                align="center"
                label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="opennew(scope.row)">资料编辑</el-button>
                        <el-button type="text" @click="editAuth(scope.row)">权限编辑</el-button>
                        <el-button type="text" v-if="scope.row.state == '正常'">停用</el-button>
                        <el-button type="text" v-if="scope.row.state == '停用'">恢复</el-button>
                        <el-button type="text" v-if="scope.row.state == '正常'">归档</el-button>
                    </template>
                </el-table-column>
                </el-table>
                <div class="page-container">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-size="10"
                        layout="total, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination>
                </div>              
            </el-tab-pane>
        </el-tabs>
        <staff-new v-else @tolist="tolist" :staff="currentStaff"></staff-new>
        <el-dialog
        title="权限编辑"
        :visible.sync="boo.showDlialog"
        width="60%">
        <div class="auth-container">
            <div class="info-content">
                <div class="item">
                    <span class="">姓名：</span>
                    <span class="">大锤</span>
                </div> 
                <div class="item">
                    <span class="">部门：</span>
                    <span class="">综合管理部</span>
                </div> 
                <div class="item">
                    <span class="">职位：</span>
                    <span class="">总经理</span>
                </div>                
            </div>
            <el-form ref="form" label-width="90px">
                <el-form-item label="权限名称：">
                    <el-select v-model="currentStaff.authority" placeholder="请选择权限" @change="changeauth">
                        <el-option
                        v-for="item in authList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="auth-content">
                <div class="item">
                    <span class="title fl">项目：</span>
                    <div class="item-content">
                        <el-checkbox-group v-model="other.checkList">
                            <el-checkbox label="发布项目"></el-checkbox>
                            <el-checkbox label="项目草稿" disabled></el-checkbox>
                            <el-checkbox label="项目管理" disabled></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="item">
                    <span class="title fl">财务：</span>
                    <div class="item-content">
                        <el-checkbox-group>
                            <el-checkbox label="账户余额" disabled></el-checkbox>
                            <el-checkbox label="资金管理" disabled></el-checkbox>
                            <el-checkbox label="资金流水" disabled></el-checkbox>
                            <el-checkbox label="账号绑定" disabled></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="item">
                    <span class="title fl">设置：</span>
                    <div class="item-content">
                        <el-checkbox-group>
                            <el-checkbox label="资料管理" disabled></el-checkbox>
                            <el-checkbox label="权限管理" disabled></el-checkbox>
                            <el-checkbox label="密码修改" disabled></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="boo.showDlialog = false">取 消</el-button>
            <el-button type="primary" @click="boo.showDlialog = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
import DATA from 'static/json/authority/staff.json';
import staffNew from './staffnew'
  export default {
    data() {
      return {
        boo: {
            showList: true,
            showDlialog: false
        },
        other: {
            department: '1',
            state: '1',
            activeName: "first",
            checkList: ['发布项目','项目草稿','项目管理']
        },
        tablist: [
            {title: "正常", name: "first"},
            {title: "归档", name: "second"}
        ],
        departmentList: [
            {'name': "全部","id": 1},
            {'name': "总经办","id": 2},
            {'name': "综合管理部","id": 3},
            {'name': "人事部","id": 4},
            {'name': "财务部","id": 5}
        ],
        stateList: [
            {'name': "全部","id": 1},
            {'name': "正常","id": 2},
            {'name': "停用","id": 3}
        ],
        authList: [
            {label: "开发权限",value: '开发权限'},
            {label: "财务",value: '财务'},
            {label: "设置",value: '设置'}
        ],
        tableData: DATA.list,
        currentPage4: 4,
        currentStaff: {}
      };
    },
    components:{
        staffNew
    },
    methods: {
        handleClick(tab, event) {
            let _self= this
            if (_self.other.activeName == tab.name) return
            _self.other.activeName = tab.name
            console.log('改变了')
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        selectOther(boo,item){            
            if(boo) return this.other.department = item.id
            this.other.state = item.id
        },
        opennew(item){
            this.currentStaff = item
            this.boo.showList = false
        },
        tolist(val){
            console.log(val)
            this.boo.showList = true
        },
        editAuth(item){
            this.currentStaff = item
            this.boo.showDlialog = true
        },
        // 权限编辑
        changeauth(val){
            console.log(val)
        }
    }
  };
</script>
<style scoped lang="scss">
.page-container{
    text-align: center;
    padding: 30px 0 20px;
}
.top-container{
    padding-bottom: 15px;
    border-bottom: 1px solid rgb(225,225,225);
    .align-content{
        .title{
            line-height: 28px;
            font-size: 14px;
            color: #666;
            font-weight: normal;
        }
        .align-content{
            margin-left: 60px;
            .item{
                display: inline-block;
                font-size: 14px;
                padding: 5px 10px;
                background: #F4F4F5;
                border: 1px solid #E0E0E2;
                color: #909399;
                border-radius: 2px;
                cursor: pointer;
                transition: .2s;
                margin: 0 8px 8px 0;
                &.active{
                    color: #fff;
                    background: #F56C6C;
                    border-color: #F56C6C;
                }
            }
        }
    }
    .action-content{
        padding-top: 15px;
        border-top: 1px solid rgb(225,225,225);
    }
}
.auth-container{
    .info-content{
        padding-bottom: 15px;
        padding-left: 10px;
        .item{
            display: inline-block;
            margin-right: 50px;
        }
    }
    .auth-content{
        margin-top: 15px;
        border-top: 1px solid rgb(225,225,225);
        padding: 10px 9px;
        .item{
            margin-bottom: 15px;
        }
        .title{
            line-height: 28px;
            display: inline-block;
            width: 68px;
            text-align: right;
        }
        .item-content{
            margin-left: 80px;
            line-height: 28px;
        }
    }
}
</style>
