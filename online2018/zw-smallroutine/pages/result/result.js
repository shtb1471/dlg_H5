// pages/result1/result1.js
var app = new getApp();
Page({
  data: {
    second_height: 0,
    headImg: "../../images/userImg.jpg",
    characterTxt: "",
    characterScore: "",
    tabs: [],
    tabsActive: "tabs_0",
    tabSelect: 0,
    imgTypes: [],//上传图片类型
    lists: [//0 右手掌 1 右手背 2 左手掌 3 左手背 4 头像
      {
        "listIcon": "icon-juchanghuangguan",
        "listTxt": "性格",
        "listActive": false,
        "listImgType": 0
      },
      {
        "listIcon": "icon-dianzanmw",
        "listTxt": "能力",
        "listActive": false,
        "listImgType": 0
      },
      {
        "listIcon": "icon-1",
        "listTxt": "优点",
        "listActive": false,
        "listImgType": 0
      },
      {
        "listIcon": "icon-jinggao",
        "listTxt": "缺点",
        "listActive": false,
        "listImgType": 1
      }, {
        "listIcon": "icon-mingpian",
        "listTxt": "职业",
        "listActive": false,
        "listImgType": 2
      },
      {
        "listIcon": "icon-qinglv",
        "listTxt": "伴侣",
        "listActive": false,
        "listImgType": 4
      },
      {
        "listIcon": "icon-jianyi",
        "listTxt": "建议",
        "listActive": false,
        "listImgType": 3
      }
    ],
    listActive: "item_00",
    scrollTop: {
      scroll_top: 0,
      goTop_show: false
    },
    listContents: [],
    itemCats: "",
    itemCats1: "",
    contentTitle: "",
    contentTxt: "",
    tag: false,
    contentTitle1: "",
    contentTxt1: "",
    testxxx: {},
    IsUpload: true,
    imgValue: "",
    imgTXT: "",
    personalityId: "",
    ringFingerLength: "",
    indexFingerLength: "",
    shareCharacterId: "",
    sid: "",
    userId: ""
  },
  onLoad: function (options) {
    var data = wx.getStorageSync("cookies"), _this = this;
    this.setData({
      sid: data.sid,
      userId: data.userId
    })
    this.checkRejectInfo();
  },
  //根据状态 查询用户照片信息
  checkRejectInfo() {
    var _this = this;
    wx.request({
      url: app.data.zwTestUrl + '/zw/user/' + wx.getStorageSync("cookies").userId + '/zw/result',
      method: 'GET',
      success: function (res) {
        var vals = res.data.body.data;
        if (res.data.body.code == "SUCCESS") {
          if (vals.useravatar == '') {
            _this.setData({
              headImg: "../../images/userImg.jpg"
            })
          } else {
            _this.setData({
              headImg: vals.useravatar
            })
          }
          _this.setData({
            characterTxt: vals.name
          })
          _this.perinfoDetail_ajax(vals)//测试结果

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
    });
  },
  //获取测试结果
  perinfoDetail_ajax(datas) {
    var _this = this;
    if (datas.zwinfo.length > 0) {
      console.log(datas.zwinfo)
      datas.zwinfo.map((cat) => {
        var ability = "",
          disadvantages = "",
          getalong = "",
          nature = "",
          suitablejob = "",
          virtue = "";
        cat.nature.split("<br/>").map((xCat) => {
          nature += xCat + '\n';
        })
        cat.ability.split("<br/>").map((xCat) => {
          ability += xCat + '\n';
        })
        cat.virtue.split("<br/>").map((xCat) => {
          virtue += xCat + '\n';
        })
        cat.disadvantages.split("<br/>").map((xCat) => {
          disadvantages += xCat + '\n';
        })
        cat.suitablejob.split("<br/>").map((xCat) => {
          suitablejob += xCat + '\n';
        })
        cat.disadvantages.split("<br/>").map((xCat) => {
          getalong += xCat + '\n';
        })
        cat.ability = ability
        cat.disadvantages = disadvantages
        cat.getalong = getalong
        cat.nature = nature
        cat.suitablejob = suitablejob
        cat.virtue = virtue
      })
      _this.setData({
        listContents: datas.zwinfo
      });
      if (datas.zwinfo.length > 1) {
        wx.hideShareMenu();
      }
      var personalityRpcVo = new Array();
      datas.zwinfo.map((tab) => {
        personalityRpcVo.push(tab);
      })
      _this.setData({
        tabs: personalityRpcVo
      });
      _this.characterItemData(0);
    }
  },
  //双性格tab切换
  changeTabs(val) {
    var _this = this;
    _this.setData({
      tabSelect: val.currentTarget.dataset.index,
      tabsActive: val.currentTarget.id,
      listActive: "item_" + val.currentTarget.dataset.index + "0"
    })
    _this.characterItemData(val.currentTarget.dataset.index);
  },
  //页面加载初始显示
  characterItemData(index) {
    var _this = this;
    var item = this.data.listContents[index];
    _this.setData({
      contentTitle: "性格",
      itemCats: item.nature,
      shareCharacterId: _this.data.listContents[0].pid
    });
  },
  scrollTopFun(e) {
    if (e.detail.scrollTop > 300) {//触发gotop的显示条件  
      this.setData({
        'scrollTop.goTop_show': true
      });
    } else {
      this.setData({
        'scrollTop.goTop_show': false
      });
    }
  },
  //左侧tab切换
  changeItem(val) {
    var _this = this;
    var _top = this.data.scrollTop.scroll_top;
    if (_top == 1) {
      _top = 0;
    } else {
      _top = 1;
    }
    this.setData({
      'scrollTop.scroll_top': _top
    });
    _this.setData({
      listActive: val.currentTarget.id
    });
    var listTxt = val.currentTarget.dataset.text,
      listContents = this.data.listContents,
      tabSelectIdx = _this.data.tabSelect;
    if (listContents.length > 0) {
      var item = listContents[tabSelectIdx];
      switch (listTxt) {
        case "性格":
          _this.setData({
            tag: false,
            IsUpload: true,
            contentTitle: listTxt,
            itemCats: item.nature
          });
          break;
        case "能力":
          _this.setData({
            tag: false,
            IsUpload: true,
            contentTitle: listTxt,
            itemCats: item.ability
          });
          break;
        case "优点":
          _this.setData({
            tag: false,
            IsUpload: true,
            contentTitle: listTxt,
            itemCats: item.virtue
          });
          break;
        case "缺点":
          _this.setData({
            tag: false,
            IsUpload: true,
            contentTitle: listTxt,
            itemCats: item.disadvantages
          });
          break;
        case "职业":
          _this.setData({
            tag: false,
            IsUpload: true,
            contentTitle: listTxt,
            itemCats: item.suitablejob
          });
          break;
        case "建议":
          _this.setData({
            tag: false,
            IsUpload: true,
            contentTitle: listTxt,
            itemCats: item.getalong
          });
          break;
        default:
          _this.setData({
            tag: true,
            IsUpload: true,
            contentTitle: "理想伴侣",
            itemCats: item.perfectcouple,
            contentTitle1: "不适合的伴侣",
            itemCats1: item.notsuitablecouple
          });
          break;
      }
    }
    //_this.hasNoImgType(val.currentTarget.dataset.text);
  },
  //判断当前手和头像没有上传操作
  hasNoImgType(listTxt) {
    var _this = this;
    switch (listTxt) {
      case "缺点":
        _this.setData({
          imgTXT: "上传完整的右手背照片即可查看",
          imgValue: 1
        });
        break;
      case "职业":
        _this.setData({
          imgTXT: "上传完整的左手掌照片即可查看",
          imgValue: 2
        });
        break;
      case "伴侣":
        _this.setData({
          imgTXT: "上传头部正面照片即可查看",
          imgValue: 4
        });
        break;
      case "建议":
        _this.setData({
          imgTXT: "上传完整的左手背照片即可查看",
          imgValue: 3
        });
        break;
      default:
        _this.setData({
          imgTXT: "",
          imgValue: ""
        });
        break;
    }
  },
  onShareAppMessage: function (res) {
    var _this = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '“真我”比您更懂您，源于心理专家亲自解析',
      imageUrl: "../../images/logo_fenxiang.png",
      path: '/pages/share/share?_lt=' + new Date().getTime() + '&contentId=' + _this.data.shareCharacterId + '&sid=' + _this.data.sid + '&userId=' + _this.data.userId,
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})