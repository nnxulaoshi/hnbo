var Ww = $(window).width();//屏幕宽度
var indexScrollLi = $(".index-scroll .scroll-ul li");//轮播的子元素
//alert();
indexScrollLi.each(function(){
//    alert($(this).width(Ww));
    $(this).width(Ww);
    $(this).$("img").width(Ww);
});

