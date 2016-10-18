//初始化参数
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
var iconChildren = $(".banner-icon li");//轮播图标子元素
var Length = bannerChildren.length;//轮播长度
var Index = 0;//轮播图标的id号
var Lw = 0;//轮播滑动距离

slideChildren.clone().insertAfter($(".banner-ul li").last());

//初始化轮播位置
Index = 0;

//定时播放
var t=setInterval("Change()",bannerSpeed);

//播放函数
function Change(){
    autoPlay.each(function(){
        if(!$(".slide .banner-ul,.gradual .banner-ul li").is(":animated")){
            Change2l();
        }else{
            $(this).stop();

        }
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

//滑动更替函数
function ChangebannerLi(){
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
function ChangeIcon(){
    iconChildren.removeClass("cur");
    iconChildren.eq(Index).addClass("cur");
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
function Change2l(){
    Lw-=lw;
    Index++;
    JudgeBannerStyle();
    Judge2l();
    TurnAround();
    ChangeIcon();
}

//自动向右滑动
function Change2r(){
    Judge2r();
    TurnAround();
    Lw+=lw;
    Index--;
    JudgeBannerStyle();
    ChangeIcon();
}

//播放类别判断
function JudgeBannerStyle(){
    $(".gradual").each(function(){
        HideGradualLi();
    });
    $(".slide").each(function(){
        ChangebannerLi();
    });
}






























