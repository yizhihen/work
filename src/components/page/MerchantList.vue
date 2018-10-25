<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-view"></i> 用户</el-breadcrumb-item>
                <el-breadcrumb-item>商户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="请输入商户名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column align="center" prop="no" label="序列" width="100"></el-table-column>
                <el-table-column align="center" prop="user_name" label="商户名称" width="150"></el-table-column>
                <el-table-column sortable align="center" prop="date_reg" label="注册日期" width="150"></el-table-column>
                <el-table-column sortable align="center" prop="count_frozen" label="冻结次数" width="100"></el-table-column>
                <el-table-column align="center" prop="status" label="账号状态" width="100"></el-table-column>
                <el-table-column sortable align="center" prop="count_invest" label="融资次数" width="100"></el-table-column>
                <el-table-column sortable align="center" prop="money_invest" label="累计融资金额" width="150"></el-table-column>
                <el-table-column sortable align="center" prop="money_income" label="累计费用" width="150"></el-table-column>
                <el-table-column sortable align="center" prop="count_inproject" label="招标项目" width="150"></el-table-column>
                <el-table-column sortable align="center" prop="money_inproject" label="招标金额" width="150"></el-table-column>
                <el-table-column align="center" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button size="small">冻结</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                url: './static/merchantList.json',
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
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
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
</style>
