//    Get graphical validation code
var url = "http://test2.dalinggong.com"
function getImgVerifyCode() {
    $.ajax({
        url: url + '/api/userLoginRestApi/createImageCode?format=json',
        type: 'post',
        success: function (data) {
            if (data.code == 0) {
                $("#imgCode").attr("src", data.data[0]);
                $("#imgKey").val(data.extra);
            }
        },
        error: function (e) {
            console.log(e.message);
        }
    })
}
//    input whether or not it is empty
function errorMsg(txt) {
    $("#errMsg").html(txt).show();
    setTimeout(function () {
        $("#errMsg").hide();
    }, 2000);
}
function submitCheck() {
    if (todoCheck()) {
        if ($("#verifyCode").val() == "") {
            errorMsg('请输入验证码');
            $("#verifyCode").val("").focus();
            return false;
        }
        return true;
    }
    ;
}
function todoCheck() {
    if ($("#name").val() == "") {
        errorMsg('请输入姓名');
        $("#name").focus();
        return false;
    }
    if ($("#idCard").val() == "" || !/^\d{15}(\d{2}[0-9xX])?$/.test($("#idCard").val())) {
        errorMsg('请输入正确身份证号');
        $("#idCard").focus();
        return false;
    }
    if ($("#phone").val() == "" || !/^1[34578]\d{9}$/.test($("#phone").val())) {
        console.log("1")
        errorMsg('请输入正确手机号');
        $("#phone").val("").focus();
        return false;
    }
    if ($("#verifyImgCode").val() == "") {
        errorMsg('验证码');
        $("#verifyImgCode").focus();
        return false;
    }
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
            'top': top,
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
        getTime(obj);
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
                    $("#imgCode").attr("src", data.data[0]);
                }
            },
            error: function (e) {
                console.log(e.message);
            }
        })
    }

}
function submitInfo() {
    var dataJson={
        name: $("#name").val(),
        tel: $("#phone").val(),
        idcard: $("#idCard").val(),
        canalNumber: "0553WHW01",
        vaildCode: $("#verifyCode").val(),
    };
    if (submitCheck()) {
        $.ajax({
            url: url + "/api/activityRestApi/register?format=json",
            type: "post",
            data: dataJson,
            success: function (data) {
                if(data.code==0){
                    showAll('#model', '#modal-box');
                }else{
                }
            },
            error: function (e) {
                errorMsg(e.msg);
            }
        })
    }

}