/**
 * Created by lenovo on 2017/7/20.
 */
 // 获取sex
 function getUrl(type)
  { 
    var url=document.URL;
    var url=decodeURIComponent(url)
    var x=url.split('?')[1].split('&');
    var json={};
    for(var i=0;i<x.length;i++)
    {
      var y=x[i].split('=');
      json[y[0]]=y[1];
    }
    var paramVal = decodeURI(json[type]);
    if(paramVal=="undefined"|| typeof(paramVal)==undefined){
      paramVal = "";
    }
    return paramVal;
  }
$('.Btn').attr('disabled',true).css('background','#ddd');//禁用

$('.sex dd').on('click',function () {

    $('.Btn').attr('disabled',false).css('background','#ffb552');//启用
    if($(this).index() != 2){
        $(this).addClass('nan_active sexVal').siblings().removeClass('nv_active sexVal');
    }else{
        $(this).addClass('nv_active sexVal').siblings().removeClass('nan_active sexVal');
    }

})
$('.Btn').click(function () {
    var userid = getUrl('userid');
    var access_token = getUrl('access_token');
    var sexVal = $('.sexVal p').attr('aria-valuetext');//性别
    window.location.href='rightZ_photograph.html?sex='+sexVal+'&userid='+userid+'&access_token='+access_token+"&_lt="+new Date().getTime();
});