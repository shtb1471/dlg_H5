var app = getApp();
Page({
  data: {
    fixTime: 30,
    personCount: 1,
    userId: "",
    sid: ""
  },
  onLoad(option) {
    var data = wx.getStorageSync("cookies");
    this.setData({
      sid: data.sid,
      userId: data.userId
    })
    wx.hideShareMenu();
    //this.todoIsRefuse();//判断有无驳回
  },

  //判断有无驳回
  todoIsRefuse() {
    var _this = this;
    wx.request({
    method: 'GET',
    url: app.data.zwTestUrl + '/zw/user/' + wx.getStorageSync("cookies").userId + '/zw/result',
     data: {
       userId: _this.data.userId,
       sid: _this.data.sid
     },
      success: function (res) {
        var datas = res.data.body.data;
        if (res.data.body.code == "SUCCESS") {
          //data为空表示用户还未上传过手信息
          switch (datas.status) {
            case "0":
              wx.redirectTo({
                url: '../sex/sex?_=' + new Date().getTime()
              })
              break;
            case "1":
              wx.redirectTo({
                url: '../process/process?_=' + new Date().getTime()
              })
              break;
            case "2":
              wx.redirectTo({
                url: '../result/result?_=' + new Date().getTime()
              })
              break;
            case "3":
              wx.showToast({
                title: datas.reason,
                image: "../../images/cross.png",
                icon: 'success',
                duration: 2000
              });
              wx.redirectTo({
                url: '../sex/sex?_=' + new Date().getTime()//驳回页
              })
              break;
          }
        }
      },
      fail: function (e) {
        wx.showToast({
          title: "请求失败",
          image: "../../images/cross.png",
          duration: 2000
        });
        setTimeout(function () {
          wx.redirectTo({
            url: "../process/process"
          })
        }, 500);
      }
    });
  },
  //待处理人数
  handleCount_ajax() {
    var _this=this;
    wx.request({
      method: 'POST',
      url: app.data.zwUrl + '/api/zw/userHandApi/handleCount',
      data: {
        userId: _this.data.userId,
        sid: _this.data.sid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var datas = res.data;
        if (datas.code == "0") {
          _this.setData({
            personCount: datas.data
          })
          if(datas.data==0){
            _this.handResult_ajax();
          }
        } else {
          wx.showToast({
            title: "请等待",
            image: "../../images/cross.png",
            duration: 2000
          });
          setTimeout(function () {
            wx.redirectTo({
              url: "../process/process"
            })
          }, 1000);
        }
      },
      fail: function (e) {
        wx.showToast({
          title: "请求失败",
          image: "../../images/cross.png",
          duration: 2000
        });
        setTimeout(function () {
          wx.redirectTo({
            url: "../process/process"
          })
        }, 1000);
      }
    });
  }
})