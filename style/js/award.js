$(function(){
	 //上传奖项
	$("#uploaAward").click(function(){
	  var awardItems=$(".xi_list li.del").length;//奖项的个数
	  var aa=parseInt($("#clickTimes").val());
	  var bb=aa+1;
	   $("#clickTimes").val(bb);
	   var tt="wrapper"+bb;
		showHide(tt,'wrapper1');  
		var showChange="wrapper"+(bb+1);//wrapper9.....wrapper10
		var giftAdd="giftAdd"+(bb+1);
		var awardTypes="awardTypes"+(bb+1);
		var html='';
		html+='<div id="'+giftAdd+'" class="tmd"><header class="top">';
		html+='<a href="javascript:void(0);" class="back" onClick="showHide(\''+showChange+'\',\'wrapper1\')"><img src="../style/img/back.png"></a>';
		html+='<h1>比赛名称</h1>';
		html+='<span class="operationBtn delAward" onClick="delAward(this);"><input type="button" value="删除"></span>';
		html+='</header>';
		html+='<div class="editorText">';
		html+='<input placeholder="奖项名称.." class="title">';
		html+='</div>';
		html+='<div class="InputTips">如总收益第一名</div>';
		html+='<div class="editorText" onClick="showHide(\''+awardTypes+'\',\''+giftAdd+'\')">';
		html+='<input placeholder="奖项类型" readonly class="type" title=""><img src="../style/img/right.png" id="awardTypeImg">';
		html+='</div>';
		html+='<div class="editorText">';
		html+='<input placeholder="名次..." class="rank">';
		html+='</div>';
		html+='<div class="InputTips">如为前十名请填写：1-10，单个名次直接填写对应的数字，如为无任何名次的填写0</div>';
		html+='<div class="editorText">';
		html+='<input placeholder="奖品名称..." class="prize">';
		html+='</div>';
		html+='<div class="InputTips">如苹果手机IPHONE4一部</div>';
		html+='<div class="addBox">';
		html+='<ul id="addImg">';
		html+='<li id="addBtn">';
		html+='<img src="../style/img/addAlbum.png" id="imagesAdd">';
		html+='<input id="file" type="file"  onChange="upload(event,this)">';
		html+='</li>';
		html+='</ul>';
		html+='</div>';
		html+='<div class="sureBtn">';
		html+='<input type="button" value="确认保存" onClick="addAwardInfo(this);">';
		html+='</div></div>';
		html+='<div id="'+awardTypes+'" style="display:none;">';
        html+='<header class="top">';
        html+='<a href="javascript:void(0);" onClick="showHide(\''+awardTypes+'\',\''+giftAdd+'\')" class="back"><img src="../style/img/back.png"></a>';
        html+='<h1>奖项类型</h1>';
        html+='</header>';
        html+='<ul class="joinInfoList">';
        html+='<li onClick="setAward(this);">总榜奖</li>';
        html+='<li onClick="setAward(this);">周榜奖</li>';
        html+='<li onClick="setAward(this);">月榜奖</li>';
        html+='</ul>';
        html+='</div>';
		$(".upWrappers").append("<div style=\"display:none;\" id="+showChange+"></div>")
		$("#"+showChange).append(html);
	});
});
//选择奖项类型
function setAward(obj){
	  $(obj).addClass("on").siblings().removeClass("on");
	  var awardType=$(obj).text(); 
	  var type='';
	  if(awardType=="总榜奖"){type=0; 
	  }else if(awardType=="周榜奖"){type=1;   
	  }else{type=2;}
	  var giftAdd=$(obj).parent().parent().parent().find(".tmd").attr("id");
	  var awardTypes=$(obj).parent().parent().attr("id");
	  showHide(awardTypes,giftAdd);
	  $(obj).parent().parent().parent().find(".type").val(awardType);
	  $(obj).parent().parent().parent().find(".type").attr("title",type);
	  $(obj).parent().parent().parent().find(".tmd").show();
	  $(obj).parent().parent().hide();
}
var prize = new Array();
function addAwardInfo(obj){//点击保存，切换当前显示，并给列表增加一项
          var title=$(obj).parent().parent().find(".title").val();//奖项名称
		  var type=$(obj).parent().parent().find(".type").val();//奖项类型
		  var rank=$(obj).parent().parent().find(".rank").val();//名次
		  var prizeName=$(obj).parent().parent().find(".prize").val();//奖品名称
		  var image=$(obj).parent().parent().find(".image").length;//奖品图片
		  if(title==''){
			  layer.msg("奖项名称不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
		  }else if(type==''){
			  layer.msg("奖项类型不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
		  }else if(rank==''){
			  layer.msg("名次不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
		  }else if(prizeName==''){
			  layer.msg("奖品名称不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
		  }else if(image==0){
			  layer.msg("奖品图片不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
		  }else{
			  var aa=parseInt($("#clickTimes").val());//当前wrapper8
			  var nowWrapper=$(obj).parent().parent().parent().attr("id");
		      var nowShow=$(obj).parent().parent().attr("id");
			  showHide(nowShow,'wrapper1');//点击保存隐藏当前
			  var nowNum=$(obj).parent().parent().attr("id").replace("giftAdd","");//得到当前wrapper后的数字
              var tt=parseInt(nowNum);//把当前wrapper后的数字转成int型
			  var delWrapper="delWrapper"+tt;//当前多增加的li的id
			  var prizeLength=$(obj).parent().parent().find(".prize").val();
			  if(tt==aa&&$(".addItems").find("#"+delWrapper).length<=0){//点击保存如果列表中没有增加一项就增加一项，否则不增加
				   $(".addItems").append('<li class="del" id='+delWrapper+' onClick="saveDel(\''+nowWrapper+'\',\'wrapper1\')"><input value="奖品名称('+prizeLength+')"><img src="../style/img/right.png"></li>');  
			       $(".xi_list li.del").each(function(index, element){
					  if(parseInt($(this).attr("id").replace("delWrapper",""))==tt){
						var index=$(this).index()-1;
								prize[index] = {
									title :	$(obj).parent().parent().parent().find(".title").val(),
									type : $(obj).parent().parent().parent().find(".type").attr("title"),
									rank : $(obj).parent().parent().parent().find(".rank").val(),
									prize : $(obj).parent().parent().parent().find(".prize").val(),
									image : $(obj).parent().parent().parent().find(".image").attr("src")
								}
					  }
				  }); 
			  }else{
				   var newPrize="奖品名称("+prizeLength+")";
				   $("#"+delWrapper).find("input").val(newPrize); 
				   $(".xi_list li.del").each(function(index, element){
					  if(parseInt($(this).attr("id").replace("delWrapper",""))==tt){
						var index=$(this).index()-1;
						console.log("index="+index);
							prize[index] = {
								title :	title,
								type :type,
								rank :rank,
								prize :prizeName,
								image : image
						   }
					  }
				  }); 
			  }  
		  } 
		  
		  console.log("保存时的prize="+prize);
}
//删除奖项
function saveDel(page1,page2){
	$("#"+page1).show();	
	$("#"+page1).find(".tmd").show();
    $("#"+page2).hide();
	$("#"+page1).find(".delAward").show();
}
function delAward(obj){//
  var odd=$(obj).parent().parent().parent().attr("id");//获取我当前的wrapper
  var nowNum=odd.replace("wrapper","");//得到当前wrapper后的数字
  var tt=parseInt(nowNum);//把当前wrapper后的数字转成int型
  showHide(nowNum,'wrapper1');//切换当前wrapper
  var cc="delWrapper"+tt;//获取当前wrapper对应的delWrapper
  $(".xi_list li.del").each(function(index, element){
	  if(parseInt($(this).attr("id").replace("delWrapper",""))==tt){
	    var index=$(this).index();
		$("#delIndex").val(index);
	  }
  });
  $("#"+cc).remove();//去掉对应的delWrapper
  $(obj).parent().parent().remove();//去掉当前wrapper
  var index=$("#delIndex").val()-1;
  prize.splice(index, 1);
}
$(function(){//奖项类型添加切换显示
  $("#awardTypes a").click(function(){
	  var aa=parseInt($("#clickTimes").val());
	  var bb="wrapper"+aa;
	  showHide('awardTypes',''+bb+'');
  });
  $("#stepList1 li").click(function(){
	  $(this).addClass("on").siblings().removeClass("on");
	  $("#game_money").val($(this).text());
	  $("#game_money_hidden").val($(this).text());
	  showHide('step24','step241');  
  });
  $("#stepList2 li").click(function(){
	  $(this).addClass("on").siblings().removeClass("on");
	  $("#game_creator").val($(this).text());
	  $(".game_creator_span").text($(this).text());
	  var game_creator='';
	 if($(this).text()=="有奖大赛"){
	     game_creator=177;
	  }else if($(this).text()=="高校大赛"){
	     game_creator=8;
	  }else if($(this).text()=="券商大赛"){
	     game_creator=9;
	  }else if($(this).text()=="团队大赛"){
	     game_creator=11;
	  }else if($(this).text()=="其他大赛"){
	     game_creator=353;
	  }else{
	     game_creator=99;
	  }
	  $("#game_creator_hidden").val(game_creator);
	  showHide('step24','step242');  
  });	
  $("#stepList3 li").click(function(){
	  $(this).addClass("on").siblings().removeClass("on");
	  $("#game_event").val($(this).text());
	  $(".game_event_span").text($(this).text());
	  var game_event='';
	  if($(this).text()=="股票"){
	     game_event=9865;
	  }else if($(this).text()=="基金"){
	     game_event=34233;
	  }
	  else if($(this).text()=="股指期货"){
	     game_event=13424;
	  }else{
	     game_event=93413;
	  }
	  $("#game_event_hidden").val(game_event);
	  showHide('step24','step243');  
  });
  $("#stepList4 li").click(function(){
	  $(this).addClass("on").siblings().removeClass("on");
	  $("#game_type").val($(this).text());
	  $(".game_type_span").text($(this).text());
	  var game_type='';//比赛类型
	  if($(this).text()=="公开赛"){
	     game_type=901;
	  }else{
	     game_type=293;
	  }
	  $("#game_type_hidden").val(game_type);
	  showHide('step24','step244');
  });
  var html='';
  $("#gameBasic").click(function(){//第一个下一步，点击下一步判断非空，并填充第三步的比赛内容
	  /*for(i=0;i<prize.length;i++){
		if(prize[i]==undefined){
		   prize.splice(i,1);
		} 
	  } */
	 prize = prize.filter(function(e){
			return e!= undefined;
	 });
	 console.log("点击下一步时的prize="+prize);

	  if($("#game_sponsor").val()==''){
		  layer.msg("主办方名称不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
	  }else if($("#contact_name").val()==''){
		  layer.msg("联系人不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
	  }else if($("#contact_mobile").val()==''){
		layer.msg("联系电话不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
	  }else if($("#contact_email").val()==''){
		layer.msg("联系邮箱不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
	  }else if($("#game_title").val()==''){
		layer.msg("比赛名称不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
	  }else if($("#game_intro").val()==''){
		layer.msg("比赛介绍不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
	  }else{
		  showHide('step2','wrapper1');
		  $(".sureTable2").empty();
		  var html='';
		  for(i=0;i<prize.length;i++){
				 html+='<tr>';	
				 html+='<td><input type="text" value="'+prize[i]['title']+'" name="prize['+i+'][title]"></td>';	
				 if(prize[i]['type']==0){
					html+='<td>总榜奖<input type="hidden" value="'+prize[i]['type']+'" name="prize['+i+'][type]"></td>';	 
				 }else if(prize[i]['type']==1){
					html+='<td>周榜奖<input type="hidden" value="'+prize[i]['type']+'" name="prize['+i+'][type]"></td>';	 
				 }else{
					html+='<td>月榜奖<input type="hidden" value="'+prize[i]['type']+'" name="prize['+i+'][type]"></td>';	 
				 }
				 html+='<td><input type="text" value="'+prize[i]['rank']+'" name="prize['+i+'][rank]"></td>';	
				 html+='<td><input type="text" value="'+prize[i]['prize']+'" name="prize['+i+'][prize]"></td>';	
				 html+='</tr>';       
		  }
		  $(".sureTable2").html(html);
	  }
  });
  //比赛时间设置保存
  $("#timeSave").click(function(){
	  var apply_begin_time=$("#apply_begin_time").val();
	  var abStart=new Date(apply_begin_time.replace("-", "/").replace("-", "/"));  
	  var apply_end_time=$("#apply_end_time").val();
	  var aeEnd=new Date(apply_end_time.replace("-", "/").replace("-", "/"));  
	  var play_begin_time=$("#play_begin_time").val();
	  var pbStart=new Date(play_begin_time.replace("-", "/").replace("-", "/"));  
	  var play_end_time=$("#play_end_time").val();
	  var peEnd=new Date(play_end_time.replace("-", "/").replace("-", "/"));  
	if(apply_begin_time==''||apply_end_time==''||play_begin_time==''||play_end_time==''){
		layer.msg("请将时间填写完整", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
	}else if(aeEnd<abStart){  
		layer.msg("报名截止时间小于报名开始时间", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
	}else if(peEnd<pbStart){
		layer.msg("比赛时间结束小于比赛开始时间", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
	}else{
		$("#ab").val(apply_begin_time);
		$("#ae").val(apply_end_time);
		$("#pb").val(play_begin_time);
		$("#pe").val(play_end_time);
		showHide('step23','step2');
	}
  });
  /*比赛赛程设置保存*/
   $("#gameRoad").click(function(){
	   var game_money=$("#game_money").val();//比赛起始资金
	   var game_creator=$("#game_creator").val();//比赛模式
	   var game_event=$("#game_event").val();//比赛内容
	   var game_type=$("#game_type").val();//比赛类型
	   if(game_money==''){
		  layer.msg("比赛起始资金不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false}); 
	   }else if(game_creator==''){
		  layer.msg("比赛模式不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false}); 
	   }else if(game_event==''){
		  layer.msg("比赛内容不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false}); 
	   }else if(game_type==''){
		  layer.msg("比赛类型不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false}); 
	   }else{
		   $("#gm").val(game_money);
		   $("#gc").val(game_creator);
		   $("#ge").val(game_event);
		   $("#gt").val(game_type);
		   showHide('step24','step2');  
   }
   });
  $("#gameRuler").click(function(){//第二个下一步
	  var game_thumb=$("#game_thumb").val();//比赛LOGO
	  var game_img=$("#game_img").val();//比赛横向大图
	  var ab=$("#ab").val();//比赛报名开始时间
	  var ae=$("#ae").val();//比赛报名截止时间
	  var pb=$("#pb").val();//比赛开始时间
	  var pe=$("#pe").val();//比赛结束时间
	  var gm=$("#gm").val();//比赛起始资金
	  var gc=$("#gc").val();//比赛模式
	  var ge=$("#ge").val();//比赛内容
	  var gt=$("#gt").val();//比赛类型
	  if(game_thumb==''){
		  layer.msg("比赛LOGO不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false}); 
	  }else if(game_img==''){
		  layer.msg("比赛横向大图不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false}); 
	  }else if(ab==''){
		  layer.msg("比赛报名开始时间不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false}); 
	  }else if(ae==''){
		  layer.msg("比赛报名截止时间不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false}); 
	  }else if(pb==''){
		  layer.msg("比赛开始时间不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false}); 
	  }else if(pe==''){
		  layer.msg("比赛结束时间不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false}); 
	  }else if(gm==''){
		  layer.msg("比赛起始资金不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false}); 
	  }else if(gc==''){
		  layer.msg("比赛模式不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false}); 
	  }else if(ge==''){
		  layer.msg("比赛内容不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false}); 
	  }else if(gt==''){
		 layer.msg("比赛类型不能为空", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});  
	  }else{
		  showHide('step2','step3');
   }
  });  
  $(".tijiaoSure").click(function(){//最后提交
     var uid=$.cookie('uid');
	 $("#uid").val(uid);
	 $("#createrSureForm").submit();
	 window.location.href="addSuccess.html";
  });

});
var uploader = uploadJSSDK;
function upload(e,obj) {
	var files = e.target.files;
	//上传
	for (var i = 0; i < files.length; i++) {
		uploader({
			file: files[i],   //文件，必填,html5 file类型，不需要读数据流
			token: 'UPLOAD_AK_TOP MjMzMTY4NTg6ZXlKa1pYUmxZM1JOYVcxbElqb2lNU0lzSW1sdWMyVnlkRTl1YkhraU9pSXdJaXdpYm1GdFpYTndZV05sSWpvaVozVnphR1Z1YW1saGIzbHZkU0lzSW1WNGNHbHlZWFJwYjI0aU9pMHhmUTplZWY1Nzc5Y2YzNDNmYjRhNzRmYjAyMDQ5OGU3YWZlMGJmNmI0MmUw',  //token，必填
			name: new Date().getTime(),
			dir: '/pic',  //目录，选填，默认根目录''
			retries: '0',  //重试次数，选填，默认0不重试
			maxSize: '2048000',  //上传大小限制，选填，默认0没有限制
			callback: function (percent, result) {
				//percent（上传百分比）：-1失败；0-100上传的百分比；100即完成上传
				//result(服务端返回的responseText，json格式)
				if (result.code == 'OK') {
					var doms = $('<li><img class="image" src=' + result.url + '><i onClick="del(this);"></i></li>');
					var addBtn=$(obj).parent().parent().parent().parent().find("#addBtn");
					$(doms).insertBefore(addBtn);
				} else {
					layer.msg(result)
				}
				if ($(obj).parent().parent().parent().parent().find("#addImg li").length <= 1) {//限制图片张数
					$(obj).parent().parent().parent().parent().find("#addBtn").show();
				} else {
					$(obj).parent().parent().parent().parent().find("#addBtn").hide();
				}
			}
		});
	}
}
//删除上传的图片
function del(obj) {
	if ($(obj).parent().parent().parent().parent().find("#addImg li").length <= 2) {//限制图片张数
		$(obj).parent().parent().parent().parent().find("#addBtn").show();
	} else {
		$(obj).parent().parent().parent().parent().find("#addBtn").hide();
	}
	$(obj).parent().remove();
}
