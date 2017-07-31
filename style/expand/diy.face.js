$(function() {
	$.fn.diyfacebox = function(options) {
		var defaults = {
		Event : "click", //响应事件		
		divid : "reviewerinfo", //表单ID（textarea外层ID）
		textid : "TextArea", //文本框ID
		texttips : "TextArea", //提示文本
		maxlength:300 //输入长度提示
		};
		var options = $.extend(defaults,options);
		var $btn = $(this);//取得触发事件的ID
		
		//创建表情框
		var faceimg = '';
		var tposition = $btn.position();
	    for(i=0;i<60;i++){  //通过循环创建60个表情，可扩展
		 faceimg+='<li><a href="javascript:void(0)"><img src="'+deface+'/face/'+(i+1)+'.gif" face="['+(i+1)+']"/></a></li>';
		 };
		$("#"+options.divid).prepend("<div id='diyFaceBox'><span class='Corner'></span><div class='Content'><h3><span>常用表情</span><a class='close' title='关闭'></a></h3><ul>"+faceimg+"</ul></div></div>");
	     $('#diyFaceBox').css({"display":'none',"left":-25,"top":tposition.top+20});//创建完成后先将其隐藏
		//创建表情框结束
		
		var $facepic = $("#diyFaceBox li img");
		//BTN触发事件，显示或隐藏表情层
		$btn.on(options.Event,function(e) {
			if($('#diyFaceBox').is(":hidden")){
			$('#diyFaceBox').show(360);
			$btn.addClass('in');
			}else{
			$('#diyFaceBox').hide(360);
			$btn.removeClass('in');
				}
			});
		
		//插入表情
		$facepic.off("click").click(function(){
		     $('#diyFaceBox').hide(360);
			 $("#"+options.textid).off("click").insertContent($(this).attr("face"));
			 countnum($("#"+options.textid),options.maxlength)
			 $btn.removeClass('in');
			});			
		//关闭表情层
		$('#diyFaceBox h3 a.close').click(function() {
			$('#diyFaceBox').hide(360);
			 $btn.removeClass('in');
			});	
		//当鼠标移开时，隐藏表情层，如果不需要，可注释掉
		 $('#diyFaceBox').mouseleave(function(){
			 $('#diyFaceBox').hide(560);
			 $btn.removeClass('in');
			 });
		//添加提示	
		$("#"+options.textid).attr("placeholder",options.texttips);	
		if(!('placeholder' in document.createElement('input'))){
			$("#"+options.textid).val(options.texttips).css("color","#999999");
			$("#"+options.textid).on("focus",function () {
				if($(this).val()==options.texttips){$(this).val('');this.style.color='#000000';}
			}); 
			$("#"+options.textid).on("blur",function () {
				if($(this).val()==''){$(this).val(options.texttips);this.style.color='#999999'}
			}); 
		}
		
		//文本筐数字计算，如果不需要，可注释掉	 
		$("#"+options.textid).on("keyup",function () {
			countnum($(this),options.maxlength)
		});
				
		//如果元素区字符数大于最大字符数，按照最大字符数截断；
		$("#"+options.textid).on("keydown",function () {
			if (this.value.length > options.maxlength){
				this.value = this.value.substring(0, options.maxlength);
			}
		});
		//实现按Ctrl+Enter发送效果
		$("#"+options.textid).on("keydown",function(event) {
			if (event.ctrlKey && event.keyCode == 13) {
				$("#"+options.divid).submit();
			}
		});
  };  
  function countnum($this,num){
  	var atlength = $this.val().length;      
    /*for(var i = 0; i < $this.val().length; i++){      
        if($this.val().charCodeAt(i) > 127){      
         atlength++;      
        }      
    }*/
	if( atlength > num){
		$this.val($this.val().substr(0, num));
		$this.next().html('还可以输入<font>'+0+'</font>字');
	}else{
	 	$this.next().html('还可以输入<font>'+(num-atlength)+'</font>字');
	}
  }
// 【漫画】 光标定位插件
$.fn.extend({  
	insertContent : function(myValue, t) {  
		var $t = $(this)[0];  
		if (document.selection) {  
			this.focus();  
			var sel = document.selection.createRange();  
			sel.text = myValue;  
			this.focus();  
			sel.moveStart('character', -l);  
			var wee = sel.text.length;  
			if (arguments.length == 2) {  
			var l = $t.value.length;  
			sel.moveEnd("character", wee + t);  
			t <= 0 ? sel.moveStart("character", wee - 2 * t	- myValue.length) : sel.moveStart("character", wee - t - myValue.length);  
			sel.select();  
			}  
		} else if ($t.selectionStart || $t.selectionStart == '0') {  
			var startPos = $t.selectionStart;  
			var endPos = $t.selectionEnd;  
			var scrollTop = $t.scrollTop;  
			$t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos,$t.value.length);  
			this.focus();  
			$t.selectionStart = startPos + myValue.length;  
			$t.selectionEnd = startPos + myValue.length;  
			$t.scrollTop = scrollTop;  
			if (arguments.length == 2) { 
				$t.setSelectionRange(startPos - t,$t.selectionEnd + t);  
				this.focus(); 
			}  
		} else {                              
			this.value += myValue;                              
			this.focus();  
		}  
	}  
});
 
	 //表情解析
	 $.fn.extend({
		  replaceface : function(){
		  		var faces = $(this).val();
			    for(i=0;i<60;i++){
				  faces=faces.replace(new RegExp("\\[" + (i+1) + "\\]", "g"),'<img src="'+deface+'/face/'+(i+1)+'.gif">');
				  }
			   return faces;
			   }
	  });
    //评论图片上传
  	$.fn.diyimgupextend = function(options){
	    var defaults = {
		Event : "click", //响应事件		
		divid : "reviewerinfo", //表单ID（textarea外层ID）
		url:"php/Picupload.php",//上传路径
		imgbtn:"imgup" //图片上传按钮
		};
		var options = $.extend(defaults,options);
		var $btn = $(this);//取得触发事件的ID
		
		//创建图片上传筐
		var tposition = $btn.position();
		$("#"+options.divid).prepend("<div id='diyImageBox'><span class='Corner'></span><div class='Content'><h3><span>本地上传</span><a class='close' title='关闭'></a></h3><ul class='fileBoxUl'><li id='imgup' class='diyimgupextend'></li></ul><input type='hidden' id='images' name='images' /></div></div>");
     	$('#diyImageBox').css({"display":'none',"left":50,"top":tposition.top+20});//创建完成后先将其隐藏
     	//BTN触发事件，显示或隐藏上传层
		$btn.on(options.Event,function(e) {
			if($('#diyImageBox').is(":hidden")){
				$('#diyImageBox').show(360);
				$btn.addClass('in');
			}else{
				$('#diyImageBox').hide(360);
				$btn.removeClass('in');
			}
		});
		//关闭上传层
		$('#diyImageBox h3 a.close').click(function() {
			$('#diyImageBox').hide(360);
			 $btn.removeClass('in');
			});	
		//当鼠标移开时，隐藏上传层，如果不需要，可注释掉
		/*$('#diyImageBox').mouseleave(function(){
			 $('#diyImageBox').hide(560);
			 $btn.removeClass('in');
		});*/	
     	//初始化上传图片
     	$('#'+options.imgbtn).diyUpload({
			url:options.url,
			//按钮容器;
			pick:{
				id:"#"+options.imgbtn,
				label:"",
				multiple:false
			}
		});
	}
  	$.diypagesextend=function(options){
		if ( typeof options != "object" ) {
			alert('参数错误!');
			return;	
		}
  		var defaults = {
			page : 1, //初始化当前页码		
			conts : 18, //总共数据量
			pageparent:"commentpage",
			divid : "pages", //分页父级容器,用于放置内容
			url:"php/fileupload.php", //数据请求路径
			groups:5, //连续显示分页数
			success:function(data) {alert(data);},
			error:function( err ) {alert(err);},
			/** 
			 * 创建分页
			 * @param {String} divId 分页导航渲染到的dom对象ID 
			 * @param {String} total 后台返回的总记录数 
			 * @param {int} pageSize 每页显示的记录数，默认是10
			 * @param {int} curPage 当前显示的记录数，默认是1
			 * @param {int} groups 连续显示分页数，默认是5
			 */ 
			addpage:function(fdivId, total, pageSize, curPage,groups){
				    var output = '<ul class="page clear" style="width:auto; margin-bottom:0; padding-top:0;">';  
				    var pageSize = parseInt(pageSize)>0 ? parseInt(pageSize) : 10;  
				    if(parseInt(total) == 0 || parseInt(total) == 'NaN') return;  
				    var totalPage = Math.ceil(total/pageSize);  
				    var curPage = parseInt(curPage)>0 ? parseInt(curPage) : 1;
				    var groups = typeof(groups)=="undefined"?5:groups;
				    //设置起始页码  
				    if (totalPage > groups) {  
				        if ( curPage > groups && curPage <= (totalPage - groups)) {  
				            var start = curPage - 2,end = curPage + 2;  
				        } else if (curPage > (totalPage - groups)) {  
				            var start = totalPage-4,end = totalPage; 
				        } else {  
				            var start = 1,end = groups;  
				        }  
				    } else {  
				        var start = 1,end = totalPage;  
				    }  
				    //上一页菜单控制  
				    if(curPage!=1){
				    	output += '<li><a href="javascript:void(0);" class="prev_no" data-page="'+(curPage-1)+'">上一页</a></li>';
				    }else{
				    	output += '<li class="prev disabled"><span>上一页</span></li>';
				    }
				    //页码展示  
				    for(i = start; i <= end; i++) {  
				        if (i == curPage) {output += '<li><a href="javascript:void(0);" class="current" data-page="'+curPage+'">'+curPage+'</a></li>';}else {output += '<li><a href="javascript:void(0);" data-page="'+i+'">'+i+'</a></li>';}  
				    }  
				    //下一页菜单控制  
				    if( curPage != totalPage ){
				    	output += '<label class="total_label">'+curPage+' / '+totalPage+' 页</span></label><li><a href="javascript:void(0);" class="prev" data-page="'+(curPage+1)+'">下一页</a></li>';
				    }else{
				    	output += '<label class="total_label">'+curPage+' / '+totalPage+' 页</span></label><li class="next disabled"><span>下一页</span></li>';
				    }
				    output += '</ul>';
				    //渲染到dom中  
				    $(fdivId).html("");
				    $(fdivId).html(output);
				},
			thison:function($this){
				$(this.pageparent+" ul li").off('click');
				$(this.pageparent+" ul li").on('click',function () {
					if(typeof($(this).children("a").attr("data-page"))!="undefined"){
						$this.getdata($(this).children("a").attr("data-page"),$this);
					}
				});
			},
			getdata:function (page,$this) {
				var id = this.divid;
				$.getJSON(this.url,{"page":page,"rid":rid},function (data) {
					var temp = "",
					    template1 = '<div class="commentitem"><div class="clearme"><div class="uimg fl"><img src="{0}"/></div><div class="commentc1 fl"><div class="commentc1top"><span class="uname">{1}</span><span class="bg udate">{2}</span></div><div class="commentc"><p class="commentctext">{3}</p>',
						template2 = '</div></div></div>',		
						template3 =	'</div>',
						templatewidget1 = '<div class="commentitemwidget"><a class="bg report" href="javascript:void(0)" dataid="{0}">举报</a></div>',
						templatewidget2 = '<div class="commentitemwidget"><a class="bg remove" href="javascript:void(0)" dataid="{0}">删除</a><a class="bg writeback" href="javascript:void(0)" dataid="{0}">回复</a></div>',
						templatewidget3 = '<div class="commentitemwidget"><a class="bg remove" href="javascript:void(0)" dataid="{0}">删除</a></div>',
						templateimg1 = '<p class="commentcimg" id ="commentcimg{0}">',
						templateimg2 = '<a rel="group{0}" href="{1}"><img src="{1}"></a>',
						templateimg3 = '<script>$("#commentcimg{0} a[rel=group{0}]").fancybox({"titlePosition":"over","cyclic": true,"titleFormat":function(title, currentArray, currentIndex, currentOpts) {return "<span id=\'fancybox-title-over\'>"+(currentIndex + 0)+" / "+currentArray.length+(title.length?"&nbsp;"+title:"")+"</span>";}});</script></p>',
					    mydata = data.data;
					for (var i = 0; i < mydata.length; i++) {
						if (!data.islogin) {
						  //没登录
						  temp = temp + $.format(template1,mydata[i][1],mydata[i][2],mydata[i][5],mydata[i][3]);
						  var array = mydata[i][4].split(";")
						  if (array.length>1) {
						  	temp  = temp +  $.format(templateimg1,i);
						  	for (var j = 0; j < array.length; j++) {
						  		temp  = temp +  $.format(templateimg2,i,array[j]);
						  	}
						  	temp  = temp +  $.format(templateimg3,i);
						  } else  if(array.length==1 && array[0]!=""){
						  	temp  = temp +  $.format(templateimg1,i)+$.format(templateimg2,i,array[0])+$.format(templateimg3,i);
						  }
						  temp += template2+template3;
						} else{
							if(data.isslef){
								//登录且晒单是自己的
								temp = temp + $.format(template1,mydata[i][1],mydata[i][2],mydata[i][5],mydata[i][3]);
							  	var array = mydata[i][4].split(";")
							  	if (array.length>1) {
							  		temp  = temp +  $.format(templateimg1,i);
							  		for (var j = 0; j < array.length; j++) {
							  			temp  = temp +  $.format(templateimg2,i,array[j]);
							  		}
							  		temp  = temp +  $.format(templateimg3,i);
							  	} else  if(array.length==1 && array[0]!=""){
							  		temp  = temp +  $.format(templateimg1,i)+$.format(templateimg2,i,array[0])+$.format(templateimg3,i);
							  	}
							  	temp = temp + template2;
							  	if(mydata[i][6]){
							  		temp = temp + $.format(templatewidget3,mydata[i][0]);
							  	}else{
							  		temp = temp + $.format(templatewidget2,mydata[i][0]);
							  	}
							  	temp = temp + template3;
							}else{
								//登录晒单不是自己的
								temp = temp + $.format(template1,mydata[i][1],mydata[i][2],mydata[i][5],mydata[i][3]);
							  	var array = mydata[i][4].split(";")
							  	if (array.length>1) {
							  		temp  = temp +  $.format(templateimg1,i);
							  		for (var j = 0; j < array.length; j++) {
							  			temp  = temp +  $.format(templateimg2,i,array[j]);
							  		}
							  		temp  = temp +  $.format(templateimg3,i);
							  	} else if(array.length==1 && array[0]!=""){
							  		temp  = temp +  $.format(templateimg1,i)+$.format(templateimg2,i,array[0])+$.format(templateimg3,i);
							  	}
							  	temp = temp + template2;
							  	if(mydata[i][6]){
							  		temp = temp + $.format(templatewidget3,mydata[i][0]);
							  	}else{
							  		temp = temp + $.format(templatewidget1,mydata[i][0]);
							  	}
							  	temp = temp + template3;
							}
						}	
					}
					$(id).html("").html(temp);
					$(".bg.report").off('click');
					$(".bg.report").on('click',function () {
						var id = $(this).attr("dataid");
						layer.prompt({
						    title: '举报',
						    formType: 2,
						    value: '',
						    maxlength: 200
						}, function(text){
						    layer.closeAll();
							$.getJSON("/record/report",{"id":id,"text":text},function (data) {
								if(data.status){
									layer.msg(data.msg, {icon: 1}, function(){
									});
								}else{
									layer.msg(data.msg, {icon: 2});
								}
							});
						});
					});
					$(".bg.remove").off('click');
					$(".bg.remove").on('click',function () {
						var id = $(this).attr("dataid");
						layer.confirm('<p class="confirm">确定要删除这条评论吗？</p>', {
								title:"删除评论",
								area: ['300px', '150px'],
								btn: ['确定','取消'] //按钮
							}, function(){
								layer.closeAll();
								$.getJSON("/record/delete",{"id":id},function (data) {
									if(data.status){
										layer.msg(data.msg, {icon: 1}, function(){
                                            document.location = document.location;
										});
									}else{
										layer.msg(data.msg, {icon: 2});
									}
								});
							}, function(){
						        layer.closeAll();
					  	});
					});
					$(".bg.writeback").off('click');
					$(".bg.writeback").on('click',function () {
						var id = $(this).attr("dataid");
						var uname = $(this).parent().parent().find(".uname").text();
						$('#writeback').val(id);
						$('#W_input').val("回复 "+uname+" :");
						$(document).scrollTop($('#W_input').offset().top-20);
						$('#W_input').focus();
					});
                    if(Math.ceil($this.conts/10) > 1){
                        $this.addpage($this.pageparent,$this.conts,10,page,$this.groups);
                    }
					$this.thison($this);
				});
			}
		};
		//组装参数;
		var options = $.extend(defaults,options);
		if( options.success ) {
			var successCallBack = options.success;
			delete options.success;
		}
		if( options.error ) {
			var errorCallBack = options.error;
			delete options.error;
		}
		if( options.error ) {
			var errorCallBack = options.error;
			delete options.error;
		}
		options.getdata(options.page,options);	
	}
  
});
