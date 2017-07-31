if (!NeuF) var NeuF = {};
		NeuF.ScrollPage = function (obj, options, callback) {
			var _defaultOptions = { delay: 500, marginBottom: 500 }; //默认配置：延迟时间delay和滚动条距离底部距离marginBottom
			options = $.extend(_defaultOptions, options);
			this.isScrolling = false; //是否在滚动
			this.oriPos = 0; //原始位置
			this.curPos = 0; //当前位置
			var me = this; //顶层
			var $obj = (typeof obj == "string") ? $("#" + obj) : $(obj);
			//绑定滚动事件
			//$(window).height()当前可见区域的大小，随浏览器窗口大小改变$(document).height() 整个文档的高度不变scrollTop()==0到顶端了
		   //scrollTop()>=$(document).height()-$(window).height()到底端了 
			$obj.scroll(function (ev) {
			me.curPos = $obj.scrollTop();
			if ($(window).height() + $(window).scrollTop()+300>= $(document.body).height() - options.marginBottom) {
			if (me.isScrolling == true) return;
			me.isScrolling = true;
			setTimeout(function () { me.isScrolling = false;}, options.delay); //重复触发间隔毫秒;
			if (typeof callback == "function") callback.call(null, me.curPos - me.oriPos);
			};
			me.oriPos = me.curPos;
			});
        };
	$(function () {
		if($('#thelist').find("li").length<8){           
			$('.Loadding').hide();
		}
		var p=2;
		new NeuF.ScrollPage(window, { delay: 1000, marginBottom:500}, function (offset) {
		if (offset > 0) {
			$(".Loadding").show(); //加载提示.
			setTimeout(function () {
				var html='';
				html += '<li>';
				html += '<a href="#">';
				html += '<div class="rolerImg"><img src="../image/roler1.png"></div>';
				html += '<div class="rolerRz"><img src="../style/img/yrz.png"></div>';
				html += '<div class="rolerInfo">';
				html += '<div class="rolerPP"><span>胜者为王</span></div>';
				html += '<div class="rolerPP">年化收益率：<span>50%以下</span></div>';
				html += '<div class="rolerPP">需求合作资金：<span>180万</span></div>';
				html += '</div>';
				html += '</a>';
				html += '</li>';
				html += '<li>';
				html += '<a href="#">';
				html += '<div class="rolerImg"><img src="../image/roler1.png"></div>';
				html += '<div class="rolerRz"><img src="../style/img/yrz.png"></div>';
				html += '<div class="rolerInfo">';
				html += '<div class="rolerPP"><span>胜者为王</span></div>';
				html += '<div class="rolerPP">年化收益率：<span>50%以下</span></div>';
				html += '<div class="rolerPP">需求合作资金：<span>180万</span></div>';
				html += '</div>';
				html += '</a>';
				html += '</li>';
				$("#thelist").append(html);
			/*	var gender =$(".sex").val();//性别
				var resideprovince=$(".place").val();//地区
				var renzhen=$(".renzhen").val();//认证
				var moneyDemand=$(".moneyDemand").val();//需求合作资金
				var existingAnnual=$(".existingAnnual").val();//现有年化收益率
				var postData = 'page='+p+'&isAjax=1&groupid='+groupid+'&gender='+gender+'&resideprovince='+resideprovince+'&renzhen='+renzhen+'&moneyDemand='+moneyDemand+'&existingAnnual='+existingAnnual;
				$.ajax({
					type: "POST",
					url: ajax_url,
					dataType: "json",
					data: postData,
					success: function(data) {
						var count = data.length;
						var el,  i,html='';
						el = $("#thelist");
						if(count > 0){

							for (i=0; i< count; i++) {
								html += '<li>';
								html += '<a href="#">';
								html += '<div class="rolerImg"><img src="../image/roler1.png"></div>';
								html += '<div class="rolerRz"><img src="../style/img/yrz.png"></div>';
								html += '<div class="rolerInfo">';
								html += '<div class="rolerPP"><span>胜者为王</span></div>';
								html += '<div class="rolerPP">年化收益率：<span>50%以下</span></div>';
								html += '<div class="rolerPP">需求合作资金：<span>180万</span></div>';
								html += '</div>';
								html += '</a>';
							    html += '</li>';
							}
							p++;
							// 数据加载完成后，调用界面更新
						}else{
								$("#Loadding").html('亲，别拉了，到底了~').fadeIn(5000);
						}
						el.append(html);
					},
					error: function(x, e) {},
					complete: function(x) {}
				});*/


			$(".Loadding").hide();//内容获取后，隐藏加载提示
			},1000);
		}
	});
});