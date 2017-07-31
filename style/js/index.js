$(function(){
    var swiper = new Swiper('.swiper-container', {
        pagination : '.swiper-pagination',
        paginationClickable: true,
        autoplay: 3000,
        loop: true
    });	
});
var page=0;
if($.cookie('role')==1){
    var role= 2;
}else{
    var role= 1;
}
$(document).ready(function(){
    var sdk = new WSDK();
    console.log($.cookie('password'))
    sdk.Base.login({
        uid: 'gs'+ $.cookie('uid'),
        appkey: 23316858,
        credential: '111111',
        timeout: 5000,
        success: function (data) {
            var recentTribe = [];

            sdk.Base.getUnreadMsgCount({
                count: 99,
                success: function(data){
                    console.log(data);
                    var list = data.data;
                    console.log(list)
                    var noread=0;
                    for(var i=0;i<list.length;i++){
                        if(list[i].contact.substring(0, 8) !== 'chntribe'){
                            noread+=parseInt(list[i].msgCount);
                        }
                    }
                    if(noread>=99){
                        noread=99;
                    }else{
                        noread=noread;
                    }
                    if(noread==0){
                        $('.noReadMsg').hide();
                        $('.noReadMsg').html(noread)
                    }else{
                        $('.noReadMsg').show();
                        $('.noReadMsg').html(noread)
                    }
                    recentTribe.length && console.log('最近给我发消息的群', recentTribe);
                },
                error: function(error){
                    console.log('获取未读消息的条数失败' ,error);
                }
            });
        },
        error: function (error) {
            // {code: 1002, resultText: 'TIMEOUT'}
            console.log('login fail', error);
        }
    });
    $('.game_m').click(function(){
        if($.cookie('password')==undefined||$.cookie('password')=='null'){
            window.location.href='logRegPassword/index.html';
        }else{
            window.location.href='game/cgGame.html';
        }
    })
    $('.game_s').click(function(){
        if($.cookie('password')==undefined||$.cookie('password')=='null'){
            window.location.href='logRegPassword/index.html';
        }else{
            window.location.href='personalCenter/firmOrder/myFirm/myFirm.html';
        }
    })
    $('.footer ul li:nth-child(2)').click(function(){
        if($.cookie('password')==undefined||$.cookie('password')=='null'){
            window.location.href='logRegPassword/index.html';
        }else{
            window.location.href='myFriend/index.html';
        }
    });
    $('.footer ul li:nth-child(3)').click(function(){
        if($.cookie('password')==undefined||$.cookie('password')=='null'){
            window.location.href='logRegPassword/index.html';
        }else{
            window.location.href='Mymesaage/index.html';
        }
    });
    $('.footer ul li:nth-child(4)').click(function(){
        if($.cookie('password')==undefined||$.cookie('password')=='null'){
            window.location.href='logRegPassword/index.html';
        }else{
            window.location.href='personalCenter/index.html';
        }
    });
    $('.renzheng').click(function(){
        if($.cookie('password')==undefined||$.cookie('password')=='null'){
            window.location.href='logRegPassword/index.html';
        }else{
            window.location.href='personalCenter/authentication/index.html';
        }
    });
    if($.cookie('role')==1){
        $('.recommandTit').html('热门金主');
    }else{
        $('.recommandTit').html('热门高手');
    }
    $.ajax({
        url:'http://open.zhengjuan.com/api/app',
        data:{
            module:'user',
            do:'searchUserListByRole',
            page:(page++)*10,
            role:role,
            iscommand:1
        },
        type:'POST',
        dataType:'jsonp',
        success:function(data){
            console.log(data)
            var html='';
            for (var i=0;i<data.data.length;i++){
                if(data.data[i].is_command==1){
                    if(data.data[i].nianhua==null){
                        var nianhua='';
                    }else{
                        var nianhua=data.data[i].nianhua;
                    }
                    html+='<li>';
                    html+='<div class="item">';
                    html+='<div class="img"><a href="hisIndex_killer/index.html?user_id='+data.data[i].user_id+'"><img src="'+data.data[i].usericon+'" class="ico"></a></div>';
                    html+='<div class="info"> ';
                    html+='<div class="nameIcon"><span class="name">'+ eval("'" + data.data[i].username + "'")+'</span>';
                    if(data.data[i].role==1){
                        if(data.data[i].mobile!==''){
                            html+='<a href="#"class="gs1"></a>';
                        }else{
                        }
                        if(data.data[i].is_idcard==1){
                            html+='<a href="#" class="gs2"></a>';
                        }else{
                        }
                        if(data.data[i].is_edu==1){
                            html+='<a href="#" class="gs3"></a>';
                        }else{
                        }
                        if(data.data[i].is_touzi==1){
                            html+='<a href="#" class="gs4"></a>';
                        }else{
                        }
                        if(data.data[i].is_work==1){
                            html+='<a href="#" class="gs5"></a>';
                        }else{
                        }
                        if(data.data[i].is_peixun==1){
                            html+='<a href="#" class="gs6"></a>';
                        }else{
                        }
                    }else{
                        if(data.data[i].mobile!==''){
                            html+='<a href="#"class="gs1"></a>';
                        }else{
                        }
                        if(data.data[i].is_idcard==1){
                            html+='<a href="#" class="gs2"></a>';
                        }else{
                        }
                        if(data.data[i].is_edu==1){
                            html+='<a href="#" class="gs3"></a>';
                        }else{
                        }
                        if(data.data[i].is_money==1){
                            html+='<a href="#" class="gs7"></a>';
                        }else{
                        }
                        if(data.data[i].is_peixun==1){
                            html+='<a href="#" class="gs6"></a>';
                        }else{
                        }
                    }
                    html+='</div>';
                    html+='<div class="brief">'+data.data[i].resideprovince+' '+data.data[i].residecity+' '+data.data[i].residedist+'</div>';
                    html+='<div class="price">年化收益率：<span class="orange">'+nianhua+'</span></div>';
                    html+='</div>';
                    html+='</div>';
                    html+='</li>';
                }
            }
            $('.list-block').append(html);
        }
    })
})
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
            setTimeout(function (){$('.loading').show();$.ajax({
                url:'http://open.zhengjuan.com/api/app',
                data:{
                    module:'user',
                    do:'searchUserListByRole',
                    page:(page++)*10,
                    role:role,
                    iscommand:1
                },
                dataType:'jsonp',
                jsonp:"callback",
                jsonpCallback:"success_jsonpCallback",
                type:'POST',
                success:function(data){
                    console.log(data)
                    var html='';
                    for (var i=0;i<data.data.length;i++){
                        if(data.data[i].is_command==1){
                            if(data.data[i].nianhua==null){
                                var nianhua='';
                            }else{
                                var nianhua=data.data[i].nianhua;
                            }
                            html+='<li>';
                            html+='<div class="item">';
                            html+='<div class="img"><a href=hisIndex_killer/index.html?user_id='+data.data[i].user_id+'"><img src="'+data.data[i].usericon+'" class="ico"></a></div>';
                            html+='<div class="info"> ';
                            html+='<div class="nameIcon"><span class="name">'+ eval("'" + data.data[i].username + "'")+'</span>';
                            if(data.data[i].role==1){
                                if(data.data[i].mobile!==''){
                                    html+='<a href="#"class="gs1"></a>';
                                }else{
                                }
                                if(data.data[i].is_idcard==1){
                                    html+='<a href="#" class="gs2"></a>';
                                }else{
                                }
                                if(data.data[i].is_edu==1){
                                    html+='<a href="#" class="gs3"></a>';
                                }else{
                                }
                                if(data.data[i].is_touzi==1){
                                    html+='<a href="#" class="gs4"></a>';
                                }else{
                                }
                                if(data.data[i].is_work==1){
                                    html+='<a href="#" class="gs5"></a>';
                                }else{
                                }
                                if(data.data[i].is_peixun==1){
                                    html+='<a href="#" class="gs6"></a>';
                                }else{
                                }
                            }else{
                                if(data.data[i].mobile!==''){
                                    html+='<a href="#"class="gs1"></a>';
                                }else{
                                }
                                if(data.data[i].is_idcard==1){
                                    html+='<a href="#" class="gs2"></a>';
                                }else{
                                }
                                if(data.data[i].is_edu==1){
                                    html+='<a href="#" class="gs3"></a>';
                                }else{
                                }
                                if(data.data[i].is_money==1){
                                    html+='<a href="#" class="gs7"></a>';
                                }else{
                                }
                                if(data.data[i].is_peixun==1){
                                    html+='<a href="#" class="gs6"></a>';
                                }else{
                                }
                            }
                            html+='</div>';
                            html+='<div class="brief">'+data.data[i].resideprovince+' '+data.data[i].residecity+' '+data.data[i].residedist+'</div>';
                            html+='<div class="price">年化收益率：<span class="orange">'+nianhua+'</span></div>';
                            html+='</div>';
                            html+='</div>';
                            html+='</li>';
                        }
                    }
                    $('.list-block').append(html);
                    if(data.data.length==0){
                        $('.loading span').html('没有更多了...')
                        $('.loading img').remove();
                    }
                }
            })}, 1000);
        }
    });
});
