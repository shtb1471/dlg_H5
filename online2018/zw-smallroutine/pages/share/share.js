// pages/share/share.js
var app = new getApp();
Page({
  data: {
    imgSrc:"../../images/userImg.jpg",
    timeStamp:new Date().getTime(),
    characterTxt:"",
    userName:"",
    sexIcon:"",
    sexTxt:"",
    contentTitle:"",
    contentTxt:"",
    userId:"",
    personalityId:""

  },
  onLoad(option){
    var _this = this;
    wx.hideShareMenu();
    _this.setData({
      sid: option.sid,
      userId: option.userId,
      personalityId: option.contentId
      // userId: 7248,
      // personalityId: "1834"
    })
    wx.request({
      method: 'GET',
      url: app.data.zwTestUrl + '/zw/user/' + _this.data.userId + '/zw/result',
      success: function (res) {
        var datas = res.data.body.data;
        if (res.data.body.code == "SUCCESS") {
          _this.setData({
            characterTxt: datas.name
          })
          if (datas.useravatar == '') {
            _this.setData({
              imgSrc: "../../images/userImg.jpg"
            })
          } else {
            _this.setData({
              imgSrc: datas.useravatar
            })
          } 
          // 判断是否为null
          if (datas.username != null) {
            _this.setData({
              userName: datas.username
            });
          } else {
            _this.setData({
              userName: ""
            });
          }
          //数据渲染
          if (datas.zwinfo.length>0) {
            _this.setData({
              contentTitle: "性格特征",
              contentTxt: datas.zwinfo[0].nature
            })
          }
        }else {
          wx.showToast({
            title: datas.msg,
            image: "../../images/cross.png",
            icon: 'success',
            duration: 2000
          }); 
        }
      },
      fail: function (e) {
        wx.showToast({
          title: "请求失败",
          image: "../../images/cross.png",
          icon: 'success',
          duration: 2000
        });
      }
    })
  }
})