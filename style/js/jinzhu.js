var page=0;
var data={
	module:'user',
	do:'searchUserByCoop',
	page:page++*10,
	pagesize:10
};
$(document).ready(function(){
	if($.cookie('role')==1){
		$('.IdleMoney').prev('cite').html('现有闲置资金');
		data.role=2;
	}else if($.cookie('role')==2){
		$('.IdleMoney').prev('cite').html('需求合作资金');
		data.role=1;
	}
	var type=$('.top').children('h1').html();
	data.type=type;
	$.ajax({
		url:'http://open.zhengjuan.com/api/app',
		type:'POST',
		dataType:'jsonp',
		data:data,
		success:function(data){
			var html='';
			for(var i=0;i<data.data.length;i++){
				if(data.data[i].role==2){
					if(data.data[i].nianhua==null){
						var nianhua='';
					}else {
						var nianhua=data.data[i].nianhua;
					}
					if(data.data[i].type==null){
						var type='';
					}else{
						var type=data.data[i].type;
					}
					html+='<li><a href="../hisIndex_killer/index.html?user_id='+data.data[i].user_id+'">';
					html+='<div class="rolerImg"><span style="background:url(' + data.data[i].usericon + ') no-repeat center;background-size:cover;"></span></div>';
					if(data.data[i].role==2){
						if(data.data[i].is_money==1&&data.data[i].is_idcard==1&&data.data[i].is_edu==1&&data.data[i].is_peixun==1){
							html += '<div style="margin-top:-40rem;" class="rolerRz"><img src="../style/img/yrz.png"></div>';
						}else{}
					}
					html+='<div class="rolerInfo">';
					html+='<div class="rolerPP"><span>'+data.data[i].username+'</span></div>';
					html+='<div class="rolerPP">需求年化收益率：<span>'+nianhua+'</span></div>';
					html+='<div class="rolerPP">期望合作模式：<span>'+type+'</span></div>';
					html+='</div></a></li>';
				}else{
					if(data.data[i].nianhua==null){
						var nianhua='';
					}else {
						var nianhua=data.data[i].nianhua;
					}
					if(data.data[i].type==null){
						var zijin='';
					}else{
						var zijin=data.data[i].money;
					}
					html+='<li><a href="../hisIndex_killer/index.html?user_id='+data.data[i].user_id+'">';
					html+='<div class="rolerImg"><span style="background:url(' + data.data[i].usericon + ') no-repeat center;background-size:cover;"></span></div>';
					if(data.data[i].is_money==1&&data.data[i].is_idcard==1&&data.data[i].is_edu==1&&data.data[i].is_peixun==1&&data.data[i].is_touzi==1&&data.data[i].is_work==1){
						htmlFirst += '<div class="rolerRz"><img src="../../style/img/yrz.png"></div>';
					}else{}
					html+='<div class="rolerInfo">';
					html+='<div class="rolerPP"><span>'+data.data[i].username+'</span></div>';
					html+='<div class="rolerPP">年化收益率：<span>'+nianhua+'</span></div>';
					html+='<div class="rolerPP">需求合作资金：<span>'+zijin+'</span></div>';
					html+='</div></a></li>';
				}
			}
			$('#thelist').append(html);
		}
	})
	if (!NeuF) var NeuF = {};
	NeuF.ScrollPage = function (obj, options, callback) {
		var _defaultOptions = { delay: 500, marginBottom: 200 }; //默认配置：延迟时间delay和滚动条距离底部距离marginBottom
		options = $.extend(_defaultOptions, options);
		this.isScrolling = false; //是否在滚动
		this.oriPos = 0; //原始位置
		this.curPos = 0; //当前位置
		var me = this; //顶层
		var $obj = (typeof obj == "string") ? $("#" + obj) : $(obj);
		//绑定滚动事件
		$obj.scroll(function (ev) {
			me.curPos = $obj.scrollTop();
			if ($(window).height() + $(window).scrollTop() >= $(document.body).height() - options.marginBottom) {
				if (me.isScrolling == true) return;
				me.isScrolling = true;
				setTimeout(function () { me.isScrolling = false;}, options.delay); //重复触发间隔毫秒;
				if (typeof callback == "function") callback.call(null, me.curPos - me.oriPos);
			};
			me.oriPos = me.curPos;
		});
	};
	$(function () {
		if($('#thelist').find(".li").length<10){
			$('.Loadding').hide();
		}
		var p=2;
		new NeuF.ScrollPage(window, { delay: 1000, marginBottom:500}, function (offset) {
			if (offset > 0) {
				$(".Loadding").show(); //加载提示.
				setTimeout(function(){data.page=page++*10;
					getInfo(0)},1000)
			}
		});
	});
	//$(window).scroll(function () {
	//	var height1 = $(document).height();
	//	var height2 = $(window).height();
	//	if ($(window).scrollTop() + 1 == (height1 - height2)) {
	//		$('.Loadding').show();
	//		data.page=page++*10;
	//		getInfo(0);
    //
	//	} else {
	//		$('.Loadding').hide();
	//	}
	//})
	$('.findSure').click(function(){
		if($('.place').val()!=='不限'){
			data.dist=$('.place').val();
		}else{
			delete data.dist;
		}
		if($('.edu').val()!=='不限'){
			data.edu=$('.edu').val();
		}else{
			delete data.edu;
		}
		if($('.renzhen').val()=='不限'){
		}else if($('.renzhen').val()=='未认证'){
			data.auth=9;
		}else if($('.renzhen').val()=='全部已认证'){
			data.auth=5;
		}else if($('.renzhen').val()=='投资业绩认证'){
			data.auth=1;
		}else if($('.renzhen').val()=='身份证认证'){
			data.auth=3;
		}else if($('.renzhen').val()=='教育证书认证'){
			data.auth=4;
		}else if($('.renzhen').val()=='工作经历认证'){
			data.auth=2;
		}else if($('.renzhen').val()=='培训从业资格认证'){
			data.auth=7;
		}else {
			delete data.auth;
		}
		if($('.IdleMoney').val()!=='不限'){
			data.zj=$('.IdleMoney').val();
		}else{
			delete data.zj;
		}
		if($('.demandAnnual').val()!=='不限'){
			data.sy=$('.demandAnnual').val();
		}else{
			delete data.sy;
		}
		getInfo(1);
		$(function(){
			$(".mm-slideout").trigger("mousedown");
		});
	})
})
function getInfo (type1){
	console.log(data)
	$.ajax({
		url:'http://open.zhengjuan.com/api/app',
		type:'POST',
		dataType:'jsonp',
		data:data,
		success:function(data){
			console.log(data)
			var html='';
			for(var i=0;i<data.data.length;i++){
				if(data.data[i].role==2){
					if(data.data[i].nianhua==null){
						var nianhua='';
					}else {
						var nianhua=data.data[i].nianhua;
					}
					if(data.data[i].type==null){
						var type='';
					}else{
						var type=data.data[i].type;
					}
					html+='<li><a href="../hisIndex_killer/index.html?user_id='+data.data[i].user_id+'">';
					html+='<div class="rolerImg"><span style="background:url(' + data.data[i].usericon + ') no-repeat center;background-size:cover;"></span></div>';
					if(data.data[i].is_money==1&&data.data[i].is_idcard==1&&data.data[i].is_edu==1&&data.data[i].is_peixun==1&&data.data[i].is_touzi==1&&data.data[i].is_work==1){
						htmlFirst += '<div class="rolerRz"><img src="../style/img/yrz.png"></div>';
					}else{}
					html+='<div class="rolerInfo">';
					html+='<div class="rolerPP"><span>'+data.data[i].username+'</span></div>';
					html+='<div class="rolerPP">需求年化收益率：<span>'+nianhua+'</span></div>';
					html+='<div class="rolerPP">期望合作模式：<span>'+type+'</span></div>';
					html+='</div></a></li>';
				}else{
					if(data.data[i].nianhua==null){
						var nianhua='';
					}else {
						var nianhua=data.data[i].nianhua;
					}
					if(data.data[i].type==null){
						var zijin='';
					}else{
						var zijin=data.data[i].money;
					}
					html+='<li><a href="../hisIndex_killer/index.html?user_id='+data.data[i].user_id+'">';
					html+='<div class="rolerImg"><span style="background:url(' + data.data[i].usericon + ') no-repeat center;background-size:cover;"></span></div>';
					if(data.data[i].is_money==1&&data.data[i].is_idcard==1&&data.data[i].is_edu==1&&data.data[i].is_peixun==1&&data.data[i].is_touzi==1&&data.data[i].is_work==1){
						htmlFirst += '<div class="rolerRz"><img src="../../style/img/yrz.png"></div>';
					}else{}
					html+='<div class="rolerInfo">';
					html+='<div class="rolerPP"><span>'+data.data[i].username+'</span></div>';
					html+='<div class="rolerPP">年化收益率：<span>'+nianhua+'</span></div>';
					html+='<div class="rolerPP">需求合作资金：<span>'+zijin+'</span></div>';
					html+='</div></a></li>';
				}
			}
			if(type1==0){
				if(data.data.length==0){
					$('.Loadding').html('没有更多了')
				}
				$('#thelist').append(html);
			}else if(type1==1){
				$('#thelist').html(html);
			}
		}
	})
}
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
	/*alreadOn*/
	$(".sex_item li a").click(function(){
		$(this).addClass("alread_on").parent().siblings().children().removeClass("alread_on");
		$(".sex").val($(this).html());
	});
	$(".place_item li a").click(function(){
		$(this).addClass("alread_on").parent().siblings().children().removeClass("alread_on");
		$(".place").val($(this).html());
	});
	$(".renzhen_item li a").click(function(){
		$(this).addClass("alread_on").parent().siblings().children().removeClass("alread_on");
		$(".renzhen").val($(this).html());
	});
	$(".demand_item  li a").click(function(){
		$(this).addClass("alread_on").parent().siblings().children().removeClass("alread_on");
		$(".moneyDemand").val($(this).html());
	});
	$(".existing_item  li a").click(function(){
		$(this).addClass("alread_on").parent().siblings().children().removeClass("alread_on");
		$(".existingAnnual").val($(this).html());
	});
	$(".idle_item  li a").click(function(){
		$(this).addClass("alread_on").parent().siblings().children().removeClass("alread_on");
		$(".IdleMoney").val($(this).html());
	});
	$(".demandAnnual_item  li a").click(function(){
		$(this).addClass("alread_on").parent().siblings().children().removeClass("alread_on");
		$(".demandAnnual").val($(this).html());
	});
	$(".rolers_item  li a").click(function(){
		$(this).addClass("alread_on").parent().siblings().children().removeClass("alread_on");
		$(".rolers").val($(this).html());
	});
	$(".edu_item li a").click(function(){
		$(this).addClass("alread_on").parent().siblings().children().removeClass("alread_on");
		$(".edu").val($(this).html());
	});
});