<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 资金</el-breadcrumb-item>
                <el-breadcrumb-item>充值提现</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-row>
                    <span class="search-title">提现类型</span>
                    <el-badge class="item mr20">
                        <el-button :type="withdraw_type == 0 ? 'primary' : ''" @click="withdrawChange(0)">全部</el-button>
                    </el-badge>
                    <el-badge class="item mr20">
                        <el-button :type="withdraw_type == 1 ? 'primary' : ''" @click="withdrawChange(1)">商户提现</el-button>
                    </el-badge>
                    <el-badge class="item mr20">
                        <el-button :type="withdraw_type == 2 ? 'primary' : ''" @click="withdrawChange(2)">用户提现</el-button>
                    </el-badge>
                    <el-badge class="item mr20">
                        <el-button :type="withdraw_type == 3 ? 'primary' : ''" @click="withdrawChange(3)">商户充值</el-button>
                    </el-badge>
                    <el-badge class="item mr20">
                        <el-button :type="withdraw_type == 4 ? 'primary' : ''" @click="withdrawChange(4)">用户充值</el-button>
                    </el-badge>
                </el-row>
                <el-row class="mt10">
                    <span class="search-title">提现状态</span>
                    <el-badge class="item mr20">
                        <el-button :type="withdraw_status == 0 ? 'primary' : ''" @click="withdrawStatus(0)">全部</el-button>
                    </el-badge>
                    <el-badge class="item mr20">
                        <el-button :type="withdraw_status == 1 ? 'primary' : ''" @click="withdrawStatus(1)">未处理</el-button>
                    </el-badge>
                    <el-badge class="item mr20">
                        <el-button :type="withdraw_status == 2 ? 'primary' : ''" @click="withdrawStatus(2)">已处理</el-button>
                    </el-badge>
                </el-row>
            </div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column align="center" prop="no" label="序列" width="100"></el-table-column>
                <el-table-column align="center" prop="id" label="编号" width="200"></el-table-column>
                <el-table-column align="center" prop="type" label="类型" width="100"></el-table-column>
                <el-table-column sortable align="center" prop="creatDate" label="发起日期" width="150"></el-table-column>
                <el-table-column align="center" prop="ext.accountType" label="用户类型" width="100"></el-table-column>
                <el-table-column align="center" prop="ext.accountName" label="客户姓名" width="150"></el-table-column>
                <el-table-column sortable align="center" prop="sum" label="金额" width="150"></el-table-column>
                <el-table-column align="center" prop="status" label="状态" width="150"></el-table-column>
                <el-table-column align="center" label="操作" width="220">
                    <template slot-scope="scope">
                        <el-button size="small" @click="operate(scope.$index, scope.row)">操作</el-button>
                        <el-button size="small" @click="operate(scope.$index, scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="this.total">
                </el-pagination>
            </div>
        </div>

         <!-- 操作弹出框 -->
        <el-dialog class="operateContain" title="操作" :visible.sync="editVisible" width="50%">
            <el-row :gutter="20">
                <el-col :span="16">
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item label="用户名称">
                            <span>{{operateData.ext == undefined ? '' : operateData.ext.accountName}}</span>
                        </el-form-item>
                        <el-form-item label="金额">
                            <span>{{operateData.sum_orign}}</span>
                        </el-form-item>
                        <el-form-item label="实际金额">
                            <el-input v-model="operateData.sum" style="width:200px;"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="8" class="withdrawInfoContain">
                    <el-form ref="form" :model="form" label-width="90px">
                        <el-form-item label="发起时间：">
                            <span>{{operateData.date}}</span>
                        </el-form-item>
                            <el-form-item label="提现编号：">
                            <span>{{operateData.no}}</span>
                        </el-form-item>
                            <el-form-item label="收款人：">
                            <span>{{operateData.realname}}</span>
                        </el-form-item>
                            <el-form-item label="银行名称：">
                            <span>{{operateData.bankname}}</span>
                        </el-form-item>
                            <el-form-item label="所在地区：">
                            <span>{{operateData.area}}</span>
                        </el-form-item>
                            <el-form-item label="支行名称：">
                            <span>{{operateData.bank}}</span>
                        </el-form-item>
                        <el-form-item label="银行账号：">
                            <span>{{operateData.account}}</span>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit(operateData.id)">确 定</el-button>
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
                withdraw_type: 0,
                withdraw_status: 0,
                url: this.apiUrl + '1330/page',
                url_operate: this.apiUrl + '1330/execute',
                tableData: [],
                cur_page: 1,
                pageSize: 10,
                total: 0,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    no: '',
                    name: '',
                    money: '',
                    date_limit: '',
                    date_start: '',
                    date_edit: ''
                },
                payData: [{
                    paydate: '2018-07-01',
                    paymoney: '10000元',
                    }, {
                    paydate: '2018-06-01',
                    paymoney: '10000元',
                    }, {
                    paydate: '2018-05-01',
                    paymoney: '10000元',
                    }, {
                    paydate: '累计还款金额',
                    paymoney: '30000元',
                    }, {
                    paydate: '剩余还款金额',
                    paymoney: '-20000元',
                    }],
                operateData: {},
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
            withdrawChange(index) {
                this.withdraw_type = index
            },
            withdrawStatus(index) {
                this.withdraw_status = index
            },
            operate(index, row) {
                if( index !== '' ) {
                    this.idx = index;
                    this.operateData = this.tableData[index];
                    this.operateData.sum_orign = this.operateData.sum
                    this.editVisible = true;
                } else {
                    this.editVisible = true;
                }
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            getData() {
                this.$axios.get(this.url + '?pageNumber=' + this.cur_page + '&pageSize=' + this.pageSize, {headers:{'admin-auth-token': localStorage.getItem('ms_token').toString()}} ).then((res) => {
                    this.tableData = res.data.rows;
                    this.total = res.data.records
                    for( var key in this.tableData ) {
                        this.tableData[key].no = ++key + ( this.cur_page - 1 ) * this.pageSize
                    }

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
            saveEdit(id) {
                var params = new URLSearchParams()
                params.append('id', id)
                params.append('sum', this.operateData.sum)

                this.$axios.post(this.url_operate, params, {headers:{'admin-auth-token': localStorage.getItem('ms_token').toString()}} ).then((res) => {
                    if( res['data']['retCode'] == '1' ) {
                        this.editVisible = false;
                        this.$message.success(`操作成功`);
                    } else {
                        if( res['data']['retMsg'] != '' ) {
                            this.$message.error(`操作失败：` + res['data']['retMsg']);
                        } else {
                            this.$message.error(`操作失败：未知错误`);
                        }
                    }
                })
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
    .withdrawInfoContain .el-form-item__label{
        font-size: 12px!important;
    }
    .withdrawInfoContain .el-form-item__content{
        font-size: 12px!important;
    }
    .withdrawInfoContain .el-form-item--mini.el-form-item, .withdrawInfoContain .el-form-item--small.el-form-item{
        margin-bottom: 5px;
    }
    .operateContain .el-radio+.el-radio{
        margin-left:10px;
    }
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
    .search-title{font-size:14px;margin-right:20px;}
    .mr20{margin-right:20px;}
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>
