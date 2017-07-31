/*确认保存   objNow当前显示的wrapper,objOdd最开始的wrapper,objTextarea输入的框,objText显示输入的input*/
function sure(objNow,objOdd,objTextarea,objText){
	  if($('#'+objTextarea).val().length>0){
		  showHide(objNow,objOdd);
		  $('#'+objText).val(parseFloat($('#'+objTextarea).val()).toFixed(2)+'(%)');
		  $('#'+objTextarea).val('');
		  $(".InputTips font").text("0").attr("color","#b1b1b1");
	  }else{
		 var msg=$("#"+objNow).find("h1").text();
		 layer.msg(msg+"不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
	  }
}
function sure1(objNow,objOdd,objTextarea,objText){
	  if($('#'+objTextarea).val().length>0){
		  showHide(objNow,objOdd);
		  $('#'+objText).val($('#'+objTextarea).val());
		  $(".InputTips font").text("0").attr("color","#b1b1b1");
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
		$(whatIn).val($(whatIn).val().substr(0,number));
		if( atlength > number){
			$(remain).children("font").text('0').attr("color","#ff0000");
			$(remain).children("font").text(0);
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
/*年收益率重置*/
function resetVal(objNow,objOdd){
	var annualProfit=$("input[name='annualProfit']:checked").val();
	showHide(objNow,objOdd);
	$("#annualText").val(annualProfit);
}
$(document).ready(function(){
	if (typeof($.cookie('password')) == 'undefined') {
		window.location.href = '../../logRegPassword/index.html'
	} else {
	}
	if($.cookie('role')==2){
		$('.peixun').hide();
	}else{
		$('.peixun').show();
	}
	var username= $.cookie('username');
	var user_id= $.cookie('user_id');
	$.ajax({
		url:'http://open.zhengjuan.com/api/app',
		type:'POST',
		dataType:'jsonp',
		data:{
			module:'user',
			do:'getMemberInvestDetail',
			username:username,
			user_id:user_id
		},
		success:function(data){
			var data=data.data[0];
			console.log(data)
			if(data.nianhua){
				$('input[name=annualText]').val(data.nianhua);
			}else{}
			if(data.actual){
				$('input[name=actualText]').val(data.actual+'(%)')
				$('#actualTextarea').val(data.actual)
			}else{}
			if(data.sim){
				$('input[name=simulateText]').val(data.sim+'(%)')
				$('#simulateTextarea').val(data.sim)
			}else{}
			if(data.money){
				for(var i=0;i<$('input[name=moneyDemand]').length;i++){
					if(data.money==$($('input[name=moneyDemand]')[i]).val())
						$($('input[name=moneyDemand]')[i]).attr('checked','checked');
				}
			}
			var arr=data.style.split('\n');
			for (var a=0;a<arr.length;a++){
				for(var b=0;b<$('input[name=operationStyle]').length;b++){
					if(arr[a]==$($('input[name=operationStyle]')[b]).val()){
						$($('input[name=operationStyle]')[b]).attr('checked','checked')
					}
				}
			}
			var arr1=data.type.split('\n');
			for (var c=0;c<arr1.length;c++){
				for(var d=0;d<$('input[name=cooperationModel]').length;d++){
					if(arr1[c]==$($('input[name=cooperationModel]')[d]).val()){
						$($('input[name=cooperationModel]')[d]).attr('checked','checked')
					}
				}
			}
			$('#ideaText').val(data.idea);
			$('#ideaTextarea').val(data.idea);
			$('#strategyText').val(data.strategy);
			$('#strategyTextarea').val(data.strategy);
		}
	})
	$(".annualList li").click(function(){//年收益率选中切换勾样式
		$(this).addClass("on").siblings().removeClass("on");
	});
	$("#investmentBtn").click(function(){
		var Style1Val=[];
		$("input[name = operationStyle]").each(function(i){
			if($(this).prop("checked")) {
				Style1Val.push($(this).val())
			}
		});
		var Style1Data=Style1Val.join('\n');
		var Style1Val1=[];
		$("input[name = cooperationModel]").each(function(i){
			if($(this).prop("checked")) {
				Style1Val1.push($(this).val())
			}
		});
		var Style2Data=Style1Val1.join('\n');
		var money='';
		$("input[name = moneyDemand]").each(function(i){
			if($(this).prop("checked")) {
				money=$(this).val();
			}
		});
		var idea=$('#ideaText').val();
		var strategy=$('#strategyText').val();
		var role= $.cookie('role');
		var actual=parseFloat($('#actualText').val()).toFixed(2);
		var sim=parseInt($('#simulateText').val());
		var nianhua=$('#annualText').val();
		$.ajax({
			type: "POST",
			url: "http://open.zhengjuan.com/api/app",
			dataType: "jsonp",
			data:{
				user_id: $.cookie('user_id'),
				role:role,
				actual:actual,
				sim:sim,
				style:Style1Data,
				money:money,
				nianhua:nianhua,
				type:Style2Data,
				idea:idea,
				strategy:strategy,
				module:'user',
				do:'updateInvestment'
			},
			success: function(data) {
				console.log(data)
				if (data.code !== -1) {
					layer.msg('保存成功', {icon: 7,time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-success',shadeClose:true,scrollbar: false});
				} else {
					layer.msg("保存失败", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
				}
			},
			error: function(x, e) {},
			complete: function(x) {}
		});
	});
	$.ajax({
		url:'http://open.zhengjuan.com/api/app',
		type:'POST',
		dataType:'jsonp',
		data:{
			module:'user',
			do:'getMemberExperienceDetail',
			user_id: user_id
		},
		success:function(data){
			console.log(data)
			$('#workExperienceText').val(data.data[0].work_history);
			$('#workExperienceTextarea').val(data.data[0].work_history);
			$('#workCompanyText').val(data.data[0].company);
			$('#workCompanyTextarea').val(data.data[0].company);
			$('#mediaReportText').val(data.data[0].media_report);
			$('#mediaReportTextarea').val(data.data[0].media_report);
			$('#publishText').val(data.data[0].media_article);
			$('#publishTextarea').val(data.data[0].media_article);
			$('#publishTextarea').val(data.data[0].media_article);
			$('#honorText').val(data.data[0].honor);
			$('#honorTextarea').val(data.data[0].honor)
			$('#mediaReportTextarea').val(data.data[0].media_report);
			$('#publishTextarea').val(data.data[0].media_article);
			$('#honorTextarea').val(data.data[0].honor)
			if(data.data[0].work_status==0){
				$('#radio_b1').attr('checked',true);
				$('#radio_b1').next().attr('checked',false);
				$('.workCompaner').show();
			}else if(data.data[0].work_status==1){
				$('#radio_b2').prev().attr('checked',false);
				$('#radio_b2').attr('checked',true);
				$('.workCompaner').hide();
			}else{

			}
		}
	})
	$('#radio_b1').change(function(){
		if(!$(this).attr('checked')){
			$('.workCompaner').hide();
		}else{
			$('.workCompaner').show();
		}
	})
	$('#radio_b2').change(function(){
		if(!$(this).attr('checked')){
			$('.workCompaner').hide();
		}else{
			$('.workCompaner').show();
		}
	})
	$.ajax({
		url:'http://open.zhengjuan.com/api/app',
		type:'POST',
		dataType:'jsonp',
		data:{
			module:'user',
			do:'getMemberEduDetail',
			user_id:user_id
		},
		success:function(data){
			console.log(data)
			$('#topEduText').val(data.data[0].school);
			$('#topEduTextarea').val(data.data[0].school);
			for(var edu=0;edu<$('input[name=highestEducation]').length;edu++){
				if($($('input[name=highestEducation]')[edu]).val()==data.data[0].education){
					$($('input[name=highestEducation]')[edu]).attr('checked',true);
					$('input[name=highestEducation]').not($($('input[name=highestEducation]')[edu])).attr('checked',false);
				}
			}
			var colArr=data.data[0].profession.split('\n');
			for(var z=0;z<colArr.length;z++){
				for(var col_pro=0;col_pro<$('input[name=highestSpecialty]').length;col_pro++){
					if($($('input[name=highestSpecialty]')[col_pro]).val()==colArr[z]){
						$($('input[name=highestSpecialty]')[col_pro]).attr('checked',true);
					}
				}
			}
			$('#start_time1').val(data.data[0].top_starttime);
			$('#end_time1').val(data.data[0].top_endtime);
			$('#undergraduateText').val(data.data[0].college_school);
			$('#undergraduateTextarea').val(data.data[0].college_school);
			for(var top_pro=0;top_pro<$('input[name=major]').length;top_pro++){
				if($($('input[name=major]')[top_pro]).val()==data.data[0].college_profession){
					$($('input[name=major]')[top_pro]).attr('checked',true);
					$('input[name=major]').not($($('input[name=major]')[top_pro])).attr('checked',false);
				}
			}
			$('#start_time2').val(data.data[0].college_starttime);
			$('#end_time2').val(data.data[0].college_endtime);
			$('#trainingText').val(data.data[0].training_experience);
			$('#trainingTextarea').val(data.data[0].training_experience);
			var cerArr=data.data[0].certificate.split('\n');
			for(var cer=0;cer<cerArr.length;cer++){
				for(var cer1=0;cer1<$('input[name=workAptitudes]').length;cer1++){
					if(cerArr[cer]==$($('input[name=workAptitudes]')[cer1]).val()){
						$($('input[name=workAptitudes]')[cer1]).attr('checked',true);
					}
				}
			}
		}
	})
	$.ajax({
		url:'http://open.zhengjuan.com/api/app',
		type:'POST',
		dataType:'jsonp',
		data:{
			module:'user',
			do:'getMemberFriendDetail',
			user_id: $.cookie('user_id')
		},
		success:function(data){
			$('#datingText').val(data.data[0].show_word);
			$('#datingTextarea').val(data.data[0].show_word);
			var personality=data.data[0].personality.split('\n');
			for(var p=0;p<personality.length;p++){
				for(var q=0;q<$('input[name=character]').length;q++){
					if(personality[p]==$($('input[name=character]')[q]).val()){
						$($('input[name=character]')[q]).attr('checked',true);
					}
				}
			}
			var interest=data.data[0].interest.split('\n');
			for(var h=0;h<interest.length;h++){
				for(var k=0;k<$('input[name=hobby]').length;k++){
					if(interest[h]==$($('input[name=hobby]')[k]).val()){
						$($('input[name=hobby]')[k]).attr('checked',true);
					}
				}
			}
			var place=data.data[0].place.split('\n');
			for(var l=0;l<place.length;l++){
				for(var m=0;m<$('input[name=changingAddress]').length;m++){
					if(place[l]==$($('input[name=changingAddress]')[m]).val()){
						$($('input[name=changingAddress]')[m]).attr('checked',true)
					}
				}
			}
		}
	})
	$(function(){$('#friendsDataBtn').click(function(){
		var personality=$('input[name=character]:checked');
		for(var s= 0,personalityVal=[];s<personality.length;s++){
			personalityVal.push($(personality[s]).val());
		}
		var personalityVal= personalityVal.join('\n');
		var interest=$('input[name=hobby]:checked');
		for(var t= 0,interestVal=[];t<interest.length;t++){
			interestVal.push($(interest[t]).val());
		}
		var interestVal =interestVal.join('\n');
		var place=$('input[name=changingAddress]:checked');
		for(var u= 0,placeVal=[];u<place.length;u++){
			placeVal.push($(place[u]).val());
		}
		var placeVal=placeVal.join('\n');
		var data={
			module:'user',
			do:'updateFriendsinfo',
			user_id: $.cookie('user_id'),
			show_word:$('#datingText').val(),
			personality:personalityVal,
			interest:interestVal,
			place:placeVal
		};
		$.ajax({
			url:'http://open.zhengjuan.com/api/app',
			type:'POST',
			dataType:'jsonp',
			data:data,
			success:function(data){
				if (data.code !== -1) {
					layer.msg('保存成功', {icon: 7,time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-success',shadeClose:true,scrollbar: false});
				} else {
					layer.msg("保存失败", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
				}
			}
		})
	})
	})
});
$(function(){
	/*工作经历保存*/
	$("#workExperienceBtn").click(function(){
		var work_status=$("input[name='workStatus']:checked").val();
		var work_history=$('#workExperienceText').val();
		if(work_status=='在职'){
			work_status='0';
		}else{
			work_status='1';
		}
		var company=$('#workCompanyText').val();
		var media_report=$('#mediaReportText').val();
		var media_article=$('#publishText').val();
		var honor=$('#honorText').val();
		$.ajax({
			type: "POST",
			url: "http://open.zhengjuan.com/api/app",
			dataType: "jsonp",
			data:{
				user_id: $.cookie('user_id'),
				work_status:work_status,
				work_history:work_history,
				company:company,
				media_report:media_report,
				media_article:media_article,
				honor:honor,
				module:'user',
				do:'updateWorkinfo'
			},
			success: function(data) {
				console.log(data)
				if (data.code == "1") {
					layer.msg('保存成功', {icon: 7,time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-success',shadeClose:true,scrollbar: false});
				} else {
					layer.msg("保存失败", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
				}
			},
			error: function(data) {},
			complete: function(data) {}
		});
	});
});

