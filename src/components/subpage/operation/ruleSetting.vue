<!-- 促销规则设置 -->
<template>
    <div class="container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="促销活动设置" name="first">
                <div class="top clearfix">
                    <div class="tag">
                        <el-tag type="warning">首次投标奖励</el-tag>
                    </div>
                    <i class="i-line"></i>
                    <div class="right-content">
                        <el-form :model="param" label-width="80px">
                            <el-form-item label="活动名称">
                                <el-input v-model="param.name"></el-input>
                            </el-form-item>
                            <el-form-item label="活动时间">
                                <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期" v-model="param.date1" style="width: 100%;"></el-date-picker>
                                </el-col>
                                <el-col class="line" :span="2">-</el-col>
                                <el-col :span="11">
                                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="param.date2" style="width: 100%;"></el-time-picker>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="邀请好友设置" name="second">
                
            </el-tab-pane>
        </el-tabs>        
    </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first',
        param: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      };
    },
    components:{
        
    },
    methods: {
        handleClick(tab, event) {
        // console.log(tab, event);
        console.log('切换了')
        },        
    }
  };
</script>
<style scoped lang="scss">
.i-line{
    display: block;
    width: 100%;
    margin: 15px auto;
    height: 1px;
    background: rgba(225,225,225,1)
}
.tag{
    margin-bottom: 15px;
}
.right-content{
    // margin-left: 80px;
    font-size: 14px;
}
</style>
