

//初始化参数
var banner = $(".banner");//轮播盒子
var bannerUl = $(".banner-ul");//轮播的图片
var bannerChildren = $(".banner-ul li");//轮播的子元素
var slideUl = $(".slide .banner-ul");//滑动列表
var slideChildren = $(".slide .banner-ul li");//滑动列表子元素
var gradualUl = $(".gradual .banner-ul");//渐变列表
var gradualChildren = $(".gradual .banner-ul li");//渐变列表子元素
var lw = bannerChildren.outerWidth();//子元素宽度
var autoPlay = $(".autoplay");
var animateSpeed = 1500;//轮播速度
var bannerSpeed = 5000;
var iconUl = $(".banner-icon");//轮播图标
var iconLi = $(".banner-icon li");//轮播图标子元素
var Length = bannerChildren.length;//轮播长度
var Index = 0;//轮播图标的id号
var Lw = 0;//轮播滑动距离

function bannerPlay(Obj){
    //初始化参数值
    var bannerStyle = $(Obj).attr("data-bannerStyle");
    var iconIsCreate = $(Obj).attr("data-iconIsCreate");
    var turnDirection = $(Obj).attr("data-turnDirection");
    var speed = $(Obj).attr("data-speed");
    var animateSpeed = $(Obj).attr("data-animateSpeed");
    //定时播放
    var t=setInterval("Change(Index)",speed);
    //



}






//播放函数
function Change(Index){
    autoPlay.each(function(){
        if(!$(".slide .banner-ul,.gradual .banner-ul li").is(":animated")){
            Index=Change2l(Index,animateSpeed);
        }else{
            $(this).stop();
        }
        return Index;
    });
}

//鼠标划过图片事件
$(".banner-ul li").mouseover(function(){
    if(t){clearInterval(t);t=null;}
}).mouseout(function(){t=setInterval("Change()",bannerSpeed);});

//鼠标划过小图标事件
$(".banner-icon li").mouseover(function(){if(t){clearInterval(t);t=null;}}).mouseout(function(){t=setInterval("Change()",bannerSpeed);}).on("click",function(){
    Index=$(this).index();
    Lw=-lw*Index;
    JudgeBannerStyle(Lw,animateSpeed);
    ChangeIcon();
});

//右边切换按钮事件
$(".banner-prev").mouseover(function(){if(t){clearInterval(t);t=null;}}).mouseout(function(){t=setInterval("Change()",bannerSpeed);}).on("click",function(){
    if(!$(".slide .banner-ul,.gradual .banner-ul li").is(":animated")){
            Change2r();
        }else{
            $(this).stop();

        }
});

//左边切换按钮事件
$(".banner-next").mouseover(function(){if(t){clearInterval(t);t=null;}})
.mouseout(function(){t=setInterval("Change()",bannerSpeed);})
.on("click",function(){
    if(!$(".slide .banner-ul,.gradual .banner-ul li").is(":animated")){
            Change2l();
        }else{
            $(this).stop();

        }
});

//滑动更替函数
function ChangebannerLi(Lw,animateSpeed){
    bannerUl.animate({"left":Lw+"px"},animateSpeed);
}

//渐隐渐显更替函数
function ShowGradualLi(){
    bannerChildren.removeClass("cur");
    bannerChildren.eq(Index).addClass("cur");
    bannerChildren.animate({"opacity":1},animateSpeed);
}
function HideGradualLi(){
    bannerChildren.filter(".cur").animate({"opacity":0.05},animateSpeed,function(){
        bannerChildren.css({"opacity":0.05});
        ShowGradualLi();
    });
}

//焦点图小图标切换函数
function ChangeIcon(index){
    iconChildren.removeClass("cur");
    iconChildren.eq(index).addClass("cur");
}

//向左播放判断
function Judge2l(){
    if(Index>=Length){
        Index=0;
    }
    if(Index<0){
        Index=Length;
    }
}
//向右播放判断
function Judge2r(){
    if(Index<=0){
        Index=Length;
    }
    if(Index>Length){
        Index=0;
    }
}

//列表恢复
function TurnAround(){
    Lw=-Index*lw;
    slideUl.animate({"left":Lw+"px"},1);
}

//自动向左滑动
function Change2l(Index,animateSpeed){
    Index++;
    Lw=-Index*lw;
    JudgeBannerStyle(Lw,animateSpeed);
    Index=Judge2l(Index);
    Index=TurnAround(Index);
    Index=ChangeIcon(Index);
    return Index;
}

//自动向右滑动
function Change2r(Index,animateSpeed){
    Index=Judge2r(Index);
    Index=TurnAround(Index);
    Index--;
    Lw=-Index*lw;
    JudgeBannerStyle(Lw,animateSpeed);
    Index=ChangeIcon(Index);
    return Index;
}

//播放类别判断
function JudgeBannerStyle(Lw,animateSpeed){
    $(".gradual").each(function(){
        HideGradualLi();
    });
    $(".slide").each(function(){
        ChangebannerLi(Lw,animateSpeed);
    });
}


















































//给滑动效果添加无缝列表
slideChildren.clone().insertAfter($(".banner-ul li").last());

//给banner添加序列图标
$("[data-createIcon]").on(function(){
    var iconParent = "<ul class=\"banner-icon\"></ul>";
    var iconChildren = "<li></li>";
    banner.append(iconParent);
    for(var i=0;i<Length;1++){
        iconUl.append(iconChildren);
    }
    iconLi.first().addClass("cur");
});




//初始化轮播位置
Index = 0;

//定时播放
var t=setInterval("Change()",bannerSpeed);

//鼠标划过图片事件
$(".banner-ul li").mouseover(function(){
    if(t){clearInterval(t);t=null;}
}).mouseout(function(){t=setInterval("Change()",bannerSpeed);});

//鼠标划过小图标事件
$(".banner-icon li").mouseover(function(){if(t){clearInterval(t);t=null;}}).mouseout(function(){t=setInterval("Change()",bannerSpeed);}).on("click",function(){
    Index=$(this).index();
    Lw=-lw*Index;
    JudgeBannerStyle();
    ChangeIcon();
});

//右边切换按钮事件
$(".banner-prev").mouseover(function(){if(t){clearInterval(t);t=null;}}).mouseout(function(){t=setInterval("Change()",bannerSpeed);}).on("click",function(){
    if(!$(".slide .banner-ul,.gradual .banner-ul li").is(":animated")){
            Change2r();
        }else{
            $(this).stop();

        }
});

//左边切换按钮事件
$(".banner-next").mouseover(function(){if(t){clearInterval(t);t=null;}})
.mouseout(function(){t=setInterval("Change()",bannerSpeed);})
.on("click",function(){
    if(!$(".slide .banner-ul,.gradual .banner-ul li").is(":animated")){
            Change2l();
        }else{
            $(this).stop();

        }
});






var Banner = {
    banner = $(".banner");//轮播盒子
    bannerUl = $(".banner-ul");//轮播的图片
    bannerChildren = $(".banner-ul li");//轮播的子元素
    slideUl = $(".slide .banner-ul");//滑动列表
    slideChildren = $(".slide .banner-ul li");//滑动列表子元素
    gradualUl = $(".gradual .banner-ul");//渐变列表
    gradualChildren = $(".gradual .banner-ul li");//渐变列表子元素
    lw = bannerChildren.outerWidth();//子元素宽度
    autoPlay = $(".autoplay");
    animateSpeed = 1500;//轮播速度
    bannerSpeed = 5000;
    iconUl = $(".banner-icon");//轮播图标
    iconLi = $(".banner-icon li");//轮播图标子元素
    Length = bannerChildren.length;//轮播长度
    Index = 0;//轮播图标的id号
    Lw = 0;//轮播滑动距离
    //播放函数
    Change:function (){
        autoPlay.each(function(){
            if(!$(".slide .banner-ul,.gradual .banner-ul li").is(":animated")){
                Change2l();
            }else{
                $(this).stop();
            }
        });
    },

    //滑动更替函数
    ChangebannerLi:function(){
        bannerUl.animate({"left":Lw+"px"},animateSpeed);
    },

    //渐隐渐显更替函数
    ShowGradualLi:function(){
        bannerChildren.removeClass("cur");
        bannerChildren.eq(Index).addClass("cur");
        bannerChildren.animate({"opacity":1},animateSpeed);
    },
    HideGradualLi:function(){
        bannerChildren.filter(".cur").animate({"opacity":0.05},animateSpeed,function(){
            bannerChildren.css({"opacity":0.05});
            ShowGradualLi();
        });
    },

    //焦点图小图标切换函数
    ChangeIcon:function(){
        iconLi.removeClass("cur");
        iconLi.eq(Index).addClass("cur");
    },

    //向左播放判断
    Judge2l:function (){
        if(Index>=Length){
            Index=0;
        }
        if(Index<0){
            Index=Length;
        }
    },

    //向右播放判断
    Judge2r:function (){
        if(Index<=0){
            Index=Length;
        }
        if(Index>Length){
            Index=0;
        }
    },

    //列表恢复
    TurnAround:function (){
        Lw=-Index*lw;
        slideUl.animate({"left":Lw+"px"},1);
    },

    //自动向左滑动
    Change2l:function (){
        Lw-=lw;
        Index++;
        JudgeBannerStyle();
        Judge2l();
        TurnAround();
        ChangeIcon();
    },

    //自动向右滑动
    Change2r:function (){
        Judge2r();
        TurnAround();
        Lw+=lw;
        Index--;
        JudgeBannerStyle();
        ChangeIcon();
    },

    //播放类别判断
    JudgeBannerStyle:function (){
        $(".gradual").each(function(){
            HideGradualLi();
        });
        $(".slide").each(function(){
            ChangebannerLi();
        });
    }

}









































