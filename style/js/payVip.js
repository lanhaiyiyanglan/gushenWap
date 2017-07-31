 $(function(){
		$('.vipTabs li').click(function(){ 
		   $(".cardShow").hide();
		   $(this).addClass("selected").siblings().removeClass("selected");
			var index = $(this).index();
			$('form').css("display","none");
			$('form').eq(index).css("display","block");
		}); 
		$(".payList li").click(function(){
		  $(this).addClass("on").siblings().removeClass("on");
		  var data=$(this).find(".payText").text();
		  $("#pay_type").val(data);
		});
		$("#paySure").click(function(){
				var card_name = $("#card_name").val();
				var card_pass = $("#card_pass").val();
			if(card_name==""){
				$("#card_name_msg").text("预付卡卡号不能为空");
				$("#card_name").focus();
				return false;
			}else{
				$("#card_name_msg").text("");
			}
			if(card_pass==""){
				$("#card_pass_msg").text("预付卡密码不能为空");
				$("#card_pass").focus();
				return false;
			}else{
				$("#card_pass_msg").text("");
			}
				$("#card_name_msg").text("");
				$("#card_pass_msg").text("");
			$.ajax({
				type:'POST',
				url:'http://open.zhengjuan.com/api/app',
				dataType:'jsonp',
				data:{
					user_id: $.cookie('user_id'),
					total_fee : 360,
					platform:3,
					card_number:card_name,
					card_password:card_pass,
					module:'user',
					do:'createVipOrder'
				},
				success:function(data){

				}
			});
	})
});

 function showCard(){
	 if( $(".cardShow").css('display')=='none'){
		 if($(".payText").hasClass('on')){

		 }else{
			 $(".payText").addClass('on')
		 }
		 $(".cardShow").show();
	 }else{
		 if(!$(".payText").hasClass('on')){

		 }else{
			 $(".payText").removeClass('on')
		 }
		 $(".cardShow").hide();
	 }
 }