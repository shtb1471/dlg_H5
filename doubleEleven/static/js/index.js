//    Get graphical validation code
var url = "http://dlg.dalinggong.com/v_2_4";
var webUrl="http://ent.dalinggong.com/active/1111";
function getQueryVariable(variable) {
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
function todoJudgeLength(obj) {
    if($(obj).val().length>11){
        return $(obj).val($(obj).val().substr(0,11));
    }
}
function getImgVerifyCode() {
    $.ajax({
        url: url + '/api/userLoginRestApi/createImageCode?format=json',
        type: 'post',
        success: function (data) {
            if (data.code == 0) {
                $("#imgCode").attr("src", data.data[0]);
                $("#imgKey").val(data.extra);
            }else{
                alert(data.msg);
            }
        },
        error: function (e) {
            console.log(e.message);
        }
    })
}

//    input whether or not it is empty
function errorMsg(obj, txt) {
    $("span").css("opacity", 0);
    obj.parents("label").siblings("span").html("<img src='static/images/warning.png' style='width: 14px;'/>" + txt).css("opacity", 1);
}

function submitCheck() {
    if (todoCheck()) {
        if ($("#verifyCode").val() == "") {
            errorMsg($("#verifyCode"), '请输入验证码');
            $("#verifyCode").val("").focus();
            return false;
        }
        $("span").css("opacity", 0);
        return true;
    };
}

function todoCheck() {
    if ($("#name").val() == "") {
        errorMsg($("#name"), '请输入企业名称');
        $("#name").focus();
        return false;
    }
    if ($("#username").val() == "") {
        errorMsg($("#username"), '请输入企业联系人');
        $("#username").focus();
        return false;
    }
    if ($("#phone").val() == "" || !/^1[34578]\d{9}$/.test($("#phone").val())) {
        errorMsg($("#phone"), '请输入正确企业手机号');
        $("#phone").focus();
        return false;
    }
    if ($("#registerPhone").val() == "" || !/^1[34578]\d{9}$/.test($("#registerPhone").val())) {
        errorMsg($("#registerPhone"), '请输入正确奖金绑定手机号');
        $("#registerPhone").focus();
        return false;
    }
    if ($("#verifyImgCode").val() == "") {
        errorMsg($("#verifyImgCode"), '请输入正确图形验证码');
        $("#verifyImgCode").focus();
        return false;
    }
    $("span").css("opacity", 0);
    return true;
}
//    modal
//让指定的DIV始终显示在屏幕正中间
function letDivCenter(divName, content) {

    var top = ($(window).height() - $(content).height()) / 2;

    var left = ($(window).width() - $(content).width()) / 2;

    $(divName).html($(content).html()).css(
        {
            position: 'fixed',
            'top': 0,
            left: 0,
            right: 0
        }
    ).show();
}

function showMask() {
    $("#mask").css("height", $(document).height());
    $("#mask").css("width", $(document).width());
    $("#mask").show();
}

//显示遮盖层 start
function showAll(divName, serviceInfo) {
    showMask();
    letDivCenter(divName, serviceInfo);
}

//隐藏遮盖层 start
function hideAll(divName) {
    $("#mask").hide();
    $(divName).hide();
    window.location.reload();
}

//倒计时60s
var fixTime = 59;
function getTime(obj) {
    if (fixTime == 0) {
        $(obj).prop("disabled", false);
        $(obj).html("获取验证码");
        fixTime = 59;
    } else {
        $(obj).prop("disabled", true);
        $(obj).html("重发(" + fixTime + ")");
        fixTime--;
        setTimeout(function () {
            getTime(obj)
        }, 1000)
    }
}

//    SMS check
function getVerifyCode(obj) {
    if (todoCheck()) {
        $.ajax({
            url: url + '/api/smsRest/sendCode?format=json',
            type: 'post',
            data: {
                phone: $("#phone").val(),
                inputCode: $("#verifyImgCode").val(),
                key: $("#imgKey").val()
            },
            success: function (data) {
                if (data.code == 0) {
                    errorMsgBox("发送成功");
                    getTime(obj);
                }else{
                    errorMsgBox(data.msg);
                }
            },
            error: function (e) {
                console.log(e.message);
            }
        })
    }
}

//    input whether or not it is empty
function errorMsgBox(txt) {
    $("#errMsg").html(txt).show();
    setTimeout(function () {
        $("#errMsg").hide();
    }, 2000);
}

function submitInfo() {
    if (submitCheck()) {
        //用户是否注册判断注册
        $.ajax({
            url: url + '/verifyPhone',
            type: 'post',
            data: "format=json&phone=" + $("#phone").val() + "&type=2",
            success: function (result) {
                if (result.code != 0) {
                    var dataJson = {
                        name: $("#name").val(),
                        username: $("#username").val(),
                        phone: $("#phone").val(),
                        vaildCode: $("#verifyCode").val(),
                        userType: 2,
                        password: 123456,
                        client: "H5",
                        appVersion: "2.3.0",
                        activityId: "100013",
                        source: "register",
                        inviterType: 1,
                        inviterPhone: $("#registerPhone").val(),
                        srcUserPhone: getQueryVariable("inviterPhone"),
                        srcUserId: getQueryVariable("userId")
                    };
                    if (getQueryVariable("inviterPhone") == "" && getQueryVariable("userId") == "") {
                        dataJson.invitationType = "邀请";
                    } else {
                        dataJson.invitationType = "分享";
                    }
                    // 用户未注册，调注册接口去注册
                    $.ajax({
                        url: url + '/register?format=json',
                        type: 'post',
                        data: dataJson,
                        success: function (result) {
                            if (result.code == 0) {
                                errorMsgBox(result.msg);
                                window.location.href = "success.html?inviterPhone=" + $("#registerPhone").val();
                            } else {
                                errorMsgBox(result.msg);
                            }
                        }
                    })
                } else {
                    errorMsgBox(result.msg);
                }
            },
            error: function (e) {
                errorMsgBox(e);
            }
        });
    }
};
