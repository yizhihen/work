<!-- 话题内容审核 -->
<template>
    <div class="container" id="topicCheck">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="话题审核" name="first">
                <div class="tab-list">
                    <el-button :type="!boo.isActive ? 'info' : 'primary'" @click="boo.isActive = true">待审核列表 ({{list.length}})</el-button>
                    <el-button class="tag" :type="!boo.isActive ? 'primary' : 'info'" @click="boo.isActive = false">已审核</el-button>
                    <el-select v-show='!boo.isActive' v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
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
                        prop="userName"
                        label="用户名"
                        width="100">
                    </el-table-column> 
                    <el-table-column
                        prop="date"
                        label="时间"
                        width="180">
                    </el-table-column>  
                    <el-table-column
                        prop="type"
                        label="类型"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        label="内容">
                        <template slot-scope="scope">
                            <span class="pointer c9 ellipsis">{{scope.row.content}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="boo.isActive ? '提示' : '审核结果'"                        
                        show-overflow-tooltip
                        :align="boo.isActive ? '' : 'center'"
                        width="180">
                        <template slot-scope="scope">
                            <span :class="['pointer', 'ellipsis', boo.isActive ? 'danger-color' : '']">{{boo.isActive ? scope.row.tip : '禁言'}}</span>                            
                        </template>
                    </el-table-column>            
                    <el-table-column
                        width="120"
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="viewDetail(scope.row)">查看详情</el-button>
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
            <el-tab-pane label="禁言用户列表" name="second">
                <div class="tab-list">
                    <el-select v-model="value2" placeholder="请选择">
                        <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
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
                        prop="userName"
                        label="用户名"
                        width="120">
                    </el-table-column> 
                    <el-table-column
                        prop="date"
                        label="时间"
                        width="180">
                    </el-table-column>  
                    <el-table-column
                        label="状态"
                        width="120">
                        <template slot-scope="scope">
                            <span class="pointer c9 ellipsis">已禁言</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="关联事件">
                        <template slot-scope="scope">
                            <span class="pointer c9 ellipsis">{{scope.row.content}}</span>
                        </template>
                    </el-table-column>                             
                    <el-table-column
                        width="120"
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button type="text">恢复</el-button>
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
        <!-- viewDetail 弹框 -->
        <el-dialog
            class="dialog-container"
            :visible.sync="boo.showDetail"
            width="60%">
            <div slot="title" class="title-container clearfix">
                <div class="title-item clearfix">
                    <span class="fl title-info">所属分类</span>
                    <div class="title-content">
                        <el-tag class="tag" type="info" size="medium">新闻</el-tag>
                        <el-tag class="tag" type="danger" size="medium">咨询</el-tag>
                        <el-tag class="tag" type="info" size="medium">杂谈</el-tag>
                    </div>
                </div>
                <div class="title-item clearfix">
                    <span class="fl title-info">用户名</span>
                    <div class="title-content">
                        <span class="tag">{{currentItem.userName}}</span>
                        <span class="tag c9">该用户已被禁言 <span class="danger-color">{{currentItem.bannedNum}}</span> 次</span>
                    </div>
                </div>
                <div class="title-item clearfix">
                    <span class="fl title-info">发布时间</span>
                    <div class="title-content">
                        <span class="c9">{{currentItem.date}}</span>
                    </div>
                </div>
            </div>
            <div class="dialog-content">
                <div class="manage">
                    <h4 class="">{{currentItem.title}}</h4>
                    <p class="">{{currentItem.content}}</p>
                </div>
                <div class="btn-list">
                    <el-radio-group v-model="radio2" @change="selectType">
                        <el-radio :label="'屏蔽'">屏蔽</el-radio>
                        <el-radio :label="'禁言'">禁言</el-radio>
                        <el-radio :label="'拉黑'">拉黑</el-radio>
                        <el-radio :label="'审核通过'">审核通过</el-radio>
                    </el-radio-group>
                </div>
                <div class="type-list">
                    <div class="title-item clearfix">
                        <span class="fl title-info">已选择：</span>
                        <div class="title-content">
                            <span class="tag">{{radio2}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="boo.showDetail = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import DATA from 'static/json/operation/topicCheck.json'; //当前显示的对话
  export default {
    data() {
      return {
        activeName: 'first',
        list: DATA.list,
        currentPage4: 4,
        currentItem: {},//当前显示的具体公告
        boo: {
            showDetail: false,
            isActive: true
        },
        param: {
            title: "",
            content: "",
            num: ""
        },
        options: [{
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '屏蔽'
        }, {
          value: '2',
          label: '禁言'
        }, {
          value: '3',
          label: '拉黑'
        }, {
          value: '4',
          label: '审核通过'
        }],
        options2: [{
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '已禁言'
        }, {
          value: '2',
          label: '已拉黑'
        }],
        value: '',
        value2: '',
        radio2: '屏蔽'
      }      
    },
    computed: {
        isDisabled(){            
            return this.boo.isActive ? true : false
        },
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
        selectType(val){
            // console.log(val)
            // console.log(this.$refs['check1'].disabled = false)
            // this.$refs['check1'].disabled = false
            // if (val.length == 0) {
            //     this.$refs['check1'].disabled = true
            // } else {
            //     let boo = val.findIndex((val)=>{
            //         console.log(val)
            //         if(val == '审核通过') return true
            //     })
            //     console.log(boo)
            // }            
        }
    }
  };
</script>
<style scoped lang="scss">
.pointer{
    cursor: pointer;
}
.tab-list{
    padding-bottom: 15px;
    border-bottom: 1px solid rgb(225,225,225);
    margin-bottom: 15px;
    .tag{
        margin-right: 15px;
    }
}
.page-container{
    padding: 15px 0;
    text-align: center;
}
.dialog-container{
    .title-container{
        border-bottom: 1px solid rgb(225,225,225)
    }
    .title-item,.dialog-content{
        font-size: 14px;
        margin-bottom: 15px;
        .title-info{
            width: 65px;
            text-align: right;
            line-height: 28px;
        }
        .title-content{
            margin-left: 100px;
        }
        .tag{
            margin-right: 15px;
            line-height: 28px;
        }
    }
    .dialog-content{
        .btn-list{
            text-align: right;
        }
    }
}
</style>
