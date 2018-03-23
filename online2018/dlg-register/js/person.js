// var urlnum="https://dlg.dalinggong.com/v_2_4";
var urlnum = 'http://api.dalinggong.com'
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
    if(typeof(paramVal)=="undefined" || typeof(paramVal)==undefined){
      paramVal = "";
    }
    return paramVal;
  }
  var sharekey = getUrl('sharekey');
  var inviter = getUrl('inviter');
  var parentUserId= getUrl('parentUserId');
  var parentusername= getUrl('username');
  var inviterPhone = getUrl('inviterPhone')
  var inviterType = getUrl("inviterType")
  var activityId = getUrl("activityId")
  var invitationType = getUrl('invitationType')
  var srcUserPhone = getUrl('srcUserPhone')
  var srcUserId = getUrl('srcUserId')
// 截图url上面的字段
function companyRegister(){
  window.location.href="company.html?sharekey="+sharekey;
}
function personRegister(){
  window.location.href="person.html?sharekey="+sharekey;
}
 $(function(){
   getImgcode();
   $.ajax({
            async:false,
            url:urlnum+'/share/inviterinfo',
            type:'get',
            dataType:'json',
            // jsonp:'callback',
            data:{sharekey:sharekey,source:'web'},
            success: function (data) {
              console.log(data,'data');
                  if (data.status == 200 && data.body.code == 'SUCCESS') {
                        $("#person").text(data.body.data.name);
                        inviter=data.body.data.userid;
                  }else {
                     layer.open({
                              content:data.body.msg
                              ,skin: 'msg'
                              ,style:'position:relative;top:-2rem;font-size:0.22rem;'
                              ,time: 3 //2秒后自动关闭
                            });
                  }
              },
            error:function(XMLHttpRequest,textStatus,errorThrown){

            }
        });
 });
$("#imgvalidma").click(function(){
  getImgcode();
});
function getImgcode(){
  $("#imgvalidmaimg").attr("src",urlnum+'/sys/vcode?'+new Date());
};
  var countdown=59;
  function settime(obj) {
      if (countdown == 0) {
          obj.removeAttribute("disabled");
          obj.value="获取验证码";
          countdown = 59;
          return;
      } else {
          obj.setAttribute("disabled", true);
          obj.value="重新发送(" + countdown + ")";
          countdown--;
      }
      setTimeout(function() {
              settime(obj) }
          ,1000)
  }
   $('#validma').click(function(){
            var phone=$('#phonetest').val();
            var imgvalidmaValue=$('#imgvalidmaValue').val().trim();
            var extra = $(".err1").text();
            var btn = document.getElementById('validma');
             if(phone==""){
                 // $(".err").html('<span>i</span>手机号不能为空')
                  layer.open({
                              content:'手机号不能为空'
                              ,skin: 'msg'
                              ,style:'position:relative;top:-2rem;font-size:0.22rem;'
                              ,time: 3 //2秒后自动关闭
                            });
                return false;
            }else if(!(/^1[34578]\d{9}$/.test(phone))){
            	// $(".err").html('<span>i</span>手机号码有误，请重填')
              layer.open({
                              content:'手机号码有误，请重填'
                              ,skin: 'msg'
                              ,style:'position:relative;top:-2rem;font-size:0.22rem;'
                              ,time: 3 //2秒后自动关闭
                            });
                return false;
            }else if(imgvalidmaValue==""){
            	// $(".err").html('<span>i</span>图文验证码不能为空')
               layer.open({
                              content:'图文验证码不能为空'
                              ,skin: 'msg'
                              ,style:'position:relative;top:-2rem;font-size:0.22rem;'
                              ,time: 3 //2秒后自动关闭
                            });
                return false;
            }else{
            $("#validmaValue").val("");
                 $.ajax({
                  url: urlnum+'/sys/sendsmscode',
                  type: 'post',
                  data: {phone: phone,vcode:imgvalidmaValue},
                  dataType: 'json',
                  timeout: '1000',
                  cache: 'false',
                  success: function (data) {
                      if (data.status == 200 && data.body.code == 'SUCCESS') {
                          settime(btn);
                          // $(".err").html('<span>i</span>'+data.body.msg)
                           layer.open({
                              content:data.body.msg
                              ,skin: 'msg'
                              ,style:'position:relative;top:-2rem;font-size:0.22rem;'
                              ,time: 3 //2秒后自动关闭
                            });
                      }else {
                          getImgcode();
                          $("#imgvalidmaValue").val("")
                          // $(".err").html('<span>i</span>'+data.body.msg);
                          layer.open({
                              content:data.body.msg
                              ,skin: 'msg'
                              ,style:'position:relative;top:-2rem;font-size:0.22rem;'
                              ,time: 3 //2秒后自动关闭
                            });
                      }
                  }
              })
             }
          });
        
       $('.btnsubmit').click(function(){ 
       	  var username=$("#username").val();
          // var name=$("#name").val();
          var phone=$('#phonetest').val();
          var imgvalidmaValue=$('#imgvalidmaValue').val().trim();
          var validma = $("#validmaValue").val();
			     if(phone==""){
            	// $(".err").html('<span>i</span>手机号不能为空')
              layer.open({
                              content:'手机号不能为空'
                              ,skin: 'msg'
                              ,style:'position:relative;top:-2rem;font-size:0.22rem;'
                              ,time: 3 //2秒后自动关闭
                            });
                return false;
            }else if(!(/^1[34578]\d{9}$/.test(phone))){
            	// $(".err").html('<span>i</span>手机号码有误，请重填')
              layer.open({
                              content:'手机号码有误，请重填'
                              ,skin: 'msg'
                              ,style:'position:relative;top:-2rem;font-size:0.22rem;'
                              ,time: 3 //2秒后自动关闭
                            });
                return false;
            }else if(imgvalidmaValue==""){
            	// $(".err").html('<span>i</span>图文验证码不能为空')
              layer.open({
                              content:'图文验证码不能为空'
                              ,skin: 'msg'
                              ,style:'position:relative;top:-2rem;font-size:0.22rem;'
                              ,time: 3 //2秒后自动关闭
                            });
                return false;
            }else if(validma==""){
            	// $(".err").html('<span>i</span>验证码不能为空')
              layer.open({
                              content:'验证码不能为空'
                              ,skin: 'msg'
                              ,style:'position:relative;top:-2rem;font-size:0.22rem;'
                              ,time: 3 //2秒后自动关闭
                            });
                return false;
          /*  }
            else if(!(/^\d{6}$/.test(validma))){
            	// $(".err").html('<span>i</span>验证码输入不对')
              layer.open({
                              content:'验证码输入不对'
                              ,skin: 'msg'
                              ,style:'position:relative;top:-2rem;font-size:0.22rem;'
                              ,time: 3 //2秒后自动关闭
                            });
                return false;*/
            }else{     
            //用户是否注册判断注册
            $.ajax({
                async:false,
                url:urlnum+'/auth/check',
                type:'post',
                dataType:'json',
                data:{"phone":phone},
                success:function(result){
                    if(result.body.code == 'REGISTERED'){
                        setTimeout(function(){
                               window.location.href="success.html?phone="+phone;
                               },2000)
                        }else{
                          // 用户未注册，调注册接口去注册
                         $.ajax({
                          async:false,
                          url:urlnum+'/auth/register',
                          type:'post',
                          dataType:'json',
                          data:{"phone":phone,"vcode":validma,"pwd":hex_md5("123456"),"clienttype":0,"channel":1,"inviter":inviter},
                          success:function(result){ 
                            if(result.body.code=='SUCCESS'){
                             //$(".err").html(result.body.msg);
                              setTimeout(function(){
                               window.location.href="success.html?phone="+phone;
                               },2000)
                                }else{
                                  // $(".err").html('<span>i</span>'+result.body.msg)
                                   layer.open({
                                      content:result.body.msg
                                      ,skin: 'msg'
                                      ,style:'position:relative;top:-2rem;font-size:0.22rem;'
                                      ,time: 3 //2秒后自动关闭
                                    });
                                }
                          }
                      })
                    }
                },
                error:function(XMLHttpRequest,textStatus,errorThrown){
                }
            });
            }
      
      });