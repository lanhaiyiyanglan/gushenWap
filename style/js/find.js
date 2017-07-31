pageIndex = 0;
data={
	module: 'user',
	do: 'searchUserListByRole',
	page: 0,
	pageSize:10,
	role:1
};
function search (){
	var val=$('#search').val();
	if($.trim(val)!==''){
		data.keywords=val;
	}
	console.log(data)
	data.page=0;
	paigeIndex=0;
	$.ajax({
		url:'http://open.zhengjuan.com/api/app',
		type:'POST',
		dataType:'jsonp',
		data:data,
		success:function(data){
			console.log(data)
			var htmlFirst = '';
			for (var i = 0; i < data.data.length; i++) {
				htmlFirst += '<li>';
				htmlFirst += '<a href="../hisIndex_killer/index.html?user_id='+data.data[i].user_id+'">';
				htmlFirst += '<div class="rolerImg"><span style="background:url(' + data.data[i].usericon + ') no-repeat center;background-size:cover;"></span></div>';
				if(data.data[i].is_idcard==1&&data.data[i].is_edu==1&&data.data[i].is_peixun==1&&data.data[i].is_touzi==1&&data.data[i].is_work==1){
					htmlFirst += '<div class="rolerRz"><img src="../style/img/yrz.png"></div>';
				}else{}
				var nianhua=data.data[i].nianhua;
				var money=data.data[i].money;
				if(money==null){
					var money='';
				}
				if(nianhua==null){
					var nianhua='';
				}
				htmlFirst += '<div class="rolerInfo">';
				htmlFirst += '<div class="rolerPP"><span>' + data.data[i].username + '</span></div>';
				htmlFirst += '<div class="rolerPP">年化收益率：<span>' + nianhua + '</span></div>';
				htmlFirst += '<div class="rolerPP">需求合作资金：<span>' + money + '</span></div>';
				htmlFirst += '</div>';
				htmlFirst += '</a>';
				htmlFirst += '</li>';
			}
			$('#thelist').html(htmlFirst);
			if($('#thelist').children('li').length<10){
				$('.Loadding').hide()
			}
		}
	})
}
$(document).ready(function() {
	$(function(){
		$(".findReset").click(function(){
			$(".mm-slideout").trigger("mousedown");
		});
	});
	console.log(data)
	$.ajax({
		url: 'http://open.zhengjuan.com/api/app',
		data: {
			module: 'user',
			do: 'searchUserListByRole',
			page: 0,
			role:1
		},
		dataType: 'jsonp',
		type: 'POST',
		success: function (data) {
			console.log(data)
			var htmlFirst = '';
			for (var i = 0; i < data.data.length; i++) {
				var nianhua=data.data[i].nianhua;
				var money=data.data[i].money;
				if(money==null){
					var money='';
				}
				if(nianhua==null){
					var nianhua='';
				}
				htmlFirst += '<li>';
				htmlFirst += '<a href="../hisIndex_killer/index.html?user_id='+data.data[i].user_id+'">';
				if(data.data[i].usericon=="''"){
					htmlFirst += '<div class="rolerImg"><span style="background:url(http://www.gushen178.com/uc_server/images/man_big.gif) no-repeat center;background-size:cover;"></span></div>';
				}else{
					htmlFirst += '<div class="rolerImg"><span style="background:url(' + data.data[i].usericon + ') no-repeat center;background-size:cover;"></span></div>';
				}
				if(data.data[i].is_idcard==1&&data.data[i].is_edu==1&&data.data[i].is_peixun==1&&data.data[i].is_touzi==1&&data.data[i].is_work==1){
					htmlFirst += '<div class="rolerRz"><img src="../style/img/yrz.png"></div>';
				}else{}
				htmlFirst += '<div class="rolerInfo">';
				htmlFirst += '<div class="rolerPP"><span>' + data.data[i].username + '</span></div>';
				htmlFirst += '<div class="rolerPP">年化收益率：<span>' + nianhua+ '</span></div>';
				htmlFirst += '<div class="rolerPP">需求合作资金：<span>' + money + '</span></div>';
				htmlFirst += '</div>';
				htmlFirst += '</a>';
				htmlFirst += '</li>';
			}
			$('#thelist').append(htmlFirst);
			$(function(){
				if($.trim($('#search').val())!=='')
					$(".searchbar-cancel").trigger("click");
			});
		}
	});
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
		if($('#thelist').find("li").length<10){
			$('.Loadding').hide();
		}
		var p=2;
		new NeuF.ScrollPage(window, { delay: 1000, marginBottom:500}, function (offset) {
			if (offset > 0) {
				$(".Loadding").show(); //加载提示.
				pageIndex+=1;
				data.page=pageIndex*10;
				console.log(data)
				getInfo(0);
			}
		});
	});
	//$(window).scroll(function () {
	//	var height1 = $(document).height();
	//	var height2 = $(window).height();
	//	if ($(window).scrollTop() + 1 == (height1 - height2)) {
	//		$('.Loadding').show();
	//		pageIndex+=1;
	//		data.page=pageIndex*10;
	//		console.log(data)
	//		getInfo(0);
	//	} else {
	//		$('.Loadding').hide();
	//	}
	//})
	$('.findSure').click(function(){
		pageIndex=0;
		if($('.sex').val()!=='不限'){
			if($('.sex').val()=='男'){
				data.sex=1;
			}else{
				data.sex=2;
			}
		}else{
			delete data.sex;
		}
		if($('.place').val()!=='不限'){
			data.dist=$('.place').val();
		}else{
			delete data.dist;
		}
		if($('.renzhen').val()!=='不限'){
			if($('.renzhen').val()=='未认证'){
				data.auth='9';
				console.log(data)
			}else if($('.renzhen').val()=='全部已认证'){
				data.auth='5';
				console.log(data)
			}else if($('.renzhen').val()=='投资业绩认证'){
				data.auth='1';
				console.log(data)
			}else if($('.renzhen').val()=='身份证认证'){
				data.auth='3';
				console.log(data)
			}else if($('.renzhen').val()=='教育证书认证'){
				data.auth='4';
				console.log(data)
			}else if($('.renzhen').val()=='工作经历认证'){
				data.auth='2';
				console.log(data)
			}else if($('.renzhen').val()=='培训从业资格认证'){
				data.auth='7';
				console.log(data)
			}
		}else{
			delete data.auth;
		}
		if($('.moneyDemand').val()!=='不限'){
			data.zj=$('.moneyDemand').val();
			console.log(data)
		}else{
			delete data.zj;
		}
		if($('.existingAnnual').val()!=='不限'){
			data.sy=$('.existingAnnual').val();
			console.log(data)
		}else{
			delete data.sy;
		}
		console.log(data)
		getInfo(1);
		$(function(){
			$(".mm-slideout").trigger("mousedown");
		});
	});

})
function getInfo(type){
	if(type==1){
		data.page=0;
	}
	$.ajax({
		url: 'http://open.zhengjuan.com/api/app',
		data:data,
		dataType: 'jsonp',
		jsonp: "callback",
		jsonpCallback: "success_jsonpCallback",
		type: 'POST',
		success: function (data) {
			console.log(data)
			var htmlFirst='';
			if(data.data.length>0){
			for (var i = 0; i < data.data.length; i++) {
				htmlFirst += '<li>';
				htmlFirst += '<a href="../hisIndex_killer/index.html?user_id='+data.data[i].user_id+'">';
				if(data.data[i].usericon=="''"){
					htmlFirst += '<div class="rolerImg"><span style="background:url(http://www.gushen178.com/uc_server/images/man_big.gif) no-repeat center;background-size:cover;"></span></div>';
				}else{
					htmlFirst += '<div class="rolerImg"><span style="background:url(' + data.data[i].usericon + ') no-repeat center;background-size:cover;"></span></div>';
				}
				if(data.data[i].is_idcard==1&&data.data[i].is_edu==1&&data.data[i].is_peixun==1&&data.data[i].is_touzi==1&&data.data[i].is_work==1){
					htmlFirst += '<div class="rolerRz"><img src="../style/img/yrz.png"></div>';
				}else{}
				var nianhua=data.data[i].nianhua;
				var money=data.data[i].money;
				if(money==null){
					var money='';
				}
				if(nianhua==null){
					var nianhua='';
				}
				htmlFirst += '<div class="rolerInfo">';
				htmlFirst += '<div class="rolerPP"><span>' + data.data[i].username + '</span></div>';
				htmlFirst += '<div class="rolerPP">年化收益率：<span>' + nianhua + '</span></div>';
				htmlFirst += '<div class="rolerPP">需求合作资金：<span>' + money + '</span></div>';
				htmlFirst += '</div>';
				htmlFirst += '</a>';
				htmlFirst += '</li>';
			}
				if (type == 0){
					$('#thelist').append(htmlFirst);
				} else {
					$('#thelist').html(htmlFirst);
					if($('#thelist').children('li').length<10){
						$('.Loadding').hide();
					}
				}
			}else{
				$('#thelist').html(htmlFirst);
				if(data.data.length==0){
					$('.Loadding').html('已经没有更多了哦...')
					$('.Loadding').show();
				}
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
	   window.history.go(0);
   });
   $(".searchbar-cancel").click(function(){
	  search();
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