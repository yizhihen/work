<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 资金</el-breadcrumb-item>
                <el-breadcrumb-item>账户一览</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">

            <div class="handle-box">
                <el-form ref="form" :model="form" label-width="120px" size="medium">
                    <el-row>
                        <el-col :span="3">
                            <el-button class="type" size="medium" :type="type == 1 ? 'primary' : 'success'" @click="typeChange(1)">
                                <el-row :gutter="12">
                                    <el-col :span="24" class="tc ft18 mb10 mt10">39800</el-col>
                                </el-row>
                                <el-row :gutter="12">
                                    <el-col :span="24" class="tc ft14 mb5">您的账户总额</el-col>
                                </el-row>
                            </el-button>
                        </el-col>
                         <el-col :span="3" class="ml10">
                            <el-button class="type" size="medium" :type="type == 2 ? 'primary' : 'custom-2'" @click="typeChange(2)">
                                <el-row :gutter="12">
                                    <el-col :span="24" class="tc ft18 mb10 mt10">29800</el-col>
                                </el-row>
                                <el-row :gutter="12">
                                    <el-col :span="24" class="tc ft14 mb5">商户可用余额</el-col>
                                </el-row>
                            </el-button>
                        </el-col>
                         <el-col :span="3" class="ml10">
                            <el-button class="type" size="medium" :type="type == 3 ? 'primary' : 'custom-3'" @click="typeChange(3)">
                                <el-row :gutter="12">
                                    <el-col :span="24" class="tc ft18 mb10 mt10">19800</el-col>
                                </el-row>
                                <el-row :gutter="12">
                                    <el-col :span="24" class="tc ft14 mb5">用户可用余额</el-col>
                                </el-row>
                            </el-button>
                        </el-col>
                        <el-col :span="3" class="ml10">
                            <el-button class="type" size="medium" :type="type == 4 ? 'primary' : 'warning'" @click="typeChange(4)">
                                <el-row :gutter="12">
                                    <el-col :span="24" class="tc ft18 mb10 mt10">2000</el-col>
                                </el-row>
                                <el-row :gutter="12">
                                    <el-col :span="24" class="tc ft14 mb5">平台使用费总额</el-col>
                                </el-row>
                            </el-button>
                        </el-col>
                        <el-col :span="3" class="ml10">
                            <el-button class="type" size="medium" :type="type == 5 ? 'primary' : 'danger'" @click="typeChange(5)">
                                <el-row :gutter="12">
                                    <el-col :span="24" class="tc ft18 mb10 mt10">2000</el-col>
                                </el-row>
                                <el-row :gutter="12">
                                    <el-col :span="24" class="tc ft14 mb5">标的结束待打款</el-col>
                                </el-row>
                            </el-button>
                        </el-col>
                        <el-col :span="3" class="ml10">
                            <el-button class="type" size="medium" :type="type == 6 ? 'primary' : 'custom'" @click="typeChange(6)">
                                <el-row :gutter="12">
                                    <el-col :span="24" class="tc ft18 mb10 mt10">39800</el-col>
                                </el-row>
                                <el-row :gutter="12">
                                    <el-col :span="24" class="tc ft14 mb5">标的中的金额</el-col>
                                </el-row>
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>


            <el-table id="tableForm" :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column align="center" prop="no" label="序列" width="100"></el-table-column>
                <el-table-column align="center" prop="money_no" label="资金编号" width="200"></el-table-column>
                <el-table-column sortable align="center" prop="date_account" label="记录日期" width="150"></el-table-column>
                <el-table-column align="center" prop="money_type" label="资金类型" width="100"></el-table-column>
                <el-table-column align="center" prop="money_go" label="资金去向" width="150"></el-table-column>
                <el-table-column sortable align="center" prop="money" label="金额" width="150"></el-table-column>
                <el-table-column sortable align="center" prop="money_balance" label="当前账户余额" width="150"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

            </el-form>
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
                type: 0,
                url: './static/accountList.json',
                tableData: [],
                cur_page: 1,
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
            typeChange(index) {
                if( index == this.type ) {
                    this.type = 0
                    var idObj = document.getElementById('tableForm')
                    idObj.focus()
                } else {
                    this.type = index
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

<style scoped>
    .mt10{margin-top: 10px;}
    .ml10{margin-left: 10px;}
    .mb10{margin-bottom: 15px;}
    .mb5{margin-bottom: 5px;}
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
    .el-card{
        backgroud:#409EFF
    }
    .tc{text-align:center;}
    .ft18{font-size: 18px;}
    .ft14{font-size: 14px;}
    .el-button--custom{
        color: #fff;
        background-color: rgb(242, 94, 67);
        border-color: rgb(242, 94, 67);
    }
    .el-button--custom-2{
        color: #fff;
        background-color: #99CCCC;
        border-color: #99CCCC;
    }
    .el-button--custom-3{
        color: #fff;
        background-color: #CCCCFF;
        border-color: #CCCCFF;
    }

    .type{width: 100%;}
</style>
