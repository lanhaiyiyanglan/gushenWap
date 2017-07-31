$(document).ready(function(){
    if (typeof($.cookie('password')) == 'undefined') {
       // window.location.href = '../../logRegPassword/index.html'
    } else {
    }
    var username= $.cookie('username');
    var password= $.cookie('password');
    var udid= $.cookie('udid');
    $('.personalList').children('li:nth-child(2)').children('a').attr('href','logManagement/logList.html?userid='+ $.cookie('user_id'));
    $.ajax({
        url:'http://open.zhengjuan.com/api/app',
        type:'POST',
        dataType:'jsonp',
        data:{
            username:username,
            password:password,
            udid:udid,
            module:'user',
            do:'login'
        },
        success:function(data){
            console.log(data)
            if(data.data.live_id!==''){
                $('.imgWord').children('a').attr('href','../hisIndex_killer/detailedInformation/graphicLive.html?uid='+ $.cookie('user_id')+'&groupid='+ data.data.groupid+'&liveid='+ data.data.live_id)
            }else{
                $('.imgWord').children('a').attr('href','imgWord/notOpen.html')
            }
            if(data.data.role==2){
                $('.imgWord').hide();
            }else{
                $('.imgWord').show();
            }
            $('.perImg').children('a').attr('href','../hisIndex_killer/index.html?user_id='+data.data.user_id)
            //if(new Date(data.data.vip_finish_time).getTime()>new Date().getTime()){
            //    $('.personalList li:nth-child(7)').children('a').attr('href','myVip/overdueVip.html');
            //}else if(new Date(data.data.vip_finish_time).getTime()==0){
            //    $('.personalList li:nth-child(7)').children('a').attr('href','myVip/index.html');
            //}
            if(data.data.role==1){
                $('.roler').html('高手')
            }else if(data.data.role==2){
                $('.roler').html('金主')
            }
            $('.perImg img').attr('src',data.data.usericon);
            $('.username').html(data.data.username);
            if(new Date(data.data.vip_finish_time).getTime()>0&&new Date(data.data.vip_finish_time).getTime()>new Date().getTime()){
                $('.vipIncon').css('display','block');
            }else{
                $('.vipIncon').css('display','none');
            }
        }
    })
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
    $('.myVip').click(function(){
        $.ajax({
            url:'http://open.zhengjuan.com/api/app',
            type:'POST',
            dataType:'jsonp',
            data:{
                module:'user',
                do:'getUserdetailinfo',
                uid: $.cookie('uid'),
                user_id: $.cookie('user_id')
            },
            success:function(data){
                console.log(data)
                if(data.data[0].end_time*1000>new Date().getTime()){
                    window.location.href='myVip/overdueVip.html';
                }else{
                    window.location.href='myVip/index.html';
                }
            }
        })
    })
})
$('.footer ul li:nth-child(2)').click(function(){
    if($.cookie('password')!=='null'){
        window.location.href='../myFriend/index.html';
    }else{
        window.location.href='../logRegPassword/index.html';
    }
});
$('.footer ul li:nth-child(3)').click(function(){
    if($.cookie('password')!=='null'){
        window.location.href='../Mymesaage/index.html';
    }else{
        window.location.href='../logRegPassword/index.html';
    }
});
$('.footer ul li:nth-child(4)').click(function(){
    if($.cookie('password')!=='null'){
        window.location.href='../personalCenter/index.html';
    }else{
        window.location.href='../logRegPassword/index.html';
    }
});