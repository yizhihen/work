<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-edit-outline"></i> 设置</el-breadcrumb-item>
                <el-breadcrumb-item>商户开通</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form ref="form" :model="form" label-width="120px" size="medium">
                    <el-row slot-scope="scope">
                        <el-button type="primary" @click="addMerchant()">添加商户</el-button>
                    </el-row>
                </el-form>
            </div>
            <el-table :data="data" border style="width:100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column align="center" prop="no" label="序列" width="120"></el-table-column>
                <el-table-column align="center" prop="merchant" label="商户名称" width="150"></el-table-column>
                <el-table-column sortable align="center" prop="date_reg" label="注册日期" width="250"></el-table-column>
                <el-table-column align="center" prop="user_name" label="用户名" width="250"></el-table-column>
                <el-table-column align="center" prop="status" label="状态" width="150"></el-table-column>
                <el-table-column align="center" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="small" @click="editMerchant(scope.$index, scope.row)">编辑资料</el-button>
                        <el-button size="small" @click="handleAudit(scope.$index, scope.row)">审核通过</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

          <!-- 项目弹出框 -->
        <el-dialog title="编辑资料" :visible.sync="merchantEditVisible" width="70%">
              <el-form ref="form" :model="form" label-width="120px" size="medium">
                <div class="plugins-tips">
                    基本信息
                </div>

                <el-form-item label="显示名称">
                    <el-input v-model="form.name" placeholder="如：合肥中升汇迪"></el-input>
                </el-form-item>

                <el-form-item id="uploadItemPic" label="Logo">
                    <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="业务负责人">
                    <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                </el-form-item>

                <el-form-item label="联系电话">
                    <el-input v-model="form.name" placeholder="手机号码"></el-input>
                </el-form-item>

                <div class="plugins-tips">
                    证件资料
                </div>

                <el-form-item label="公司名称">
                    <el-input v-model="form.name" placeholder="如：合肥中升汇迪"></el-input>
                </el-form-item>

                <el-form-item label="法人姓名">
                    <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                </el-form-item>

                <el-form-item label="注册资金">
                    <el-input v-model="form.name" placeholder="直接输入数字"></el-input>
                </el-form-item>

                <el-form-item id="uploadItemPic" label="上传营业执照">
                    <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>

                <el-form-item id="uploadItemPic" label="上传法人身份证正反面">
                    <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="添加商户" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="商户名称">
                    <el-input v-model="form.merchant"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="form.user_name"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer tc">
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

        <!-- 审核提示框 -->
        <el-dialog title="提示" :visible.sync="auditVisible" width="300px" center>
            <div class="del-dialog-cnt">是否确定审核通过？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="auditVisible = false">取 消</el-button>
                <el-button type="primary" @click="auditRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                url: './static/openMerchant.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                merchantEditVisible: false,
                editVisible: false,
                delVisible: false,
                auditVisible: false,
                form: {
                    merchant: '',
                    user_name: '',
                    password: ''
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
            addMerchant() {
                this.editVisible = true;
            },

            editMerchant(index, row) {
                this.merchantEditVisible = true
            },

            handleAudit(index, row) {
                this.idx = index;
                this.auditVisible = true;
            },
            auditRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('审核成功');
                this.auditVisible = false;
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
    .tc{width:100%;text-align: center;}
</style>
