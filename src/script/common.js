// import axios from "axios";
export default {
  install(Vue, options) {
    Vue.prototype.$axiosGet = function(url, params, succeed) {
      var self = this;
      axios({
        url: url,
        params: params,
        withCredentials: true
      })
        .then(function(res) {
          succeed(res);
        })
        .catch(error => {
          console.log(error);
          this.$message.error("网络错误，刷新下试试");
        });
    };
    Vue.prototype.$axiosPost = function(url, data, succeed, id) {
    //   id = getWeChatId();
        id = ''
      var self = this;
      axios({
        method: "post",
        url: url,
        data: data,
        headers: {
          "wechat-id": id
        },
        withCredentials: true
      })
        .then(function(res) {
          succeed(res);
        })
        .catch(function(error) {
          console.log(error);
          // this.$message.error('网络错误，刷新下试试')
        });
    };
    Vue.prototype.$specialAxiosPost = function(url, data, succeed, id) {
      //   id = getWeChatId();
      id = ''
      var that = this;
      var params = new URLSearchParams();
      for (var k in data) {
        params.append(k, data[k]);
      }
      this.$ajax({
        url: url,
        method: "post",
        dataType: "JSON",
        data: params,
        headers: {
          "wechat-id": id,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        withCredentials: true
      }).then(function(res) {
        succeed(res);
      });
    };
    // 变异post
    Vue.prototype.$POST = function(url, data, succeed, id) {
      //   id = getWeChatId();
      id = ''
      var self = this;
      this.$ajax({
        url: url,
        method: "post",
        dataType: "JSON",
        data: data,
        headers: {
          "wechat-id": id,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        withCredentials: true
      }).then(res => {
        succeed(res);
      });
    };
    //常用正则
    Vue.prototype.$regRule = {
      Email: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, //邮箱
      Account: /^[a-zA-Z0-9_]{2,20}$/, // 账户
      Pwd: /^[a-zA-Z0-9_~!@#$%^&*()]{8,20}$/i, // 密码
      Tel: /^(13|14|15|16|17|18|19)[0-9]{9}$/, //手机
      IDCard: /^\d{17}[\d|X|x]|\d{15}$/, //身份证
      Number: /^\d+$/, //数字
      Integer: /^[-\+]?\d+$/, //正负整数
      IntegerZ: /^[1-9]\d*$/, //正整数
      IntegerF: /^-[1-9]\d*$/, //负整数
      Chinese: /^[\u0391-\uFFE5]+$/,
      Zipcode: /^\d{6}$/, //邮编
      Authcode: /^\d{6}$/, //验证码
      QQ: /^\d{4,12}$/, // QQ
      Price: /^(0|[1-9]\d*)(\.\d{1,2})?$/, // 价格
      Money: /^(0|[1-9]\d*)(\.\d{1,4})?$/, // 金额
      Letter: /^[A-Za-z]+$/, //字母
      LetterU: /^[A-Z]+$/, //大写字母
      LetterL: /^[a-z]+$/, //小写字母
      Url: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/gi, // URL
      Date: /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/, //日期
      Domain: /^[a-zA-Z0-9]{4,}$/ //自定义域名
    };
    // 全局设置apiUrl域名
    Vue.prototype.apiUrl = 'http://118.25.107.247:1112/'
    // 全局获取当前主MENU的数据
    Vue.prototype.$getMenu = function(vue){
        return vue.$route.path.match(/\/(\S*)\//) != null ? '/' + vue.$route.path.match(/\/(\S*)\//)[1] : ''
    };
    // 全局获取当前submenu的数据
    Vue.prototype.$getSubmenu = function(vue,arr){
      let list = []
      let name = vue.$route.path.match(/\/(\S*)\//) != null ? vue.$route.path.match(/\/(\S*)\//)[1] : ''
      list = arr[arr.findIndex((item)=>{
        return name == item.name
      })].sub
      return list
    };
    // 全局判断是否有侧边栏
    Vue.prototype.$showSidebar = function(vue){
      return vue.$route.path.match(/\/(\S*)\//) != null ? true : false
    }
  }
};
