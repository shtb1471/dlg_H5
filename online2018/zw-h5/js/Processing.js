/**
 * Created by lenovo on 2017/6/16.
 */
$(function () {
    var userid = GetRequest()['userid'];
    var access_token = GetRequest()['access_token'];
    var cidUPimg = GetRequest()['cidUPimg'];
    //刷新
   $('.nullcontent').click(function () {
        $('.succeed_main').hide();//window.location.reload(true);
        setTimeout(function () {
            $('.succeed_main').show();
            todoIsRefuse();
        }, 100)
    });

    //判断有无驳回
    function todoIsRefuse() {
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

    //待处理人数
    function handleCount_ajax() {
        $.ajax({
            data: 'POST',
            url: loginUrl + '/api/zw/userHandApi/handleCount',
            data: {userId: userid, sid: access_token},
            dataType: 'json',
            success: function (datas) {
                if (datas.code == "0") {
                    $('.url strong').text(datas.data);
                    console.log(datas.data);
                    if (datas.data == 0) {
                        $('.url').html('真我的真，源自1对1真人解析服务<br/>正在处理您的手相~ 耐心等待！<div class="attachText">预计30分钟<span>处理时间为法定工作日：9:00~18:00</span><em>点击屏幕刷新</em></div>');
                    }
                }

            },
            error: function () { console.log('请求失败'); }
        });
    }
});