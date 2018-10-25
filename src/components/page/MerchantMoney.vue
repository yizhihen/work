<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 资金</el-breadcrumb-item>
                <el-breadcrumb-item>财务进程</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form ref="form" :model="form" label-width="120px" size="medium">
                    <el-row>
                        <span class="search-title">商户名称</span>
                        <el-badge class="item mr20">
                            <el-button :type="merchant_id == 0 ? 'primary' : ''" @click="merchantChange(0)">全部</el-button>
                        </el-badge>
                        <el-badge :value="10" class="item mr20">
                            <el-button :type="merchant_id == 1 ? 'primary' : ''" @click="merchantChange(1)">郑州奥林匹斯店</el-button>
                        </el-badge>
                    </el-row>
                    <el-row class="mt10">
                        <span class="search-title">项目状态</span>
                        <el-badge class="item mr20">
                            <el-button :type="status == 0 ? 'primary' : ''" @click="statusChange(0)">全部</el-button>
                        </el-badge>
                        <el-badge :value="10" class="item mr20">
                            <el-button :type="status == 1 ? 'primary' : ''" @click="statusChange(1)">执行中</el-button>
                        </el-badge>
                        <el-badge class="item mr20">
                            <el-button :type="status == 2 ? 'primary' : ''" @click="statusChange(2)">投标中</el-button>
                        </el-badge>
                    </el-row>
                    <el-row class="mt10">
                        <span class="search-title">其他查询</span>
                        <el-input v-model="select_word" placeholder="项目名称" class="handle-input mr10"></el-input>
                        <el-input v-model="select_word" placeholder="项目编号" class="handle-input mr10"></el-input>
                        <el-button type="primary" icon="search" @click="search">搜索</el-button>
                    </el-row>
                    <el-row class="mt10">
                        <el-col :span="5">
                            <el-button class="type" size="medium" :type="statisticType == 1 ? 'primary' : 'success'" @click="statisticTypeChange(1)">
                                <el-row :gutter="12">
                                    <el-col :span="12" class="tc ft18 mb10 mt10">9</el-col>
                                    <el-col :span="12" class="tc ft18 mb10 mt10">39800</el-col>
                                </el-row>
                                <el-row :gutter="12">
                                    <el-col :span="12" class="tc ft14 mb5">投标中的项目</el-col>
                                    <el-col :span="12" class="tc ft14 mb5">总计融资金额</el-col>
                                </el-row>
                            </el-button>
                        </el-col>

                        <el-col :span="5" class="ml10">
                            <el-button class="type" size="medium" :type="statisticType == 2 ? 'primary' : 'warning'" @click="statisticTypeChange(2)">
                                <el-row :gutter="12">
                                    <el-col :span="12" class="tc ft18 mb10 mt10">11</el-col>
                                    <el-col :span="12" class="tc ft18 mb10 mt10">39800</el-col>
                                </el-row>
                                <el-row :gutter="12">
                                    <el-col :span="12" class="tc ft14 mb5">执行中的项目</el-col>
                                    <el-col :span="12" class="tc ft14 mb5">累计金额</el-col>
                                </el-row>
                            </el-button>
                        </el-col>

                        <el-col :span="5" class="ml10">
                            <el-button class="type" size="medium" :type="statisticType == 3 ? 'primary' : 'danger'" @click="statisticTypeChange(3)">
                                <el-row :gutter="12">
                                    <el-col :span="12" class="tc ft18 mb10 mt10">11</el-col>
                                    <el-col :span="12" class="tc ft18 mb10 mt10">39800</el-col>
                                </el-row>
                                <el-row :gutter="12">
                                    <el-col :span="12" class="tc ft14 mb5">即将到期</el-col>
                                    <el-col :span="12" class="tc ft14 mb5">累计金额</el-col>
                                </el-row>
                            </el-button>
                        </el-col>

                        <el-col :span="5" class="ml10">
                            <el-button class="type" size="medium" :type="statisticType == 4 ? 'primary' : 'custom'" @click="statisticTypeChange(4)">
                                <el-row :gutter="12">
                                    <el-col :span="12" class="tc ft18 mb10 mt10">11</el-col>
                                    <el-col :span="12" class="tc ft18 mb10 mt10">39800</el-col>
                                </el-row>
                                <el-row :gutter="12">
                                    <el-col :span="12" class="tc ft14 mb5">已逾期</el-col>
                                    <el-col :span="12" class="tc ft14 mb5">累计金额</el-col>
                                </el-row>
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <el-table :data="data" border style="width:100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column align="center" prop="no" label="序列" width="100"></el-table-column>
                <el-table-column align="center" prop="name" label="项目名称" width="200"></el-table-column>
                <el-table-column align="center" prop="date" label="开始-结束时间" width="130"></el-table-column>
                <el-table-column sortable align="center" prop="limit" label="周期" width="100"></el-table-column>
                <el-table-column sortable align="center" prop="money" label="融资金额" width="100"></el-table-column>
                <el-table-column sortable align="center" prop="rate" label="年化率" width="100"></el-table-column>
                <el-table-column sortable align="center" prop="fee" label="佣金" width="100"></el-table-column>
                <el-table-column sortable align="center" prop="money_refund" label="总计还款" width="100"></el-table-column>
                <el-table-column align="center" prop="status" label="项目计划" width="100"></el-table-column>
                <el-table-column sortable align="center" prop="day_remain" label="距离还款日" width="150"></el-table-column>
                <el-table-column align="center" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button size="small" @click="payItem(scope.$index, scope.row)">还款</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 还款弹出框 -->
        <el-dialog title="还款操作" :visible.sync="editVisible" width="50%">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item label="项目名称">
                            <span>{{pay.name}}</span>
                        </el-form-item>
                        <el-form-item label="项目总金额">
                            <span>{{pay.moneyAll}}</span>
                        </el-form-item>
                        <el-form-item label="累计还款金额">
                            <span>{{pay.refundAll}}</span>
                        </el-form-item>
                        <el-form-item label="剩余还款金额">
                            <span>{{pay.remainRefundAll}}</span>
                        </el-form-item>
                        <el-form-item label="还款金额">
                            <el-input v-model="pay.money" style="width:150px;"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <el-table
                        :data="payData"
                        style="width: 100%">
                        <el-table-column
                        prop="paydate"
                        align="center"
                        label="还款时间"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        prop="paymoney"
                        align="center"
                        label="还款金额"
                        width="150">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                statisticType: 0,
                merchant_id: 0,
                status: 0,
                tableData: [],
                url: './static/merchantMoney.json',
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                payData: [{
                    paydate: '2018-07-01',
                    paymoney: '10000元',
                    }, {
                    paydate: '2018-06-01',
                    paymoney: '10000元',
                    }, {
                    paydate: '2018-05-01',
                    paymoney: '10000元',
                    }],
                pay: {
                   name: '宝马730LI 291999292 [奥林4s店]',
                   moneyAll: '30000.00元',
                   refundAll: '30000.00元',
                   remainRefundAll: '-20000.00元',
                   money: '',
                },
                form: {
                    no: '',
                    name: '',
                    money: '',
                    date_limit: '',
                    date_start: '',
                    date_edit: ''
                },
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        // if (d.address.indexOf(this.select_cate) > -1 &&
                        //     (d.name.indexOf(this.select_word) > -1 ||
                        //         d.address.indexOf(this.select_word) > -1)
                        // ) {
                        //     return d;
                        // }

                        return d;
                    }
                })
            }
        },
        methods: {
            statusChange(index) {
                this.status = index
            },
            merchantChange(index) {
                this.merchant_id = index
            },
            statisticTypeChange(index) {
                console.log( index )
                if( index == this.statisticType ) {
                    this.statisticType = 0
                } else {
                    this.statisticType = index
                }
            },
            payItem(index, row) {
                if( index != '' ) {
                    this.idx = index;
                    const item = this.tableData[index];
                    this.form = {
                        merchant: item.merchant,
                        user_name: item.user_name,
                    }
                    this.editVisible = true;
                } else {
                    this.editVisible = true;
                }
            },

            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if (process.env.NODE_ENV === 'development') {
                    // this.url = '/ms/table/list';
                };
                this.$axios.get(this.url, {
                    page: this.cur_page
                }).then((res) => {
                    this.tableData = res.data.list;
                })
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    no: item.no,
                    name: item.name,
                    money: item.money,
                    date_limit: item.date_limit,
                    date_start: item.date_start,
                    date_edit: item.date_edit
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`操作成功`);
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            }
        }
    }

</script>
<style>
    .el-dialog__footer{text-align: center;}
</style>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .mt10{margin-top: 10px;}
    .ml10{margin-left: 10px;}
    .mb10{margin-bottom: 15px;}
    .mb5{margin-bottom: 9px;}
    .search-title{font-size:14px;margin-right:20px;}
    .mr20{margin-right:20px;}
    .tc{text-align:center;}
    .ft18{font-size: 18px;}
    .ft14{font-size: 14px;}
    .statistic{cursor: pointer;}
    .statistic.active{color: #fff;background-color: #409EFF;border-color: #409EFF;}
    .type{width: 100%;}
    .el-button--custom{
        color: #fff;
        background-color: rgb(242, 94, 67);
        border-color: rgb(242, 94, 67);
    }
</style>
