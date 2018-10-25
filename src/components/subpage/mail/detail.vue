<template>
    <div class="detail-container clearfix">
        <div class="detail-top clearfix">
            <div class="align-left">
                <i class="icon el-icon-arrow-left main-color"></i>
                <el-button type="text" @click="tohome">返回</el-button>
            </div>
            <div class="align-right">
                <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content">加星</div>
                    <i class="main-color icon el-icon-star-off" @click="star"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content">编辑</div>
                    <i class="main-color icon el-icon-document" @click="edit"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content">删除</div>
                    <i class="main-color icon el-icon-delete" @click="del"></i>
                </el-tooltip>
            </div>
        </div>
        <div class="detail-title slide">
            <div class="top clearfix item">                
                <h4 class="title fl">主题：关于合规检查的108条清单主题：关于合规检查的108条清单主题：关于合规检查的108条清单主题：关于合规检查的108条清单主题：关于合规检查的108条清单主题：关于合规检查的108条清单主题：关于合规检查的108条清单</h4>
                <span class="title-date c9 fr">2017-5-8 12：00</span>
            </div>
            <p class="item item-p">To： 王小丫，董卿，崔永元</p>
            <p class="item item-p">Cc： 王大锤，阿狸</p>
        </div>
        <div class="detail-content padding slide">
            <p class="text item-p">各位：以下是金融办的108条合规清单，请大家认真研究</p>
            <div class="file padding clearfix">
                <el-tag class="fl" type="warning">附件</el-tag>
                <div class="file-list">
                    <el-popover
                        placement="bottom"
                        width="170"
                        trigger="manual"
                        v-model="visible">
                        <div style="">
                            <el-button type="success" plain @click="savetofile">保存到文件</el-button>
                            <el-button type="info" plain @click="download">下载</el-button>
                        </div>
                        <div slot="reference" class="item" @contextmenu.prevent="downfile($event)">
                            <i class="el-icon-picture"></i>
                            <el-tooltip effect="dark" placement="top-start">
                                <div slot="content">108条合规清单.sxls</div>
                                <span class="item-p file-name ellipsis">108条合规清单.sxls</span>
                            </el-tooltip>
                            <span class="size item-p">21K</span>
                        </div>   
                    </el-popover>
                </div>
            </div>
            <div class="mail-foot">
                <p class="item-p">萧薰儿</p>
                <p class="item-p">综合管理部</p>
            </div>
        </div>
        <transition name="fade" mode="out-in">
            <div class="padding" v-if="!boo.showReply">
                <el-button type="primary" @click="boo.showReply = true">回复</el-button>
                <el-button type="danger" @click="tonew">转发</el-button>
            </div>
            <div class="mail-replay padding" v-else>
                <p class="item-p line-height">Fw： <span class="replay-title">关于合规检查的108条清单</span></p>
                <p class="item-p line-height">To： 王小丫，董卿，崔永元   Cc： 王大锤，阿狸</p>
                <el-input
                    type="textarea"
                    class="replay-textarea padding"
                    :autosize="{ minRows: 4, maxRows: 4}"
                    placeholder="请输入回复内容"
                    v-model="form.replay">
                </el-input>
                <div class="file-upload">
                    <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
                <div class="padding-top">
                    <el-button type="warning">发送</el-button>
                    <el-button type="info" @click="boo.showReply = false">取消</el-button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'baseform',
        data: function(){
            return {
                form: {
                    replay: ""
                },
                boo: {
                    showReply: false,
                },
                visible: false
            }
        },
        methods: {
            tohome(){
                let _self = this
                _self.$emit('tohome',true)
            },
            tonew(){
                let _self = this
                _self.$emit('tonew',true)
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            downfile(e){
                this.visible = !this.visible
            },
            star(){
                console.log('文件加星')
            },
            edit(){
                console.log('文件编辑')
            },
            del(){
                console.log('邮件删除')
            },
            savetofile(){
                console.log('保存到文件')
            },
            download(){
                console.log("下载到本地")
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
    .padding{
        padding: 20px 0;
    }
    .padding-top{
        padding-top: 20px;
    }
    .item-p{
        font-size: 14px;
        color: #666;
    }
    .line-height{
        line-height: 1.8;
    }
    .detail-top{
        .align-left{
            float: left;
            width: 120px;
        }
        .align-right{
            line-height: 32px;
            text-align: right;
            .icon{
                margin-left: 15px;
            }
        }
        .icon{
            vertical-align: middle;
            cursor: pointer;
        }
    }
    .detail-title{
        padding-bottom: 20px;
        .item{
            padding-top: 15px;
        }
        .top{
            .title{
                width: 85%;                
            }
        }
        .title-date{
            padding-left: 15px;
            font-size: 14px;
            font-weight: normal;
        }
    }
    .detail-content{
        p{
            line-height: 1.8;
        }
        .file-list{
            display: flex;
            margin-left: 150px;
            flex-wrap: wrap;
            .item{
                position: relative;
                margin-right: 20px;
                padding-right: 18px;
            }
            .item::after{
                position: absolute;
                width: 1px;
                content: "";
                height: 14px;
                background: #C9C9C9;
                right: 0;
            }
        }
        .file-name{
            width: 150px;
            display: inline-block;
        }
    }
    .mail-replay{
        .replay-title{
            font-weight: 600;
            color: #000;
            font-size: 16px; 
        }
        .replay-textarea{
            width: 60%;
        }
    }
</style>
