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
})
$('.footer ul li:nth-child(2)').click(function(){
    if($.cookie('password')=='undefined'||$.cookie('password')=='null'){
        window.location.href='../logRegPassword/index.html';
    }else{
        window.location.href='../myFriend/index.html';
    }
});
$('.footer ul li:nth-child(3)').click(function(){
    if($.cookie('password')=='undefined'||$.cookie('password')=='null'){
        window.location.href='../logRegPassworml';
    }else{
        window.location.href='../Mymesaage/index.html';
    }
});
$('.footer ul li:nth-child(4)').click(function(){
    if($.cookie('password')=='undefined'||$.cookie('password')=='null'){
        window.location.href='../logRegPassword/index.html';
    }else{
        window.location.href='../personalCenter/index.html';
    }
});
$(function(){
    if($.cookie('password')=='undefined'||$.cookie('password')==null){
        window.open('../logRegPassword/index.html','_self')
    }else{
        $.ajax({
            url:'http://open.zhengjuan.com/api/app',
            dataType:'jsonp',
            type:'POST',
            data:{
                module:'user',
                do:'getFriendList',
                user_id: $.cookie('user_id')
            },
            success:function(data){
                console.log(data)
                var html='';
                for(var i=0;i<data.data.length;i++){
                    html+='<div class="sort_list">';
                    html+='<a href="friendInfo.html?friend_id='+data.data[i].friend_id+'&friend_name='+encodeURI(encodeURI(data.data[i].friend_name))+'">';
                    html+='<div class="perIncon"><img src="'+data.data[i].usericon+'"></div>';
                    html+='<div class="personalText">';
                    html+='<div class="namePlace">';
                    html+='<div class="friendName num_name">'+data.data[i].friend_name+'<span>';
					if(data.data[i].role==1){
						html+='高手';
					}else{
						html+='金主';
					}
					html+='</span></div>';
                    html+='<div class="freindPlace">'+data.data[i].resideprovince+'&nbsp;&nbsp;&nbsp;&nbsp;'+data.data[i].residecity+'</div>';
                    html+='</div>';
                    if(data.data[i].nianhua==null){
                        var nianhua='';
                    }else{
                        var nianhua=data.data[i].nianhua;
                    }
                    if(data.data[i].role==1){
                        html+='<div class="friendDemand">年化收益率:<span>'+nianhua+'</span></div>';
                    }else{
                        html+='<div class="friendDemand">需求年化收益率:<span>'+nianhua+'</span></div>';
                    }
                    html+='</div></a></div>';
                }
                $('.friendList').append(html);
                swiperLi();
                $(function(){
                    $(function(){
                        var Initials=$('.initials');
                        var LetterBox=$('#letter');
                        Initials.find('ul').append('<li>A</li><li>B</li><li>C</li><li>D</li><li>E</li><li>F</li><li>G</li><li>H</li><li>I</li><li>J</li><li>K</li><li>L</li><li>M</li><li>N</li><li>O</li><li>P</li><li>Q</li><li>R</li><li>S</li><li>T</li><li>U</li><li>V</li><li>W</li><li>X</li><li>Y</li><li>Z</li><li>#</li>');
                        initials();
                        $(".initials ul li").click(function(){
                            var _this=$(this);
                            var LetterHtml=_this.html();
                            LetterBox.html(LetterHtml).fadeIn();

                            Initials.css('background','rgba(145,145,145,0.6)');

                            setTimeout(function(){
                                Initials.css('background','rgba(145,145,145,0)');
                                LetterBox.fadeOut();
                            },1000);
                            var _index = _this.index()
                            if(_index==0){
                                $('html,body').animate({scrollTop: '0px'}, 300);//鐐瑰嚮绗竴涓粴鍒伴《閮�
                            }else if(_index==27){
                                var DefaultTop=$('#default').position().top;
                                $('html,body').animate({scrollTop: DefaultTop+'px'}, 300);//鐐瑰嚮鏈€鍚庝竴涓粴鍒�#鍙�
                            }else{
                                var letter = _this.text();
                                if($('#'+letter).length>0){
                                    var LetterTop = $('#'+letter).position().top;
                                    $('html,body').animate({scrollTop: LetterTop-45+'px'}, 300);
                                }
                            }
                        })

                        var windowHeight=$(window).height();
                        var InitHeight=windowHeight-45;
                        Initials.height(InitHeight);
                        var LiHeight=InitHeight/28;
                        Initials.find('li').height(LiHeight);
                    })
                    function initials() {//鍏紬鍙锋帓搴�
                        var SortList=$(".sort_list");
                        var SortBox=$(".sort_box");
                        SortList.sort(asc_sort).appendTo('.sort_box');//鎸夐瀛楁瘝鎺掑簭
                        function asc_sort(a, b) {
                            return makePy($(b).find('.num_name').text().charAt(0))[0].toUpperCase() < makePy($(a).find('.num_name').text().charAt(0))[0].toUpperCase() ? 1 : -1;
                        }

                        var initials = [];
                        var num=0;
                        SortList.each(function(i) {
                            var initial = makePy($(this).find('.num_name').text().charAt(0))[0].toUpperCase();
                            if(initial>='A'&&initial<='Z'){
                                if (initials.indexOf(initial) === -1)
                                    initials.push(initial);
                            }else{
                                num++;
                            }

                        });
                        console.log(num)
                        $.each(initials, function(index, value) {//娣诲姞棣栧瓧姣嶆爣绛�
                            SortBox.append('<div class="sort_letter" id="'+ value +'">' + value + '</div>');
                        });
                        if(num!=0){SortBox.append('<div class="sort_letter" id="default">#</div>');}

                        for (var i =0;i<SortList.length;i++) {//鎻掑叆鍒板搴旂殑棣栧瓧姣嶅悗闈�
                            var letter=makePy(SortList.eq(i).find('.num_name').text().charAt(0))[0].toUpperCase();
                            switch(letter){
                                case "A":
                                    $('#A').after(SortList.eq(i));
                                    break;
                                case "B":
                                    $('#B').after(SortList.eq(i));
                                    break;
                                case "C":
                                    $('#C').after(SortList.eq(i));
                                    break;
                                case "D":
                                    $('#D').after(SortList.eq(i));
                                    break;
                                case "E":
                                    $('#E').after(SortList.eq(i));
                                    break;
                                case "F":
                                    $('#F').after(SortList.eq(i));
                                    break;
                                case "G":
                                    $('#G').after(SortList.eq(i));
                                    break;
                                case "H":
                                    $('#H').after(SortList.eq(i));
                                    break;
                                case "I":
                                    $('#I').after(SortList.eq(i));
                                    break;
                                case "J":
                                    $('#J').after(SortList.eq(i));
                                    break;
                                case "K":
                                    $('#K').after(SortList.eq(i));
                                    break;
                                case "L":
                                    $('#L').after(SortList.eq(i));
                                    break;
                                case "M":
                                    $('#M').after(SortList.eq(i));
                                    break;
                                case "N":
                                    $('#N').after(SortList.eq(i));
                                    break;
                                case "O":
                                    $('#O').after(SortList.eq(i));
                                    break;
                                case "P":
                                    $('#P').after(SortList.eq(i));
                                    break;
                                case "Q":
                                    $('#Q').after(SortList.eq(i));
                                    break;
                                case "R":
                                    $('#R').after(SortList.eq(i));
                                    break;
                                case "S":
                                    $('#S').after(SortList.eq(i));
                                    break;
                                case "T":
                                    $('#T').after(SortList.eq(i));
                                    break;
                                case "U":
                                    $('#U').after(SortList.eq(i));
                                    break;
                                case "V":
                                    $('#V').after(SortList.eq(i));
                                    break;
                                case "W":
                                    $('#W').after(SortList.eq(i));
                                    break;
                                case "X":
                                    $('#X').after(SortList.eq(i));
                                    break;
                                case "Y":
                                    $('#Y').after(SortList.eq(i));
                                    break;
                                case "Z":
                                    $('#Z').after(SortList.eq(i));
                                    break;
                                default:
                                    $('#default').after(SortList.eq(i));
                                    break;
                            }
                        };
                    }
                })
            }
        })
    }
    console.log($.cookie('username'))
})
//删除好友
function swiperLi(){
    var cont=$("#friendList li");
    cont.on('swipeleft', function(e) {$(this).find("a").css("margin-left",-150);});
    cont.on('swiperight', function(e){$(this).find("a").css("margin-left",0);});
}
function del(obj){
    var friend_id=$(obj).parent().attr("id");
    layer.confirm("确定删除好友吗？", {btn: ['取消','确定'],shade: [0.3, '#000'],title:false,area:['50rem','25rem'],closeBtn: 0,skin:'demo-class',scrollbar: false
    }, function(){
        layer.closeAll();
        $(obj).parent().find("a").css("margin-left",0);
    }, function(){
        $.ajax({
            url:'http://open.zhengjuan.com/api/app',
            data:{
                module:'user',
                do:'delFriend',
                friend_id:friend_id,
                owner_id:$.cookie('user_id')
            },
            dataType:'jsonp',
            jsonp:"callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            type:'POST',
            success:function(data){
                if(data.code ==1){
                    layer.msg('删除成功', {icon: 7,time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-success',shadeClose:true,scrollbar: false},function(){window.reload();});
                }else{
                    layer.msg("删除失败", {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});
                }
            }
        });
    });
}
$(function(){
    $.ajax({
        url:'http://open.zhengjuan.com/api/app',
        data:{
            module:'user',
            do:'getNewFriendApplyCount',
            user_id:$.cookie('user_id')
        },
        type:'POST',
        dataType:'jsonp',
        success:function(data){
            console.log(data);
            var tt=data.data.count;
            if(tt==0){
                $(".friendNum span").hide();
            }else{
                $(".friendNum span").show();
                $(".friendNum span").text(tt);
            }
        }
    })
});
