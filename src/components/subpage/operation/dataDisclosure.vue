<!-- 数据披露 -->
<template>
    <div class="container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="披露列表" name="first">
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
                        label="披露编号"
                        width="100">
                    </el-table-column>                    
                    <el-table-column
                        label="披露名称"                        
                        show-overflow-tooltip
                        width="180">
                        <template slot-scope="scope">
                            <span class="pointer ellipsis" @click="viewDetail(scope.row)">{{scope.row.title}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="内容">
                        <template slot-scope="scope">
                            <span class="pointer c9 ellipsis" @click="viewDetail(scope.row)">{{scope.row.content}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="更新日期"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        width="150"
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" plain @click="edit(scope.row)">编辑</el-button>
                            <el-button type="danger" plain @click="del(scope.row,scope.$index)">删除</el-button>
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
            <el-tab-pane label="添加披露信息" name="second">
                <el-form :model="param" label-width="60px">
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
                    <el-button type="" @click="submit">保存</el-button>
                    <el-button type="" @click="activeName = 'first'">取消</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- viewDetail 弹框 -->
        <el-dialog
            :title="currentItem.title"
            :visible.sync="boo.showDetail"
            width="60%">
            <span>{{currentItem.content}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="boo.showDetail = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import DATA from 'static/json/operation/bulletin.json'; //当前显示的对话
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
        currentPage4: 4,
        currentItem: {
            title: "",
            content: "",
            num: ""
        },//当前显示的具体公告
        boo: {
            showDetail: false
        },
        param: {
            title: "",
            content: "",
            num: ""
        }
      };
    },
    components:{
        VueEditor
    },
    methods: {
        handleClick(tab, event) {
        // console.log(tab, event);
        console.log('切换了')
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        viewDetail(val){
            this.boo.showDetail = true
            this.currentItem = val
        },
        // 编辑公告
        edit(val){
            console.log(val)
            this.activeName = 'second'
            this.currentItem = val
        },
        // 删除公告
        del(val,index){
            this.list.splice(index,1)
        },
        // 保存公告
        submit(){
            this.activeName = 'first'
        }
    }
  };
</script>
<style scoped lang="scss">
.pointer{
    cursor: pointer;
}
.page-container{
    text-align: center;
    padding: 30px 0 20px;
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
.btn-container{
    padding: 15px 0;
    text-align: center;
}
</style>
