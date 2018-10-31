<!-- 平台公告 -->
<template>
    <div class="container" id="problem">
        <el-tabs v-model="activeName">
            <el-tab-pane label="常见问题" name="first">
                <div v-if="!boo.showAddProblem" class="">
                    <div class="top-container">                        
                        <div class="align-content clearfix">
                            <h4 class="title fl">一级分类：</h4>
                            <div class="align-content">
                                <span class="item active">全部</span>
                                <span class="item">一级标题1</span>
                                <span class="item">一级标题2</span>
                            </div>
                        </div>
                        <div class="align-content clearfix">
                            <h4 class="title fl">二级分类：</h4>
                            <div class="align-content">
                                <span class="item active">全部</span>
                                <span class="item">二级标题1</span>
                                <span class="item">二级标题2</span>
                            </div>
                        </div>
                        <div class="action-content">
                            <el-button type="primary" @click="addProblem">添加问题</el-button>
                        </div>
                    </div>
                    <el-table
                    :data="list"
                    style="width: 100%">
                        <el-table-column
                            type="index"
                            label="序列"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="num"
                            label="问题编号"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="class"
                            label="一级分类"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            label="二级分类"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            label="标题"
                            width="180">
                            <template slot-scope="scope">
                                <span class="pointer ellipsis">{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="内容">
                            <template slot-scope="scope">
                                <span class="pointer ellipsis">{{scope.row.content}}</span>
                            </template>
                        </el-table-column>                    
                        <el-table-column
                            width="150"
                            align="center"
                            label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" plain @click="editproblem(scope.row)">编辑</el-button>
                                <el-button type="danger" plain>删除</el-button>
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
                </div>
                <div v-else class="add-problem">
                    <el-form :model="param" label-width="60px">                        
                        <el-form-item label="分类">
                            <el-cascader
                            placeholder="请选择分类"
                            :options="options"
                            v-model="other.cascader"
                            change-on-select
                            @change="cascaderchage"
                            ></el-cascader>
                        </el-form-item>
                        <el-form-item label="标题">
                            <el-input v-model="currentItem.title"></el-input>
                        </el-form-item>
                        <el-form-item label="编号">
                            <el-input v-model="currentItem.num"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="ue-container clearfix">
                        <p class="title fl">内容</p>
                        <div class="editor">
                            <vue-editor :defaultMsg="currentItem.content" :myconfig="config" :id="ue" ref="ue"></vue-editor>
                        </div>
                    </div>
                    <div class="btn-container">
                        <el-button type="" @click="submitproblem">保存</el-button>
                        <el-button type="" @click="boo.showAddProblem = false">取消</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="问题分类" name="second">
                <div class="top-container">
                    <el-button type="primary" @click="boo.showAddClass = true">添加分类</el-button>
                </div>
                <el-table
                :data="classList"
                style="width: 100%; margin-top: 20px">
                <el-table-column
                    type="index"
                    label="序列"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="num"
                    width="180"
                    label="分类编号">
                </el-table-column>    
                <el-table-column
                    prop="class"
                    label="一级分类">
                    <template slot-scope="scope">
                        <span v-if="!scope.row.isEdit" class="">{{scope.row.class}}</span>
                        <el-input v-else v-model="scope.row.class"></el-input>
                    </template>
                </el-table-column>            
                <el-table-column
                    prop="type"
                    label="二级分类">
                    <template slot-scope="scope">
                        <span v-if="!scope.row.isEdit" class="">{{scope.row.type}}</span>
                        <el-input v-else v-model="scope.row.type"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    width="160">
                    <template slot-scope="scope">
                        <el-button v-if="!scope.row.isEdit" type="primary" plain @click="scope.row.isEdit = true">编辑</el-button>
                        <el-button v-else type="success" plain @click="scope.row.isEdit = false">保存</el-button>
                        <el-button type="danger" plain @click="removeClass(scope.$index)">删除</el-button>
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
        <el-dialog
        title="添加分类"
        :visible.sync="boo.showAddClass"
        width="30%">
            <el-form class="add-problem" ref="form" :model="addclass" label-width="100px">
                <el-form-item label="上级分类：">
                    <el-select v-model="addclass.class" placeholder="请选择分类">
                        <el-option v-for="(item,index) in classOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类名称：">
                    <el-input v-model="addclass.type" placeholder="请输入分类名称"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="boo.showAddClass = false">取 消</el-button>
                <el-button type="primary" @click="boo.showAddClass = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import DATA from 'static/json/operation/problem.json'; //当前显示的对话
import VueEditor from '../../common/ue.vue'
  export default {
    data() {
      return {
        ue: 'ue',
        config: { //富文本配置
            initialFrameWidth: '100%',
            initialFrameHeight: 400,
        },
        activeName: 'first',
        list: DATA.list,
        classList: DATA.classList,
        currentPage4: 4,
        spanArr: [],
        other: {
            cascader: []
        },
        boo: {
            showAddProblem: false,
            showAddClass: false
        },
        param: {
          user: '',
          region: ''
        },
        classOptions: [
            {value: "", label: "无"},
            {value: "1", label: "一级分类1"},
            {value: "2", label: "一级分类2"},
            {value: "3", label: "一级分类3"}
        ],
        addclass: { //添加分类
            class: "",
            type: ""
        },
        options: DATA.options,
        currentItem: {
            title: "",
            content: "",
            num: ""
        },//当前显示的具体公告
      };
    },
    components:{
        VueEditor
    },
    methods: {
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        addProblem(){
            this.boo.showAddProblem = true
        },
        editproblem(item){
            console.log(item)
            let _self = this
            _self.currentItem = item
            _self.boo.showAddProblem = true
            _self.other.cascader = [item.class,item.type]
        },
        cascaderchage(val){
            console.log(val)
        },
        submitproblem(){
            this.boo.showAddProblem = false
            console.log(this.$refs['ue'].getUEContentTxt())
        },
        addClass(){
            console.log('添加分类')
        },
        removeClass(index){
            this.classList.splice(index,1)
        },
    }
  };
</script>
<style scoped lang="scss">
.form-container{
    border-bottom: 1px solid rgb(225,225,225);
    margin-bottom: 10px;
}
.page-container{
    text-align: center;
    padding: 30px 0 20px;
}
.btn-container{
    padding: 15px 0;
    text-align: center;
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
        margin-left: 60px;
        box-sizing: border-box;
        padding-right: 2px;
    }
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
            margin-left: 90px;
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
</style>
