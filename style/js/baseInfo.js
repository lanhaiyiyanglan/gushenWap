/*确认保存   objNow当前显示的wrapper,objOdd最开始的wrapper,objTextarea输入的框,objText显示输入的input*/
function sure(objNow,objOdd,objTextarea,objText){
	  if($('#'+objTextarea).val().length>0){
		  showHide(objNow,objOdd);
		  $('#'+objText).val($('#'+objTextarea).val());
		  $('#'+objTextarea).val('');
	  }else{
		 var msg=$("#"+objNow).find("h1").text();
		 layer.msg(msg+"不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
	  }
}
/*显示隐藏*/
function showHide(page1,page2){
	$("#"+page1).toggle();	
    $("#"+page2).toggle();	
}
/*字符限制*/
function feedIn(whatIn,remain,number){//输入区域的id，以及记录剩余字数的id和最多多少字的数量

	    whatIn="#"+whatIn;
		remain="#"+remain;
		var atlength = $(whatIn).val().length;
		if( atlength > number){
			$(remain).children("font").text('-'+(atlength-number)).attr("color","#ff0000");
		}else{
			$(remain).children("font").text(number-atlength).attr("color","#ffaf32");
		}
}
/*字符截取1*/
function remainSub(whatIn,remain,number){
	    whatIn="#"+whatIn;
		remain="#"+remain;
		if ($(whatIn).val().length>=number){
			$(whatIn).val($(whatIn).val().substr(0,number-1));
			$(remain).children("font").text(0);
		}
}
/*字符截取2*/
function remainSub2(whatIn,remain,number){
	    whatIn="#"+whatIn;
		remain="#"+remain;
		if ($(whatIn).val().length>=number){
			$(whatIn).val($(whatIn).val().substr(0,number-1));
		}
}
$(document).ready(function(){
	if (typeof($.cookie('password')) == 'undefined') {
		window.location.href = '../../logRegPassword/index.html'
	} else {
	}
	Zepto(function($){
		$("#birthday").calendar({value: ['2015-12-05'],onChange: function(p, v, d) {console.log(p, v, d);}});
		$("#city-picker").cityPicker({
			onClose: function (picker, value, displayValue){resideprovince=picker.cols[0].displayValue;residecity=picker.cols[1].displayValue;residedist=picker.cols[2].displayValue},
			toolbarTemplate: '<header class="bar bar-nav"><button class="button button-link pull-right close-picker">确定</button><h1 class="title">选择所在地区</h1>\</header>'
		});
	});
	$("#qqSure").click(function(){
		if(/^[1-9]\d{4,12}$/.test($('#qqTextarea').val())&&$('#qqTextarea').val().length>0){
			showHide('wrapper3','wrapper1');
			$("#qqNum").val($('#qqTextarea').val());
			$("#qqTips font").text("0").attr("color","#b1b1b1");
		}else{
			if($('#qqTextarea').val().length==0){
				layer.msg('请输入qq号码', {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
			}else{
				layer.msg('请输入正确的qq号码', {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
			}
		}
	});
	/*保存email*/
	$("#emailSure").click(function(){
		if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test($('#emailTextarea').val())&&$('#emailTextarea').val().length>0){
			showHide('wrapper2','wrapper1');
			$("#emailNum").val($('#emailTextarea').val());
			$('#emailTextarea').val('');
		}else{
			if($('#emailTextarea').val().length==0){
				layer.msg('请输入邮箱', {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
			}else{
				layer.msg('请输入正确的邮箱号码', {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
			}
		}
	});
	$("#userBaiscBtn").click(function(){
		var datearr=$('#birthday').val().split('-');
		var birthyear=datearr[0];
		var birthmonth=datearr[1];
		var birthday=datearr[2];
		if($('#city-picker').val()!==''){
			var resideprovince=$('#city-picker').val().split(' ')[0];
			var residecity=$('#city-picker').val().split(' ')[1];
			if($('#city-picker').val().split(' ').length>2){
				var	residedist=$('#city-picker').val().split(' ')[2];
			}else{
				var	residedist='';
			}
		}
		var QQ=$('#qqNum').val();
		console.log(QQ)
		var email=$('input[name=emailNum]').val();
		console.log(birthyear+'-'+birthmonth+'-'+birthday)
		var basicData={
			module:'user',
			do:'updateUserbasicinfo',
			birthyear:birthyear,
			birthmonth:birthmonth,
			birthday:birthday,
			resideprovince:resideprovince,
			residecity:residecity,
			residedist:residedist,
			QQ:QQ,
			email:email,
			user_id:$.cookie('user_id')
		};
		$.ajax({
			type: "POST",
			url: "http://open.zhengjuan.com/api/app",
			dataType: "jsonp",
			data:basicData,
			success: function(data) {
				layer.msg('保存成功', {icon: 7,time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-success',shadeClose:true,scrollbar: false});
			},
			error: function(data) {
				layer.msg("保存失败", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
			}
		});
	});
	$.ajax({
		url:'http://open.zhengjuan.com/api/app',
		type:'POST',
		dataType:'jsonp',
		data:{
			user_id:$.cookie('user_id'),
			module:'user',
			do:'getMemberBasicDetail'
		},
		success:function(data){
			console.log(data.data)
			$('input[name=userName]').val(data.data[0].username);
			if(data.data[0].gender==0){
				$('input[name=gender]').val('保密');
			}else if(data.data[0].gender==1){
				$('input[name=gender]').val('男');
			}else if(data.data[0].gender==2){
				$('input[name=gender]').val('女');
			}
			if(data.data[0].birthyear==0){
				var birthyear='';
			}else{
				var birthyear=data.data[0].birthyear;
			}
			if(data.data[0].birthmonth==0){
				var birthmonth='';
			}else{
				var birthmonth=data.data[0].birthmonth;
			}
			if(data.data[0].birthday==0){
				var birthday='';
			}else{
				var birthday=data.data[0].birthday;
			}
			if(!birthyear==''&&!birthmonth==''&&!birthday==''){
				$('input[name=birthday]').val(birthyear+'-'+birthmonth+'-'+birthday);
			}else{
				$('input[name=birthday]').val('');
			}
			if(data.data[0].residedist!==''){
				$('input[name=address]').val(data.data[0].resideprovince+' '+data.data[0].residecity+' '+data.data[0].residedist);
			}else{
				$('input[name=address]').val(data.data[0].resideprovince+' '+data.data[0].residecity);
			}
			$(".xi_list li:nth-child(6) .infoInput").click(function(){
				window.location.href='../safe/bindEmail.html';
			});
			if(data.data[0].email!=='0'){
				$('#emailNum').val(data.data[0].email);
			}else{
				$('#emailNum').val('');
			}
			$('input[name=qqNum]').val(data.data[0].QQ);
			$('#qqTextarea').val(data.data[0].QQ)
			if(!data.data[0].mobile==''){
				$('.bindPhone').html(data.data[0].mobile);
				$('.bindPhone').css('color','#000');
				$('.bindPhone').removeAttr('href');
			}else{

			}
		}
	})
})
