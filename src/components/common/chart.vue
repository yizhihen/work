<template>
    <div id="vue_charting" class="msg-container">
        <div class="align-left fl">
            <div class="header-msg">{{user.name}}</div>
            <div class="search">
                <el-autocomplete placeholder="搜索" class="input-with-select" prefix-icon="el-icon-search"
                    :fetch-suggestions="querySearch"
                    :trigger-on-focus="false"
                    @select="handleSelect"
                >
                </el-autocomplete>
            </div>
            <el-row class="tab">
                <el-col :span="12">
                    <div class="grid-content">
                        <span @click="boo.showchart = true" :class="['icon', boo.showchart ? 'active': '','iconfont','icon-xiaoxi']"></span>
                    </div>
                </el-col>
                <el-col :span="12">                        
                    <div class="grid-content">
                        <span @click="boo.showchart = false" :class="['icon', !boo.showchart ? 'active': '','iconfont','icon-tongxunlu']"></span>
                    </div>
                </el-col>
            </el-row>
            <div class="msg-list">
                <el-row v-if="boo.showchart" class="chart-list">
                    <vue-scroll :ops="ops">
                        <el-col v-for="(item,index) in chart" :key="index" :span="24" :class="['chart-item',currentChart.id == item.id ? 'active' : '']">
                            <div class="grid-content bg-purple-dark" @click="selectCurrent(item)">
                                <div class="avatar">
                                    <img class="img" :src="item.avatar" alt="">
                                </div>
                                <div class="info">
                                    <h5 class="nickname ellipsis">{{item.name}}</h5>
                                    <p class="msg ellipsis">{{item.msg}}</p>
                                </div>
                            </div>
                        </el-col>
                    </vue-scroll>
                </el-row>
                <el-row class="chart-list">
                    <vue-scroll :ops="ops">                            
                        <el-col :span="24" v-for="(item,index) in contact" class="vue-scope" :key="index">
                            <div class="grid-content bg-purple-dark">
                                <h4 class="contact_title ellipsis">{{item.header}}</h4>
                            </div>
                            <el-row v-for="(i,idx) in item.child" :key="idx">
                                <el-col :span="24" :class="['chart-item',currentChart.id == i.id ? 'active' : '']">
                                    <div class="grid-content bg-purple-dark" @click="selectCurrent(i)">
                                        <div class="avatar">
                                            <img class="img lazy" :src="i.avatar" alt="">
                                        </div>
                                        <div class="info">
                                            <h5 class="nickname ellipsis vue-binding">{{i.name}}</h5>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </vue-scroll>
                </el-row>
            </div>                
        </div>
        <div class="align-right">
            <div class="charting-head">
                <div v-if="currentChart.id == '' ? false : true">
                    <span class="name fl ellipsis">{{currentChart.name}}</span>
                    <p class="sign ellipsis">{{currentChart.sign}}</p>
                </div>                    
            </div>
            <div class="charting_box">
                <div class="viod" v-if="currentChart.id == '' ? true : false">
                    <i class="viod-icon iconfont icon-liaotianjilu"></i>
                    <p class="viod-info">暂未选择聊天</p>
                </div>
                <div  v-else class="nomal">
                    <vue-scroll :ops="ops" ref="vs">
                        <div class="charting-item" v-for="(item,index) in dialogList" :key="index" :id="'d' + (index + 1)">
                            <!-- 发送消息的样式 -->
                            <div class="send" v-if="user.id == item.id">
                                <img class="avatar fr" :src="item.avatar" alt="">
                                <p class="msg bubble right" v-html="RongIMLib.RongIMEmoji.symbolToHTML(item.msg)"></p>
                            </div>
                            <!-- 接收消息的样式 -->
                            <div class="receive bubble" v-else>
                                <img class="avatar fl" :src="item.avatar" alt="">
                                <p class="msg bubble left" v-html="RongIMLib.RongIMEmoji.symbolToHTML(item.msg)"></p>
                            </div>
                        </div>
                    </vue-scroll>
                </div>
            </div>
            <div class="charting-foot" v-if="currentChart.id == '' ? false : true">
                <div class="tool-bar">
                    <el-popover
                        placement="top-start"
                        width="400"
                        trigger="click">
                        <el-row>
                            <el-col :span="2" v-for="(item,index) in emojiList" :key="index" >
                                <div class="emoji-item" v-html="RongIMLib.RongIMEmoji.emojiToHTML(item.emoji)" @click="selectEmoji(item)"></div>
                            </el-col>
                        </el-row>
                        <span slot="reference" class="bar-item iconfont icon-biaoqing"></span>
                    </el-popover>
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-change="handleRemove">
                        <span class="bar-item iconfont icon-icon--"></span>
                    </el-upload>                        
                </div>
                <vue-scroll :ops="ops_content">
                    <div class="charting-content">
                        <pre class="charting-textarea" ref="sendmsg"></pre>
                    </div>
                </vue-scroll>
                <div class="action">
                    <el-button @click="send($event)">发送</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Chart from 'static/json/chart.json'; //联系人及列表
    import Dialog from 'static/json/dialog.json'; //当前显示的对话
    export default {
        name: 'message',
        data(){
            return {
                config_emoji: {
                    size: 24,
                    lang: "zh",
                    // 扩展表情
                    extension: {
                        dataSource: {
                            u1F914: {
                                en: "thinking face", // 英文名称
                                zh: "思考", // 中文名称
                                tag: "🤔", // 原生 Emoji
                                position: "0 0" // 所在背景图位置坐标
                            }
                        },
                        // 新增 Emoji 背景图 url
                        url: "//cdn.ronghub.com/thinking-face.png"
                    }
                },
                boo: {
                    showchart: true,
                },
                ops: {
                    bar: {
                        background: '#40474F'
                    },
                },
                ops_content: {
                    bar: {
                        background: '#C3C3C3',
                        keepShow: true,
                    },
                },
                user: {
                    name: "鸡蛋哥",
                    id: 0,
                    avatar: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3054730122,3618781773&fm=27&gp=0.jpg",
                    sign: "什么东西限制了想象"
                },//当前用户信息
                param: {
                    id: 0, //当前用户的Id
                    msg: "",
                    name: "鸡蛋哥", //当前用户的昵称
                    avatar: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3054730122,3618781773&fm=27&gp=0.jpg",//当前用户的头像

                },
                restaurants: [], //虚拟下拉列表数组
                contact: [], //联系人 + 分组
                contactList: [], //联系人列表
                chart: [], //聊天人列表
                dialogList: [], //当前对话列表
                emojiList: [], //表情列表
                currentChart: {id:""},//当前聊天对象
                RongIMLib: RongIMLib, //初始化融云LIB
            }      
        },
        created(){
            this.initSDK();
        },
        mounted(){
            let _self = this
            _self.contact = Chart.contact
            _self.chart = Chart.chart
            _self.dialogList = Dialog.data
            _self.restaurants = _self.loadAll();
        },
        methods: {
            //初始化SDK
            initSDK(){
                let _self = this
                let resp = RL_YTX.init('用户的appid'); 
                if(170002== resp.code){
                //缺少必要参数，详情见msg参数
                //用户逻辑处理
                }else if(174001 == resp.code){
                //不支持HTML5，关闭页面//用户逻辑处理
                }else if(200 == resp.code){
                    //初始化成功
                    //用户逻辑处理
                    //判断不支持的功能，屏蔽页面展示
                    let unsupport = resp.unsupport;
                }
                //SDK关闭日志输出
                RL_YTX.setLogClose()
                //表情处理
                RongIMLib.RongIMEmoji.init(_self.config_emoji)
                _self.emojiList = RongIMLib.RongIMEmoji.list
            },
            //登录函数
            login(){
                //账号登录参数设置
                let loginBuilder = new RL_YTX.LoginBuilder();
                //登录类型 1账号登录，3voip账号密码登录
                loginBuilder.setType(1);
                //设置用户名
                loginBuilder.setUserName('用户登录名');
                //type值为1时，密码可以不赋值
                loginBuilder.setPwd();
                //设置sig
                loginBuilder.setSig(sig);
                //设置时间戳
                loginBuilder.setTimestamp(yyyyMMddHHmmss);
                //执行用户登录
                RL_YTX.login(loginBuilder, function(obj){
                    //登录成功回调
                    //注册接收消息事件监听
                    RL_YTX.onMsgReceiveListener(function(obj){
                    //收到push消息或者离线消息或判断输入状态//如果obj.msgType==12  判断obj.msgDomainn的值//obj.msgDomain 0 无输入状态  1 正在输入  2 正在录音
                    });
                    //注册群组通知事件监听
                    RL_YTX.onNoticeReceiveListener(function(obj){
                        //收到群组通知});
                        RL_YTX.onConnectStateChangeLisenter(function(obj){
                            //连接状态变更
                            //变更状态 1 断开连接 2 重连中 3 重连成功 4 被踢下线 5 断开连接，需重新登录
                            obj.code;
                            // 断线需要人工重连
                        });}, function(obj){
                            //登录失败方法回调
                        }
                    )
                })
            },
            //退出函数
            out(){
                RL_YTX.logout(function(){
                //登出成功处理
                }, function(obj){
                //登出失败处理
                }); 
            },
            //发送文本
            sendtext(){
                //新建消息体对象
                let obj = new RL_YTX.MsgBuilder();
                //设置自定义消息id
                obj.setId(msgid);
                //设置发送的文本内容
                obj.setText(text);
                //设置发送的消息类型1:文本消息 4:图片消息 6:压缩文件 7:非压缩文件
                //发送非文本消息时，text字段将被忽略，发送文本消息时 file字段将被忽略
                obj.setType(1);
                //设置接收者
                obj.setReceiver('john的id'); 
                RL_YTX.sendMsg(obj, function(){
                //发送消息成功
                //处理用户逻辑，通知页面
                }, function(obj){//失败
                //发送消息失败
                //处理用户逻辑，通知页面刷新，展现重发按钮
                })
            },
            //发送图片消息
            sendpic(){
                //新建消息体对象
                let obj = new RL_YTX.MsgBuilder();
                //设置自定义消息id
                obj.setId(msgid);
                //假设页面存在一个id为file的<input type=”file”>元素 
                //获取图片或附件对象
                let file = document.getElementById("file").files[0];
                //设置图片或附件对象
                obj.setFile(file);
                //设置发送的消息类型1:文本消息 4:图片消息 6:压缩文件 7:非压缩文件
                //发送非文本消息时，text字段将被忽略，发送文本消息时 file字段将被忽略
                obj.setType(4);
                //设置接收者
                obj.setReceiver('john的id'); 
                RL_YTX.sendMsg(obj, function(){
                //发送消息成功
                //处理用户逻辑，通知页面
                }, function(obj){//失败
                //发送消息失败
                //处理用户逻辑，通知页面刷新，展现重发按钮
                }, function(sended, total){
                //发送图片或附件时的进度条
                //如果发送文本消息，可以不传该参数
                }); 
            },
            //发送文件消息
            sendfile(){
                //新建消息体对象
                let obj = new RL_YTX.MsgBuilder();
                //设置自定义消息id
                obj.setId(msgid);
                //假设页面存在一个id为file的<input type=”file”>元素 
                //获取图片或附件对象
                let file = document.getElementById("file").files[0];
                //设置附件对象
                obj.setFile(file);
                //设置发送的消息类型1:文本消息 4:图片消息 6:压缩文件 7:非压缩文件
                //发送非文本消息时，text字段将被忽略，发送文本消息时 file字段将被忽略
                obj.setType('6或者7');
                //设置接收者
                obj.setReceiver('john的id');                
                RL_YTX.sendMsg(obj, function(){
                //发送消息成功
                //处理用户逻辑，通知页面
                }, function(obj){//失败
                //发送消息失败
                //处理用户逻辑，通知页面刷新，展现重发按钮
                }, function(sended, total){
                //发送图片或附件时的进度条
                //如果发送文本消息，可以不传该参数
                });
            },
            //用户发送自定义消息
            sendother(){
                //新建消息体对象
                var obj = new RL_YTX.MsgBuilder();
                //设置自定义消息id
                obj.setId(msgid);
                //设置接收者
                obj.setReceiver('john的id');
                //发送文本消息发自定义
                obj.setType(1);
                obj.setDomain('用户自定义消息');
                RL_YTX.sendMsg(obj, function(){
                //发送消息成功
                //处理用户逻辑，通知页面
                }, function(obj){//失败
                //发送消息失败
                //处理用户逻辑，通知页面刷新，展现重发按钮
                });
            },
            //用户当前状态判断
            userstate(){
                let result = IM.Do_boxCheck(bOn);
                if (result != null){
                // 发送消息至服务器
                if ("C"== result[3]){
                IM.EV_sendTextMsg(result[0], domain, result[2],false, IM._transfer);
                }}
            },
            //用户接收消息
            recivemsg(){
                //获取发送者为 
                let sender = obj.msgSender;
                //获取发送者昵称，如果不存在，使用账号代替
                let you_senderNickName = obj.senderNickName;
                let name = obj.msgSender;
                if(!!you_senderNickName){
                name = you_senderNickName;
                }
                let content_type = null;
                //获取消息版本号（是服务器的版本号）
                let version = obj.version;
                //获取消息发送时间
                let time = obj.msgDateCreated;
                //获取消息类型 
                //1:文本消息 2:语音消息4:图片消息6:文件
                let msgType = obj.msgType;
                if(1 == msgType || 0 == msgType){
                //文本消息，获取消息内容
                let you_msgContent = obj.msgContent;
                }else if(2 == msgType){
                //语音消息，获取语音文件url
                let url = obj.msgFileUrl;
                }else if(3 == msgType){
                //3：视频消息，获取视频url
                //语音消息，获取语音文件url
                let url = obj.msgFileUrl;
                }else if(4 == msgType){
                //图片消息 获取图片url
                let url = obj.msgFileUrl;
                }else{
                //后续还会支持(地理位置，视频，以及自定义消息等)
                }
                //通知前端更新页面
            },
            //离线消息
            offlinemsg(){
                //判断是否为群聊信息
                let b_isGroupMsg = ('g' == obj.msgReceiver.substr(0,1));
                //如果是群聊信息，发送者为msgSender字段，否则为msgReceiver字段
                let you_sender = (b_isGroupMsg) ? obj.msgReceiver : obj.msgSender;
                //获取发送者昵称，如果不存在，使用账号代替
                let you_senderNickName = obj.senderNickName;
                let name = obj.msgSender;
                if(!!you_senderNickName){name = you_senderNickName;}
                let content_type = null;
                //获取消息版本号
                let version = obj.version;
                //获取消息发送时间
                let time = obj.msgDateCreated;
                //获取消息类型 //1:文本消息 2:语音消息 3:视频消息4:图片消息5:位置消息  6:文件
                let msgType = obj.msgType;
                if(1 == msgType || 0 == msgType){
                    //文本消息，获取消息内容
                    let you_msgContent = obj.msgContent;
                }else if(2 == msgType){
                    //语音消息，获取语音文件url
                    let url = obj.msgFileUrl;
                }else if(3 == msgType){
                    //3：视频消息，获取视频url
                    //语音消息，获取语音文件url
                    let url = obj.msgFileUrl;
                }else if(4 == msgType){
                    //图片消息 获取图片url
                    let url = obj.msgFileUrl;
                }else{
                //后续还会支持(地理位置，视频，以及自定义消息等
                }
            },
            //搜索
            querySearch(queryString, cb) {
                let restaurants = this.restaurants;
                let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            //模糊匹配事件
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            //模糊匹配事件
            loadAll() {
                let _self = this
                let list = []
                _self.contactList = []
                _self.contact.filter((item,index)=>{
                    item.child.filter((i)=>{
                        _self.contactList.push(i)
                        list.push({
                            value: i.name,
                            id: i.id
                        })
                    })
                })
                return list;
            },
            //搜索后选择事件
            handleSelect(item) {
                console.log(item)
                let _self = this
                _self.contactList.filter((i,idx)=>{
                    if(i.id == item.id){
                        return _self.currentChart = i      
                    }
                })
            },
            //选择当前聊天人
            selectCurrent(item){
                console.log(item)
                let _self = this
                _self.currentChart = item
                _self.$nextTick(()=>{ 
                    _self.$refs['vs'].scrollIntoView(`#d${_self.dialogList.length}`)
                })                
            },
            //选择表情包
            selectEmoji(item){
                let _self = this
                _self.$refs['sendmsg'].innerText += RongIMLib.RongIMEmoji.emojiToSymbol(item.emoji)
            },
            //判断字符串是否为空
            isEmpty(str){
                str = str.replace(/[ ]/g,""); //去掉空格
                str = str.replace(/[\r\n]/g,""); //去掉换行
                if(typeof str == "undefined" || str == null || str == ""){
                    return true;
                }else{
                    return false;
                }
            },
            //消息发送
            send(e){
                let _self = this
                if(_self.isEmpty(_self.$refs['sendmsg'].innerText)) return _self.$refs['sendmsg'].innerText = ""
                _self.param = {
                    id: _self.user.id,
                    name: _self.user.name,
                    avatar: _self.user.avatar,
                    msg: _self.$refs['sendmsg'].innerText
                }
                _self.dialogList.push(_self.param)
                _self.$nextTick(()=>{
                    _self.$refs['vs'].scrollIntoView(`#d${_self.dialogList.length}`)
                    _self.$refs['sendmsg'].innerText = ""
                })
            },
            //文件上传类
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        }
    }
</script>
<style scoped lang="scss">
    *{
        box-sizing: border-box
    }
    .bubble{
        &::before,&::after{
            position: absolute;
            top: 14px;
            border: 6px solid transparent;
            content: " ";
        }
        &.right::after,&.left::before{
            border-left-width: 4px;
        }
        &.right::after{
            left: 100%;
            border-left-color: #FD570B;
        }
        &.left::before{
            left: -10px;
            border-right-color: #B2E281;
        }
    }
    .msg-container{
        max-width: 1000px;
        height: 650px;
        overflow: hidden;
        margin: auto;
        background: #fff;
        font-size: 14px;
        line-height: 20px;
    }
    .align-left{
        width: 280px;
        color: #fff;
        background: #2E3238;
        .header-msg{
            padding: 18px;
        }
        .search{
            width: 87%;
            margin: 0 auto 6px;
        }
        .tab{
            padding: 8px 0;
            text-align: center;
            border-bottom: 1px solid #24272c;
            .grid-content{
                position: relative;
                height: 25px;
                &:last-child::before{
                    content: "";
                    width: 1px;
                    height: 20px;
                    background: #24272c;
                    left: 0;
                    top: 0;
                    position: absolute;
                }
                .icon{
                    cursor: pointer;
                    opacity: .3;
                    transition: .2s;
                    font-size: 28px;
                    color: #fff;
                    vertical-align: middle;
                    &.active{
                        opacity: 1;
                        color: #FD570B;
                    }                    
                }
            }
        }
        .msg-list{         
            height: 512px;
        }
        .chart-list{         
            height: 512px;
            .chart-item{
                padding: 12px 18px 11px;
                border-bottom: 1px solid #292c33;
                // background: #2E3238;
                transition: .2s;
                &.active{
                    // background: #2e3641;
                    background: #54392d;
                }
                cursor: pointer;
                .avatar{
                    float: left;
                    margin-right: 10px;
                    .img{
                        display: block;
                        height: 40px;
                        width: 40px;
                        border-radius: 2px;
                        &.lazy{
                            width: 30px;
                            height: 30px;
                        }
                    }
                }
                .info{
                    font-size: 13px;
                    margin-left: 50px;
                    width: 194px;
                    .nickname{
                        line-height: 20px;
                        font-weight: 400;
                        font-size: 13px;
                        &.vue-binding{
                            line-height: 30px;
                        }
                    }
                    .msg{
                        color: #989898;
                    }
                }
            }            
            .vue-scope{
                .contact_title{
                    background: #292D32;
                    font-size: 14px;
                    color: #787b87;
                    font-weight: 400;
                    padding: 3px 18px;
                    width: 280px;
                }
            }
        }
    }
    .align-right{
        margin-left: 280px;
        color: #000;
        background: #fff;
        .charting-head{
            padding: 10px 0;
            margin: 0 20px;
            border-bottom: 1px solid #d6d6d6;
            line-height: 30px;
            height: 51px;
            .name{
                width: 110px;
            }
            .sign{
                margin-left: 120px;
                font-size: 12px;
                color: #999;
                width: 560px;
            }
        }
        .charting_box{
            padding: 0 20px;
            height: 400px;
            position: relative;
            overflow: hidden;
            .viod{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                opacity: .3;
                .viod-icon{
                    font-size: 100px;
                }
                .viod-info{
                    font-size: 13px;
                    margin-top: 30px;
                    text-align: center;
                }
            }
            .avatar{
                width: 40px;
                height: 40px;
                border-radius: 2px;
            }
            .nomal{
                height: 400px;
            }
            .charting-item{
                margin-bottom: 10px;
                &:nth-child(1){
                    padding-top: 10px;
                }
                .msg{
                    display: inline-block;
                    min-height: 40px;
                    position: relative;
                    padding: 9px 13px;
                    max-width: 300px;
                    line-height: 1.6;
                    border-radius: 3px;
                    color: #fff;
                    text-align: left;
                }
            }
            .send{
                text-align: right;
                .msg{
                    background: #FD570B;
                    margin-right: 10px;
                }
            }
            .receive{
                text-align: left;
                .msg{
                    background: #B2E281;
                    margin-left: 10px;
                }
            }
        }
        .charting-foot{
            padding: 0 20px;
            border-top: 1px solid #d6d6d6;
            .charting-content{
                height: 100px;
            }         
            .charting-textarea{
                outline: none;
                height: 100px;
                white-space: pre-wrap;
                word-wrap: break-word;
                -webkit-user-modify: read-write;
                overflow-wrap: break-word;
                -webkit-line-break: after-white-space;
            }
            .tool-bar{
                line-height: 40px;
                .bar-item{
                    font-size: 28px;
                    vertical-align: middle;
                    margin-right: 8px;
                    cursor: pointer;
                }
                .upload-demo{
                    display: inline-block;
                }
            }
            .action{
                text-align: right;
                margin-top: 10px;
            }
        }
    }
</style>
