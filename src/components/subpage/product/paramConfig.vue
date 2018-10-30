<!-- 参数配置 -->
<template>
    <div class="container" id="topicCheck">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="出借设置" name="first">
                
            </el-tab-pane>
            <el-tab-pane label="借款设置" name="second">
                
            </el-tab-pane>
            <el-tab-pane label="平台费用设置" name="three">
                
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first',
      }
    },
    computed: {},
    methods: {
        handleClick(tab, event) {
            console.log('切换了')
        }
    }
  };
</script>
<style scoped lang="scss">

</style>
