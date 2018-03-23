/**
 * Created by lenovo on 2016/11/24.
 */
var access_token = GetRequest()["access_token"];//获取app进来sid
var userid = GetRequest()["userid"];//从分享页面uid
var cid = 'ZW-27582764699958629429945054803',
cidUPimg = '27582764699958629429945054803';//拍手cid
$(window).on('resize', function () {
    $('.swiper-slide,.swiper-container').css({height: $(window).height()})
    document.getElementById('login_form').scrollIntoView(true);
})
$('.swiper-slide,.swiper-container').css({height: $(window).height()})

var mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    lazyLoading: true,
    mousewheelControl: true,
    watchSlidesProgress: true,
    paginationClickable: true,
    nextButton: '.swiper-button-next',
});
//登入sso接口
// var testUrl = 'http://test2.dalinggong.com';//测试
// var testUrl = 'http://sso3.dalinggong.com';//预发布
// var testUrl = 'http://dlg.dalinggong.com/v_2_4';//线上

$(function(){
    $('.swiper-container').hide();
    $('#pload').show();
    if(userid){
        handResult_ajax()
    }else{
        // window.location.href='dlg://Invite';
        window.location.href='dalinggong://login';
    }
})
//登录后——判断有无测验
function handResult_ajax() {
    $.ajax({
        data: 'get',
        url: loginUrl + '/zw/user/'+userid+'/zw/result',
        dtatType: 'json',
        beforeSend: function () {
            $('#pload').show();
            $('.swiper-container').hide();
        },
        success: function (datas) {
            var data=JSON.parse(datas).body;
            var status = data.data.status;
            var userid = data.data.userid;
            $('#pload').hide();
            if(status =='0'){
                window.location.href = 'sex.html?userid=' + userid+"&access_token="+access_token+"&_lt="+ new Date().getTime();
            }else if(status =='1'){
                window.location.href = 'Processing.html?userid=' + userid+"&access_token="+access_token+"&_lt="+ new Date().getTime();
            }else if(status =='2'){
                window.location.href = 'testResults.html?userid=' + userid+"&access_token="+access_token+"&_lt="+ new Date().getTime();
            }else if(status =='3'){
                alert("驳回原因："+data.data.reason);
                window.location.href = 'sex.html?userid=' + userid+"&access_token="+access_token+"&_lt="+ new Date().getTime();
            }
        },
        error: function () {
            console.log('请求失败');
        }
    })
}
