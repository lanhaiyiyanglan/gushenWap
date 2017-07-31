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
		if($('#thelist').find(".indexli").length<5){           
			$('.Loadding').hide();
		}
		var p=2;
		new NeuF.ScrollPage(window, { delay: 1000, marginBottom:500}, function (offset) {
		if (offset > 0) {
			$(".Loadding").show(); //加载提示.
			setTimeout(function () {

				var keywords=$("#keywords").val();
				var groupid=$('#groupid').val();
				var gender =$(".sex").val();//性别
				var resideprovince=$(".place").val();//地区
				var lookingfor=$(".style").val();//操作风格
				var weight=$(".xqzj").val();//需求合作资金
				var field1=$(".hzms").val();//合作模式
				var xueli=$(".xueli").val();//学历
				var top_xueli=$(".top_xueli").val();<!--学历专业-->
				//var field3=$(".nsr").val();//管理资产
				var cyzz=$(".cyzz").val();<!--从业资质-->
				var postData = 'page='+p+'&isAjax=1&groupid='+groupid+'&gender='+gender+'&resideprovince='+resideprovince+'&lookingfor='+lookingfor+'&weight='+weight+'&field1='+field1 + '&keywords='+keywords+'&education='+xueli+'&position='+top_xueli;
				var rst = $("#thelist a").size();
				groupid = parseInt(groupid);
				if(groupid == 23){
					postData += '&taobao='+cyzz;
				}
				$.ajax({
					type: "POST",
					url: ajax_url,
					dataType: "json",
					data: postData,
					success: function(data) {
						var count = data.length;
						var el,  i,html='';
						//el = document.getElementById('thelist');
						el = $("#thelist");
						if(count > 0){

							for (i=0; i< count; i++) {
								 html += '<div class="indexli">';
								html += '<div class="left">';
								html += '<a href="/Home/Member/otherHome/uid/'+data[i]['uid']+'/returnUrl/1.html">';
								if(data[i]['isVip']){
									html += '<div class="userface">';
									html += '<img src="http://www.gushen178.com/uc_server/avatar.php?size=big&uid='+data[i]['uid']+'&gender='+data[i]['gender']+'">';
									html += '</div>';
									html += '<div class="vip">';
									html += '<img src="/Public/home/style/img/Vip.png">';
									html += '</div>';
								}else{
									html += '<div class="userface">';
									html += '<img src="http://www.gushen178.com/uc_server/avatar.php?size=big&uid='+data[i]['uid']+'&gender='+data[i]['gender']+'">';
									html += '</div>';
								}
								html += '</a>';
								html += '</div>';
								html += '<div class="right">';
								html += '<div class="box">';
								html += '<div class="top">';
								html += '<strong><a href="/Home/Member/otherHome/uid/'+data[i]['uid']+'/returnUrl/1.html">'+data[i]['username']+'</a></strong>';
								if(data[i]['is_mobile'] == 1){
									html += '<div class="mobile"><img src="/Public/home/style/img/Mobile.png"></div>';
								}
								if(data[i]['is_attestation'] == 1){
									html += '<div class="mobile"><img src="/Public/home/style/img/Strength.png"></div>';
								}
								if(data[i]['is_binding'] == 1 && groupid == 22){
									html += '<div class="mobile"><img src="/Public/home/style/img/Capital.png"></div>';
								}else if(data[i]['is_binding'] == 1 && groupid == 23){
									html += '<div class="mobile"><img src="/Public/home/style/img/Firm.png"></div>';
								}
								html += '<span>'+data[i]['residecity']+'</span>';
								html += '</div>';
								if(groupid == 23) {
									html += '<p>实盘累计收益：<i>'+data[i]['field11']+'</i></p>';
									html += '<p>模拟盘累计收益：<i>'+data[i]['field12']+'</i></p>';
								}else{
									html += '<p>实盘收益需求：<i>'+data[i]['field11']+'</i></p>';
									html += '<p>模拟收益需求：<i>'+data[i]['field12']+'</i></p>';
								}
								html += '<div class="line"></div>';
								html += '<p class="signature">个性签名：'+data[i]['sightml']+'</p>';
								html += '</div>';
								html += '</div>';
							    html += '</div>';  
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
				});


			$(".Loadding").hide();//内容获取后，隐藏加载提示
			}, 1000);
		}
	});
});