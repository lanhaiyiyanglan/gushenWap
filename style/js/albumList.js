function GetQueryString(name)//获取地址栏参数
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var url=window.location.href;
var albumid=GetQueryString("albumid");//从url中获取albumid
var almbuname=decodeURI(GetQueryString("almbuname"));
console.log("albumList="+almbuname);
var links="addPic.html?albumid="+albumid+"&almbuname="+encodeURI(encodeURI(almbuname));
$(".addListAlbum a").attr("href",links);
$(function(){
    if(url.indexOf('his')!==-1){
        $(".linkOperate").hide();
        $('.addListAlbum').hide();
    }
    $(".linkOperate").click(function(){//相册点击的时候显示删除和取消
        $(".Mhui").fadeIn();
        $(".bottomSlide").fadeIn();
    });
});
function cancleDel(){//点击取消的时候隐藏删除和取消选项
    $(".Mhui").fadeOut();
    $(".bottomSlide").fadeOut();
}
function deleteList(obj){
    layer.confirm("确定要删除相册吗？", {btn: ['取消','确定'],shade: [0.3, '#000'],title:false,area:['50rem','25rem'],closeBtn: 0,skin:'demo-class',scrollbar: false
    }, function(){
        layer.closeAll();
    }, function(){
        $.ajax({
            url:'http://open.zhengjuan.com/api/app',
            data:{
                module:'user',
                do:'delAlbum',
                albumid:albumid
            },
            dataType:'jsonp',
            jsonp:"callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            type:'POST',
            success:function(data){
                if(data.code ==1){
                    layer.msg('删除成功', {icon: 7,time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-success',shadeClose:true,scrollbar: false},function(){window.location.href='../myAlbum/albumManage.html';});
                }else{
                    layer.msg("删除失败", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-success',shadeClose:true,scrollbar: false});
                }
            }
        });
    });
}
$(function(){
    var page=0;
    $.ajax({
        url:'http://open.zhengjuan.com/api/app',
        data:{
            module:'user',
            do:'getPicListByAlbumId',
            albumid:albumid,
            page:(page++)*10
        },
        type:'POST',
        dataType:'jsonp',
        success:function(data){
            console.log(data)
            if(url.indexOf('type=his')!==-1){
                $('.addListAlbum').hide();
                $('.linkOperate').hide();
                $(".top h1").html(decodeURI(GetQueryString("almbuname")));
            }else{
                $('.addListAlbum').show();
                $('.linkOperate').show()
                $(".top h1").html(decodeURI(GetQueryString("almbuname")));
            }
            console.log(data);
            if(data.data.length>0){
                var html='';
                for (var i=0;i<data.data.length;i++){
                    html+='<li id="'+data.data[i].picid+'">';//相片id
                    html+='<a href="albumDetail.html?picid='+data.data[i].picid+'&albumid='+data.data[i].albumid+'&index='+i+'&userid='+data.data[i].user_id+'&almbuname='+ encodeURI(encodeURI($(".top h1").html()))+'">';
                    var pic=data.data[i].filepath.split(';');
                    for(var j=0;j<pic.length;j++){
                        if(data.data[i].filepath.indexOf('http')==-1){
                            html+='<div class="albumImg"><span  style="background:url(http://static.gushen178.scom/upload/record/'+pic[j]+') no-repeat center;background-size:cover;"></span></div>';
                        }else{
                            html+='<div class="albumImg"><span  style="background:url('+pic[j]+') no-repeat center;background-size:cover;"></span></div>';//相片路径
                        }

                    }
                    html+='<div class="albumImgInfo"><span>'+data.data[i].title+'</span></div>';//相片描述
                    html+='</a>';
                    html+='</li>';
                }
                $(html).insertBefore(".addListAlbum");
            }
        }
    })
    $(window).scroll(function(){
        var height1=$(document).height();
        var height2=$(window).height();
        if($(window).scrollTop()+1==(height1-height2)){
            $('.loading').show();
            $.ajax({
                url:'http://open.zhengjuan.com/api/app',
                data:{
                    module:'user',
                    do:'getPicListByAlbumId',
                    albumid:albumid,
                    page:(page++)*10
                },
                dataType:'jsonp',
                jsonp:"callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                type:'POST',
                success:function(data){
                    var html='';
                    for (var i=0;i<data.data.length;i++){
                        html+='<li id="'+data.data[i].picid+'">';//相片id
                        html+='<a href="albumDetail.html?picid='+data.data[i].picid+'&albumid='+data.data[i].albumid+'&index='+i+'&userid='+data.data[i].user_id+'&almbuname='+ encodeURI(encodeURI($(".top h1").html()))+'">';
                        var pic=data.data[i].filepath.split(';');
                        for(var j=0;j<pic.length;j++){
                            if(data.data[i].filepath.indexOf('http')==-1){
                                html+='<div class="albumImg"><span  style="background:url(http://static.gushen178.scom/upload/record/'+pic[j]+') no-repeat center;background-size:cover;"></span></div>';
                            }else{
                                html+='<div class="albumImg"><span  style="background:url('+pic[j]+') no-repeat center;background-size:cover;"></span></div>';//相片路径
                            }
                        }
                        html+='<div class="albumImgInfo"><span>'+data.data[i].title+'</span></div>';//相片描述
                        html+='</a>';
                        html+='</li>';
                    }
                    $(html).insertBefore(".addListAlbum");
                    if(data.data.length==0){
                        $('.loading span').html('没有更多了...')
                        $('.loading img').remove();
                    }
                }
            });
        }else{
            $('.loading').hide();
        }
    });
});