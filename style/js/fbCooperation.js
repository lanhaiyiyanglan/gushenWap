if (typeof($.cookie('password')) == 'undefined') {
	window.location.href = '../../logRegPassword/index.html'
} else {
}
function remainSub2(whatIn,remain,number){
	whatIn="#"+whatIn;
	remain="#"+remain;
	if ($(whatIn).val().length>=number){
		$(whatIn).val($(whatIn).val().substr(0,number-1));
	}
}
function showHide(page1,page2){
	$("#"+page1).toggle();
	$("#"+page2).toggle();
}
$(function(){
	$(".modelList li").click(function(){
	 $(this).addClass("on").siblings().removeClass("on");	
	});
	$("#selectModel").click(function(){
	  var selectModel=$(".modelList li.on").text();
	  $("input[name='modelInput']").val(selectModel);	
	  $("#wrapper2").toggle();	
      $("#wrapper1").toggle();	
	});
   /*发布合作验证*/
	 $("#cooperForm").validate({
        rules:{
            cooperationTit:{required:true},
            cooperationTextarea:{required: true}
        },
        messages:{
            cooperationTit:{required:"合作标题不能为空！"},
            cooperationTextarea:{required:"合作内容不能为空！"}
        },
		errorPlacement:function(error,element) {
                error.appendTo(element.parent().next(".cooperationValid"));
        }		
	});
	/*发布合作点击事件*/
	$("#cooperationSure").click(function(){
		if(!$("#cooperForm").valid()||$('input[name=modelInput]').val()==''){
           return false;
        }else{
			$.ajax({
				url:'http://open.zhengjuan.com/api/app',
				type:'POST',
				dataType:'jsonp',
				data:{
					module:'user',
					do:'publishCoop',
					creator_id: $.cookie('user_id'),
					type:$('input[name=modelInput]').val(),
					subject:$('#cooperationTit').val(),
					content:$('#cooperationTextarea').val()
				},
				success:function(data){
					console.log(data)
					layer.msg('发表成功', {icon: 7,time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-success',shadeClose:true,scrollbar: false});
					setInterval('window.open("cooperList.html","_self")',2000)
				}
			})
		}
	});
	/****修改合作****/
	$("#cooperationSure1").click(function(){
		var url=window.location.href;
		var coopid=url.split('?')[1].split('=')[1];
		if(!$("#cooperForm").valid()||$('input[name=modelInput]').val()==''){
           return false;
        }else{
			$.ajax({
				url:'http://open.zhengjuan.com/api/app',
				type:'POST',
				dataType:'jsonp',
				data:{
					module:'user',
					do:'modifyCoopDetail',
					coop_id: coopid,
					type:$('input[name=modelInput]').val(),
					subject:$('#cooperationTit').val(),
					content:$('#cooperationTextarea').val()
				},
				success:function(data){
					console.log(data)
					layer.msg('修改成功', {icon: 7,time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-success',shadeClose:true,scrollbar: false});
					setInterval('window.open("cooperList.html","_self")',2000)
				}
			})
		}
	});
});