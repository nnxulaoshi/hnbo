//初始化参数
var showCtr = $(".showCtr");//显示控制
var hideCtr = $(".hideCtr");//隐藏控制

function ShowUp(){
    $(".hideObj").show();
    $(".hideObj").removeClass("hideObj").addClass("showObj");
    $(".showCtr").removeClass("showCtr").addClass("hideCtr");

}
function HideDn(){
    $(".showObj").hide();
    $(".showObj").removeClass("showObj").addClass("hideObj");
    $(".hideCtr").removeClass("hideCtr").addClass("showCtr");

}

showCtr.each(function(){

    $(this).on("click",function(){
        ShowUp();

    })
});
hideCtr.each(function(){
    $(this).on("click",function(){
        HideDn();
    })
});
