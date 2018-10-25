<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 资金</el-breadcrumb-item>
                <el-breadcrumb-item>投标列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form ref="form" :model="form" label-width="120px" size="medium">
                    <el-row>
                        <span class="search-title">项目状态</span>
                        <el-badge class="item mr20">
                            <el-button :type="status == 0 ? 'primary' : ''" @click="statusChange(0)">全部</el-button>
                        </el-badge>
                        <el-badge :value="10" class="item mr20">
                            <el-button :type="status == 1 ? 'primary' : ''" @click="statusChange(1)">已驳回</el-button>
                        </el-badge>
                        <el-badge class="item mr20">
                            <el-button :type="status == 2 ? 'primary' : ''" @click="statusChange(2)">投标中</el-button>
                        </el-badge>
                        <el-badge class="item mr20">
                            <el-button :type="status == 3 ? 'primary' : ''" @click="statusChange(3)">执行中</el-button>
                        </el-badge>
                        <el-badge class="item mr20">
                            <el-button :type="status == 4 ? 'primary' : ''" @click="statusChange(4)">已完成</el-button>
                        </el-badge>
                        <el-badge class="item mr20">
                            <el-button :type="status == 5 ? 'primary' : ''" @click="statusChange(5)">已逾期</el-button>
                        </el-badge>
                    </el-row>
                    <el-row class="mt10">
                        <span class="search-title">项目期限</span>
                        <el-badge class="item mr20">
                            <el-button :type="limit == 0 ? 'primary' : ''" @click="limitChange(0)">全部</el-button>
                        </el-badge>
                        <el-badge :value="10" class="item mr20">
                            <el-button :type="limit == 1 ? 'primary' : ''" @click="limitChange(1)">7天</el-button>
                        </el-badge>
                        <el-badge class="item mr20">
                            <el-button :type="limit == 2 ? 'primary' : ''" @click="limitChange(2)">14天</el-button>
                        </el-badge>
                        <el-badge class="item mr20">
                            <el-button :type="limit == 3 ? 'primary' : ''" @click="limitChange(3)">28天</el-button>
                        </el-badge>
                    </el-row>
                    <el-row class="mt10">
                        <span class="search-title">商户</span>
                        <el-badge class="item mr20" style="margin-left:30px;">
                            <el-button :type="merchant_id == 0 ? 'primary' : ''" @click="merchantChange(0)">全部</el-button>
                        </el-badge>
                        <el-badge :value="10" class="item mr20">
                            <el-button :type="merchant_id == 1 ? 'primary' : ''" @click="merchantChange(1)">郑州奥林匹斯店</el-button>
                        </el-badge>
                    </el-row>
                    <el-row class="mt10">
                        <span class="search-title">其他查询</span>
                        <el-input v-model="select_word" placeholder="关键词" class="handle-input mr10"></el-input>
                        <el-date-picker type="date" placeholder="开始时间" v-model="form.date1"></el-date-picker>
                        <el-date-picker type="date" placeholder="结束时间" v-model="form.date1"></el-date-picker>
                        <el-button type="primary" icon="search" @click="search">搜索</el-button>
                    </el-row>
                </el-form>
            </div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column align="center" prop="no" label="序列" width="55"></el-table-column>
                <el-table-column align="center" prop="item_no" label="投标编号" width="150"></el-table-column>
                <el-table-column align="center" prop="name" label="项目名称" width="200"></el-table-column>
                <el-table-column sortable align="center" prop="date_sub" label="开始时间" width="150"></el-table-column>
                <el-table-column align="center" prop="merchant" label="招标商户" width="100"></el-table-column>
                <el-table-column sortable align="center" prop="money" label="融资额度" width="100"></el-table-column>
                <el-table-column sortable align="center" prop="day" label="项目周期" width="100"></el-table-column>
                <el-table-column sortable align="center" prop="rate" label="年化利率" width="100"></el-table-column>
                <el-table-column sortable align="center" prop="num_invest" label="投标人数" width="100"></el-table-column>
                <el-table-column sortable align="center" prop="money_invest" label="已筹金额" width="100"></el-table-column>
                <el-table-column sortable align="center" prop="progress" label="完成进度" width="100"></el-table-column>
                <el-table-column align="center" prop="status" label="状态" width="100"></el-table-column>
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
                status: 0,
                limit: 0,
                merchant_id: 0,
                url: './static/itemList.json',
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
            statusChange(index) {
                this.status = index
            },
            merchantChange(index) {
                this.merchant_id = index
            },
            limitChange(index) {
                this.limit = index
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
    .mt10{margin-top: 10px;}
    .search-title{font-size:14px;margin-right:20px;}
    .mr20{margin-right:20px;}
</style>
