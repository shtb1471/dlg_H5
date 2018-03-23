var urlnum = 'http://api.dalinggong.com';
var jobid = localStorage["jobid"];
var worktimeindex = localStorage["worktimeindex"];
var ouserid=localStorage["ouserid"];
var owerclient=localStorage["owerclient"];
var shareuserid=localStorage["shareuserid"];
var shareclienttype=localStorage["shareclienttype"];
 $(function(){
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
       $('.btnsubmit').click(function(){
          var phone=$('#phonetest').val();
          var password=$("#password").val();
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
            }else if(password==""){
              // $(".err").html('<span>i</span>图文验证码不能为空')
              layer.open({
                              content:'请输入6-16位密码'
                              ,skin: 'msg'
                              ,style:'position:relative;top:-2rem;'
                              ,time: 2 //2秒后自动关闭
                            });
                return false;
            }else if(password.length > 16 || password.length < 6){
              layer.open({
                              content:'请输入6-16位密码'
                              ,skin: 'msg'
                              ,style:'position:relative;top:-2rem;'
                              ,time: 2 //2秒后自动关闭
                            });
                return false;
            }else{
                   $.ajax({
                          async:false,
                          url:urlnum+'/auth/login',
                          type:'post',
                          dataType:'json',
                          data:{"phone":phone,"pwd":hex_md5(password),"clienttype":0,"channel":1},
                          error: function(){
                              alert('登录接口报错');
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
                                    "allowschedule" : "1",
                                    "access_token" : access_token,
                                    "shareuserid":shareuserid,
                                    "shareclienttype":shareclienttype,
                                    "receivers" : [
                                      {"userid" : ouserid,"clienttype" : owerclient}
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
                        })

                }
              });

