// pages/notice/notice.js
const app = getApp()

var Api = require('../../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lottery:"",
    period :"",
    notice: "",
    index:""

  },
  getNotice: function () {

  },
  setParamData:function(options){
    var self = this;
    self.setData({
      lottery: options.lottery,
      period: options.period,
      index: options.index,
       notice:""
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    this.setParamData(options);
    Api.setHead();
    var url = Api.getNoticeByUrl(self.data.lottery,30);
    var func = this.setNoticeData;
    app.requestUrl(url, func);
  }, setNoticeData: function (res) {
    var self = this;
    var resultNotice = "";
    var paramNotice = res.data.result;
    //for (var k = 0; k < paramNotice.length; k++) {
      var index = self.data.index;
      var period = paramNotice[index].code;
     // if (period == self.data.period){
      var bult = paramNotice[index].red;
        var awardList = bult.split(",");
        var redList = new Array();
        var buleAwardList = paramNotice[index].blue;
        for (var i = 0; i < awardList.length ; i++) {
          redList[i] = awardList[i];
        }
        var prizegrades = new Array();

        var name = res.data.result[0].name;
        if (name == "七乐彩") {
          self.data.lottery = "qlc";
          prizegrades = paramNotice[index].prizegrades;
        } else if (name == "双色球") {
          self.data.lottery = "ssq";
          for(var i=0;i<6;i++){
            prizegrades.push(paramNotice[index].prizegrades[i]);
          }
        } else if (name == "3D") {
          self.data.lottery = "3d";
          for (var i = 0; i < 3; i++) {
            prizegrades.push(paramNotice[index].prizegrades[i]);
          }
        }
        wx.setNavigationBarTitle({ title: name+"开奖详情" })
        paramNotice[index].redList = redList;
        paramNotice[index].buleAwardList = buleAwardList;
        paramNotice[index].lottery = self.data.lottery;
        paramNotice[index].prizegrades = prizegrades;
        
        resultNotice = paramNotice[index];
       // break;
  //      }
    //  }
    self.setData({
      notice: resultNotice
    })
    console.log(self.data.notice);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})