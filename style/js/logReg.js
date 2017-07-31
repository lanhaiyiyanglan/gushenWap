$(function(){
   $(".rolerTabs li").click(function(){//注册身份切换
	  $(this).addClass("selected").siblings().removeClass("selected");   
   });	
   $("#isEmail > input").click(function(){//注册方式切换（手机邮箱）
	   $("#byPhone,#phoneYzm").hide();
	   $("#byEmail,#emailYzm").show();
   });
   $("#isPhone > input").click(function(){
	   $("#byPhone,#phoneYzm").show();
	   $("#byEmail,#emailYzm").hide();
   });
////////////////登录开始
      /*验证规则*/
	/*用户名/邮箱/手机号 输入判断*/
	function verifyUsercode(){
		var value=$("#userCode").val();
		var length = value.length;
		for(var i = 0; i < value.length; i++){
			if(value.charCodeAt(i) > 127){
				length++;
			}
		}
		var mobile = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/;
		var stringCheck=/^[\u0391-\uFFE5\w]+$/;
		var email=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
		var isDigits=/^\d+$/;
		if(value==''){//输入为空
			$("#userCodeTips").show().find("span").attr("class","error").text('用户名不能为空！');
			return false;
		}else{//不为空时
			 if(value.match(email)){//匹配邮箱时
				 $("#userCodeTips").hide();
				return true;
			 }else{
				if(isDigits.test(value)){
					if(length == 11 && mobile.test(value)){//匹配手机时
						$("#userCodeTips").hide();
				       return true;
			        }else{
						  if(!(length>=4&&length<=12)){
						     $("#userCodeTips").show().find("span").attr("class","error").text('用户名长度须4-12位！');
							 return false;
						  }else{
						      $("#userCodeTips").show().find("span").attr("class","error").text('手机号码格式不正确！'); 
				              return false;  
						  }
					}
				}else{
					if(stringCheck.test(value)&&length>=4&&length<=12){
						$("#userCodeTips").hide();
					   return true; 		
					}
					else if(stringCheck.test(value)&&(length<6||length>12)){
					    $("#userCodeTips").show().find("span").attr("class","error").text('用户名长度须4-12位！');
				        return false; 
					}
					else if(!(stringCheck.test(value))){
					    $("#userCodeTips").show().find("span").attr("class","error").text('用户名只能字符类型,数字和字母、下划线！');
				        return false;
					}else{
					     $("#userCodeTips").show().find("span").attr("class","error").text('邮箱格式有误！');
				         return false;  
					}
				}
			 }	 
		}
	}
////////////////注册开始   
   /*180s后重新发送*/
	var wait=180;
    function time(o) {
        if (wait == 0) {
            o.removeAttribute("disabled");
            o.value=" 获取验证码 ";
			o.style.backgroundColor='#ffaf32';
            wait = 180;
        } else {
            o.setAttribute("disabled", true);
			o.style.backgroundColor='gray';
            o.value="重新发送(" + wait + ")";
            wait--;
            setTimeout(function() {time(o)},1000)
        }
    }
	/*发送验证码到手机*/
			$("input[name='aq1']").click(function(){
				var mobile = $("#reg_form").validate().element($("#mobile"));
				if(mobile == true&&($("#mobile").val()!='')){
					$("#yzm").removeAttr("readonly");//手机填写正确才能输入验证码
					time(this);
					$.ajax({
						type: "POST",
						url: "http://open.zhengjuan.com/api/app",
						dataType: "jsonp",
						data: {
							mobile:$('#mobile').val(),
							module:'user',
							do:'sendsms'
						},
						success: function(data) {
							if(data.data.code !== "1"){
								wait = 0;
								layer.msg('发送失败', {icon: 2});
							}else{
								layer.msg('发送成功！', {icon: 1});
		                	}
						}
					});
				}else{
					return false;
	  			}
			});

	/*验证验证码*/
	$('#yzm').blur(function(){
		$.ajax({
			url:'http://open.zhengjuan.com/api/app',
			type:'POST',
			dataType:'jsonp',
			data:{
				module:'user',
				do:'checkcode',
				mobile:$('#mobile').val(),
				code:$('#yzm').val()
			},
			success:function(data){
				if(data.data.code!=='1'){
					layer.msg(data.data.message)
				}else{}
			}
		})
	})
	/*发送验证码到邮箱*/
	var code='';
	$("input[name='aq2']").click(function(){
		var Num='';
		for(var i=0;i<6;i++)
		{
			Num+=Math.floor(Math.random()*10);
		}
		code=Num;
		console.log(code)
		var email = $("#reg_form").validate().element($("#email"));
		if(email==true&&($("#email").val()!='')){
			$("#yzm2").removeAttr("readonly");//邮箱填写正确才能输入验证码
			time(this);
			$.ajax({
				type: "GET",
				url: "http://site.gushen178.com/api/send",
				dataType: "jsonp",
				data: {
					email:$('#email').val(),
					code:code
				},
				success: function(data) {
					if(data.code !== 1010){
						wait = 0;
						layer.msg('发送失败', {icon: 2});
					}else{
						layer.msg(data.message, {icon: 1});
					}
				}
			});
		}else{
			return false;
		}
	});
	/*注册验证*/
	$("#reg_form").validate({
        rules:{
            username:{required:true,notAllNum:true,
			byteRangeLength: [4,12],
			   stringCheck:true
			},
            password:{required:true,rangelength: [6,16]},
            password2:{required:true,equalTo: "#password"},
            email:{required:true,email: true},
			mobile:{required:true,isMobile:true},
			yzm:{required:true,min:6},
			yzm2:{required:true,min:6},
			agree:{required:true}
		},
		messages:{
			username:{required:"用户名必填！",notAllNum:"用户名不能全部为数字",byteRangeLength: "用户名必须在4-12个字符之间！",stringCheck:"只能包括汉字,字母,数字和下划线!"},
			password:{required:"密码必填！",rangelength: "密码由6-16位数字,大小写字母,符号组成！"},
			password2:{required:"密码必填！",equalTo: "两次输入密码不一致！"},
			email:{required:"邮箱必填！",email: "请填写正确邮箱地址！"},
			mobile:{required:"手机号必填！",isMobile:"请填写正确的手机号码！"},
			yzm:{required:"短信验证码必填！",min:"请输入6位数的短信验证码！"},
			yzm2:{required:"邮箱验证码必填！",min:"请输入6位数的邮箱验证码！"},
			agree:{required:"阅读注册协议必选！"}
		},
		errorPlacement:function(error,element) {
			if(element.attr("name")=='agree'){
				error.appendTo(element.parent().find(".tips"));
			}else{
				error.appendTo(element.parent().parent().parent().parent().next(".tips"));
			}
        }		
	});	
	/*注册点击异步提交*/
	$(".sureBtn > input").click(function(){
		var resideprovince=$('#city-picker').val().split(' ')[0];
		var residecity=$('#city-picker').val().split(' ')[1];
		var residedist=$('#city-picker').val().split(' ')[2];
		var data={
			module:'user',
			do:'register',
			username:$('#username').val(),
			resideprovince:resideprovince,
			residecity:residecity,
			residedist:residedist,
			mobile:$('#mobile').val(),
			password:$('#password2').val(),
			email:$('#email').val()
		}
		if($('#radio_b3').prop('checked')){
			if($.trim($('#username').val())==''||$.trim($('#city-picker').val())==''||$.trim($('#mobile').val())==''||$.trim($('#password').val())==''||$.trim($('#password2').val())==''){
				layer.msg('请填写完整的信息后提交！', {
					icon: 7,
					time: 2000,
					area: '80%',
					shade: [0.3, '#000'],
					skin: 'demo-success',
					shadeClose: true,
					scrollbar: false
				});
			}else{
				if($('input[name=sex]:checked').val()=='男'){
					data.gender=1;
				}else if($('input[name=sex]:checked').val()=='女'){
					data.gender=2;
				}
				if($('.selected').children('a').html()=='注册高手'){
					data.role=1;
				}else if($('.selected').children('a').html()=='注册金主'){
					data.role=2;
				}
				Num='';
				for(var i=0;i<19;i++)
				{
					Num+=Math.floor(Math.random()*10);
				}
				n=new Date().getTime().toString();
				number=n+Num;
				if($.trim($('#yzm').val())!==''){
					$.ajax({
						url:'http://open.zhengjuan.com/api/app',
						type:'POST',
						dataType:'jsonp',
						data:{
							module:'user',
							do:'checkcode',
							mobile:$('#mobile').val(),
							code:$('#yzm').val()
						},
						success:function(data){
							if(data.data.code!=='1'){
								layer.msg(data.data.message, {
									icon: 7,
									time: 2000,
									area: '80%',
									shade: [0.3, '#000'],
									skin: 'demo-success',
									shadeClose: true,
									scrollbar: false
								});
								return false;
							}else{
								$.ajax({
									type: "POST",
									url: "http://open.zhengjuan.com/api/app",
									dataType: "jsonp",
									data: data,
									success: function(data) {
										if(data.code==1){
											layer.msg('注册成功')
											$.ajax({
												url:'http://open.zhengjuan.com/api/app',
												data:{
													module:'user',
													do:'login',
													username:$('#username').val(),
													password:$('#password2').val(),
													udid:number
												},
												Type:'POST',
												dataType:'jsonp',
												success:function(data){
													if(data.code==1){
														$.cookie('username',$('#username').val(),{expires: 7,path:'/'});
														$.cookie('password',$('#password2').val(),{expires: 7,path:'/'});
														$.cookie('user_id',data.data.user_id,{expires: 7,path:'/'});
														$.cookie('role',data.data.role,{expires: 7,path:'/'});
														$.cookie('udid',number,{expires: 7,path:'/'});
														$.cookie('usericon',data.data.usericon,{expires: 7,path:'/'});
														layer.msg('登录成功', {
															icon: 7,
															time: 2000,
															area: '80%',
															shade: [0.3, '#000'],
															skin: 'demo-success',
															shadeClose: true,
															scrollbar: false
														});
														$(function(){
															setTimeout("window.open('../index.html','_self')",500)
														})
													}else{
														var message=data.errormsg;
														layer.msg(message, {
															icon: 7,
															time: 2000,
															area: '80%',
															shade: [0.3, '#000'],
															skin: 'demo-success',
															shadeClose: true,
															scrollbar: false
														});
													}
												}
											})
										}else{
											layer.msg(data.errormsg, {
												icon: 7,
												time: 2000,
												area: '80%',
												shade: [0.3, '#000'],
												skin: 'demo-success',
												shadeClose: true,
												scrollbar: false
											});
										}
									}
								});
							}
						}
					})
				}else{
					layer.msg('验证码不能为空！', {
						icon: 7,
						time: 2000,
						area: '80%',
						shade: [0.3, '#000'],
						skin: 'demo-success',
						shadeClose: true,
						scrollbar: false
					});
				}
			}
		}else{
			if($.trim($('#username').val())==''||$.trim($('#city-picker').val())==''||$.trim($('#email').val())==''||$.trim($('#password').val())==''||$.trim($('#password2').val())==''){
				layer.msg('请填写完整的信息后提交！', {
					icon: 7,
					time: 2000,
					area: '80%',
					shade: [0.3, '#000'],
					skin: 'demo-success',
					shadeClose: true,
					scrollbar: false
				});
			}else{
				if($('input[name=sex]:checked').val()=='男'){
					data.gender=1;
				}else if($('input[name=sex]:checked').val()=='女'){
					data.gender=2;
				}
				if($('.selected').children('a').html()=='注册高手'){
					data.role=1;
				}else if($('.selected').children('a').html()=='注册金主'){
					data.role=2;
				}
				Num='';
				for(var i=0;i<19;i++)
				{
					Num+=Math.floor(Math.random()*10);
				}
				n=new Date().getTime().toString();
				number=n+Num;
				if(code!==''){
					if($('#yzm2').val()!==code){
						layer.msg('验证码输入错误！', {
							icon: 7,
							time: 2000,
							area: '80%',
							shade: [0.3, '#000'],
							skin: 'demo-success',
							shadeClose: true,
							scrollbar: false
						});
						return false;
					}else{
						$.ajax({
							type: "POST",
							url: "http://open.zhengjuan.com/api/app",
							dataType: "jsonp",
							data: data,
							success: function(data) {
								if(data.code==1){
									layer.msg('注册成功！', {
										icon: 7,
										time: 2000,
										area: '80%',
										shade: [0.3, '#000'],
										skin: 'demo-success',
										shadeClose: true,
										scrollbar: false
									});
									$.ajax({
										url:'http://open.zhengjuan.com/api/app',
										data:{
											module:'user',
											do:'login',
											username:$('#username').val(),
											password:$('#password2').val(),
											udid:number
										},
										Type:'POST',
										dataType:'jsonp',
										success:function(data){
											if(data.code==1){
												$.cookie('username',$('#username').val(),{expires: 7,path:'/'});
												$.cookie('password',$('#password2').val(),{expires: 7,path:'/'});
												console.log($.cookie('password'));
												console.log($.cookie('username'));
												$.cookie('user_id',data.data.user_id,{expires: 7,path:'/'});
												$.cookie('role',data.data.role,{expires: 7,path:'/'});
												$.cookie('udid',number,{expires: 7,path:'/'});
												$.cookie('usericon',data.data.usericon,{expires: 7,path:'/'});
												console.log($.cookie('usericon'))
												console.log($.cookie('user_id'));
												console.log($.cookie('role'));
												console.log($.cookie('udid'));
												layer.msg('登录成功', {icon: 7,time:1000,area:'80%',shade: [0.3, '#000'],skin:'demo-success',shadeClose:true,scrollbar:false});
												$(function(){
													setTimeout("window.open('../index.html','_self')",500)
												})
											}else{
												var message=data.errormsg;
												layer.msg(message,{time:1000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
											}
										}
									})
								}else{
									layer.msg(data.errormsg, {
										time: 2000,
										area: '80%',
										shade: [0.3, '#000'],
										skin: 'demo-success',
										shadeClose: true,
										scrollbar: false
									});
								}
							}
						});
					}
				}else{
					layer.msg('请先获取验证码！', {
						icon: 7,
						time: 2000,
						area: '80%',
						shade: [0.3, '#000'],
						skin: 'demo-success',
						shadeClose: true,
						scrollbar: false
					});
				}
			}
		}
	});
});