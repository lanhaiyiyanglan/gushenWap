//选择几分之几
$(function(){
 $(".reportCause li").click(function(){
   $(this).addClass("on").siblings().removeClass("on");	 
   $("#buySelect").val($(this).find(".radio_1").val());
   var maxNum=parseInt($("#maxbuyNum").text());
   var numType='';
   if($(this).find(".radio_1").val()=="全部"){
	   numType=1;
   }else if($(this).find(".radio_1").val()=="1/2"){
	   numType=0.5;
   }
   else if($(this).find(".radio_1").val()=="1/3"){
	   numType=0.33;
   }
   else if($(this).find(".radio_1").val()=="1/4"){
	   numType=0.25;
   }else{
	  numType=0.2; 
   }
   $("#p01_form_ordeNum").val(Math.floor(maxNum/100*numType)*100);
   $(this).parent().parent().hide();
   $("#wrapper1").show();
 });	
});
/*显示隐藏*/
function showHide(page1,page2){
	$("#"+page1).toggle();	
    $("#"+page2).toggle();	
}