<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 资金</el-breadcrumb-item>
                <el-breadcrumb-item>投标审核</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form ref="form" :model="form" label-width="120px" size="medium">
                    <el-row>
                        <span class="search-title">商户</span>
                        <el-badge class="item mr20">
                            <el-button :type="merchant_id == 0 ? 'primary' : ''" @click="merchantChange(0)">全部</el-button>
                        </el-badge>
                        <el-badge :value="10" class="item mr20">
                            <el-button :type="merchant_id == 1 ? 'primary' : ''" @click="merchantChange(1)">郑州奥林匹斯店</el-button>
                        </el-badge>
                    </el-row>
                    <el-row class="mt10">
                        <span class="search-title">其他查询</span>
                        <el-input v-model="select_word" placeholder="关键词" class="handle-input mr10"></el-input>
                        <el-button type="primary" icon="search" @click="search">搜索</el-button>
                    </el-row>
                </el-form>
            </div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column align="center" prop="sequence" label="序列" width="55"></el-table-column>
                <el-table-column align="center" prop="no" label="投标编号" width="150"></el-table-column>
                <el-table-column align="center" prop="name" label="项目名称" width="200"></el-table-column>
                <el-table-column sortable align="center" prop="createAt" label="提交时间" width="140"></el-table-column>
                <el-table-column align="center" prop="ext.busName" label="招标商户" width="100"></el-table-column>
                <el-table-column sortable align="center" prop="investmentquota" label="融资额度" width="100"></el-table-column>
                <el-table-column sortable align="center" prop="term" label="项目周期" width="100"></el-table-column>
                <el-table-column sortable align="center" prop="prospectivereturn" label="年化利率" width="100"></el-table-column>
                <el-table-column align="center" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button size="small" @click="viewItem(scope.$index, scope.row)">查看详情</el-button>
                        <el-button size="small" @click="handleAudit(scope.$index, scope.row)">审核通过</el-button>
                        <el-button size="small" @click="cancelAudit(scope.$index, scope.row)">驳回</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="this.total">
                </el-pagination>
            </div>
        </div>

        <!-- 项目弹出框 -->
        <el-dialog title="项目详情" :visible.sync="itemVisible" width="70%">
            <el-form ref="form" :model="form" label-width="120px" size="medium">
                <div class="plugins-tips">
                    标的信息
                </div>

                <el-form-item label="标的名称">
                    <el-input v-model="form.name" placeholder="如：18款宝马 350 4.0T"></el-input>
                </el-form-item>

                <el-form-item id="uploadItemPic" label="上传产品图片">
                    <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">至少上传6张图片，只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>

                <div class="plugins-tips">
                    车辆信息
                </div>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="车辆类型">
                            <el-select v-model="form.region" placeholder="请选择">
                                <el-option key="bbk" label="国产" value="bbk"></el-option>
                                <el-option key="xtc" label="进口" value="xtc"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="行驶证">
                            <el-select v-model="form.region" placeholder="请选择">
                                <el-option key="bbk" label="有" value="bbk"></el-option>
                                <el-option key="xtc" label="无" value="xtc"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="车辆车型">
                            <el-select v-model="form.region" placeholder="请选择">
                                <el-option key="bbk" label="新车" value="bbk"></el-option>
                                <el-option key="xtc" label="二手车" value="xtc"></el-option>
                                <el-option key="xtc" label="准新车" value="xtc"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="制造日期">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="登记证书">
                            <el-select v-model="form.region" placeholder="请选择">
                                <el-option key="bbk" label="有" value="bbk"></el-option>
                                <el-option key="xtc" label="无" value="xtc"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="排量">
                                <el-input v-model="form.name" placeholder="请输入排量"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="钥匙">
                            <el-select v-model="form.region" placeholder="请选择">
                                <el-option key="bbk" label="1把" value="bbk"></el-option>
                                <el-option key="xtc" label="2把" value="xtc"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="公里数">
                                <el-input v-model="form.name" placeholder="请输入公里数"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <div class="plugins-tips">
                    项目基本信息
                </div>

                <el-form-item label="项目开始时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>

                <el-form-item label="项目周期">
                    <el-select v-model="form.region" placeholder="请选择">
                        <el-option key="bbk" label="7天" value="bbk"></el-option>
                        <el-option key="xtc" label="14天" value="xtc"></el-option>
                        <el-option key="xtc" label="21天" value="xtc"></el-option>
                        <el-option key="xtc" label="28天" value="xtc"></el-option>
                        <el-option key="xtc" label="60天" value="xtc"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="项目总金额">
                    <el-input v-model="form.name" placeholder="请输入项目总金额"></el-input>
                </el-form-item>

                <el-form-item label="融资额度">
                    <el-input v-model="form.name" placeholder="请输入融资额度"></el-input>
                </el-form-item>

                <el-form-item label="年化利率">
                    <el-input v-model="form.name" placeholder="请输入年化利率"></el-input>
                </el-form-item>

                <div class="plugins-tips">
                    费用信息
                </div>
                <el-row :gutter="20">
                    <el-col :span="7">
                        <el-form-item label="融资额度">
                            <span>10000元</span>
                        </el-form-item>
                        <el-form-item label="融资比例">
                            <span>67%</span>
                        </el-form-item>
                        <el-form-item label="预估期限">
                            <span>7天</span>
                        </el-form-item>
                        <el-form-item label="年化利率">
                            <span>42%</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="预估利率">
                            <span>4572元</span>
                        </el-form-item>
                        <el-form-item label="平台手续费">
                            <span>3000元</span>
                        </el-form-item>
                        <el-form-item label="提现手续费">
                            <span>12.67</span>
                        </el-form-item>
                        <el-form-item label="总计">
                            <span>7521元</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>

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

        <!-- 审核提示框 -->
        <el-dialog title="提示" :visible.sync="auditVisible" width="300px" center>
            <div class="del-dialog-cnt">是否确定审核通过？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="auditVisible = false">取 消</el-button>
                <el-button type="primary" @click="auditRow( auditData.id )">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 驳回提示框 -->
        <el-dialog title="提示" :visible.sync="cancelVisible" width="300px" center>
            <div class="del-dialog-cnt">是否确定驳回？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelVisible = false">取 消</el-button>
                <el-button type="primary" @click="cancelRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                merchant_id: 0,
                url: this.apiUrl + '1320/page',
                url_operate: this.apiUrl + '1320/approval',
                tableData: [],
                cur_page: 1,
                pageSize: 10,
                total: 0,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                itemVisible: false,
                editVisible: false,
                delVisible: false,
                auditVisible: false,
                cancelVisible: false,
                auditData: {},
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
            viewItem(index, row) {
                this.itemVisible = true
            },
            merchantChange(index) {
                this.merchant_id = index
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                this.$axios.get(this.url + '?pageNumber=' + this.cur_page + '&pageSize=' + this.pageSize, {headers:{'admin-auth-token': localStorage.getItem('ms_token').toString()}} ).then((res) => {
                    this.tableData = res.data.rows;
                    this.total = res.data.records
                    for( var key in this.tableData ) {
                        this.tableData[key].sequence = ++key + ( this.cur_page - 1 ) * this.pageSize
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
            handleAudit(index, row) {
                this.idx = index;
                this.auditData = this.tableData[index]
                this.auditVisible = true;
            },
            auditRow(id){
                var params = new URLSearchParams()
                params.append('id', id)
                this.$axios.post(this.url_operate, params, {headers:{'admin-auth-token': localStorage.getItem('ms_token').toString()}} ).then((res) => {
                    if( res['data']['retCode'] == '1' ) {
                        this.editVisible = false;
                        this.$message.success(`审核成功`);
                    } else {
                        if( res['data']['retMsg'] != '' ) {
                            this.$message.error(`审核失败：` + res['data']['retMsg']);
                        } else {
                            this.$message.error(`审核失败：未知错误`);
                        }
                    }
                })


                this.tableData.splice(this.idx, 1);
                this.$message.success('审核成功');
                this.auditVisible = false;
            },

            cancelAudit(index, row) {
                this.idx = index;
                this.cancelVisible = true;
            },
            cancelRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('驳回成功');
                this.cancelVisible = false;
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
