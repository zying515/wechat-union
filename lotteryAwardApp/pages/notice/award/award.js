// pages/notice/notice.js
const app = getApp()

var Api = require('../../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeList: new Array()
  },
  toast:function (options) {
    var target = options.currentTarget.dataset;
    var lottery = target.lottery;
    var period = target.period;
    var index = target.index;
    wx.navigateTo({
      url: '../detail/detail?lottery=' + lottery + "&period=" + period + "&index=" + index
    })
  },
  getNotice: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name = options.name;
    wx.setNavigationBarTitle({ title: name + "历史开奖公告" })

    Api.setHead();
    var url = Api.getNoticeByUrl(options.lottery,30);
    var func = this.setNoticeData;
    app.requestUrl(url, func);

  }, setNoticeData: function (res) {
    var self = this;
    var resultNotice = new Array();
    var paramNotice = res.data.result;
    for (var k = 0; k < paramNotice.length; k++) {
      var bult = paramNotice[k].red;
      var awardList = bult.split(",");
      var redList = new Array();
      var buleAwardList = paramNotice[k].blue;
      for (var i = 0; i < awardList.length; i++) {
        redList[i] = awardList[i];
      }
      var name = res.data.result[0].name;
      if (name == "七乐彩") {
        self.data.lottery = "qlc";
      } else if (name == "双色球") {
        self.data.lottery = "ssq";
      } else if (name == "3D") {
        self.data.lottery = "3d";
      }
      paramNotice[k].redList = redList;
      paramNotice[k].buleAwardList = buleAwardList;
      paramNotice[k].lottery = self.data.lottery;
      resultNotice.push(paramNotice[k]);
    }
    self.setData({
      noticeList: resultNotice
    })
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
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '开奖公告',
      path: 'pages/notice/notice',
      success: function (res) {
       // console.log(res);
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})