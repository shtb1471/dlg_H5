// pages/sex/sex.js
const app = getApp();
Page({
  data: {
    sex:"",
    activemale:"",
    activefemale:"",
    sid:"",
    userId:""
  },
  onLoad(option) {
    wx.hideShareMenu();
    var dataJson=wx.getStorageSync("cookies");
    this.setData({
      sid: dataJson.sid,
      userId:dataJson.userId
    })
  },
  optionMSex: function (e) {
    this.setData({ 
      activemale: "nan_active",
      activefemale: "",
      sex: "1"
      })   
  },
  optionFSex: function (e) {
    this.setData({
      activemale: "",
      activefemale: "nv_active",
      sex: "2"
    });
  },
  sexButton:function(){
    var _this = this;
    if (this.data.sex == "") {
      wx.showToast({
        title: '请选择您的性别',
        image: "../../images/cross.png",
        icon: 'success',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: '../rightHand/rightHand?imgType=0&sex=' + _this.data.sex
      })
    }
  }
})