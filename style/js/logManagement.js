$(function(){
 /*发表日志验证*/
	 $("#logpostForm").validate({
        rules:{
            logTit:{required:true},
            logTextarea:{required: true}
        },
        messages:{
            logTit:{required:"日志标题不能为空！"},
            logTextarea:{required:"日志内容不能为空！"}
        },
		errorPlacement:function(error,element) {
                error.appendTo(element.parent().next(".cooperationValid"));
        }		
	});
	/*发表日志点击事件*/
	$("#logSure").click(function(){
		if(!$("#logpostForm").valid()){
           return false;
        }else{
			var postData=$("#logpostForm textarea").map(function(){return ($(this).attr("name")+'='+$(this).val());}).get().join("&");
			alert(postData);
			$.ajax({
				type: "POST",
				url: "",
				dataType: "json",
				data:postData,
				success: function(data) {
				    if(data.status == 1){
					  layer.msg('发表成功', {icon: 7,time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-success',shadeClose:true,scrollbar: fals});
					}else{
					  layer.msg(data.message, {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
					}
				},
				error: function(x, e) {
				},
				complete: function(x) {}
			});
		}
	});	
});