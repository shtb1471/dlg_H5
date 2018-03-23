/**
 * Created by lenovo on 2016/10/31.
 */
var RegEx = {
    "chinese": /^[\u2E80-\u9FFF]+$/, //中文
    "username": /^(\w|[-.@]){6,50}$/,//账号
    "password": /^[A-za-z0-9]{6,16}$/,//密码(字母数字组合)
    "telephone": /^(\d{3,4}-)?\d{7,8}$/, //座机号
    "email": /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,//电子邮箱
    "number": /^([1-9]\d*|0)$/,//正整数
    "doubleNumber": /^(-?[1-9]\d*|0)$/,//正整数
    "english": /^[A-Za-z]+$/,//英文
    "idCard": /^\d{15}(\d{2}[0-9xX])?$/, //身份证号
    "ems": /^[1-9]\d{5}(?!\d)$/, //邮政编码
    'xx_phone': /^1[3|4|5|7|8]\d{9}$/,
    'xx_idCard': "^\d{15}$)|(^\d{17}([0-9]|X)$",
    'xx_number': /^[0-9]*$/,
    'xx_num_string': /^[A-Za-z0-9]+$/
}

//验证码验证
function verifyArray(number, regx) {
    return regx.test(number);
}


//倒计时60s;
var fixTime = 59;
var getTime = function (obj) {
    if (fixTime == 0) {
        $(obj).prop("disabled", false);
        $(obj).html("验证码");
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
