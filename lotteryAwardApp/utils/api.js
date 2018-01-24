var HOST_URI = 'https://v.juhe.cn/toutiao/index';

var APPKEY = '079b794e481cd03ae363d5b4a4eddd57';
//APPKEY ='bccb02cfda121331e2215421096638f2';
module.exports = {
  //noticeIndex:"http://www.e7wan.xyz/",
  noticeIndex:"https://aso-api.huoyanapp.com//cwl_admin/kjxx/findDrawNotice",
  getNewsList: function (DATA) {
    console.log(DATA);
    console.log(HOST_URI + '?type=' + DATA.tab + '&key=' + APPKEY);
    return HOST_URI + '?&key=' + APPKEY;
  },
  getNewsByUrl: function (URL) {
    return URL;
  }, getNoticeByUrl: function (name,issueCount){
    return this.noticeIndex + "?name=" + name + "&issueCount=" + issueCount;
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
};