<template>
    <div class="container" id="topicSetting">
        <div class="top clearfix">
            <div class="tag">
                <el-tag type="warning">时间设置</el-tag>
            </div>
            <el-form class="right-content" ref="form" :inline="true" :model="param" label-width="120px">
                <el-form-item label="发布时间间隔：">
                    <el-input v-model="param.PubInterval">
                        <template slot="append">分钟</template>
                    </el-input>
                </el-form-item>                
                <el-form-item>
                    <el-button>保存</el-button>
                </el-form-item>
            </el-form>
            <el-form class="right-content" ref="form" :inline="true" :model="param" label-width="120px">                
                <el-form-item label="禁言时间限制：">
                    <el-input v-model="param.PubInterval">                        
                        <template slot="append">小时</template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button>保存</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="bottom clearfix">
            <div class="tag"><el-tag type="warning">分类设置</el-tag></div>
            <div class="right-content">
                <el-table
                    ref="singleTable"
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                    type="index"
                    label="序列"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    label="图标"
                    align="center"
                    width="120">
                        <template slot-scope="scope">
                            <img v-if="scope.row.isEditing != 1" class="response-img icon-img" :src="scope.row.icon" alt="">
                            <el-upload
                            v-else
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <!-- <img v-if="imageUrl" :src="scope.row.icon" class="avatar"> -->
                            <i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="分类名称"
                        width="145">
                        <template slot-scope="scope">
                            <span v-if="scope.row.isEditing != 1" v-text="scope.row.class"></span>
                            <el-input
                            v-else
                            placeholder="请输入分类名称"
                            v-model="scope.row.class"
                            clearable>
                            </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="分类介绍">
                        <template slot-scope="scope">
                            <span v-if="scope.row.isEditing != 1" v-text="scope.row.desc"></span>                            
                            <el-input
                            v-else
                            type="textarea"
                            :autosize="true"
                            :rows="2"
                            placeholder="请输入分类介绍"
                            v-model="scope.row.desc">
                            </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="发帖限制">
                        <template slot-scope="scope">
                            <span v-if="scope.row.isEditing != 1">{{scope.row.limit | limit}}</span>
                            <el-select multiple v-else v-model="scope.row.limit" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name"
                                >
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        width="150"
                        label="操作">
                        <template slot-scope="scope">
                            <div v-if="scope.row.isEditing != 1">
                                <el-button type="primary" plain @click="scope.row.isEditing = 1">编辑</el-button>
                                <el-button type="info" plain>禁用</el-button>
                            </div>
                            <div v-else>
                                <el-button type="success" plain @click="scope.row.isEditing = 0">保存</el-button>
                                <el-button type="danger" plain @click="remove(scope.$index)">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="btn-container">
                    <el-button @click="add">添加分类</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DATA from 'static/json/operation/topic.json'; //当前列表
    export default {
        name: 'new',
        data(){
            return {
                param: {
                    PubInterval: '',//发布时间间隔
                },
                tableData: DATA.list,
                options: DATA.userList,
            }
        },
        components: {
            
        },
        filters: {
            limit(val){
                val = typeof val == 'string' ? val : val.toString()
                return val.length == 0 ? '全部' : val
            }
        },
        methods: {
            add(){
                let _self = this
                let item = {
                    isEditing: 1,
                    icon: "http://img5.imgtn.bdimg.com/it/u=817624264,3318856549&fm=200&gp=0.jpg",
                    class: "",
                    desc: "",
                    limit: ""
                }
                _self.tableData.push(item)
            },
            remove(index){
                this.tableData.splice(index,1)
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>
<style scoped lang="scss">
    .tag{
        margin-bottom: 18px;
    }
   .right-content{
       margin-left: 80px;
   }
   .icon-img{
       border-radius: 50%;
       width: 65%;
       height: 65%;
       margin: auto
   }
   .btn-container{
       padding: 18px 0 20px;
   }
</style>
