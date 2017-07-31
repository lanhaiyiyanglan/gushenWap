$(function(){
	$(".payWay li").click(function(){$(this).addClass("selected").siblings().removeClass("selected");});//充值方式切换
	$(".selectCoin ul li").click(function(){$("#otherPrice").val('');$(this).addClass("on").siblings().removeClass("on");});//充值金额切换
	$("#otherPrice").change(function(){$(".selectCoin ul li").removeClass("on");});//充值其他金额的时候默认充值数量取消
});
//点击充值，提交充值的信息
function  recgargeNow(){
	var price=0;//应付金额
	var payType='';
	$(".payWay li").each(function() {//支付类型的切换
        if($(this).hasClass("selected")){
		  if($(this).find("a").attr("title")=="支付宝支付"){
			  payType=1;
		  }else{
			  payType=2;
		  }
		}
    });
	$("#payType").val(payType);
	if($("#otherPrice").val()==''){//当输入框没输入值时应付金额由选中的确定，输入了值时则有输入框中的值确定
		$(".selectCoin ul li").each(function() {
            if($(this).hasClass("on")){
				price=parseInt($(this).text());
			}
        });
	}else{
		price=$("#otherPrice").val();
	}
    $("#fee").val(price);
	 var uid=$.cookie('uid');
	 $("#uid").val(uid);
	 $("#payCoin").submit();
}
/*部分兑换显示隐藏*/
function showHide(page1,page2,obj){
	$("#"+page1).toggle();	
    $("#"+page2).toggle();	
	var imgSrc=$(obj).parent().find(".giftInfo img").attr("src");
	$(".exgiftInfo img").attr("src",imgSrc);
	var remaindNum=parseInt($(obj).parent().find(".giftInfo .remaindNum").text());
	$(".exgiftInfo .exremaindNum").text(remaindNum);
	var giftName=$(obj).parent().find(".giftInfo .giftName").text();
	$(".exgiftInfo .exgiftName").text(giftName);
	var giftPrice=parseInt($(obj).parent().find(".giftInfo .giftPrice").text());
	$(".exgiftInfo .exgiftPrice").text(giftPrice+"金币");
	var per_id=$(obj).parent().index()+1;
	$("#per_id").val(per_id);
	console.log(per_id);
}
$(function(){
  $("#inputexchargeNumber").on('keyup',function(){//兑换共计金额按照9折
		 if($(this).val()==0){
		   $(".exchargetotals span").text(0);   
		 }else{
		  var price=parseInt($(".exgiftInfo .exgiftPrice").text());
		  $(".exchargetotals span").text(parseInt($(this).val())*price*0.9);  
		 } 
  });
  $(".exchargeBtn a").on('click',function(){//部分兑换提交
       if($("#inputexchargeNumber").val()>parseInt($(".exremaindNum").text())){
		  layer.msg('兑换数量超过现有数量', {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false}); 
	   }else{
		   var total=$(".exchargetotals span").text();
		   var html='<div class="exAll"><p>将礼物兑换成金币</p>';
				html+='<p>共计：<span class="org">'+total+'</span>金币</p></div>';
		   layer.confirm(html, {btn: ['取消','确定'],shade: [0.3, '#000'],title:false,area:['50rem','25rem'],closeBtn: 0,skin:'demo-class',scrollbar: false
			}, function(){
				layer.closeAll();
			}, function(){
				 $.ajax({
				  url:'http://open.zhengjuan.com/api/app',
				  data:{
					  module:'wealthcenter',
					  do:'trans_to_gold',
					  uid: $.cookie('uid'),
					  present_id:$("#per_id").val(),
					  present_num:$("#inputexchargeNumber").val(),
					  present_gold:$(".exchargetotals span").text(),
				  },
				  type:'POST',
				  dataType:'jsonp',
				  success:function(data){
					 layer.msg(data.data.msg, {icon: 7,time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-success',shadeClose:true,scrollbar: false},function(){window.location.href="moneyManage.html";});  
				  }
			   })
		  }); 
	   }
  });
});
$(function(){
	//全部兑换提交
    $('.exchargeAll a').click(function(){
		var total=0;
        var price,num;
	    $(".giftList li").each(function() {//获取礼物列表的总价值
           price=parseInt($(this).find(".giftPrice").text());
		   num=parseInt($(this).find(".remaindNum").text());
		   total += price*num;
        });
		var html='<div class="exAll"><p>将礼物全部兑换成金币</p>';
		    html+='<p>共计：<span class="org">'+(total*0.9).toFixed(2)+'</span>金币</p></div>';
        layer.confirm(html, {btn: ['取消','确定'],shade: [0.3, '#000'],title:false,area:['50rem','25rem'],closeBtn: 0,skin:'demo-class',scrollbar: false}, function(){
            layer.closeAll();
        }, function(){
			 $.ajax({
              url:'http://open.zhengjuan.com/api/app',
              data:{
                  module:'wealthcenter',
                  do:'trans_to_gold_all',
				  uid: $.cookie('uid')
              },
              type:'POST',
              dataType:'jsonp',
              success:function(data){
                 layer.msg('兑换成功', {icon: 7,time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-success',shadeClose:true,scrollbar: false});  
              }
           })
        });
    })	
});
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
/*确认保存   objNow当前显示的wrapper,objOdd最开始的wrapper,objTextarea输入的框,objText显示输入的input*/
function sure(objNow,objOdd,objTextarea,objText){
	  if($('#'+objTextarea).val().length>0){
		  showHide(objNow,objOdd);
		  $('#'+objText).val($('#'+objTextarea).val());
		  $('#'+objTextarea).val('');
		  $(".InputTips font").text("0").attr("color","#b1b1b1");
	  }else{
		 var msg=$("#"+objNow).find("h1").text();
		 layer.msg(msg+"不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
	  }
}
