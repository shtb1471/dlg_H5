// pages/rightHand/rightHand.js
var app = getApp();
var imageUtil = require('../../utils/util.js');
var uploadImage = require('../../config/uploadAliyun.js');
Page({
  data: {
    imagewidth: 0,//缩放后的宽 
    imageheight: 0,//缩放后的高 
    motto: '',
    userInfo: {},
    avatarUrl: "../../images/right_zheng.png",
    handDesc: "右手掌",
    imgType: "0",
    userId: "",
    sid: "",
    sex:""
  },
  onLoad(option) {
    var data = wx.getStorageSync("cookies"), _this = this;
    this.setData({
      ringFingerLength: 1,
      indexFingerLength: 1,
      sid: data.sid,
      userId: data.userId,
      sex: option.sex
    })
    wx.hideShareMenu();
    if (!option.imgType) {
      _this.setData({
        imgType: "0",
        avatarUrl: "../../images/right_zheng.png",
        handDesc: "右手掌"
      })
    }
  },
  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
  takeRightPhoto: function () {
    this.bindViewTap();
  },//事件处理函数
  bindViewTap: function () {
    var that = this
    //  选择图片和拍照
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        that.setData({ avatarUrl: tempFilePaths[0] });
        uploadImage(
          {
            filePath: tempFilePaths[0],
            success: function (res) {
              that.uploadImg(res);
            },
            fail: function (e) {
              wx.showToast({
                title: "图片上传失败",
                image: "../../images/cross.png",
                icon: 'success',
                duration: 2000
              });
              setTimeout(function () {
                wx.redirectTo({
                  url: '../uploadFail/uploadFail?reject=false&imgType=' + that.data.imgType
                })
              }, 500);
            }
          })
      },
      fail: function (res) {
        wx.showToast({
          title: "图片上传失败",
          image: "../../images/cross.png",
          icon: 'success',
          duration: 2000
        });
        setTimeout(function () {
          wx.redirectTo({
            url: '../uploadFail/uploadFail?reject=false&imgType=' + that.data.imgType
          })
        }, 500);
      }
    })
  },
  uploadImg(imgUrl) {
    var _this = this;
    wx.request({
      url: app.data.zwTestUrl + '/zw/' + wx.getStorageSync("cookies").userId+'/zw_info_save',
      method: "POST",
      data: {
        gender: _this.data.sex,
        photo: imgUrl,
        source: "微信小程序",
        sid: _this.data.sid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        var datas=res.data.body.data;
        if (res.data.body.code == "SUCCESS") {
          wx.showToast({
            title: res.data.body.msg,
            icon: 'success',
            duration: 2000
          });
          setTimeout(function () {
            wx.redirectTo({
              url: '../process/process'
            })
          }, 500);
        } else {
          wx.showToast({
            title: res.data.body.data.reason,
            image: "../../images/cross.png",
            icon: 'success',
            duration: 2000
          });
          setTimeout(function () {
            wx.redirectTo({
              url: '../sex/sex?imgType=0'
            })
          }, 500);
        }
      },
      fail(e) {
        wx.showToast({
          title: "请求失败",
          image: "../../images/cross.png",
          icon: 'success',
          duration: 2000
        });
        setTimeout(function () {
          wx.redirectTo({
            url: '../sex/sex?imgType=0'
          })
        }, 500);
      }
    })
  }
})