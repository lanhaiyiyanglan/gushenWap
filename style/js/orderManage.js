function x(tm) {    tm = parseInt(tm);    var date = new Date(tm); //转换成时间对象，这就简单了    var year = date.getFullYear();  //获取年    var mouth = date.getMonth() + 1 ;    var data = date.getDate();    if (date.getMonth() < 10) {        mouth = '0' + (date.getMonth()+1);    } else {        data = date.getDate();    }    if(date.getDate()<10) {        data = '0' + date.getDate();    }else{        data = date.getDate();    }    return year+'-'+mouth+'-'+data;}var num=0;var data={    module:'user',    do:'searchShowOrder',        user_id: $.cookie('user_id'),        page:num++*10,        pagesize:10,        type:1}var url=window.location.href;if(url.indexOf('uid')!==-1){    data.user_id=url.split('?')[1].split('=')[1];    $('.top').children('h1').html('他的晒单');    $('.linkOperate').hide();}else{}var n=0$(document).ready(function(){    $.ajax({        url:'http://open.zhengjuan.com/api/app',        type:'POST',        dataType:'jsonp',        data:data        ,        success:function(data){            console.log(data)            if(data.data.length!==0){                var html='';                for(var i=0;i<data.data.length;i++){                    html+='<li id="'+ n++ +'">';                    html+='<div class="hidden" style="display:none">'+data.data[i].id+'</div>';                    html+='<div class="shareText">'+data.data[i].content+'</div>';                    html+='<div class="shareDate">'+x(data.data[i].dateline*1000)+'</div>';                    html+='<ul class="pic">';                    var pic=data.data[i].image.split(';');                    for(var j=0;j<pic.length;j++){                        if(data.data[i].image.indexOf('http')==-1){                            html+='<li><img src=http://static.gushen178.com/upload/record/'+pic[j]+'></li>'                        }else{                            html+='<li><img src='+pic[j]+'></li>';                        }                    }                    html+='</ul><div class="widget">';                    html+='<span class="eye2">'+data.data[i].looknum+'</span>';                    html+='<span class="comment2">'+data.data[i].commentnum+'</span>';                    html+='<input type="text" style="display:none;" value="'+data.data[i].id+'">'                    html+='<span class="like2">'+data.data[i].likenum+'</span></div>';                    if(url.indexOf('uid')==-1) {                        html += '<div class="editorDel">';                        html += '<a class="orderDelete" onclick="deleteList(this)"></a>';                        html += '<a class="orderEditor" onclick="orderEdit(this)"></a></div>';                        html += '</li>';                    }else{}                }                $('.shareList').append(html);                $(function(){                    $('.pic').each(function(){                        if($(this).children('li').length==1){                            $(this).children('li').css('width','100%');                            $(this).children('li').css('height','auto');                            $(this).children('li').children('img').css('height','auto');                        }                    })                })                $(function(){                    $('.eye2').each(function(){                        if($(this).html()==0){                            $(this).css('background','url(../../style/img/Eye1.png) no-repeat left');                            $(this).css('background-size','4rem 3rem');                        }else{                            $(this).css('background','url(../../style/img/Eye2.png) no-repeat left');                            $(this).css('background-size','4rem 3rem');                        }                    })                    $('.comment2').each(function(){                        if($(this).html()==0){                            $(this).css('background','url(../../style/img/Comment1.png) no-repeat left');                            $(this).css('background-size','4rem 3rem');                        }else{                            $(this).css('background','url(../../style/img/Comment2.png) no-repeat left');                            $(this).css('background-size','4rem 3rem');                        }                    })                    $('.like2').each(function(){                        if($(this).html()==0){                            $(this).css('background','url(../../style/img/ic1.png) no-repeat left');                            $(this).css('background-size','4rem 3rem');                        }else{                            $(this).css('background','url(../../style/img/ic2.png) no-repeat left');                            $(this).css('background-size','4rem 3rem');                        }                    })                })            }else{                if( url.split('?')[1].split('=')[1]== $.cookie('user_id')){                    $('.shareList').append('<li style="background: none;border:none;font-size: 3rem;text-align: center;margin-top:3rem;">您还没有发布晒单哦！</li>')                }else{                    $('.shareList').append('<li style="background: none;border:none;font-size: 3rem;text-align: center;margin-top:3rem;">他还没有发布晒单哦！</li>')                }            }        }    })    $(document).on('click','.shareList li',function(){        console.log($(this))        window.location.href='../../hisIndex_killer/detailedInformation/orderInformation.html?showid='+$(this).children('.hidden').html();    })})if (!NeuF) var NeuF = {};NeuF.ScrollPage = function (obj, options, callback) {    var _defaultOptions = { delay: 500, marginBottom: 200 }; //默认配置：延迟时间delay和滚动条距离底部距离marginBottom    options = $.extend(_defaultOptions, options);    this.isScrolling = false; //是否在滚动    this.oriPos = 0; //原始位置    this.curPos = 0; //当前位置    var me = this; //顶层    var $obj = (typeof obj == "string") ? $("#" + obj) : $(obj);    //绑定滚动事件    $obj.scroll(function (ev) {        me.curPos = $obj.scrollTop();        if ($(window).height() + $(window).scrollTop() >= $(document.body).height() - options.marginBottom) {            if (me.isScrolling == true) return;            me.isScrolling = true;            setTimeout(function () { me.isScrolling = false;}, options.delay); //重复触发间隔毫秒;            if (typeof callback == "function") callback.call(null, me.curPos - me.oriPos);        };        me.oriPos = me.curPos;    });};$(function () {    if($('#thelist').find(".li").length<10){        $('.loading').hide();    }    var p=2;    new NeuF.ScrollPage(window, { delay: 500, marginBottom:500}, function (offset) {        if (offset > 0) {            $(".loading").show(); //加载提示.            data.page=num++*10;            setTimeout(function(){$.ajax({                url:'http://open.zhengjuan.com/api/app',                type:'POST',                dataType:'jsonp',                data:data,                success:function(data){                    console.log(data)                    if(data.data.length!==0){                        var html='';                        for(var i=0;i<data.data.length;i++){                            html+='<li id="'+ n++ +'">';                            html+='<div class="hidden" style="display:none">'+data.data[i].id+'</div>';                            html+='<div class="shareText">'+data.data[i].content+'</div>';                            html+='<div class="shareDate">'+x(data.data[i].dateline*1000)+'</div>';                            html+='<ul class="pic">';                            var pic=data.data[i].image.split(';');                            for(var j=0;j<pic.length;j++){                                if(data.data[i].image.indexOf('http')==-1){                                    html+='<li><img src=http://static.gushen178.com/upload/record/'+pic[j]+'></li>'                                }else{                                    html+='<li><img src='+pic[j]+'></li>';                                }                            }                            html+='</ul><div class="widget">';                            html+='<span class="eye2">'+data.data[i].looknum+'</span>';                            html+='<span class="comment2">'+data.data[i].commentnum+'</span>';                            html+='<input type="text" style="display:none;" value="'+data.data[i].id+'">'                            html+='<span class="like2">'+data.data[i].likenum+'</span>';                            html+='</div><div class="editorDel">';                            html+='<a class="orderDelete" onclick="deleteList(this)"></a>';                            html+='<a class="orderEditor" onclick="orderEdit(this)"></a>';                            html+='</div></li>';                        }                        $('.shareList').append(html);                        $(function(){                            $('.pic').each(function(){                                if($(this).children('li').length==1){                                    $(this).children('li').css('width','100%');                                    $(this).children('li').css('height','auto');                                    $(this).children('li').children('img').css('height','auto');                                }                            })                        })                        $(function(){                            $('.eye2').each(function(){                                if($(this).html()==0){                                    $(this).css('background','url(../../style/img/Eye1.png) no-repeat left');                                    $(this).css('background-size','4rem 3rem');                                }else{                                    $(this).css('background','url(../../style/img/Eye2.png) no-repeat left');                                    $(this).css('background-size','4rem 3rem');                                }                            })                            $('.comment2').each(function(){                                if($(this).html()==0){                                    $(this).css('background','url(../../style/img/Comment1.png) no-repeat left');                                    $(this).css('background-size','4rem 3rem');                                }else{                                    $(this).css('background','url(../../style/img/Comment2.png) no-repeat left');                                    $(this).css('background-size','4rem 3rem');                                }                            })                            $('.like2').each(function(){                                if($(this).html()==0){                                    $(this).css('background','url(../../style/img/ic1.png) no-repeat left');                                    $(this).css('background-size','4rem 3rem');                                }else{                                    $(this).css('background','url(../../style/img/ic2.png) no-repeat left');                                    $(this).css('background-size','4rem 3rem');                                }                            })                        })                    }else{                        if(data.data.length==0){                            $('.loading').children('span').html('没有更多了！');                            $('.loading').children('img').remove();                        }                    }                }            })},1000)        }    });});//$(window).scroll(function () {//    var height1 = $(document).height();//    var height2 = $(window).height();//    if ($(window).scrollTop() + 1 == (height1 - height2)) {//        $('.Loadding').show();////        $.ajax({//            url:'http://open.zhengjuan.com/api/app',//            type:'POST',//            dataType:'jsonp',//            data:data,//            success:function(data){//                console.log(data)//                if(data.data.length!==0){//                    var html='';//                    for(var i=0;i<data.data.length;i++){//                        html+='<li id="'+ n++ +'">';//                        html+='<div class="hidden" style="display:none">'+data.data[i].id+'</div>';//                        html+='<div class="shareText">'+data.data[i].content+'</div>';//                        html+='<div class="shareDate">'+x(data.data[i].dateline*1000)+'</div>';//                        html+='<ul class="pic">';//                        var pic=data.data[i].image.split(';');//                        for(var j=0;j<pic.length;j++){//                            if(data.data[i].image.indexOf('http')==-1){//                                html+='<li><img src=http://static.gushen178.com/upload/record/'+pic[j]+'></li>'//                            }else{//                                html+='<li><img src='+pic[j]+'></li>';//                            }//                        }//                        html+='</ul><div class="widget">';//                        html+='<span class="eye2">'+data.data[i].looknum+'</span>';//                        html+='<span class="comment2">'+data.data[i].commentnum+'</span>';//                        html+='<input type="text" style="display:none;" value="'+data.data[i].id+'">'//                        html+='<span class="like2">'+data.data[i].likenum+'</span>';//                        html+='</div><div class="editorDel">';//                        html+='<a class="orderDelete" onclick="deleteList(this)"></a>';//                        html+='<a class="orderEditor" onclick="orderEdit(this)"></a>';//                        html+='</div></li>';//                    }//                    $('.shareList').append(html);//                    $(function(){//                        $('.pic').each(function(){//                            if($(this).children('li').length==1){//                                $(this).children('li').css('width','100%');//                                $(this).children('li').css('height','auto');//                                $(this).children('li').children('img').css('height','auto');//                            }//                        })//                    })//                    $(function(){//                        $('.eye2').each(function(){//                            if($(this).html()==0){//                                $(this).css('background','url(../../style/img/Eye1.png) no-repeat left');//                                $(this).css('background-size','4rem 3rem');//                            }else{//                                $(this).css('background','url(../../style/img/Eye2.png) no-repeat left');//                                $(this).css('background-size','4rem 3rem');//                            }//                        })//                        $('.comment2').each(function(){//                            if($(this).html()==0){//                                $(this).css('background','url(../../style/img/Comment1.png) no-repeat left');//                                $(this).css('background-size','4rem 3rem');//                            }else{//                                $(this).css('background','url(../../style/img/Comment2.png) no-repeat left');//                                $(this).css('background-size','4rem 3rem');//                            }//                        })//                        $('.like2').each(function(){//                            if($(this).html()==0){//                                $(this).css('background','url(../../style/img/ic1.png) no-repeat left');//                                $(this).css('background-size','4rem 3rem');//                            }else{//                                $(this).css('background','url(../../style/img/ic2.png) no-repeat left');//                                $(this).css('background-size','4rem 3rem');//                            }//                        })//                    })//                }//            }//        })//        console.log(data)//    } else {//        $('.Loadding').hide();//    }//})function orderEdit(mythis){    event.stopPropagation();    var url = "editorOrder.html";    var id = $(mythis).parent().prev('div').children('input').val();    console.log(id)    window.open(encodeURI(url + "?id=" + id),'_self');}function deleteList(obj){//点击删除的时候获取放在删除链接中当前点击的li的id，遍历相册列表根据id值删除对应的那个相册    event.stopPropagation();    var ids=$(obj).parent().parent().attr("id");    console.log($(obj))    console.log(ids)    layer.confirm("确定要删除此晒单吗？", {btn: ['取消','确定'],shade: [0.3, '#000'],title:false,area:['50rem','25rem'],closeBtn: 0,skin:'demo-class',scrollbar: false    }, function(){        layer.closeAll();    }, function(){        $(".shareList li").each(function() {            if($(this).attr("id")==ids){                $(this).remove();                $.ajax({                    type: "POST",                    url: "http://open.zhengjuan.com/api/app",                    dataType: "jsonp",                    data:{                        module:'user',                        do:'delShowOrder',                        showid:$(obj).parent().prev('.widget').children('input').val()                    },                    success: function(data) {                        if(data.code!==0){                            layer.msg('删除成功', {icon: 7,time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-success',shadeClose:true,scrollbar: false});                        }else{                            layer.msg(data.message, {time:2000,area:'80%',shade: [0.3, '#000'],skin:'demo-error',shadeClose:true,scrollbar: false});                        }                    }                });            }        });    });}