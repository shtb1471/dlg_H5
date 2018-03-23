$(function(){
	$(".login_mask").height($(document).height());
	// 第一步手机号号码输完
	$("#phone_number").on('input',function(){
		if($(this).val().length == 11){
			$('.login').addClass('number_ok');
		}else if($(this).val().length < 11){
			$('.login').removeClass('number_ok');
			$('.prompt').addClass('hidden');
		};
	});
	// 第二步当点下一步时直接到登录页或者设置密码页
	$('.next ').on('click',function(){
		if(!/^1[3|4|5|8]\d{9}$/.test($("#phone_number").val())){
			$('.prompt').removeClass('hidden').text('你输入的不是有效的手机号码');
			$("#phone_number").focus();
		}else{
			$('.login').removeClass('number_ok');
			$(this).addClass('hidden');
			$('.password').removeClass('hidden');
			if($("#phone_number").val()){   //账号存在到登录页
				$('.code_num_login').removeClass('hidden');
				$('.forget_password').removeClass('hidden');
				// $('.prompt').removeClass('hidden');    //密码错误才有提示
				$('button.entry').removeClass('hidden');
			}else{   //账号不存在到设置密码页
				setPassword()
			};
		};
	});
	// 点击验证码登录
	$('.code_num_login').on('click',function(){
		var vl = $("#phone_number").val();
		$('.code_send span').text(vl);
		showCodePage();
		
	});
	// 验证码登录返回到密码登录
	$('.comback').on('click',function(){
		$('section.second').addClass('hidden');
		$('section.first').removeClass('hidden');
	});
	// 忘记密码
	$('.forget_password').on('click',function(){
		showCodePage();
	});
	// 显示设置密码页的函数
	function setPassword(){
		$('.title').text("设置密码");
		$('.security_reminder').removeClass('hidden');
		$('span.entry').removeClass('hidden');
		$('.phone_number').addClass('hidden');
	}
	// 显示验证码页的函数
	function showCodePage(){
		$('section.first').addClass('hidden');
		$('section.second').removeClass('hidden');
	}
	// 密码的显示隐藏
	$('.password i').on('click',function(){
		$(this).hide().parent().find('span').show();
		$(this).parent().find('input')[0].type='text';
		$(this).parent().find('input').focus();
	});
	$('.password span').on('click',function(){
		$(this).hide().parent().find('i').show();
		$(this).parent().find('input')[0].type='password';
		$(this).parent().find('input').focus();

	});
	// section 2 验证码
	$('.code input').focus(function(){
		$(this).addClass('current');
	});
	$('.code input').blur(function(){
		$(this).removeClass('current');
	});
	$('.code input').on('input',function(){
		var n = $(this).parent().index();
		var l = $(this).val().length;
		var t = $(this).val();
		var a = 0;
		if(l == 1 && n != 3){
			$(this).parents().next('li').find('input').focus();
		};
	});
	// 隐藏登录
	$('#login_mask').on('click',function(){
		$(this).hide();
	});
	$('.login').click(function(e){
		e.stopPropagation();
	})
});
// 倒计时
	var countdown=59; 
	function settime(obj) { 
	    if (countdown == 0) { 
	        obj.removeAttribute("disabled");    
	        obj.value="免费获取验证码"; 
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
	};