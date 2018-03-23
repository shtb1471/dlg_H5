/**
 * Created by lenovo on 2017/6/29.
 */
//截取url参数
var userId = GetRequest()['userId'];
var sid = GetRequest()['sid'];
var cid = GetRequest()['cid'];
var cidUPimg = GetRequest()['cidUPimg'];

//驳回信息
$.ajax({
    type:'POST',
    url:loginUrl+'/api/zw/userHandApi/checkRejectInfo',
    data:{
        userId:userId,
        sid:sid,
        rejectStatus:"0"
    },
    beforeSend:function(){ $('#pload').show();},
    complete:function(){ $('#pload').hide();},
    success:function (vals) {
        if(vals.code == "0"){
            for(var i=0;i<vals.data.length;i++){
                var dataLists = vals.data[i];
                if(dataLists.imgType == "0"){
                    $('.rejectHint span').text(dataLists.rejectReason);
                    //驳回图片
                    $('.succeed_hint').css({background:'url('+ dataLists.imgUrl +')no-repeat center',backgroundSize:'100%'});
                }
            }
        }
    },
    error:function () {console.log('请求失败'); }
});


/*======================重新拍照======================*/

$('#rejectPhotograph').click(function () {

    //查询用户性别
    $.ajax({
        type:'POST',
        url:loginUrl+'/api/zw/userHandApi/querySex',
        data:{
            userId:userId,
            sid:sid,
        },
        success:function (vals) {
            if(vals.code == "0"){
               console.log()
                if(vals.existSex != true){
                    window.location.href =
                         'sex.html?_='+new Date().getTime()+
                         '&cidUPimg='+cidUPimg+
                         '&userId='+userId+
                         '&sid='+ sid +
                         '&cid='+ cid;//性别选择
                }else{
                    window.location.href =
                        'rightZ_photograph.html?_=' + new Date().getTime() +
                        '&userId=' + userId +
                        '&sid=' + sid +
                        '&cid=' + cid+
                        '&cidUPimg='+cidUPimg;//右手掌
                }
            }
        },
        error:function () { console.log('请求失败');}
    });

});


