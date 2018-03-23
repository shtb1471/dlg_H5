/**
 * Created by lenovo on 2017/6/13.
 */
//截取url参数
var userid = GetRequest()['userid'];
var access_token = GetRequest()['access_token'];
var personalityId = GetRequest()['personalityId'];
var suggestDel = GetRequest()['suggestDel'];
var ringFingerLength = GetRequest()['ringFingerLength'];
var indexFingerLength = GetRequest()['indexFingerLength'];
var bizhi = (ringFingerLength / indexFingerLength).toFixed(2);//比值
// $('.testResultsC').hide();//请求前隐藏页面

// 获取userid
function getUrl(type) {
    var url = document.URL;
    var url = decodeURIComponent(url)
    var x = url.split('?')[1].split('&');
    var json = {};
    for (var i = 0; i < x.length; i++) {
        var y = x[i].split('=');
        json[y[0]] = y[1];
    }
    var paramVal = decodeURI(json[type]);
    if (paramVal == "undefined" || typeof(paramVal) == undefined) {
        paramVal = "";
    }
    return paramVal;
}

$(function () {
    $("#double_character").hide();
    perinfoDetail_ajax();
})

//*===================获取测试结果======================*/
function perinfoDetail_ajax() {
    $.ajax({
        type: 'get',
        url: loginUrl + '/zw/user/' + userid + '/zw/result',
        beforeSend: function () {
            $('#pload').show();
        },
        complete: function () {
            $('#pload').hide();
        },
        success: function (datas) {
            var data = JSON.parse(datas).body;
            var touxiang = data.data.useravatar;
            var texthead = data.data.name;
            $('.texthead').html(texthead);
            $("#sex").val(data.data.gender);
            if (touxiang == '') {
                $('.headPordrait span.headImg').css({"background-image": "url(./images/userImg.jpg)"});
            } else {
                $('.headPordrait span.headImg').css({
                    background: 'url(' + touxiang + ')no-repeat center',
                    backgroundSize: '100% 100%'
                });
            }
            // 单性格
            var xinggeArr = [];//性格
            var nengliArr = [];//能力
            var youdianArr = [];//优点
            var quedianArr = [];//缺点
            var zhiyeArr = [];//职业
            var banlvArr = [];//伴侣
            var jianyiArr = [];//建议
            //双性格
            var xinggeArr1 = [];//性格
            var nengliArr1 = [];//能力
            var youdianArr1 = [];//优点
            var quedianArr1 = [];//缺点
            var zhiyeArr1 = [];//职业
            var banlvArr1 = [];//伴侣
            var jianyiArr1 = [];//建议

            data.data.zwinfo.forEach(function (zwinfo, i) {
                if (i == 0) {
                    xinggeArr.push('<p class="textIndent">' + zwinfo.nature + '</p>');
                    $('#xingge .text div').html(xinggeArr.join('')); //性格
                    nengliArr.push('<p class="textIndent">' + zwinfo.ability + '</p>');
                    $('#nengli .text div').html(nengliArr.join(''));  //能力

                    if (zwinfo.virtue != "") {
                        youdianArr.push('<p class="textIndent">' + zwinfo.virtue + '</p>');
                        $('#youdian .text div').html(youdianArr.join(''));  //优点
                    } else {
                        $('#youdian .text div').html("把性格特点和能力特点分享到朋友圈即可查看");
                    }
                    if (zwinfo.disadvantages != "") {
                        quedianArr.push('<p class="textIndent">' + zwinfo.disadvantages + '</p>');
                        $('#quedian .text div').html(quedianArr.join('')); //缺点
                    } else {
                        $('#quedian .text div').html("上传完整的右手背照片即可查看 <em onclick='uploadImg(this)'>>上传</em>"); //缺点
                    }
                    if (zwinfo.suitablejob != "") {
                        zhiyeArr.push('<p class="textIndent">' + zwinfo.suitablejob + '</p>');
                        $('#zhiye .text div').html(zhiyeArr.join('')); //职业
                    } else {
                        $('#zhiye .text div').html("上传完整的左手掌照片即可查看 <em onclick='uploadImg(this)'>>上传</em>"); //职业
                    }
                    banlvArr.push('<p class="textIndent">' + zwinfo.perfectcouple + '</p><br/><p class="textIndent">' + zwinfo.notsuitablecouple + '</p>');
                    $('#banlv .text div').html(banlvArr.join('')); //伴侣

                    if (zwinfo.getalong != "") {
                        jianyiArr.push('<p class="textIndent">' + zwinfo.getalong + '</p>');
                        $('#jiayi .text div').html(jianyiArr.join('')); //建议
                    } else {
                        $('#jiayi .text div').html("上传完整的左手背照片即可查看 <em onclick='uploadImg(this)'>上传</em>"); //建议
                    }
                }
                if (data.data.zwinfo.length > 1) {
                    $("#double_character").show();
                    $("#double_character li").eq(i).html(zwinfo.name);
                    $(".menu-left").css({"top": "10.9rem"});
                    $(".menu-right").css({"margin-top": "10.9rem"});
                } else {
                    $(".menu-left, .menu-right").css({"top": "7.9rem"});
                }
                if (i == 1) {
                    var zwinfo = data.data.zwinfo[i];
                    xinggeArr1.push('<p class="textIndent">' + zwinfo.nature + '</p>');
                    $('#xingge_02 .text div').html(xinggeArr1.join('')); //性格
                    nengliArr1.push('<p class="textIndent">' + zwinfo.ability + '</p>');
                    $('#nengli_02 .text div').html(nengliArr1.join(''));  //能力

                    if (zwinfo.virtue != "") {
                        youdianArr1.push('<p class="textIndent">' + zwinfo.virtue + '</p>');
                        $('#youdian_02 .text div').html(youdianArr1.join(''));  //优点
                    } else {
                        $('#youdian_02 .text div').html("把性格特点和能力特点分享到朋友圈即可查看");
                    }
                    if (zwinfo.disadvantages != "") {
                        quedianArr1.push('<p class="textIndent">' + zwinfo.disadvantages + '</p>');
                        $('#quedian_02 .text div').html(quedianArr1.join('')); //缺点
                    } else {
                        $('#quedian_02 .text div').html("上传完整的右手背照片即可查看 <em onclick='uploadImg(this)'>>上传</em>"); //缺点
                    }
                    if (zwinfo.suitablejob != "") {
                        zhiyeArr1.push('<p class="textIndent">' + zwinfo.suitablejob + '</p>');
                        $('#zhiye_02 .text div').html(zhiyeArr1.join('')); //职业
                    } else {
                        $('#zhiye_02 .text div').html("上传完整的左手掌照片即可查看 <em onclick='uploadImg(this)'>>上传</em>"); //职业
                    }
                    banlvArr1.push('<p class="textIndent">' + zwinfo.perfectcouple + '</p><br/><p class="textIndent">' + zwinfo.notsuitablecouple + '</p>');
                    $('#banlv_02 .text div').html(banlvArr1.join('')); //伴侣

                    if (zwinfo.getalong != "") {
                        jianyiArr1.push('<p class="textIndent">' + zwinfo.getalong + '</p>');
                        $('#jiayi_02 .text div').html(jianyiArr1.join('')); //建议
                    } else {
                        $('#jiayi_02 .text div').html("上传完整的左手背照片即可查看 <em onclick='uploadImg(this)'>上传</em>"); //建议
                    }
                }
            })

        },
        error: function () {
            console.log('请求失败');
        }
    })
}

$("#double_character li").click(function () {
    var index = $(this).index();
    console.log(index);
    $("#double_character li").removeClass('liactive');
    $(this).addClass('liactive');
    $(".con").hide();
    $(".con").eq(index).show();
})
//app下载
$('.testResults_btn input').click(function () {
    window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=gongren.com.dlg';
});

/*===================tab切换======================*/
// tabSwitchover('.testResultsCenter_title li','liactive','.con');//双性格title切换
tabSwitchover('#sidebar ul li', 'active', '.menu-right');//leftList切换
tabSwitchover('#sidebar_02 ul li', 'active', '.center_02 section');//leftList切换

function tabSwitchover(list, active, content) {
    $(list).click(function () {
        $(this).addClass(active).siblings('li').removeClass(active);
        var index = $(this).index();
        $(content).eq(index).show().siblings(content).hide();
    })
}

function uploadImg(obj) {
    var title = $(obj).parents().parents().siblings('h5').text();
    switch (title) {
        case "缺点":
            window.location.href = 'rightF_photograph.html?_=' + new Date().getTime() + '&userid=' + userid + '&access_token=' + access_token + "&sex=" + $("#sex").val();
            break;
        case "职业":
            window.location.href = 'leftZ_photograph.html?_=' + new Date().getTime() + '&userid=' + userid + '&access_token=' + access_token + "&sex=" + $("#sex").val();
            break;
        case "建议":
            window.location.href = 'leftF_photograph.html?_=' + new Date().getTime() + '&userid=' + userid + '&access_token=' + access_token + "&sex=" + $("#sex").val();
            break;
    }
}