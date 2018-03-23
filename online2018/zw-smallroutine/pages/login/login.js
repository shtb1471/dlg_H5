const app = getApp();
import { imageUtil, LoctionStorage } from '../../utils/util.js';
Page({
  data: {
    showPage: false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    login: { desc: "认识真实的我" },
    focus: false,
    focusImg: false,
    focusCode: false,
    phone: "",
    imgCode: "",
    verifyImg: "",
    imgKey: "",
    verifyCode: "",
    disabled: false,
    loginOperate: false,
    getVerifyTxt: "获取验证码",
    fixTime: 59,
    errorMsg: "",
    unionid: ""
  },
  onLoad: function (options) {
    var _this=this;
    wx.hideShareMenu();
    this.getUnionId();
    // _this.setData({
    //   showPage: true
    // });
    // _this.getVerifyImgCode();
  },
  //获取unionid
  getUnionId() {
    var _this = this;
    wx.login({
      success(res) {
        if (res.code) {
          wx.getUserInfo({
            success: resInfo => {
              app.globalData.userInfo = resInfo.userInfo
              _this.setData({
                userInfo: resInfo.userInfo,
                hasUserInfo: true
              })
              _this.getOpenId(res.code, resInfo);
            },
            fail(e) {
              _this.setData({
                showPage: true
              });
              _this.getVerifyImgCode();
            }
          })
        } else {
          wx.showToast({
            title: "获取用户登录态失败！",
            image: "../../images/cross.png",
            icon: 'success',
            duration: 2000
          });
          _this.setData({
            showPage: true
          });
          _this.getVerifyImgCode();
        }
      },
      fail(e) {
        console.log(e);
        _this.setData({
          showPage: true
        });
        _this.getVerifyImgCode();
      }
    })
  },
  getOpenId(code, userInfo) {
    var _this = this;
    wx.request({
      url: app.data.zwUserInfoUrl + "/getJscode2session",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        js_code: code
      },
      success(openRes) {
        if (openRes.data.session_key) {
          _this.decodeUserInfo(code, userInfo, openRes.data.session_key);
        } else {
          wx.showToast({
            title: "请登录",
            image: "../../images/cross.png",
            icon: 'success',
            duration: 2000
          });
          _this.setData({
            showPage: true
          });
          _this.getVerifyImgCode();
        }
      },
      fail(e) {
        _this.setData({
          showPage: true
        });
        _this.getVerifyImgCode();
      }
    })
  },
  decodeUserInfo(code, resInfo, sessionKey) {
    var _this = this;
    wx.request({
      url: app.data.zwUserInfoUrl + '/doDecryptData',//自己的服务接口地址
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        encryptedData: resInfo.encryptedData,
        iv: resInfo.iv,
        sessionKey: sessionKey,
      },
      success: function (res) {
        _this.autoLogin(res.data.unionId);
      },
      fail: function (e) {
        console.log(e);
        _this.setData({
          showPage: true
        });
        _this.getVerifyImgCode();
      }
    });
  },
  //自动登录
  autoLogin(unionid) {
    var _this = this;
    this.setData({
      unionid: unionid
    })
    var dataJson = {
      openid: unionid,
      channel: 2,
      clienttype: 0,
      source: "ZW-27582764699958629429945054883"
    }
    if (wx.getStorageSync("shareUserId") != "") {
      dataJson.inviter = "0" + wx.getStorageSync("shareUserId");
    } else {
      dataJson.inviter = "";
    }
    wx.request({
      url: app.data.zwTestUrl + '/auth/login',
      method: 'POST',
      data: dataJson,
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (resObj) {
        var res = resObj.data.body;
        if (res.code == "SUCCESS") {
          //缺少状态判断是否需要手机号绑定
          var userId = res.data.userid;
          var sid = res.data.access_token;
          var cookies = {
            "userId": userId,
            "sid": sid
          }
          wx.setStorageSync("cookies", cookies);
          var xstatus = res.data.isbind;
          if (xstatus == "0") {
            _this.setData({
              showPage: true
            });
            _this.getVerifyImgCode();
          } else {
            _this.setData({
              showPage: false
            })
            // //判断有无测验
            _this.handResult_ajax(userId, sid);
          }
        }
      },
      fail(e) {
        _this.setData({
          showPage: true
        });
        _this.getVerifyImgCode();
      }
    })
  },
  // 倒计时
  getTime() {
    var _this = this, timer = "";
    if (this.data.fixTime == 0) {
      clearTimeout(timer);
      this.setData({
        disabled: false,
        getVerifyTxt: "获取验证码",
        fixTime: 59
      });
    } else {
      this.data.fixTime--;
      this.setData({
        disabled: true,
        getVerifyTxt: "重发(" + this.data.fixTime + ")",
        fixTime: this.data.fixTime
      })
      timer = setTimeout(function () {
        _this.getTime();
      }, 1000)
    }
  },
  //获取图形验证码
  getVerifyImgCode() {
    var _this = this;
    _this.setData({
      imgCode: app.data.zwTestUrl + '/sys/vcode?_lt=' + new Date().getTime(),
      imgKey: ""
    });
  },
  //获取sms
  getVerifyCode() {
    var _this = this;
    var dataJson = {
      format: "json",
      phone: _this.data.phone,
      vcode: _this.data.verifyImg
    }
    if (this.verifyInput()) {
      wx.request({
        method: 'POST',
        url: app.data.zwTestUrl + '/sys/sendsmscode',
        data: dataJson,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.data.body.code == "SUCCESS") {
            _this.getTime();
            wx.showToast({
              title: "发送成功",
              icon: 'success',
              duration: 2000
            });
          } else {
            wx.showToast({
              title: res.data.body.msg,
              image: "../../images/cross.png",
              icon: 'success',
              duration: 2000
            });
          }
        },
        fail: function (e) {
          wx.showToast({
            title: "发送验证码失败",
            image: "../../images/cross.png",
            icon: 'success',
            duration: 2000
          });
        }
      })
    }
  },
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  verifyImgInput: function (e) {
    this.setData({
      verifyImg: e.detail.value
    })
  },
  verifyCodeInput: function (e) {
    this.setData({
      verifyCode: e.detail.value
    })
  },
  verifyInput() {
    if (this.data.phone == "" || !/^1[34578]\d{9}$/.test(this.data.phone)) {
      this.setData({
        errorMsg: "请输入正确手机号",
        focus: true
      });
      return false;
    } else {
      this.setData({ errorMsg: "" });
    }
    if (this.data.verifyImg == "") {
      this.setData({
        errorMsg: "图形验证码不为空",
        focusImg: true
      });
      return false;
    } else {
      this.setData({ errorMsg: "" });
    }
    return true;
  },
  //绑定手机号
  loginSubmit: function () {
    var _this = this;
    if (this.verifyInput()) {
      if (this.data.verifyCode == "") {
        this.setData({
          errorMsg: "验证码不为空",
          focusCode: true
        });
        return false;
      } else {
        this.setData({ errorMsg: "" });
      }
      _this.setData({
        loginOperate: true
      })
      wx.showToast({
        title: "加载中...",
        icon: 'loading',
        duration: 10000
      });
      var dataJson = {
        phone: this.data.phone,
        vcode: this.data.verifyCode,
        access_token: wx.getStorageSync("cookies").sid,
        clienttype:'0'
      },
        userid = wx.getStorageSync("cookies").userId;
      //console.log(userid);
      wx.request({
        url: app.data.zwTestUrl + '/user/' + userid + '/bindphone',
        method: 'POST',
        data: dataJson,
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function (resObj) {
          var res = resObj.data.body;
          if (res.code == "SUCCESS") {
            // //判断有无测验
            _this.handResult_ajax(res.data.userid, wx.getStorageSync("cookies").sid);
          } else {
            _this.setData({
              loginOperate: false
            })
            wx.showToast({
              title: res.msg,
              image: "../../images/cross.png",
              icon: 'success',
              duration: 2000
            });
          }
        },
        fail: function (e) {
          _this.setData({
            loginOperate: false
          })
          wx.showToast({
            title: e.msg,
            image: "../../images/cross.png",
            icon: 'success',
            duration: 2000
          });
        }
      });
    }
  },
  //登录后——判断有无测验
  handResult_ajax(userId, sid) {
    var _this = this;
    wx.request({
      method: 'GET',
      url: app.data.zwTestUrl + '/zw/user/' + userId + '/zw/result',
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
        } else {
          _this.setData({
            loginOperate: false
          })
        }

      },
      fail: function (e) {
        _this.setData({
          loginOperate: false
        })
        wx.showToast({
          title: e.msg,
          image: "../../images/cross.png",
          icon: 'success',
          duration: 2000
        });
      }
    })
  }
})