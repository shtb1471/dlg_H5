/*** Created by lenovo on 2017/6/23.*/

//截取url参数
var userId = GetRequest()['userId'];
var sid = GetRequest()['sid'];
var cid = GetRequest()['cid'];
var cidUPimg = GetRequest()['cidUPimg'];

/*列表选中*/
$('#analystTabe li').on('click',function () {
    $(this).find('span').show();
    $(this).siblings().find('span').hide();
});

// submit确定
$('#exclusiveAnalystBtn').on('click',function () {

    var isSbumit = true;
    var jiaobiao = $('.jiaobiao').attr('style');

    if(jiaobiao == undefined){
        alert("请选择分析师");
        return false;
        isSbumit = false;
    }else{
        if(isSbumit == true){

            window.location.href =
                'Processing.html?_='+ new Date().getTime() +
                '&cidUPimg='+cidUPimg+
                '&userId='+userId+
                '&sid='+sid+
                '&cid='+cid;//处理中
        }
    }
});