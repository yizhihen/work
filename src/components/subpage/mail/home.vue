<template>
    <div class="home-container">
        <div class="mail-top">
            <div class="align-left">
                <el-select v-model="value" placeholder="请选择操作" class="mail-type">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-tag class="mail-btn" size="medium" type="warning">收件箱</el-tag>
                <el-tag class="mail-btn" size="medium" type="info">发件箱</el-tag>
                <el-tag class="mail-btn" size="medium" type="info">草稿箱</el-tag>
                <el-tag class="mail-btn" size="medium" type="info">文件</el-tag>
                <span class="slide"></span>
                <el-tag>待处理</el-tag>
                <el-tag>已加星</el-tag>
            </div>
            <div class="align-right">
                <el-input
                    placeholder="输入要搜索的内容"
                    prefix-icon="el-icon-search"
                    v-model="form.search">
                </el-input>
            </div>                
        </div>
        <div class="mail-table">
            <el-table
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                @row-click="rowClick"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                label="全选"
                width="55">
                </el-table-column>
                <el-table-column
                label="发件人"
                align="center"
                width="120">                    
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" placement="top-start">
                        <div slot="content">to: 谢霆锋，董卿，崔永元，老毕，Ashley，Anna</div>
                        <span>{{ scope.row.name }}</span>
                    </el-tooltip>                        
                </template>
                </el-table-column>
                <el-table-column
                prop="title"
                width="200"
                show-overflow-tooltip
                label="邮件主题">
                </el-table-column>
                <el-table-column
                prop="address"
                label="邮件内容"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="date"
                label="接收时间"
                align="center"
                width="200"
                show-overflow-tooltip>
                </el-table-column>                    
            </el-table>
        </div>
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
</template>

<script>
    export default {
        name: 'baseform',
        data: function(){
            return {
                activeName: 'second',
                form: {
                    search: "",
                    check: false
                },
                options: [{
                    value: 1,
                    label: '标记为已读'
                    }, {
                    value: 2,
                    label: '批量删除'
                    }, {
                    value: 3,
                    label: '批量加星'
                    }, {
                    value: 4,
                    label: '标记为待处理'
                    }
                ],
                value: '',
                tableData3: [{
                    title: "关于合规检查的108条清单",
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '以下是金融办的108条合规清单，请大家认真研究',
                    isread: false
                    }, {
                    title: "关于合规检查的108条清单",
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '以下是金融办的108条合规清单，请大家认真研究',
                    isread: false
                    }, {
                    title: "关于合规检查的108条清单",
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '以下是金融办的108条合规清单，请大家认真研究',
                    isread: true
                    }, {
                    title: "关于合规检查的108条清单",
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '以下是金融办的108条合规清单，请大家认真研究',
                    isread: true
                    }, {
                    title: "关于合规检查的108条清单",
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '以下是金融办的108条合规清单，请大家认真研究',
                    isread: true
                    }, {
                    title: "关于合规检查的108条清单",
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '以下是金融办的108条合规清单，请大家认真研究以下是金融办的108条合规清单，请大家认真研究以下是金融办的108条合规清单，请大家认真研究以下是金融办的108条合规清单，请大家认真研究以下是金融办的108条合规清单，请大家认真研究',
                    isread: false
                    }, {
                    title: "关于合规检查的108条清单",
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '以下是金融办的108条合规清单，请大家认真研究',
                    isread: false
                }],
                multipleSelection: [],                
                currentPage4: 4
            }
        },
        methods: {
            onSubmit() {
                this.$message.success('提交成功！');
            },
             handleClick(tab, event) {
                console.log(tab, event);
            },
            toggleSelection(rows) {
                if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
                } else {
                this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            rowClick(val){
                let _self = this
                _self.$emit('rowclick',val)
            }
        }
    }
</script>
<style scoped lang="scss">
    .c9{
        color: #C9C9C9 !important;
    }
    .slide{
        border-bottom: 1px solid rgba(225,225,225,1);
    }
    .mail-top{
        display: flex;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(225,225,225,1);
        .align-left{
            width: 85%;
            .mail-type{
                margin: 0 10px;
                width: 130px;
            }
            .mail-btn{
                cursor: pointer;
                font-weight: 600;
            }
            .slide{
                display: inline-block;
                width: 1px;
                height: 18px;
                background: #999;
                margin: 0 10px;
                vertical-align: sub;
            }
        }
    }
    .page-container{
        text-align: center;
        padding: 30px 0 20px;
    }
</style>
