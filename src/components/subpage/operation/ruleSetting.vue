<!-- 促销规则设置 -->
<template>
    <div class="container" id="ruleSetting">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="促销活动设置" name="first">
                <div class="item-tab clearfix">
                    <div class="tag">
                        <el-tag type="warning">首次投标奖励</el-tag>
                    </div>
                    <i class="i-line"></i>
                    <div class="right-content">
                        <el-form :inline="true" :model="param" label-width="120px">
                            <el-form-item label="首次投标奖励：">
                                <el-input
                                placeholder="请输入内容"
                                prefix-icon="el-icon-plus"
                                v-model="param.name">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                            <span class="label-title c9">投标金额的百分比</span>
                            <el-form-item label="">
                                <el-input
                                placeholder="请输入内容"
                                v-model="param.name">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                            <span class="label-title c9">固定金额</span>
                        </el-form>
                        <el-form :inline="true" :model="param" label-width="120px">
                            <el-form-item label="奖励上线：">
                                <el-input
                                placeholder="请输入内容"
                                v-model="param.name">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>                            
                        </el-form>
                        <el-form :inline="true" :model="param" label-width="120px">
                            <el-form-item label="活动时间：">
                                <el-date-picker
                                v-model="param.date"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>                            
                        </el-form>
                    </div>
                </div>
                <div class="item-tab clearfix">
                    <div class="tag">
                        <el-tag type="warning">投标金额抵现金</el-tag>
                    </div>
                    <i class="i-line"></i>
                    <div class="tag">
                        <el-tag>惠享</el-tag>
                    </div>
                    <div class="right-content">
                        <el-form :inline="true" :model="param" label-width="120px">
                            <el-form-item label="促销利率：">
                                <el-input
                                placeholder="请输入内容"
                                prefix-icon="el-icon-plus"
                                v-model="param.name">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>                            
                        </el-form>
                        <el-form :inline="true" :model="param" label-width="120px">
                            <el-form-item label="投标金额：">
                                <el-input
                                placeholder="请输入内容"
                                v-model="param.name">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                            <span style="line-height: 32px; padding-right: 10px;" class="c9">至</span>
                            <el-form-item label="">
                                <el-input
                                placeholder="请输入内容"
                                v-model="param.name">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>                           
                        </el-form>
                        <el-form :inline="true" :model="param" label-width="120px">
                            <el-form-item label="活动时间：">
                                <el-date-picker
                                v-model="param.date"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>                            
                        </el-form>
                        <el-form :inline="true" :model="param" label-width="120px">
                            <el-form-item label="参与次数：">
                                <el-input
                                placeholder="请输入内容"
                                v-model="param.name"></el-input>
                            </el-form-item>
                            <span class="label-title c9">每位用户限制参与次数</span>
                        </el-form>
                    </div>
                    <div class="tag">
                        <el-tag>企宝</el-tag>
                    </div>
                    <div class="right-content">
                        <el-form :inline="true" :model="param" label-width="120px">
                            <el-form-item label="促销利率：">
                                <el-input
                                placeholder="请输入内容"
                                prefix-icon="el-icon-plus"
                                v-model="param.name">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>                            
                        </el-form>
                        <el-form :inline="true" :model="param" label-width="120px">
                            <el-form-item label="投标金额：">
                                <el-input
                                placeholder="请输入内容"
                                v-model="param.name">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                            <span style="line-height: 32px; padding-right: 10px;" class="c9">至</span>
                            <el-form-item label="">
                                <el-input
                                placeholder="请输入内容"
                                v-model="param.name">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>                           
                        </el-form>
                        <el-form :inline="true" :model="param" label-width="120px">
                            <el-form-item label="活动时间：">
                                <el-date-picker
                                v-model="param.date"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>                            
                        </el-form>
                        <el-form :inline="true" :model="param" label-width="120px">
                            <el-form-item label="参与次数：">
                                <el-input
                                placeholder="请输入内容"
                                v-model="param.name"></el-input>
                            </el-form-item>
                            <span class="label-title c9">每位用户限制参与次数</span>
                        </el-form>
                    </div>
                </div>
                <div class="btn-container">
                    <el-button type="info">重置</el-button>
                    <el-button type="success">保存</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="邀请好友设置" name="second">
                <div class="item-tab clearfix">
                    <div class="tag">
                        <el-tag type="warning">邀请好友奖励设置</el-tag>
                    </div>
                    <i class="i-line"></i>
                    <div class="right-content">
                        <el-form :inline="true" :model="param" label-width="120px" class="radio-form">
                            <el-form-item label="奖励模式：">
                            <el-radio-group v-model="param.name">
                                <el-radio label="投标后发放"></el-radio>
                                <el-radio label="注册成功发放"></el-radio>
                            </el-radio-group>
                            </el-form-item>
                        </el-form>
                        <el-form :inline="true" :model="param" label-width="120px">
                            <el-form-item label="邀请奖励：">
                                <el-input
                                placeholder="请输入内容"
                                prefix-icon="el-icon-plus"
                                v-model="param.name">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                            <span class="label-title c9">被邀请人投标金额的百分比；</span>
                            <el-form-item label="">
                                <el-input
                                placeholder="请输入内容"
                                v-model="param.name">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                            <span class="label-title c9">固定金额</span>
                        </el-form>
                        <el-form :inline="true" :model="param" label-width="120px">
                            <el-form-item label="奖励上线：">
                                <el-input
                                placeholder="请输入内容"
                                v-model="param.name">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>                            
                        </el-form>
                        <el-form :inline="true" :model="param" label-width="120px">
                            <el-form-item label="活动时间：">
                                <el-date-picker
                                v-model="param.date"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>                            
                        </el-form>
                    </div>
                </div>
                <div class="btn-container">
                    <el-button type="info">重置</el-button>
                    <el-button type="success">保存</el-button>
                </div>
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
          date: ["", ""],
        }
      };
    },
    components:{
        
    },
    methods: {
        handleClick(tab, event) {
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
.item-tab{
    margin-bottom: 15px;
}
.right-content{
    font-size: 14px;
    .label-title{
        line-height: 32px;
        display: inline-block;
        margin-right: 80px;
    }
}
.btn-container{
    margin-top: 15px;
    text-align: center;
}
</style>
