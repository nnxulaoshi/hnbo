var HNBA={
    clickbool:true,
    init:function(isIndex,isPage){
      this.inFocus();
      this.dwonMenu({elmObj:"#W-miniCart",elmCobj:"#W-miniCartList"})
      this.dwonMenu({elmObj:"#W-help",elmCobj:"#W-help-pop"})
      !isIndex?this.dwonMenu({elmObj:"#W-categorysType",elmCobj:"#W-categorysUi"}):$("#W-categorysUi").css("display","block");
      this.dwonMenu({elmObj:"#W-phone",elmCobj:"#W-phone-pop"})
      isIndex?this.categorys(true):this.categorys();
      this.radio();
      if(!isPage)this.select();
      this.tab();
      $("#goTop").on("click",function(){
         $(document.body).animate({"scrollTop":0})
      })
    },
    //判断是否为空
    IsNullOrEmpty:function(str) {
        if (str == null || str == undefined || typeof str == undefined || str=="null" || str=="undefined" || String(str) == "") {
            return true;
        }
        else {
            return false;
        }
    },
    LoadJS:function(url) {
      $("<script type=\"text/javascript\" src=" + url + "></script>").appendTo($("body"));
    },
    //重定义单选
    radio:function(){
        var $el = $("[data-change]"),t=true;
        $el.each(function(){
          var iSradio=$(this).attr("data-iSradio"),toggle=$(this).attr("data-toggle"),checked=$(this).attr("data-methods");
          $(this).on('click',function(){
           $(this).attr("data-val",0).find('i.icon').attr('class','icon radio-on');
            if(iSradio=="true"){
                var _this=$(this).parent().siblings();
              _this.find("label").attr("data-val",1).find('i.icon').attr('class','icon radio');
            }else if(toggle=="true"){
                 var status = ($(this).data('change') == 'un'+checked) ? checked+"-on": checked,
                     m = ($(this).data('change') == 'un'+checked) ?checked:'un'+checked,
                     value=($(this).data('change') == checked) ? '0':'1';
                     $(this).attr("data-val",value).find('i.icon').attr('class','icon '+status);
                     $(this).data("change",m);
             }else{
              $(this).attr("data-val",1).siblings().attr("data-val",0).find('i.icon').attr('class','icon radio');
            }
            //自定义change事件
            $(this).trigger('change');
        });
        })

    },
    //所有input值点击后
    inFocus:function(){
          var _this=this;
        $(".in").each(function(){
            var T=$(this).attr("data-tis"),
                tis= $(this).siblings(".tis");
                tis.text(T);
         tis.on("click",function(){
                $(this).hide();
                $(this).siblings().focus();
         });
         $(this).focus(function(){
                if($(this).val()==this.defaultValue){
                    $(this).val("");
                }
                $(this).addClass("bd");
                $(this).siblings(".tis").text(T).hide()
              }).blur(function(){
                if($(this).val()==""){
                   $(this).val(this.defaultValue)
                }
                $(this).removeClass("bd").siblings(".tis").removeClass("red");
                _this.IsNullOrEmpty($(this).val())?tis.show():tis.hide();
                var password = $("#password_value").val();
                var repeat_password = $("#repeat_password_value").val(),isPw;
                if(isPw && !_this.IsNullOrEmpty(repeat_password) && !_this.IsNullOrEmpty(password)){
                    if(password != repeat_password){
                         _this.inFocusTis("repeat_password_value","两次密码不一致！");
                    }else{
                       $("#repeat_password_value").siblings().hide()
                    }

                    return false;
                }
                var password_e = $("#password_e").val();
                var repeat_password_e = $("#repeat_password_e").val();
                if(isPw && !_this.IsNullOrEmpty(repeat_password_e) && !_this.IsNullOrEmpty(password_e)){
                    if(password_e != repeat_password_e){
                         _this.inFocusTis("repeat_password_e","两次密码不一致！");
                    }else{
                       $("#repeat_password_e").siblings().hide()
                    }
                    return false;
                }
            });
        })
    },
    //所有input提示
    inFocusTis:function(Classid,text){
        var _this=this,
            Focusobj=$("#"+Classid),
            Focustext=Focusobj.val(),
            tis=Focusobj.siblings(".tis"),
            iSpw=Focusobj.siblings().attr("data-pw");
            if(!_this.IsNullOrEmpty(Classid) && !_this.IsNullOrEmpty(text)){
                var h=0;
                  var v=setInterval(function(){
                      h++;
                      h==10?(clearInterval(v)):(h%2==0?Focusobj.addClass("bd"):Focusobj.removeClass("bd"));
                 },120)
                   tis.addClass("red").show().text(text);
            }

    },
    //所有下拉菜单
    dwonMenu:function(options){
         var settings={
               elmObj:null,
               elmCobj:null,
               speed:250,
               cur:"cur",
               triggerEvent:"hover",
               loadingStr:'<p class="pop-loading">数据加载中，请稍后...</p>',
               enteCall:null,
               leaveCall:null
            },
            timeOut=null,_this=this;
            $.extend(settings,options);
            var close= function() {
                if("hover"==settings.triggerEvent)$(settings.elmObj).find("i.arrow").removeClass(settings.cur),$(settings.elmObj).removeClass(settings.cur);
                //$(settings.elmCobj).html(settings.loadingStr).hide()
                $(settings.elmCobj).hide();

            }
            if("hover"==settings.triggerEvent){
                $(settings.elmObj).on({
                       mouseenter:function() {
                          clearTimeout(settings.timeOut),
                          $(this).hasClass(settings.cur) || ($(this).addClass(settings.cur),$(this).find("i.arrow").addClass(settings.cur),$(settings.elmCobj).show());
                          if(settings.enteCall)settings.enteCall.call(this);
                       },
                       mouseleave: function() {
                          settings.timeOut = setTimeout(function() {
                             close();
                             if(settings.leaveCall)settings.leaveCall.call(this);
                          },settings.speed)
                       }
                 })
                $(settings.elmCobj).on({
                       mouseenter: function() {
                          clearTimeout(settings.timeOut)
                       },
                       mouseleave: function() {
                          settings.timeOut = setTimeout(function() {
                             close();
                             if(settings.leaveCall)settings.leaveCall.call(this);
                          },settings.speed)
                       }
                 })
            }else{
               $(settings.elmObj).bind("click",function(){
                         if(_this.clickbool){
                          $(this).hasClass(settings.cur) || ($(this).addClass(settings.cur),$(settings.elmCobj).show());
                          $(".close").show();
                          _this.clickbool=false;
                         }else{
                          $(this).removeClass(settings.cur);
                          $(".close").hide();
                          close();
                          _this.clickbool=true;
                         }
                })
                $(".close").on('click', function(e){
                     close(),$(settings.elmObj).removeClass(settings.cur),$(".close").hide(),_this.clickbool=true;
                });
                $(document).on('click', function(e){
                   var te=$(e.target);
                   if(te.closest(settings.elmObj).length==0 && te.closest(settings.elmCobj).length!=1){
                     close(),$(settings.elmObj).removeClass(settings.cur),$(".close").hide(),_this.clickbool=true;
                  }
               });
            }
    },
    fnGetDate_:function(year,month){
       var MaxYear = (new Date()).getFullYear(); // 初始化年份
       var MinYear = MaxYear-100; // 增加一个最大年份的属性
       var op="";
       for (var i = MaxYear; i >= MinYear; i--) { // 新建一个OPTION对象
            op += "<div class=\"option\" data-val=\""+i+"\" data-text=\""+i+"年\">"+i+"年</div>" ;
       }
       $("#"+year).html(op);
       var op_m="";
       for (var i = 1; i <13; i++) { // 新建一个OPTION对象
            op_m += "<div class=\"option\" data-val=\""+i+"\" data-text=\""+i+"月\">"+i+"月</div>" ;
       }
       $("#"+month).html(op_m);
    },
    //关闭Select
    colseSelect:function(obj){
        var _this=this,
            optiontext=$(obj).text(),
            optionval=$(obj).attr("data-val"),
            optionsiblings=$(obj).parent().siblings();
            optionsiblings.children("em").text(optiontext);
            optionsiblings.attr("data-val",optionval).removeClass("cur");
            $(obj).parent().scrollTop(0).css("display","none");
            $(obj).addClass("cur").siblings().removeClass("cur");
            _this.clickbool=true;
    }//列表点击更多
    ,clickMore:function(){
       var category=$(".nav-category");
       category.each(function(i){
              var _this=$(this),
                  more=_this.find(".nav-more"),
                  Nmore=$("#Nmore"),
                  content=_this.find(".nav-category-content"),
                  li=content.find("li"),
                  lilen=li.length,
                  uw=(li.width()+41)*lilen,
                  bool=true,bools=true;
                 if(uw>942)more.removeClass("hide");
                 if(i>5){
                        Nmore.parent().removeClass("hide");
                   Nmore.on("click",function(){
                       if(bools){
                       _this.removeClass("hide");
                       content.scrollTop(0);
                      $(this).find(".icon").addClass("cur").siblings("em").text("收起更多");
                       bools=false;
                       }else{
                          _this.addClass("hide").removeClass("state-unfold");
                          more.find(".icon").removeClass("cur");
                          $(this).find(".icon").removeClass("cur").siblings("em").text("更多选项");
                          bools=true;bool=true;
                       }
                       return false;
                   })
           }
              more.on("click",function(){
                    if(bool){
                        $(this).find(".icon").addClass("cur").siblings("em").text("收起");
                      $(this).parent().addClass("state-unfold");
                bool=false;
                    }else{
                        $(this).find(".icon").removeClass("cur").siblings("em").text("更多");
                $(this).parent().removeClass("state-unfold");
                content.scrollTop(0);
                bool=true;
                    }
                    return false;
              })
       })
    },
    selectCur:function(iSclick){
            var select=$("[data-select]");
            select.each(function(){
             var val=parseInt($(this).find(".text").attr("data-val")),
                 option=$(this).find(".option-list"),optionlist=option.find(".option");
                 optionlist.each(function(){
                    var v=parseInt($(this).attr("data-val"));
                      if(val==v)$(this).addClass("cur").siblings().removeClass("cur");
                      if(val==v && iSclick)$(this).trigger("click");
                })
            })
     },
    //重定义select
    select:function(Call){
       var select=$("[data-select]"),_this=this;
         return select.each(function(){
             var text=$(this).find(".text"),
                 option=$(this).find(".option-list"),
                 optionlist=option.children(),
                 s1="#"+text.attr("id"),s2="#"+option.attr("id"),
                 boolAjax=$(this).attr("data-ajax")=="true"?true:false,
                 Linkage=$(this).attr("data-linkage")=="true"?true:false,
                 sval=text.attr("data-val");
                _this.dwonMenu({elmObj:s1,elmCobj:s2,triggerEvent:"click"});
               if(!Linkage){
                    optionlist.each(function(){
                        var v=parseInt($(this).attr("data-val"));
                          if(sval==v)$(this).addClass("cur").trigger("click").siblings().removeClass("cur");
                         $(this).on("click",function(){
                             var optiontext=$(this).attr("data-text"),optionval=$(this).attr("data-val");
                              _this.colseSelect(this);
                              if(Call && boolAjax)Call.call(this);
                         })
                     })
                }
                $(document).on('click',function(e){
                   var te=$(e.target);
                   if(te.closest("[data-select]").length==0){
                         text.removeClass("cur");
                          option.scrollTop(0).css("display","none");
                          _this.clickbool=true;
                  }
               });
         })

    },
    birthday:function(options){
         var defaults = {
                YearSelector: "#birth-option",
                MonthSelector:"#month-option",
                DaySelector: "#sun-option"
            };
            var opts = $.extend(defaults, options),_this=this;
            _this.fnGetDate_("birth-option","month-option");//初始化年月
            var YearSelector = $(opts.YearSelector),
                MonthSelector = $(opts.MonthSelector),
                DaySelector = $(opts.DaySelector),
                YearSelectorFind = YearSelector.find(".option"),
                MonthSelectorFind = MonthSelector.find(".option");
                DaySelectorFind = DaySelector.find(".option");
            var BuildDay=function(obj) {
                var optiontext=$(obj).attr("data-text"),optionval=$(obj).attr("data-val");
                var year=YearSelector.siblings().attr("data-val"),
                    month=optionval;
                    DayOption(year,month);
                   _this.colseSelect(obj);
                },
                DayOption=function(year,month){
                        var yearval = parseInt(year);
                        var monthval =parseInt(month);
                         var date = new Date(yearval, monthval, 0).getDate();
                           var op_d="";
                        for (var i = 1; i <=date; i++) { // 新建一个OPTION对象
                            op_d += "<div class=\"option\" data-val=\""+i+"\" data-text=\""+i+"日\">"+i+"日</div>" ;
                        }
                       DaySelector.html('').append(op_d);
                }
                YearSelectorFind.on("click",function(){
                    var year=$(this).attr("data-val"),
                        month=MonthSelector.siblings().attr("data-val");
                        if(!_this.IsNullOrEmpty(month)){
                               DayOption(year,month);
                        }
                        _this.colseSelect(this);
                });
                MonthSelectorFind.on("click",function() {
                      BuildDay(this);
                });
                $(document).on("click",opts.DaySelector+" .option",function() {
                    _this.colseSelect(this);
                });
                _this.selectCur(true);

    },//下拉固定盒子
    dwonscroll:function(scrollobj){
       var Scroll=$(scrollobj);
       var left=Scroll.offset().left;

       $(window).scroll(function(){
                var scrolltop=$(this).scrollTop(),toph=$(".footer").offset().top-$(scrollobj).height()-100;
             var dheight=$(document).height()-$(this).scrollTop();
            if($(this).scrollTop()>100 && (($(document).height()-$(this).scrollTop()) > ($(window).height()+$(".footer").height()))){
                 $(scrollobj).removeAttr("style").css({"position":"fixed","top":0,"left":left});
            }else{
                if($(this).scrollTop()>100 && (($(document).height()-$(this).scrollTop()) <= ($(window).height()+$(".footer").height()))){
                 $(scrollobj).removeAttr("style").css({"position":"absolute","top":toph-187,"right":0});
              }else{
                 $(scrollobj).removeAttr("style").css({"position":"absolute","top":0,"right":0});
              }
            }
       })
    },
    tab:function() {
        var tab=$("[data-tab]");
        tab.each(function() {
            var mod=$(this).attr("data-tab"),
                it=$(this).find(".i-t"),
                itspan=it.children();
                itspan.on(mod,function(){
                    var i=$(this).index(),
                        ic=$(this).parent().siblings(".i-c"),
                        icdiv=ic.children();
                    var tiao=$(this).attr("data-tiao")=="true"?true:false;
                    $(this).addClass("cur").siblings().removeClass("cur");
                    if(!tiao)icdiv.eq(i).removeClass("hide").siblings().addClass("hide");
                })

        })
    },//点击下拉
    clickslideDown:function() {
        var click=$("[data-click]");
        click.each(function() {
            var i=$(this).attr("data-i"),bool=true;
                $(this).on("click",function(){
                    var i=$(this).index();
                    if(bool){
                      $(this).parents(".i-t").siblings().slideDown();
                      $(this).addClass("cur");
                      bool=false;
                    }else{
                     $(this).removeClass("cur");
                      $(this).parents(".i-t").siblings().slideUp();
                      bool=true;
                    }
                })

        })
    },
    //商品分类
    categorys:function(isIndex){
        var categorysUi=$("#W-categorysUi"),
            cat=categorysUi.find(".cat"),
            _this=this;
            cat.each(function(b){
               var $this=$(this),
                   $aot=$this.children(".aot"),
                   $subdiv = $this.children('.sub_div'),
                   bool=true;
               if(b>4 && isIndex){
                     $this.addClass("hide");
                       $("#more").bind("click",function(){
                        if(bool){
                           cat.removeClass("hide"),$(this).text("收起更多"),bool=false;
                        }else{
                           $this.addClass("hide"),$(this).text("查看更多"),bool=true;
                        }
                   })
               }
              _this.dwonMenu({
                      elmObj:$this,
                      elmCobj:$subdiv,
                      speed:10,cur:"on",
                      enteCall:function(){
                          var i=$this.index(),
                            subH = $subdiv.outerHeight(),
                            catH = $this.outerHeight(true),
                            offset = $this.offset(),
                            scrollTop = $(window).scrollTop(),
                            offset = offset.top - scrollTop,
                            bodyHeight =$(window).height(),
                            maxHeight = bodyHeight - offset,
                            xsHeight = maxHeight - subH,top;
                            xsHeight < 0?top = xsHeight:i==0?top=0:top=-1;
                            $subdiv.css({"top":top});
                            $aot.find(".arrow").addClass("deg45").end().siblings().removeClass("deg45");
                   },
                   leaveCall:function(){
                        $this.find(".sub_div").removeAttr("style");
                        $this.find(".arrow").removeClass("deg45");
                  }
              })
            })
    },
    accordion:function(options){
          var defaults = {
                  Id:null,
                  elmObj:null,
                  elmCobj:'img',
                Type:'click',
                Cur:0
              },
              iSet=$.extend(defaults,options),
              item=$(iSet.Id).find("li");
              item.each(function(){
                     var _this=$(this),a=$(this).find(iSet.elmObj),c=$(this).find(iSet.elmCobj),i;
                      a.bind(iSet.Type,function(){
                         S=$(this).attr("dada-i");
                         $(iSet.elmCobj).each(function(E){
                            if(E==S){
                                $(this).slideDown().parent().addClass("cur");
                            }else{
                                $(this).slideUp().parent().removeClass("cur");
                            }
                         });
                      })
                }).eq(iSet.Cur).trigger(iSet.Type);
    },
    //放大镜
    jqZoom:function(options){
         var defaults = {
                SigBox:'.s_box',
                Boxwh:[440,440],
                Img:[1320,1320],
                zoom:9
              }
              var o = $.extend(defaults,options);
              //因IE8下移动会有斗动！
                function format(str) {
                    for (var i = 1; i < arguments.length; i++) {
                        str = str.replace('%' + (i - 1), arguments[i]);
                    }
                    return str;
                }
                var _this=$("#jqZoom"),
                    S=$(o.SigBox),
                    imgW=o.Img[0],
                    imgH=o.Img[1],
                    moveW=imgW/o.zoom,
                    moveH=imgH/o.zoom,
                    bLeft=S.offset().left,
                    bTop=S.offset().top,
                    sBoxW=S.width(),
                    sBoxH=S.height(),
                    Bw=imgW-o.Boxwh[0],
                    Bh=imgH-o.Boxwh[1]
                    Boxleft=o.Boxwh[0]+1,
                    p_box=_this.find(".p_box"),
                    p_boxul=p_box.find("ul"),
                    liw=p_box.find("ul li").outerWidth(true),
                    li = p_box.find("ul li").length,
                    movebox=S.find(".move");
                    preid="pre",
                    nextid="next";
                    $(o.SigBox).append(format("<div class='move' style='width:%0px;height:%1px'></div>",moveW,moveH));
                    S.mouseover(function(){
                          var _src = $(this).find("img").attr("src");
                          $(this).parent().append(format("<div class='b_box' style='width:%0px;height:%1px;left:%2px'><img src='%3' width='%4' height='%5'></div>",o.Boxwh[0],o.Boxwh[1],Boxleft,_src,o.Img[0],o.Img[1]));
                          $(".move,.b_box").css("display","block");
                     }).mouseout(function(){
                           $(".b_box").remove();
                           $(".move").css("display","none");
                     });
                    S.mousemove(function(e){
                       var x,y,_x,_y;
                            x=e.pageX - bLeft - moveW/2;
                            y=e.pageY - bTop - moveH/2;
                            if(x < 0){
                              x = 0;
                            }else if(x > sBoxW - moveW){
                              x = sBoxW - moveW;
                            }
                            if(y < 0){
                              y = 0;
                             }else if(y > sBoxH - moveH){
                              y = sBoxH - moveH;
                            }
                            $(".move").css({"top":y,"left":x});
                             _x = -(x/(sBoxW - moveW))*Bw;
                             _y = -(y/(sBoxH - moveH))*Bh;
                            $(".b_box img").css({left:_x+"px", top:_y+"px"});

                     });
                      _this.find(".p_box a").eq(0).addClass("on");

                     //点击切换大图
                     _this.find(".p_box a").bind("click",function(){
                       var src = $(this).find("img").attr("src"),
                           i = _this.find(".p_box a").index(this);
                        S.find("img").attr("src",src);
                       _this.find(".p_box a").removeClass("on").eq(i).addClass("on");

                      })
    },
    //瀑布流布局
    waterFall:function(){
        var margin = 10,li=$(".e_list"),li_W = li[0].offsetWidth+margin;
         var init=function(){
                var h=[];
                var n = 970/li_W|0;
                for(var i = 0;i < li.length;i++) {
                    li_H = li[i].offsetHeight;
                    if(i < n) {
                        h[i]=li_H;
                        li.eq(i).css("top",0);
                        li.eq(i).css("left",i * li_W);
                    }else{
                        min_H =Math.min.apply(null,h) ;
                        minKey = getarraykey(h, min_H);
                        h[minKey] += li_H+margin ;
                        li.eq(i).css("top",min_H+margin);
                        li.eq(i).css("left",minKey * li_W);
                    }
                }
                $(".evaluationlist").css({"height":Math.max.apply(null,h)+"px"})
            }
       var getarraykey=function(s,v) {
                for(k in s) {
                    if(s[k] == v)return k;
                }
         }
        init();
    },
    //弹窗
    Alert:function(options){
         var O = {
                BoxId:"#showBoxid",
                clickId:"#clickObj",
                closeId:"#close",
                Shade:false,
                url:false,
                opacity:false,
                okCall:null
              }
            $.extend(O,options);
            var h= O.opacity?'0px':-$(O.BoxId).height()/2;
            $(O.BoxId).css({"z-index":1010,"margin-top":h});
            $(O.clickId).on("click",function(){
                  if(O.url){
                      var urls=$(this).attr("data-url");
                    $("#Siframe").attr("src",urls).css({"height":165});
                    $("#See-pop").css({"marginTop":-147.5})
                    $("#See-pop [data-m='continue']").hide().siblings("[data-m='edit']").show();
                  }
                   if(O.Shade)$("<div class='shade_bg'></div>").appendTo("body");
                    $('.shade_bg').css({"position":"fixed","_position":"absolute","top":0,"left":0,"width":"100%","height":"100%","background":"#000","opacity":0.6,"z-index":1000,"-ms-filter:progid":"DXImageTransform.Microsoft.Alpha(Opacity=60)","filter":"alpha(opacity=60)"});
                   if(O.opacity){
                       $(O.BoxId).show().animate({"opacity":1,"bottom":20});
                   }else{
                       $(O.BoxId).show().css({"display":"block"});
                   }

             })
             var close=function(){
                   $(".shade_bg").remove()
                   if(O.opacity){
                        $(O.BoxId).animate({"opacity":0,"bottom":200},function(){
                           $(this).hide()
                       });
                   }else{
                       $(O.BoxId).show().css({"display":"none"})
                   }
             }
            $(O.BoxId+' [data-m="continue"]').on("click",function(){
                if(O.okCall)close(),O.okCall.call(this);
            });
            $(O.BoxId+' [data-m="cancel"]').on("click",function(){
                close()
            });
    },
    change:function(a){
        for(i=1; i<=2; i++){
            document.getElementById("li_"+i).className="normal";
            document.getElementById("li_"+a).className = "selectd";
            document.getElementById ("div"+i).style.display  ="none";

        }
            document.getElementById("div"+a).style.display = "block"

    },
    slider:function(obj,options){
        var defaults = {
            autotime : 4000,
            speed :500,
            preid:"pre",
            nextid:"next",
            moveparent:"ul",
            movechildren:"li"
        };
            var options = $.extend(defaults,options);
            var b = $(obj),
                l = b.find(options.movechildren).length,
                uw = b.find(options.moveparent),
                lw = b.find(options.movechildren).outerWidth(true);
            var sliderTimer;
            uw.css({"left":0});
            var J={
                   premove:function(){
                          uw.find(options.movechildren+":last").prependTo(uw);
                       uw.css({"left":-lw});
                       uw.stop(true,false).animate({"left":0},options.speed);
                   },
                   nextmove:function(){
                       uw.animate({"left":-lw},options.speed,function(){
                              uw.find(options.movechildren+":first").appendTo(uw);
                              uw.css({"left":0});
                        });
                    }
                }
           $('#'+options.nextid).click(function(event) {
                  event.preventDefault();
               J.nextmove();
               return false;
            });
           $('#'+options.preid).click(function(event) {
                   event.preventDefault();
                J.premove();
                return false;
            });
    },
    banner:function(options){
      var defaults = {
            speed : 3000,
            autoplay : true,
            nextpre:false
        };
        var options = $.extend(defaults,options);
        var $this=$("[data-banner]"),
            $thisLi=$this.find("li"),
            $thisLilen=$thisLi.length,
            index=0,
            picTimer,bool=true;
        $thisLi.css({"opacity":0,"z-index":"1"}).eq(0).css({"opacity":1,"z-index": 99});
        function showImg(index) {
                $thisLi.stop(true,false).animate({"opacity":0,"z-index":"1"},1500).eq(index).stop(true,false).animate({"opacity":1,"z-index":99},1500);
                $this.find(".Ibtn span").removeClass("on").eq(index).addClass("on");
                bool=false;
        }
        var Ibtn = "<div class='Ibtn'>";
            for(var i=0; i < $thisLilen; i++) {
              var isu=i+1;
              Ibtn += "<span class='icon'>"+isu+"</span>";
            }
            Ibtn += "</div>";
        $this.append(Ibtn);
        $this.find(".Ibtn span").on("click",function() {
            index = $this.find(".Ibtn span").index(this);
            showImg(index);
        }).eq(0).trigger("click");
        if(options.autoplay){
            $this.hover(function() {
                clearInterval(picTimer);
                },function() {
                picTimer = setInterval(function() {
                        showImg(index);
                        index++;
                        if(index == $thisLilen) {index = 0;}
                    },options.speed);
                }).trigger("mouseleave");
            }
     },//无缝滚动
     textScroll:function(options){
        var defaults = {
            tId:null,
            speed: 40,
            amount: 0,
            width: 1,
            dir: "top"
        };
        o = $.extend(defaults,options);
           var Scroll=$(defaults.tId);

        return Scroll.each(function(){
            var _li = $("li", this);
            _li.parent().css({position: "relative"}); //ul
            //初始大小
            var _li_size = 0;
            for(var i=0; i<_li.size(); i++)
                _li_size += o.dir == "left" ? _li.eq(i).outerWidth(true) : _li.eq(i).outerHeight(true);

            //循环所需要的元素
            if(o.dir == "left") _li.parent().css({width: (_li_size*3)+"px"});
            _li.parent().empty().append(_li.clone()).append(_li.clone()).append(_li.clone());
            _li = $("li", this);
            //滚动
            var _li_scroll = 0;
            function goto(){
                _li_scroll += o.width;
                if(_li_scroll > _li_size)
                {
                    _li_scroll = 0;
                    _li.parent().css(o.dir == "left" ? { left : -_li_scroll } : { top : -_li_scroll });
                    _li_scroll += o.width;
                }
                    _li.parent().animate(o.dir == "left" ? { left : -_li_scroll } : { top : -_li_scroll }, o.amount);
            }

            //开始
            var move = setInterval(function(){ goto(); }, o.speed);
            _li.parent().hover(function(){
                clearInterval(move);
            },function(){
                clearInterval(move);
                move = setInterval(function(){ goto(); }, o.speed);
            });
        });
     },
    //日期控件
    calendar:function(selector,options){
        var defaults = {
                months : ["01月", "02月", "03月", "04月", "05月", "06月",
                    "07月", "08月", "09月", "10月", "11月", "12月"],
                days : ["日", "一", "二", "三", "四", "五", "六"],
                swipeable : true,//是否可通过手指滑动
                date : new Date(),//日历当前日期
                onRenderDay : undefined,//渲染单元格时的事件
                onSelect : undefined //选中日期时的事件
            },
            _this = this,
            $el = $(selector),
            $yearText,
            $monthText,
            $calendarBody,
            currentDate,currentYear,currentMonth;
            //字符串转化为日期对象，只支持yyyy-MM-dd 和 yyyy/MM/dd
        var parse=function(date){
                var dateRE = /^(\d{4})(?:\-|\/)(\d{1,2})(?:\-|\/)(\d{1,2})$/;
                return dateRE.test(date) ? new Date(parseInt(RegExp.$1, 10), parseInt(RegExp.$2, 10) - 1, parseInt(RegExp.$3, 10)) : null;
            }

            /**
             * 格式化日期  yyyy-MM-dd
             * @return {String}
             */
        var format=function(date){
                var y  = date.getFullYear(),m = date.getMonth()+1,d = date.getDate();
                m = (m<10)?('0'+m):m;
                d = (d<10)?('0'+d):d;
                return y + '-' + m + '-' + d;
            }
        var _init = function(){
            _this.settings = $.extend({},defaults,options);
            currentYear = _this.settings.date.getFullYear();
            currentMonth = _this.settings.date.getMonth();
            currentDate = new Date(currentYear,currentMonth,_this.settings.date.getDate());
            _render();
            _subscribeEvents();
        }

        /**
         * 获取月份第一天是星期几[0-6]
         */
        var _fisrtDayOfMonth = function(date){
            return ( new Date(date.getFullYear(), date.getMonth(), 1) ).getDay();
        }
        /**
         * 获取月份总天数[1-31]
         */
        var _daysInMonth = function(date){
            return ( new Date(date.getFullYear(),date.getMonth()+1,0) ).getDate();
        }

        /**
         * 渲染日历
         * @private
         */
        var _render = function(){
            var html = '';
            html += '<div class="eims-calendar">';
            html += _renderNav(currentYear,currentMonth);
            html += _renderHead();
            html += '<div class="eims-calendar-body">';
            html += _renderBody(currentDate);
            html += '</div></div>'
            $el.html(html);
            var $span = $el.find('span');
            $yearText = $span.eq(0);
            $monthText = $span.eq(1);
            $calendarBody = $el.find('.eims-calendar-body');
        }

        var _renderNav = function(year,month){
            var html = '<div class="eims-calendar-nav">';
            html += '<div> <i class="icon previous" data-year='+year+'></i><span>'+year+'</span><i class="icon next" data-year='+year+'></i></div>';
            html += '<div ><i class="icon previous" data-month='+month+'></i> <span>'+_this.settings.months[month]+'</span><i class="icon next" data-month='+month+'></i></div>';
            html += '</div>';
            return html;
        }

        var _renderHead = function(){
            var html = '<div class=\'eims-calendar-thead\'>';
            for(var i = 0; i < 7; i++){
                html += '<span class=\'thead\'>'+_this.settings.days[i]+'</span>';
            }
            html += '</div>'
            return html;
        }

        var _renderBody = function(date){
            var firstDay = _fisrtDayOfMonth(date),
                days = _daysInMonth(date),
                rows = Math.ceil((firstDay+days) / 7),
                beginDate,
                html = '';
            currentYear = date.getFullYear();
            currentMonth = date.getMonth();
            beginDate = new Date(currentYear,currentMonth,1-firstDay);//日历开始的日期
            html += '<table><tbody>';
            for(var i = 0; i < rows; i++){
                html += '<tr>';
                for(var j = 0; j < 7; j++){
                    html += _renderDay(beginDate,currentMonth);
                    beginDate.setDate(beginDate.getDate() + 1);
                }
                html += '</tr>';
            }
            html += '</tbody></table>';
            return html;
        }
        var _renderDay = function(date,month){
            var otherMonth = (date.getMonth() !== month);
            var dateStr = format(date);
            var classname = (format(_this.settings.date) == dateStr) ? 'class=\"active\"':'class=\"td\"';
            var dayStr = date.getDate();
            if(_this.settings.onRenderDay){
                dayStr = _this.settings.onRenderDay.call(null,dayStr,dateStr);
            }
            return otherMonth ? '<td>&nbsp;</td>' : '<td '+classname+' data-date= '+dateStr+'>'+dayStr+'</td>';
        }

        var _subscribeEvents = function(){
            var $target,$ctarget;
            $el.on('click',function(e){
                $target = $(e.target);
                if($target.is('[data-year].next')){
                    //后一年
                    currentDate.setFullYear(currentDate.getFullYear()+1);
                    _this.refresh(currentDate);
                }else if($target.is('[data-year].previous')){
                    //前一年
                    currentDate.setFullYear(currentDate.getFullYear()-1);
                    _this.refresh(currentDate);
                }else if($target.is('[data-month].next')){
                    //后一月
                    currentDate.setMonth(currentDate.getMonth()+1);
                    _this.refresh(currentDate);
                }else if($target.is('[data-month].previous')){
                    //前一月
                    currentDate.setMonth(currentDate.getMonth()-1);
                    _this.refresh(currentDate);
                }
                $ctarget = $target.closest('td');
                if(!$target.is('td') && $ctarget.length > 0){
                    $target = $ctarget;
                }
                if($target.is('td')){
                    var dateStr = $target.data('date');
                    if(dateStr && _this.settings.onSelect){
                        _this.settings.onSelect.call(_this,dateStr)
                    }
                }

            });
        }

        /**
         * 刷新日历为指定日期
         * @param date 指定日期
         */
        this.refresh = function(date){
            var oldDate = new Date(currentYear,currentMonth,1),
                newDate = new Date(date.getFullYear(),date.getMonth(),1),
                transition = undefined,$table;

            if(oldDate.getTime() == newDate.getTime())return;
            $yearText.text(date.getFullYear());
            $monthText.text(this.settings.months[date.getMonth()]);
            var newbody = _renderBody(date);
            $calendarBody.html(newbody);
        }
        _init();

    },//省市区三级联动
    AreaData:function(){
        var provinceArray = new Array(),
            cityArray = new Array(),
            areaArray = new Array(),
            _this=this;
         //加载城省数据
      var GetProvince=function() {
            for (var i = 0; i < provinceArray.length; i++) {
                    $("#province-option").append("<div class='option' data-val='"+provinceArray[i][0][0]+"' data-text='"+provinceArray[i][0][1]+"'>" + provinceArray[i][0][1] + "</div>");
            }
         },
          //加载城市数据
          GetCity=function(provinceID) {
            for (var i = 0; i < cityArray.length; i++) {
                if (cityArray[i][0][0] == provinceID) {
                    $("#city-option").append("<div class='option' data-val='"+ cityArray[i][0][1] + "' data-text='"+ cityArray[i][0][2] + "'>" + cityArray[i][0][2] + "</div>");
                }
            }
          },
          //加载区域数据
          GetArea=function(cityID) {
                for (var i = 0; i < areaArray.length; i++) {
                    if (areaArray[i][0][1] == cityID) {
                        $("#tourism-option").append("<div class='option' data-val='"+ areaArray[i][0][2] + "' data-text='"+ areaArray[i][0][3] + "'>" + areaArray[i][0][3] + "</div>");
                    }
                }
          },
          //初始化绑定国家、省市县
          BindCPCA=function() {
                    $(nations).each(function (j, p) {
                        if ($(p).length > 0) {
                            var narray = new Array([p.pId, p.pn, p.p_en]);
                            if (provinceArray.length > 0) {
                                provinceArray[provinceArray.length] = narray;
                            } else {
                                provinceArray[0] = narray;
                            }
                            $(p.cities).each(function (k, c) {
                                var parray = new Array([p.pId, c.cId, c.cn, c.c_en]);
                                if (cityArray.length > 0) {
                                    cityArray[cityArray.length] = parray;
                                } else {
                                    cityArray[0] = parray;
                                }
                                $(c.areas).each(function (l, a) {
                                    var array = new Array([p.pId, c.cId, a.aId, a.an, a.a_en]);
                                    if (areaArray.length > 0) {
                                        areaArray[areaArray.length] = array;
                                    } else {
                                        areaArray[0] = array;
                                    }
                                });
                            });
                        }
                    });
                GetProvince();
                GetCity(parseInt($("#city").attr("data-val")));
                GetArea(parseInt($("#tourism").attr("data-val")));
            },
            getB=function(obj){
                var option=$(obj).children().eq(0),
                    optiontext=option.attr("data-text"),
                    optionval=option.attr("data-val"),
                    optionsiblings=$(obj).siblings();
                    optionsiblings.attr("val",optionval).children("em").text(optiontext);
                    option.addClass("cur");
            }

            $(document).on("click","#province-option .option",function() {
                    var provinceID = $(this).data("val");
                    $("#province").attr("data-val",$(this).data("val")).find("em").text($(this).data("text"));
                    $("#city").attr("data-val",1);
                    $("#city-option").html("");
                    GetCity(provinceID);
                    $("#city-option .option").eq(0).trigger("click");
                    getB("#city-option");
                    _this.colseSelect(this);
             });
            //城市值改变事件
            $(document).on("click","#city-option .option", function () {
                var cityID =$(this).data("val"),option=$("#tourism-option").eq(0);
                $("#tourism-option").html("");
                 GetArea(cityID);
                 $("#tourism").attr("data-val",option.data('val')).find("em").text(option.data("text"));
                 getB("#tourism-option");
                _this.colseSelect(this);
            });
            //区域值改变事件
            $(document).on("click","#tourism-option .option", function () {
                _this.colseSelect(this);
            });
            BindCPCA();
       },
       //会员评分
       Score:function(){
           var score=$("#score"),scoreB=score.children(),scoreEm=score.siblings();
           var l=parseInt($(".vip-review").offset().left)+109,max=scoreEm.width()+2;
            var isN=function(num) {
                    if (!isNaN(num)) {
                        return ((num + '').indexOf('.') != -1) ? true : false;
                    }
                }
               scoreEm.on("mousemove",function(ev){
                     var x=ev.pageX;
                     var pos=Math.round(Math.max(0,(x-l)/max)*100);
                     $(this).find("em").css({'width':pos+'%'});
                     var pose=Math.max(1,Math.round(pos/2)/10);
                     !isN(pose)?score=pose+".0":pose;
                     scoreEm.children().children().text(score);
               })
       }

}

