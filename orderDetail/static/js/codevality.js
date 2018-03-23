var urlnum="https://dlg.dalinggong.com/v_2_4";
 $(function(){
   getImgcode();
 })
$("#imgvalidma").click(function(){
  getImgcode();
});
function getImgcode(){
var phone=$('#phonetest').val();
$.ajax({
        type:'post',
        url:urlnum+'/api/userLoginRestApi/createImageCode?'+new Date(),
        data:{
              format:'json',
              phone:phone,
        },
        success:function (data){
            if(data.code == 0){
                $('#imgvalidmaimg').attr("src",data.data[0]);
                $('.err1').text(data.extra).css({"color":"rgb(251, 49, 87)","font-size":"0px"});
            }
        },
        error:function () {
        }
    })
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
                 $(".err").html('<span>i</span>手机号不能为空')
                return false;
            }else if(!(/^1[34578]\d{9}$/.test(phone))){
            	$(".err").html('<span>i</span>手机号码有误，请重填')
                return false;
            }else if(imgvalidmaValue==""){
            	$(".err").html('<span>i</span>图文验证码不能为空')
                return false;
            }else{
            $("#validmaValue").val("");
            $.ajax({
                async:false,
                url:urlnum+'/api/smsRest/sendCode',
                type:'post',
                // dataType:'jsonp',
                jsonp:'callback',
                data:{
                      format:'json',
                      phone:phone,
                      inputCode:imgvalidmaValue,
                      key:extra
                },
                success:function(data){   
                  // console.log(data);
                  if(data.code == 0){
                    settime(btn);
            	$(".err").html('<span>i</span>'+data.msg)
                  }else{
                    getImgcode();
                      $("#imgvalidmaValue").val("")

                  }
                },
                error:function(XMLHttpRequest,textStatus,errorThrown){
                }
            });
             }
          });
        
       $('.btnsubmit').click(function(){ 
          var phone=$('#phonetest').val();
          var imgvalidmaValue=$('#imgvalidmaValue').val().trim();
          var validma = $("#validmaValue").val();
		if(phone==""){
            	$(".err").html('<span>i</span>手机号不能为空')
                return false;
            }else if(!(/^1[34578]\d{9}$/.test(phone))){
            	$(".err").html('<span>i</span>手机号码有误，请重填')
                return false;
            }else if(imgvalidmaValue==""){
            	$(".err").html('<span>i</span>图文验证码不能为空')
                return false;
            }else if(validma==""){
            	$(".err").html('<span>i</span>验证码不能为空')
                return false;
            }
            else if(!(/^\d{4}$/.test(validma))){
            	$(".err").html('<span>i</span>验证码输入不对')
                return false;
            }else{     
            //用户是否注册判断注册
            $.ajax({
                async:false,
                url:urlnum+'/verifyPhone',
                type:'post',
                // dataType:'jsonp',
                jsonp:'callback',
                data:"format=json&phone="+phone+"&type=1",
                success:function(result){
                  // console.log(result);
                    if(result.code == 0){
            			$(".err").html('<span>i</span>该用户已注册')
                    }else{
                        // 用户未注册，调注册接口去注册
                       $.ajax({
                        async:false,
                        url:urlnum+'/register',
                        type:'post',
                        dataType:'jsonp',
                        jsonp:'callback',
                        data:"format=json&phone="+phone+"&vaildCode="+validma+"&userType=1&password=123456&source=register&client=H5&appVersion=2.3.0&username="+username,
                        success:function(result){   
                           _hmt.push(['_trackEvent', 'link', 'register']);  //lhl加的统计
                          if(result.code==0){
            				$(".err").html('注册成功')
                              setTimeout(function(){
                              window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=gongren.com.dlg";
                               },2000)

                          }else{
            				$(".err").html('<span>i</span>'+result.msg)
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