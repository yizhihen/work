<template>
  <div>
    <script :id='id' type="text/plain"></script>
  </div>
</template>
<script>
export default {
  name: "UE",
  data () {
    return {
      myContent: '',
      editor: null,
      // visit_id: parent.visit_id || "159821",
      // parentId: this.$getWeChatId() || 1237,
      // indexUrl:parent.indexUrl||"http://appscrmdev.ecbao.cn",
      config: {
        // serverUrl: this.indexUrl + "api/ueditor?auth_token="+encodeURI(this.visit_id)+'&wechatAuthId='+this.parentId,
        BaseUrl: "",
        UEDITOR_HOME_URL: "static/UE/",
        toolbars: [[
          'undo', 'redo', '|', 'fontsize', '|', 'blockquote', 'horizontal', '|', 'removeformat', 'formatmatch'
        ], ['bold', 'italic', 'underline', 'forecolor', 'backcolor', '|', 'indent', '|',
          'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
          'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
          'insertorderedlist', 'insertunorderedlist', '|',
          'simpleupload', 'imagenone', 'imageleft', 'imageright', 'imagecenter',
        ]],
        //设置编辑器初始化高度
        initialFrameWidth: '100%', //初始化编辑器宽度,默认1000
        initialFrameHeight: 320, //初始化编辑器高度,默认320
        minFrameWidth: 800, //编辑器拖动时最小宽度,默认800
        minFrameHeight: 220, //编辑器拖动时最小高度,默认220
        //允许编辑器input
        inputXssFilter: false,
        elementPathEnabled: false,
        wordCount: false,
        enableAutoSave: true, //禁止自动保存
        autoSyncData: false,//自动同步编辑器要提交的数据
        autoFloatEnabled: false, //是否保持toolbar的位置不动，默认true
        autoHeightEnabled: false,//是否自动长高，默认true
        imageScaleEnabled: false,//启用图片拉伸缩放
      }
    };
  },
  props: {
    defaultMsg: {
      type: String
    },
    id: {
      type: String
    },
    isLoading: {
      type: Boolean,
      default: true
    },
    myconfig: null
  },
  watch: {
    defaultMsg(old,now){
      this.editor.setContent(this.msg);
    }
  },
  computed: {
    msg(){
      return this.defaultMsg
    }
  },
  created () {
    this.applyConfig()
  },
  mounted () {
    // this.config.serverUrl = this.$api.indexUrl + "/api/ueditor?auth_token=" + encodeURI(this.visit_id) + "&wechatAuthId=" + this.parentId;
    this.config.serverUrl = ''
    this.editor = UE.getEditor(this.id, this.config);
    
    this.editor.addListener("ready", () => {
      if (this.defaultMsg && this.isLoading) {
        this.$nextTick(()=>{
          this.editor.setContent(this.defaultMsg); // 确保UE加载完成后，放入内容。
        })
      }
    })
    this.editor.addListener("selectionchange", () => {
      this.myContent = this.getUEContent()
      this.$emit('updateEditor', this.myContent)
      this.$emit('update:defaultMsg', this.myContent)
    });
  },
  methods: {
    setUeContent (val) {
      this.editor.setContent(val)
    },
    getUEContent () {
      // 获取内容方法
      return this.editor.getContent();
    },
    getUEContentTxt () {
      // 获取纯文本内容方法
      return this.editor.getContentTxt();
    },
    applyConfig () {
      if (this.myconfig) {
        this.config.initialFrameWidth = this.myconfig.initialFrameWidth ? this.myconfig.initialFrameWidth : 1000;
        this.config.initialFrameHeight = this.myconfig.initialFrameHeight ? this.myconfig.initialFrameHeight : 320;
        this.config.toolbars = this.myconfig.toolbars ? this.myconfig.toolbars : this.config.toolbars;
        // if (this.myconfig.default != '' && this.myconfig.default) {
        //   this.myconfig.default.forEach(element => {
        //     this.config.toolbars[1].push(element)
        //   });
        // }
        //是否保持toolbar的位置不动，默认true
        if (this.myconfig.autoFloatEnabled != '' && this.myconfig.autoFloatEnabled) {
          this.config.autoFloatEnabled = this.myconfig.autoFloatEnabled;
        }
        //是否自动长高，默认true
        if (this.myconfig.autoHeightEnabled != '' && this.myconfig.autoHeightEnabled) {
          this.config.autoHeightEnabled = this.myconfig.autoHeightEnabled;
        }
      }
    }
  },
  destroyed () {
    this.editor.destroy();
  }
};
</script>