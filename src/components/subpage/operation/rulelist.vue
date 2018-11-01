<!-- 公司介绍 -->
<template>
    <div class="container" id="rulelist">
        <el-tabs v-model="other.activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item,index) in tablist" :label="item.title" :name="item.name" :key="index">
                <div class="top-container">                        
                    <div v-if="other.activeName == 'first'" class="align-content clearfix">
                        <h4 class="title fl">活动状态：</h4>
                        <div class="align-content">
                            <span @click="other.state1 = item.state" v-for="(item,index) in stateList" :key="index" :class="['item', other.state1 == item.state ? 'active' : '']">{{item.name}}</span>                                
                            <span class="item-search">
                                <el-input v-model="param2.user" placeholder="可搜索姓名，手机号">
                                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                                </el-input>
                            </span>
                        </div>
                    </div>
                    <div v-else class="align-content clearfix">
                        <h4 class="title fl">活动状态：</h4>
                        <div class="align-content">
                            <span @click="other.state2 = item.state" v-for="(item,index) in stateList" :key="index" :class="['item', other.state2 == item.state ? 'active' : '']">{{item.name}}</span>                                
                            <span class="item-search">
                                <el-input v-model="param2.user" placeholder="可搜索姓名，手机号">
                                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                                </el-input>
                            </span>
                        </div>
                    </div>
                </div>
                <el-table
                :data="tableData"
                style="width: 100%"
                @sort-change="sort"
                >
                <el-table-column
                type="index"
                label="序列"
                width="80">
                </el-table-column>
                <el-table-column
                prop="title"
                label="活动名称"
                show-overflow-tooltip
                width="140">
                </el-table-column>
                <el-table-column
                prop="creatTime"
                label="活动创建时间"
                width="180">
                </el-table-column>
                <el-table-column
                prop="startTime"
                label="活动开始时间"
                sortable
                width="180">
                </el-table-column>
                <el-table-column
                prop="endTime"
                label="活动结束时间"
                sortable
                width="180">
                </el-table-column>
                <el-table-column
                label="活动状态"
                width="100">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.state == 0" type="danger">已结束</el-tag>
                        <el-tag v-if="scope.row.state == 1" type="success">运营中</el-tag>
                        <el-tag v-if="scope.row.state == 2" type="info">未开始</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="操作">
                    <template slot-scope="scope">
                        <!-- 
                            不能提前开始
                            不能重新开始
                            只支持提前结束
                            -->
                        <el-button type="text" v-if="scope.row.state == 1">结束</el-button>
                        <el-button type="text" @click="detail(scope.row)">详情</el-button>
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
            :title="currentItem.title"
            :visible.sync="boo.showDetail">
            <!-- 首次投标奖励 -->
            <div v-if="currentItem.type == 1" class="right-content">
                <el-form :inline="true" :model="currentItem" label-width="120px">
                    <el-form-item label="首次投标奖励：">
                        <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-plus"
                        disabled
                        v-model="currentItem.percentage">
                            <template slot="append">%</template>
                        </el-input>
                    </el-form-item>
                    <span class="label-title c9">投标金额的百分比</span>
                    <el-form-item label="">
                        <el-input
                        disabled
                        placeholder="请输入内容"
                        v-model="currentItem.money">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <span class="label-title c9">固定金额</span>
                </el-form>
                <el-form :inline="true" :model="currentItem" label-width="120px">
                    <el-form-item label="奖励上线：">
                        <el-input
                        disabled
                        placeholder="请输入内容"
                        v-model="currentItem.maxmoney">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>                            
                </el-form>
                <el-form :inline="true" :model="currentItem" label-width="120px">
                    <el-form-item label="活动时间：">
                        <el-date-picker
                        disabled
                        v-model="currentItem.time"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>                            
                </el-form>
            </div>
            <!-- 投标金额抵现金 -->
            <div v-if="currentItem.type == 2 || currentItem.type == 3" class="right-content">
                <el-form :inline="true" :model="currentItem" label-width="120px">
                    <el-form-item label="促销利率：">
                        <el-input
                        disabled
                        placeholder="请输入内容"
                        prefix-icon="el-icon-plus"
                        v-model="currentItem.percentage">
                            <template slot="append">%</template>
                        </el-input>
                    </el-form-item>                            
                </el-form>
                <el-form :inline="true" :model="currentItem" label-width="120px">
                    <el-form-item label="投标金额：">
                        <el-input
                        disabled
                        placeholder="请输入内容"
                        v-model="currentItem.minmoney">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <span style="line-height: 32px; padding-right: 10px;" class="c9">至</span>
                    <el-form-item label="">
                        <el-input
                        disabled
                        placeholder="请输入内容"
                        v-model="currentItem.maxmoney">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>                           
                </el-form>
                <el-form :inline="true" :model="currentItem" label-width="120px">
                    <el-form-item label="活动时间：">
                        <el-date-picker
                        disabled
                        v-model="currentItem.time"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>                            
                </el-form>
                <el-form :inline="true" :model="currentItem" label-width="120px">
                    <el-form-item label="参与次数：">
                        <el-input
                        disabled
                        placeholder=""
                        v-model="currentItem.times"></el-input>
                    </el-form-item>
                    <span class="label-title c9">每位用户限制参与次数</span>
                </el-form>
            </div>
            <!-- 邀请好友 -->
            <div v-if="currentItem.type == 4" class="right-content">
                <el-form :inline="true" :model="currentItem" label-width="120px" class="radio-form">
                    <el-form-item label="奖励模式：">
                    <el-radio-group v-model="currentItem.class">
                        <el-radio disabled label="投标后发放"></el-radio>
                        <el-radio disabled label="注册成功发放"></el-radio>
                    </el-radio-group>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" :model="currentItem" label-width="120px">
                    <el-form-item label="邀请奖励：">
                        <el-input
                        disabled
                        placeholder="请输入内容"
                        prefix-icon="el-icon-plus"
                        v-model="currentItem.percentage">
                            <template slot="append">%</template>
                        </el-input>
                    </el-form-item>
                    <span class="c9" style="line-height: 32px;margin-right: 35px;">被邀请人投标金额的百分比；</span>
                    <el-form-item label="">
                        <el-input
                        disabled
                        placeholder="请输入内容"
                        v-model="currentItem.money">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <span class="c9" style="line-height: 32px">固定金额</span>
                </el-form>
                <el-form :inline="true" :model="currentItem" label-width="120px">
                    <el-form-item label="奖励上线：">
                        <el-input
                        disabled
                        placeholder="请输入内容"
                        v-model="currentItem.maxmoney">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>                            
                </el-form>
                <el-form :inline="true" :model="currentItem" label-width="120px">
                    <el-form-item label="活动时间：">
                        <el-date-picker
                        disabled
                        v-model="currentItem.time"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="boo.showDetail = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import DATA from 'static/json/operation/rulelist.json';
    export default {
        data() {
        return {
                activeName: 'first',
                other: {
                    activeName: 'first',
                    state1: '1',
                    state2: '1'
                },
                boo: {
                    showDetail: false
                },
                tablist: [
                    {title: "促销活动列表", name: "first"},
                    {title: "邀请活动列表", name: "second"}
                ],
                stateList: [
                    {state: 1, name: "全部"},
                    {state: 2, name: "未开始"},
                    {state: 3, name: "进行中"},
                    {state: 4, name: "已结束"}
                ],
                tableData: DATA.list,
                currentPage4: 4,
                param1: {
                    user: '',
                    state: ''
                },
                param2: {
                    user: '',
                    state: ''
                },
                optionsList: [
                    {label: "全部",value: ""},
                    {label: "进行中",value: "1"},
                    {label: "未开始",value: "2"},
                    {label: "已结束",value: "0"},
                ],
                currentItem: {
                    title: "",
                },
            };
        },
        methods: {
            handleClick(tab, event) {
                let _self= this
                if (_self.other.activeName == tab.name) return
                _self.other.activeName = tab.name
                console.log('改变了')
            },
            formatter(row, column) {
                // console.log('row:' + row)
                // console.log('column: ' + column)
                return row.address;
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            search(){
                let _self = this
                if(_self.other.activeName == 'first'){
                    console.log('第一个' + _self.param1.user)
                }else{
                    console.log('第二个' + _self.param2.user)
                }
            },
            sort(e){
                if(e.prop == 'endTime'){
                    if(e.order == 'descending'){
                        console.log('结束时间下降排序')
                    }
                    if(e.order == 'ascending'){
                        console.log('结束时间上升排序')
                    }
                }
                if(e.prop == 'startTime'){
                    if(e.order == 'descending'){
                        console.log('开始时间下降排序')
                    }
                    if(e.order == 'ascending'){
                        console.log('开始时间上升排序')
                    }
                }
            },
            detail(item){
                this.currentItem = item
                this.boo.showDetail = true
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
.tag{
    margin-bottom: 15px;
}
.item-tab{
    margin-bottom: 15px;
}
.right-content{
    font-size: 14px;
    .label-title{
        line-height: 32px;
        display: inline-block;
        margin-right: 80px;
    }
}
.top-container{
    padding-bottom: 10px;
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
            .item-search{
                display: inline-block;
                margin-top: -2px;
            }
        }
    }
    .action-content{
        padding-top: 15px;
        border-top: 1px solid rgb(225,225,225);
    }
}
</style>
