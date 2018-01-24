// pages/notice/notice.js
const app = getApp()

var Api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lottery:"",
    noticeList:new Array(),
    resultNotice:new Array()
  },
  toast:function(options){
    var target = options.currentTarget.dataset;
    var lottery = target.lottery;
    var period = target.period;
    var name = target.name;
    wx.navigateTo({
      url: 'award/award?lottery=' + lottery + "&period=" + period+"&name="+name
    })
  },
  getNotice:function(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var self = this;
    self.setHead();
    self.data.lottery= "ssq";
    self.commRequest();
    self.data.lottery = "qlc";
    self.commRequest();
    self.data.lottery = "3d";
    self.commRequest();
  },commRequest:function(){
    var self = this;
    var url = Api.getNoticeByUrl(self.data.lottery, "1");
    var func = this.setNoticeData;
    app.requestUrl(url, func);
  }, 
  setNoticeData:function(res){
    var self = this;
    var bult = res.data.result[0].red;
    var awardList = bult.split(",");
    var redList = new Array();
    var buleAwardList = res.data.result[0].blue;
    for(var i=0;i<awardList.length;i++){
      redList[i] = awardList[i];
    }
    var name = res.data.result[0].name;
    if (name == "七乐彩" ){
      self.data.lottery ="qlc";
    } else if (name == "双色球"){
      self.data.lottery = "ssq";
    }else if (name == "3D"){
      self.data.lottery = "3d";
    }
    res.data.result[0].redList = redList;
    res.data.result[0].buleAwardList = buleAwardList;
    res.data.result[0].lottery = self.data.lottery;
    self.data.resultNotice.push(res.data.result[0]);
    self.refreshNoticeData();
  }, refreshNoticeData:function(){
    var self = this;
    self.setData({
      noticeList: self.data.resultNotice
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
  
  },
  setHead: function () {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#d41e15',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  }
})