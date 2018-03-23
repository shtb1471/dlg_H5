// var urlnum="https://dlg.dalinggong.com/v_2_4";
var urlnum = 'http://api.dalinggong.com'
var jobid = localStorage["jobid"];
var worktimeindex = localStorage["worktimeindex"];
var shareuserid  = localStorage["shareuserid"];
var shareclienttype  = localStorage["shareclienttype"];
var work_time = localStorage["work_time"];
console.log(work_time);
 $(function(){
   getImgcode();
       $("#by").on("click",function(){
    var url=$("#by").attr("src");
    if(url=='./static/images/by.png'){
        $(this).attr('src','./static/images/y.png');
         var a = $('#password').attr('type');
         if(a = password){
            $('#password').attr('type','text');
        }
    }else{
        $(this).attr('src','./static/images/by.png');
        if(a != password){
        $('#password').attr('type','password');
        }
    }
    })
 });
 /*$('#phonetest').blur(function(){
	 var phonenumber=$('#phonetest').val();
      $.ajax({
         async:false,
         url:urlnum+'/auth/check',
         type:'post',
         dataType:'json',
         data:{"phone":phonenumber},
         error: function () {
             layer.open({
                                  content:'验证是否注册接口报错！'
                                  ,skin: 'msg'
                                  ,style:'position:relative;top:-2rem;'
                                  ,time: 2 //2秒后自动关闭
                                });
         },
         success:function(data){
           console.log(data);
             if(data.body.code == 'REGISTERED'){
             	//去登录
            	 layer.open({
                     content:'手机号不能为空'
                     ,skin: 'msg'
                     ,style:'position:relative;top:-2rem;'
                     ,time: 2 //2秒后自动关闭
                   });
            	 window.location.href = 'login.html';
             }
          }
	 })
 });*/
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
                              ,style:'position:relative;top:-2rem;'
                              ,time: 2 //2秒后自动关闭
                            });
                return false;
            }else if(!(/^1[34578]\d{9}$/.test(phone))){
              // $(".err").html('<span>i</span>手机号码有误，请重填')
              layer.open({
                              content:'手机号码有误，请重填'
                              ,skin: 'msg'
                              ,style:'position :relative;top:-2rem;'
                              ,time: 2 //2秒后自动关闭
                            });
                return false;
            }else if(imgvalidmaValue==""){
              // $(".err").html('<span>i</span>图文验证码不能为空')
               layer.open({
                              content:'图文验证码不能为空'
                              ,skin: 'msg'
                              ,style:'position:relative;top:-2rem;'
                              ,time: 2 //2秒后自动关闭
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
                              ,style:'position:relative;top:-2rem;'
                              ,time: 2 //2秒后自动关闭
                            });
                      }else {
                          getImgcode();
                          $("#imgvalidmaValue").val("")
                          // $(".err").html('<span>i</span>'+data.body.msg);
                          layer.open({
                              content:data.body.msg
                              ,skin: 'msg'
                              ,style:'position:relative;top:-2rem;'
                              ,time: 2 //2秒后自动关闭
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
          var pwd=$("#password").val();
           if(phone==""){
              // $(".err").html('<span>i</span>手机号不能为空')
              layer.open({
                              content:'手机号不能为空'
                              ,skin: 'msg'
                              ,style:'position:relative;top:-2rem;'
                              ,time: 2 //2秒后自动关闭
                            });
                return false;
            }else if(!(/^1[34578]\d{9}$/.test(phone))){
              // $(".err").html('<span>i</span>手机号码有误，请重填')
              layer.open({
                              content:'手机号码有误，请重填'
                              ,skin: 'msg'
                              ,style:'position:relative;top:-2rem;'
                              ,time: 2 //2秒后自动关闭
                            });
                return false;
            }else if(imgvalidmaValue==""){
              // $(".err").html('<span>i</span>图文验证码不能为空')
              layer.open({
                              content:'图文验证码不能为空'
                              ,skin: 'msg'
                              ,style:'position:relative;top:-2rem;'
                              ,time: 2 //2秒后自动关闭
                            });
                return false;
            }else if(validma==""){
              // $(".err").html('<span>i</span>验证码不能为空')
              layer.open({
                              content:'验证码不能为空'
                              ,skin: 'msg'
                              ,style:'position:relative;top:-2rem;'
                              ,time: 2 //2秒后自动关闭
                            });
                return false;
            }
            /*else if(!(/^\d{6}$/.test(validma))){
              // $(".err").html('<span>i</span>验证码输入不对')
              layer.open({
                              content:'验证码输入不对'
                              ,skin: 'msg'
                              ,style:'position:relative;top:-2rem;'
                              ,time: 2 //2秒后自动关闭
                            });
                return false;
            }*/
            else if(pwd.length<6||pwd.length>16){
                          layer.open({
                                          content:'请输入6-16位密码'
                                          ,skin: 'msg'
                                          ,style:'position:relative;top:-2rem;'
                                          ,time: 2 //2秒后自动关闭
                                        });
                            return false;
            }else{
            	//注册
                   $.ajax({
                          async:false,
                          url:urlnum+'/auth/register',
                          type:'post',
                          dataType:'json',
                          data:{"phone":phone,"vcode":validma,"pwd":hex_md5($("#password").val()),"clienttype":0,"channel":1},
                          error: function () {
                              layer.open({
                                                   content:data.body.msg
                                                   ,skin: 'msg'
                                                   ,style:'position:relative;top:-2rem;'
                                                   ,time: 2 //2秒后自动关闭
                                                 });
                          },
                          success:function(data){
                        	  console.log(data);
                            if(data.status == 200 && data.body.code == 'SUCCESS'){
                            	var userid = data.body.data.userid;
                                var access_token = data.body.data.access_token;
                                var allowschedule = localStorage["allowschedule"];
                                var message_json = {
                                		"userid" : userid,
                                		"messagetype" : "OPER_ORDER_APPLY_CODE",
                                		"jobid" : jobid,
                                		"clienttype" : "0",
                                		"worktimeindex" : worktimeindex,
                                		"allowschedule" : allowschedule,
                                		"access_token" : access_token,
                                		"shareuserid" :  shareuserid,
                                        "shareclienttype" : shareclienttype,
                                		"receivers" : [
                                			{"userid" : userid,"clienttype" : "0"}
                                		]
                                	}
                            	 $.ajax({
                                     async:false,
                                     url:urlnum+'/order/job/message/create',
                                     type:'post',
                                     data:JSON.stringify(message_json),
                                     dataType: 'json',
                     	             contentType: "application/json;charset=utf-8",
                     	             timeout: '1000',
                     	             cache: 'false',
                                     error: function(){
                                             layer.open({
                                                                  content:data.body.msg
                                                                  ,skin: 'msg'
                                                                  ,style:'position:relative;top:-2rem;'
                                                                  ,time: 2 //2秒后自动关闭
                                                                });
                                         },
                                     success:function(data){
                                    	 console.log(data);
                                       if(data.status == 200 && data.body.code == 'SUCCESS'){
                                    	   window.location.href = 'success.html';
                                       }else{
                                        	   layer.open({
                                                   content:data.body.msg
                                                   ,skin: 'msg'
                                                   ,style:'position:relative;top:-2rem;'
                                                   ,time: 2 //2秒后自动关闭
                                                 });
                                        	   return false;
                                        }
                                     }
                                 })
                              }else{
                            	  layer.open({
                                      content:data.body.msg
                                      ,skin: 'msg'
                                      ,style:'position:relative;top:-2rem;'
                                      ,time: 2 //2秒后自动关闭
                                    });
                            	  return false;
                              }

                           }
                    });
               }

        });



