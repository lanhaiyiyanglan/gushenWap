$('.goldChoice li:nth-child(1)').click(function(){    window.open('goldFinancialStrength.html','_self');});$('.goldChoice li:nth-child(2)').click(function(){    window.open('unlistedEquity.html','_self');});$('.goldChoice li:nth-child(3)').click(function(){    window.open('realEstate.html','_self');});$('.goldChoice li:nth-child(4)').click(function(){    window.open('otherAssets.html','_self');});$(document).ready(function(){    $.ajax({        url:'http://open.zhengjuan.com/api/app',        type:'POST',        dataType:'jsonp',        data:{            module:'auth',            do:'fund_strength',            user_id: $.cookie('user_id')        },        success:function(data){            console.log(data)            if(data.data.status1==1){                $('.goldChoice').children('li:nth-child(1)').children('span').children('img').attr('src','../style/img/shenhe.png')            }else if(data.data.status1==2){                $('.goldChoice').children('li:nth-child(1)').children('span').children('img').attr('src','../style/img/green1.png')            }else if(data.data.status1==3){                $('.goldChoice').children('li:nth-child(1)').children('span').children('img').attr('src','../style/img/pass1.png')            }else{                $('.goldChoice').children('li:nth-child(1)').children('span').children('img').remove();            }            if(data.data.status2==1){                $('.goldChoice').children('li:nth-child(2)').children('span').children('img').attr('src','../style/img/shenhe.png')            }else if(data.data.status2==2){                $('.goldChoice').children('li:nth-child(2)').children('span').children('img').attr('src','../style/img/green1.png')            }else if(data.data.status2==3){                $('.goldChoice').children('li:nth-child(2)').children('span').children('img').attr('src','../style/img/pass1.png')            }else{                $('.goldChoice').children('li:nth-child(2)').children('span').children('img').remove();            }            if(data.data.status3==1){                $('.goldChoice').children('li:nth-child(3)').children('span').children('img').attr('src','../style/img/shenhe.png')            }else if(data.data.status3==2){                $('.goldChoice').children('li:nth-child(3)').children('span').children('img').attr('src','../style/img/green1.png')            }else if(data.data.status3==3){                $('.goldChoice').children('li:nth-child(3)').children('span').children('img').attr('src','../style/img/pass1.png')            }else{                $('.goldChoice').children('li:nth-child(3)').children('span').children('img').remove();            }            if(data.data.status4==1){                $('.goldChoice').children('li:nth-child(4)').children('span').children('img').attr('src','../style/img/shenhe.png')            }else if(data.data.status4==2){                $('.goldChoice').children('li:nth-child(4)').children('span').children('img').attr('src','../style/img/green1.png')            }else if(data.data.status4==3){                $('.goldChoice').children('li:nth-child(4)').children('span').children('img').attr('src','../style/img/pass1.png')            }else{                $('.goldChoice').children('li:nth-child(4)').children('span').children('img').remove();            }        }    })})