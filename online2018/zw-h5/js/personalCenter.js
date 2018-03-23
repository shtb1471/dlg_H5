/**
 * Created by lenovo on 2017/6/28.
 */

$(function () {

    var personalityId = GetRequest()['contentId'];
    var uid = GetRequest()['uid'];
    var sid = GetRequest()['sid'];
    var cid = GetRequest()['cid'];
    var myTest = $('.testResults_btn button');
    // myTest.attr('disabled',true);//禁用按钮

        $.ajax({
            type:'POST',
            url:loginUrl+'/api/zw/personalityInfoApi/getDetail',
            data:{
                contentId:personalityId,
                sid:sid,
                userId:uid
            },
            beforeSend:function(){ $('#pload').show();},
            complete:function(){ $('#pload').hide();},
            success:function (datas) {

                if(datas.code == "0"){
                    var banlvList = [];
                    $('.text').text(datas.personality.name);

                    // 判断是否为null
                    if(datas.user.username != null){
                        $('#centerInfo span:first-child').text(datas.user.username);
                    }else{
                        $('#centerInfo span:first-child').text('');
                    }

                    var sex = datas.personality.sex;

                    switch (sex){
                        case 1:
                            $('#centerInfo i').removeClass('icon-xingbienv').addClass('icon-xingbienan');
                            break;
                        case 2:
                            $('#centerInfo i').removeClass('icon-xingbienan').addClass('icon-xingbienv');
                            break;
                        case 3:
                            $('#centerInfo i').removeClass('icon-xingbienan','icon-xingbienv').css({width:'auto',background:'none'}).text('保密');
                            break;
                    }
                    //头像渲染
                    for (var i = 0; i < datas.data.length; i++) {
                        var dataLists = datas.data[i];
                        var imgType = dataLists.imgType//imgType状态判断

                        if (imgType == "4") {
                            $('.headPordrait span.headImg').css({
                                background:'url('+dataLists.imgUrl+')no-repeat center',
                                backgroundSize: '100% 100%'
                            });
                        }
                    }

                    //数据渲染
                    if(datas.infoRestVo.length != "1"){
                        for (var i = 0; i < datas.infoRestVo.length; i++) {
                            var dataLists = datas.infoRestVo[i];
                            banlvList.push('<h4 style="padding-bottom: .3rem;">'+dataLists.title+'</h4><div class="charac" style="padding-bottom: 1rem;">'+dataLists.content+'</div>');
                        }
                        $('.character').html(banlvList.join(''));

                    }else{
                        $('.character h4').text(datas.infoRestVo[0].title);
                        $('.character .charac').html(datas.infoRestVo[0].content);
                    }

                }
            },
            error:function () { console.log('请求失败'); }
        })

    //点击我也要测
    myTest.click(function () {
        window.location.href = 'login.html?_='+new Date().getTime()+'&userId='+uid+'&cid='+cid+'&recommendedUserId='+uid;//登录
    });

});

/*//个人中心提示
 var personalC_hint = $('<div>').html('<div class="personalCenter_hint"><img src="images/personalCenter_hint.png"></div>');
 $('body').append(personalC_hint);*/
/*//点击隐藏提示
 $(window.document).click(function () {
 $('.personalCenter_hint').hide();
 myTest.attr('disabled',false);
 });*/
