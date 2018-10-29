<!-- 学院文章管理 -->
<template>
    <div class="container" id="articleManage">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="文章管理" name="first">
                <el-form :inline="true" :model="arg" class="demo-form-inline">
                    <el-form-item label="分类：">
                        <el-select v-model="arg.class" placeholder="">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="新闻" value="1"></el-option>
                        <el-option label="资讯" value="2"></el-option>
                        <el-option label="教学" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-select v-model="arg.state" placeholder="">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="已发布" value="1"></el-option>
                        <el-option label="已下架" value="2"></el-option>
                        <el-option label="草稿" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-table
                :data="list"
                style="width: 100%">
                    <el-table-column
                        type="index"
                        label="序列"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="class"
                        label="分类"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        label="标题"                        
                        show-overflow-tooltip
                        width="240">
                        <template slot-scope="scope">
                            <span class="pointer ellipsis" @click="viewDetail(scope.row)">{{scope.row.title}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="内容">
                        <template slot-scope="scope">
                            <span class="pointer ellipsis" @click="viewDetail(scope.row)">{{scope.row.content}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="状态"
                        width="150">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.state == 1">已发布</el-tag>
                            <el-tag type="danger" v-if="scope.row.state == 2">已下架</el-tag>
                            <el-tag type="info" v-if="scope.row.state == 3">草稿</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width="100"
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" plain v-if="scope.row.state == 1" @click="del(scope.row,scope.$index)">下架</el-button>
                            <el-button type="primary" plain v-else @click="publish(scope.row)">发布</el-button>
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
            <el-tab-pane label="文章发布" name="second">
                <el-form :model="param" label-width="60px">
                    <el-form-item label="标题">
                        <el-input v-model="param.title"></el-input>
                    </el-form-item>
                    <el-form-item label="分类">
                        <el-radio-group v-model="param.class">
                            <el-radio label="新闻"></el-radio>
                            <el-radio label="资讯"></el-radio>
                            <el-radio label="教学"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div class="ue-container clearfix">
                    <p class="title fl">内容</p>
                    <div class="editor">
                        <vue-editor :defaultMsg="param.content" :myconfig="config" :id="ue" ref="ue"></vue-editor>
                    </div>
                </div>
                <div class="radio-container clearfix">
                    <p class="title fl">视频</p>
                    <el-upload
                    class="radio-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <!-- <img v-if="imageUrl" :src="scope.row.icon" class="avatar"> -->
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>                
                <div class="btn-container">
                    <el-button type="" @click="submit">保存</el-button>
                    <el-button type="" @click="activeName = 'first'">取消</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- viewDetail 弹框 -->
        <el-dialog
            :title="currentItem.title"
            :visible.sync="boo.showDetail"
            width="60%">
            <span>{{currentItem.content}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="boo.showDetail = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import DATA from 'static/json/operation/article.json'; //当前显示的对话
import VueEditor from '../../common/ue.vue'
  export default {
    data() {
      return {
        ue: 'ue',
        config: { //富文本配置
            initialFrameWidth: '100%',
            initialFrameHeight: 400,
        },
        activeName: 'second',
        list: DATA.list,
        currentPage4: 4,
        // 弹窗数据
        currentItem: {
            title: "",
            content: "", 
            class: ""
        },//当前显示的具体公告
        boo: {
            showDetail: false
        },
        arg: {
            class: "",
            state: ""
        },
        param: {
            title: "",  //标题
            content: "",// 内容
            class: "新闻", //分类
            radio: "", //视频路径
        }
      };
    },
    components:{
        VueEditor
    },
    methods: {
        handleClick(tab, event) {
        // console.log(tab, event);
        console.log('切换了')
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        viewDetail(val){
            this.boo.showDetail = true
            this.currentItem = val
        },
        // 发布文章
        publish(val){
            console.log(val)
            this.$message.success(`操作成功`);  
            val.state = 1
        },
        // 删除文章
        del(val,index){
            this.$message.success(`操作成功`);
            val.state = 2
        },
        // 上传视频
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
        },
        // 保存文章
        submit(){
            this.param.content = this.$refs.ue.getUEContent()
            console.log(this.param)
        }
    }
  };
</script>
<style scoped lang="scss">
.pointer{
    cursor: pointer;
}
.page-container{
    text-align: center;
    padding: 30px 0 20px;
}
.ue-container{
    margin-bottom: 18px;
    .title{
        width: 60px;
        text-align: right;
        font-size: 14px;
        color: #666;
        line-height: 32px;
        padding-right: 12px;
        box-sizing: border-box;        
    }
    .editor{
        margin-left: 60px;
        box-sizing: border-box;
        padding-right: 2px;
    }
}
.radio-container{
    .title{
        width: 60px;
        text-align: right;
        font-size: 14px;
        color: #666;
        line-height: 32px;
        padding-right: 12px;
        box-sizing: border-box;        
    }
    .radio-uploader{
        margin-left: 60px;
        box-sizing: border-box;
        padding-right: 2px;
        .el-upload--text{
            width: 120px;
        }
    }
}
.btn-container{
    padding: 15px 0;
    text-align: center;
}
</style>
