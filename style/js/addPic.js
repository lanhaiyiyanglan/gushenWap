function GetQueryString(name)//获取地址栏参数
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
$(function () {
	    var albumid=GetQueryString("albumid");//从url中获取albumid
		var almbuname=decodeURI(GetQueryString("almbuname"));
		console.log("addPIc="+almbuname);
		$('.back').click(function(){
			window.history.back();
		})
		$("#addpicSure").click(function () {
			if($.trim($('#picText').val())==''){
				layer.msg('相片描述不能为空！', {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-success',shadeClose:true,scrollbar: false});
			}else if($('#addImg').children('li').not('#addBtn').length==0){
				layer.msg('请上传相片！', {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-success',shadeClose:true,scrollbar: false});
			}else{
				var img = $('#addImg').children('li').not('#addBtn').children('img');
				var imgVal = [];
				for (var n = 0; n < img.length; n++) {
					imgVal.push($($(img)[n]).attr('src'));
				}
				console.log(imgVal)
				$.ajax({
					type: "POST",
					url: "http://open.zhengjuan.com/api/app",
					dataType: "jsonp",
					data: {
						module: 'user',
						do: 'addPic2Album',
						albumid: albumid,
						user_id:$.cookie('user_id'),
						filepath: imgVal.join(';'),
						title: $('#picText').val()
					},
					success: function (data) {
						if (data.code == "1") {
							var links="../myAlbum/albumList.html?albumid="+albumid+"&almbuname="+encodeURI(encodeURI(almbuname));
							layer.msg('上传成功', {icon: 7,time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-success',shadeClose:true,scrollbar: false},function(){window.location.href=links;});
						} else {
							console.log(data)
						}
					},
					error: function (x, e) {
					},
					complete: function (x) {
					}
				});
			}
		});
	});
var uploader = uploadJSSDK;

function upload(e) {
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
				console.log(result)
				$('#upfile').val('');
				if (result.code == 'OK') {
					var doms = $('<li><img src=' + result.url + '><i onClick="del(this);"></i></li>');
					$(doms).insertBefore("#addBtn");
				} else {
					layer.msg('图片大小不能超过2M！', {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-success',shadeClose:true,scrollbar: false});
				}
				if ($("#addImg li").length <= 1) {//限制图片张数
					$("#addBtn").show();
				} else {
					$("#addBtn").hide();
				}
			}
		});
	}
}

//删除上传的图片
function del(obj) {
	if ($("#addImg li").length <= 4) {//限制图片张数
		$("#addBtn").show();
	} else {
		$("#addBtn").hide();
	}
	$(obj).parent().remove();
}

/*文字截取*/
function remainSub2(whatIn, number) {
	whatIn = "#" + whatIn;
	if ($(whatIn).val().length >= number) {
		$(whatIn).val($(whatIn).val().substr(0, number - 1));
	}
}