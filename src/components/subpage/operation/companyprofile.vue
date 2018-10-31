<!-- 公司介绍 -->
<template>
    <div class="container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item,index) in tablist" :label="item.title" :name="item.name" :key="index">
                <div v-show="!boo.showEdit">
                    <div class="article-container">
                        <h4 class="title">{{currentItem.title}}</h4>
                        <p class="info">{{currentItem.content}}</p>
                    </div>
                    <div class="btn-container">
                        <el-button type="primary" @click="boo.showEdit = true">编辑</el-button>
                        <el-button type="danger">保存</el-button>
                    </div>
                </div>
                <div v-show="boo.showEdit">
                    <el-form label-width="60px">
                        <el-form-item label="标题">
                            <el-input v-model="currentItem.title"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="ue-container clearfix">
                        <p class="title fl">内容</p>
                        <div class="editor">
                            <vue-editor :defaultMsg="currentItem.content" :myconfig="config" :id="item.name" :ref="item.name"></vue-editor>
                        </div>
                    </div>
                    <div class="btn-container">
                        <el-button type="" @click="submit(item.name)">保存</el-button>
                        <el-button type="" @click="boo.showEdit = false">取消</el-button>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>        
    </div>
</template>
<script>
    import VueEditor from '../../common/ue.vue'
    export default {
        data() {
        return {
                ue: 'ue',
                config: { //富文本配置
                    initialFrameWidth: '100%',
                    initialFrameHeight: 400,
                },
                activeName: 'first',
                other: {
                    activeName: 'first'
                },
                tablist: [
                    {title: "公司介绍", name: "first"},
                    {title: "Hi投大事记", name: "second"},
                    {title: "信息披露", name: "three"}
                ],
                boo: {
                    showEdit: false
                },
                currentItem: {
                    title: "公司介绍",
                    content: "公司介绍详情"
                },
            };
        },
        components:{
            VueEditor
        },
        methods: {
            handleClick(tab, event) {
                let _self= this
                if (_self.other.activeName == tab.name) return
                _self.other.activeName = tab.name
                _self.boo.showEdit = false
            },
            // 保存公告
            submit(val){
                switch (val){
                    case 'first':
                        this.currentItem.content = this.$refs.first[0].getUEContentTxt()
                        break;
                    case 'second':
                        this.currentItem.content = this.$refs.second[0].getUEContentTxt()
                        break;
                    case 'three':
                        this.currentItem.content = this.$refs.three[0].getUEContentTxt()
                        break;
                }
                this.boo.showEdit = false
            }
        }
    };
</script>
<style scoped lang="scss">
.article-container{
    font-size: 14px;
    color: #666;
    line-height: 24px;
    min-height: 400px;
    .title{
        text-align: center;
        font-size: 18px;
        margin-bottom: 15px;
    }
}
.ue-container{
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
.btn-container{
    padding: 15px 0;
    text-align: center;
}
</style>
