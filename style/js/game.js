$(function(){
   /*search*/
   $(".searchbar").click(function(){
	   $(this).parent().addClass("focus");   
   });
   $(".icon-close").click(function(){
       $(".searchbar-input input").val('');
   });
   $(".searchbar-cancel").click(function(){
	  $(this).parent().find(".searchbar-input input").val('');
	  $(this).parent().removeClass("focus"); 
   });
   $("#wrapper4 .sureBtn").click(function(){
	  var mobile=$(this).parent().find("#mobile").val();
	  if(!(/^1[3|5][0-9]\d{4,8}$/.test(mobile))){ 
	     layer.msg("请填写正确的手机号码", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false}); 
	  }else{
		 sure('wrapper4','wrapper1','mobile','contact_mobile','contact_mobile_hidden'); 
	  }
   });
   $("#wrapper5 .sureBtn").click(function(){
	  var email=$(this).parent().find("#email").val();
	  var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	  if(!reg.test(email)){ 
	     layer.msg("请填写正确的邮箱号码", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false}); 
	  }else{
		 sure('wrapper5','wrapper1','email','contact_email','contact_email_hidden'); 
	  }
   });
});
function sure(objNow,objOdd,objTextarea,objText,objHidden){//填充比赛基本信息
		  showHide(objNow,objOdd);
		  $('#'+objText).val($('#'+objTextarea).val());
		  $('#'+objHidden).val($('#'+objTextarea).val());
		 // $('#'+objTextarea).val('');
}
function upgameImg(obj,toObj,objHidden,imgObj){//填充图片
	var objSrc=$(obj).parent().parent().find(".image").attr("src")
  	$("#"+toObj).val(objSrc);
	$("#"+objHidden).val(objSrc);
	$("."+imgObj).attr("src",objSrc);
	var steps=$(obj).parent().parent().attr("id");
	showHide(steps,'step2');
}
function setInfo(obj,objSet,objSpan){//填充时间
    var tt=$(obj).val();
	$("."+objSpan).text(tt);
	var time2 = tt.replace(/-/g,'/');
	var time3 = Date.parse(time2)/1000;
	$("#"+objSet).val(time3);
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
/*文字截取*/
function remainSub2(whatIn, number) {
	whatIn = "#" + whatIn;
	if ($(whatIn).val().length >= number) {
		$(whatIn).val($(whatIn).val().substr(0, number - 1));
	}
}