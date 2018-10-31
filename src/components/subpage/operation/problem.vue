<!-- 平台公告 -->
<template>
    <div class="container" id="problem">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="常见问题" name="first">
                <div v-if="true" class="">
                    <div class="form-container">
                        <el-form :inline="true" :model="param" class="demo-form-inline">
                            <el-form-item label="">
                                <el-select v-model="param.region" placeholder="请选择一级分类">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="">
                                <el-select v-model="param.region" placeholder="请选择二级分类">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="addProblem">添加问题</el-button>
                            </el-form-item>
                        </el-form>
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
                                <el-button type="primary" plain>编辑</el-button>
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
                <div v-else class="">
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
                        <el-button type="">保存</el-button>
                        <el-button type="">取消</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="问题分类" name="second">
                
            </el-tab-pane>
        </el-tabs>
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
        currentPage4: 4,
        param: {
          user: '',
          region: ''
        },
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
        handleClick(tab, event) {
        // console.log(tab, event);
        console.log('切换了')
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        addProblem(){
            console.log('添加问题')
        }
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
</style>
