//初始化参数
var tab = $(".tab");//获取tab盒子
var tabLi = $("[data-tab-id]");//获取tab内容列表
var tabCtrLi = $("[data-tab-ctr-id]");//获取tab控制列表
var tabIndex = 0;
var tabLength = tabCtrLi.length;

//tab切换函数
function tabChange(){
    tabLi.removeClass("cur");
    tabLi.eq(tabIndex-1).addClass("cur");
}

//tab切换控制
tabCtrLi.each(function(){
    $(this).click(function(){
        tabIndex=$(this).attr("data-tab-ctr-id");
        tabChange();
    });
});





































