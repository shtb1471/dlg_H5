var _hmt = _hmt || [];
$(function () {
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?9ec5c087d859bb2f23439e15212f056c";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
    getWxKey();
})

function getQueryVariablex(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return "";
}

function shareBtn() {
    var ua = window.navigator.userAgent.toLowerCase();
    var shareUrl = encodeURIComponent(window.location.href);
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        // showAll('#model','#modal-box');
        $(".bg_ground").show();
    } else {
        window.location.href = 'dlg://share'
            + '?title= "看病难？立即在这里雇佣中医名家"'
            + '&msg="名家坐镇，在线辨证"'
            + '&img=http://s.chengxinhutong.com/dds/img/gongren/dlg/logo/559561/s839450436430860288.png'
            + '&url=' + shareUrl
    }
}

function getWxKey() {
    $.ajax({
        async: false,
        url: "http://dlg.dalinggong.com/v_2_4/api/appHtmlRestApi/queryWchatShare",
        data: {
            format: "json",
            detailsUrl: window.location.href
        },
        type: 'post',
        success: function (data) {
            if (data.code == 0) {
                var wxData = data.data[0];
                wx.config({
                    debug: false,
                    appId: wxData.appid,
                    timestamp: wxData.timestamp,
                    nonceStr: wxData.noncestr,
                    signature: wxData.signature,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareQZone'
                    ]
                });
                wx.ready(function () {
                    var shareData = {
                        title: "看病难？立即在这里雇佣中医名家",
                        desc: "名家坐镇，在线辨证",
                        link: "",
                        imgUrl: wxData.userLogo,
                        success: function (res) {
                        },
                        cancel: function (res) {
                        },
                        fail: function (res) {
                        }
                    };
                    wx.onMenuShareAppMessage(shareData);
                    wx.onMenuShareTimeline(shareData);
                    wx.onMenuShareQQ(shareData);
                    wx.onMenuShareQZone(shareData);
                    wx.onMenuShareWeibo(shareData);
                });
                wx.error(function (res) {
                    console.log(res);
                });
            } else {
                alert(data.msg);
            }
        },
        error: function (e) {
            console.log(e.message);
        }
    })
}

function hideModal(obj) {
    $(obj).hide();
}

function hireBtn() {
    var ua = window.navigator.userAgent.toLowerCase();
    var shareUrl = encodeURIComponent(window.location.href);
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        _hmt.push(['_trackEvent', 'link', 'register']);
        window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=gongren.com.dlg"
    } else {
        var serviceId = "27902775234148798626148953900";
        switch (getQueryVariablex("id")) {
            case "1":
                serviceId = "27902789936203825372661591970";
                break;
            case "2":
                serviceId = "27902797757623312625511477202";
                break;
            default:
                serviceId = "27902775234148798626148953900";
                break;
        }
        window.location.href = 'dalinggong://serviceDetail?serviceId='+serviceId;
    }
}

function changeImg() {
    /*获取图片和索引的数组*/
    var $imgs = $("#ad_img li");
    var $nums = $("#ad_num li");

    var isStop = false;
    var index = 0;

    $nums.eq(index).addClass("numsover");
    $nums.eq(index).siblings().removeClass("numsover");
    $imgs.eq(index).show();

    /*鼠标悬停在数字上的事件*/
    $nums.mouseover(function () {
        isStop = true;
        /*先把数字的背景改了*/
        $(this).addClass("numsover").siblings().removeClass("numsover");

        /*图片的索引和数字的索引是对应的，所以获取当前的数字的索引就可以获得图片，从而对图片进行操作*/
        index = $nums.index(this);
        $imgs.eq(index).show();
        $imgs.eq(index).siblings().hide();
    }).mouseout(function () {
        isStop = false
    });
    /*设置循环*/
    setInterval(function () {
        if (isStop) return;
        if (index >= 5) index = -1;
        index++;

        $nums.eq(index).addClass("numsover").siblings().removeClass("numsover");

        $imgs.eq(index).show();
        $imgs.eq(index).siblings().hide();

    }, 2000);
}
var jsonDatas={
    "lists":[
        {
            "url":"./detail.html?id=",
            "img":"./static/images/img1.png",
            "name":"李鸿飞",
            "job":"中医医师",
            "desc":"颈椎腰椎，关节炎肩周炎，胃病、肝病和肾病，痛经，心脑血管疾病，疾病预防",
            "detail":"李鸿飞，宫廷御医传人，2010年开创六经八位治疗体系。采用五行辨证法配以独门药方诊治多种疾病，治愈率高。"
        }
    ],
    "detailLists":[
        {
            "img":"./static/images/img1.png",
            "name":"李鸿飞",
            "job":"中医医师",
            "desc":"肩颈腰椎病，关节炎治疗",
            "serviceDesc":"采用祖传秘方治疗肩颈腰椎病。针对各类急慢性关节病有奇效。下单后立即开始诊疗，愈后付款，无效不收取任何额外费用。",
            "detail":"李鸿飞，宫廷御医传人，2010年开创六经八位治疗体系。采用五行辨证法配以独门药方诊治多种疾病，治愈率高。"
        },{
            "img":"./static/images/img1.png",
            "name":"李鸿飞",
            "job":"中医医师",
            "desc":"胃病，肝病肾病，痛经治疗",
            "serviceDesc":"采用五行脏腑辨证配以家传汤剂诊治各种脏腑疾病，如胃病、肝病、肾病及痛经，需要病人未动过相关手术。下单后立即开始诊疗，愈后付款，无效不收取任何额外费用。",
            "detail":"李鸿飞，宫廷御医传人，2010年开创六经八位治疗体系。采用五行辨证法配以独门药方诊治多种疾病，治愈率高。"
        },
        {
            "img":"./static/images/img1.png",
            "name":"李鸿飞",
            "job":"中医医师",
            "desc":"心脑血管病，疾病预防",
            "serviceDesc":"采用六经八位治疗体系诊治各类心脑血管病。独创十二流注经络调理配方能有效增强机体免疫力，预防疾病发生。下单后立即开始诊疗，愈后付款，无效不收取任何额外费用。",
            "detail":"李鸿飞，宫廷御医传人，2010年开创六经八位治疗体系。采用五行辨证法配以独门药方诊治多种疾病，治愈率高。"
        }
    ],
    "details":[
        {
            "img":"./static/images/1.png",
            "name":"王**",
            "num":3,
            "desc":"医生非常耐心！",
            "time":"2017-11-30"
        },
        {
            "img":"./static/images/2.png",
            "name":"周**",
            "num":4,
            "desc":"肩周炎困扰了我12年之久，经过医生的治疗，感觉非常舒服！",
            "time":"2017-11-30"
        },
        {
            "img":"./static/images/3.png",
            "name":"谭**",
            "num":5,
            "desc":"抱着试试的态度来的，真的有效",
            "time":"2017-11-30"
        },
        {
            "img":"./static/images/4.png",
            "name":"李**",
            "num":3,
            "desc":"谢谢医生！",
            "time":"2017-11-30"
        },
        {
            "img":"./static/images/5.png",
            "name":"吴**",
            "num":3,
            "desc":"慢性肝病真的很麻烦，好在治疗几次有了效果",
            "time":"2017-11-30"
        },
        {
            "img":"./static/images/6.png",
            "name":"赵**",
            "num":5,
            "desc":"公司里10个有5个肩颈不舒服，已经推荐给他们了",
            "time":"2017-11-30"
        },
        {
            "img":"./static/images/7.png",
            "name":"包**",
            "num":5,
            "desc":"医生用的药材都很好！",
            "time":"2017-11-30"
        },
        {
            "img":"./static/images/8.png",
            "name":"丁**",
            "num":4,
            "desc":"预约等了挺久，不过有效果也值了",
            "time":"2017-11-30"
        },
        {
            "img":"./static/images/9.png",
            "name":"杨**",
            "num":3,
            "desc":"有没有治疗癌症的医师？急需",
            "time":"2017-11-30"
        },
        {
            "img":"./static/images/10.png",
            "name":"蒋**",
            "num":3,
            "desc":"很有效，都是老中医啊",
            "time":"2017-11-30"
        },
        {
            "img":"./static/images/11.png",
            "name":"孙**",
            "num":3,
            "desc":"暂时控制住了，病情会反复吗？",
            "time":"2017-11-30"
        },
        {
            "img":"./static/images/12.png",
            "name":"王**",
            "num":3,
            "desc":"西医治标，中医治本",
            "time":"2017-11-30"
        },
        {
            "img":"./static/images/13.png",
            "name":"张**",
            "num":5,
            "desc":"感觉不错，哈哈",
            "time":"2017-11-30"
        }
    ]
}
