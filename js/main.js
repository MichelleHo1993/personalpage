var oSection1 = document.getElementById("section1");
var oSection2 = document.getElementById("section2");
var oFlow1 = document.getElementById('s4-flow-1');
var aLi = oFlow1.getElementsByTagName('li');
var bg_2 = document.getElementById("bg-2");
var place_holder = document.getElementById("place_holder");
var greetingsDiv = document.getElementById("greetings");
var greetingsTop = greetingsDiv.offsetTop;

var isScroll = false;//是否正在下拉

function hasClass(obj, cls) {  
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
}  
  
function addClass(obj, cls) {  
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
}  
  
function removeClass(obj, cls) {  
    if (hasClass(obj, cls)) {  
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
        obj.className = obj.className.replace(reg, ' ');  
    }  
}  

function toggleClass(obj,cls){  
    if(hasClass(obj,cls)){  
        removeClass(obj, cls);  
    }else{  
        addClass(obj, cls);  
    }  
}  


//首屏下拉
 function mousewheelHandler(e){    
    if(isScroll){return}
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        // console.log(delta > 0 ? "向上滚动" : "向下滚动");
        if(delta<0){
            console.log('<0',delta)       
            scroller('section2', 500)

        }else{
            console.log('>0',delta)
            scroller('section1', 500)
        }
    }
    if(window.navigator.userAgent.indexOf('Firefox')!=-1){
        oSection1.addEventListener("DOMMouseScroll", mousewheelHandler, false);
        oSection2.addEventListener("DOMMouseScroll", mousewheelHandler, false);
        }else{
            oSection1.addEventListener("mousewheel", mousewheelHandler, false);
            oSection2.addEventListener("mousewheel", mousewheelHandler, false);
    }

// 转换为数字
function intval(v)
{
    v = parseInt(v);
    return isNaN(v) ? 0 : v;
}
 
// 获取元素信息
function getPos(e)
{
    var l = 0;
    var t  = 0;
    var w = intval(e.style.width);
    var h = intval(e.style.height);
    var wb = e.offsetWidth;
    var hb = e.offsetHeight;
    while (e.offsetParent){
        l += e.offsetLeft + (e.currentStyle?intval(e.currentStyle.borderLeftWidth):0);
        t += e.offsetTop  + (e.currentStyle?intval(e.currentStyle.borderTopWidth):0);
        e = e.offsetParent;
    }
    l += e.offsetLeft + (e.currentStyle?intval(e.currentStyle.borderLeftWidth):0);
    t  += e.offsetTop  + (e.currentStyle?intval(e.currentStyle.borderTopWidth):0);
    return {x:l, y:t, w:w, h:h, wb:wb, hb:hb};
}
 
// 获取滚动条信息
function getScroll() 
{
    var t, l, w, h;
    
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
    } else if (document.body) {
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight;
    }
    return { t: t, l: l, w: w, h: h };
}
 
// 锚点(Anchor)间平滑跳转
function scroller(el, duration)
{
    isScroll = true;
    if(typeof el != 'object') { el = document.getElementById(el); }
 
    if(!el) return;
 
    var z = this;
    z.el = el;
    z.p = getPos(el);
    z.s = getScroll();
    z.clear = function(){window.clearInterval(z.timer);z.timer=null};
    z.t=(new Date).getTime();
 
    z.step = function(){
        var t = (new Date).getTime();
        var p = (t - z.t) / duration;
        if (t >= duration + z.t) {
            z.clear();
            window.setTimeout(function(){z.scroll(z.p.y, z.p.x)},13);
        } else {
            st = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.y-z.s.t) + z.s.t;
            sl = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.x-z.s.l) + z.s.l;
            z.scroll(st, sl);
        }
    };
    z.scroll = function (t, l){window.scrollTo(l, t)};
    z.timer = window.setInterval(function(){z.step();},13);
    
    setTimeout(function(){isScroll = false}, 700);
    
}

//风琴效果
for(var i=1;i<aLi.length;i++){
    aLi[i].style.left=620-(aLi.length-i)%aLi.length*80+'px';
}
for(var i=0;i<aLi.length;i++){
        (function(index){
            aLi[i].onmouseover=function(){
            // addClass(aLi[i], 'switch')
            for(var i=0;i<aLi.length;i++){
                    if(i<=index){
                        aLi[i].style.left=i*80+'px';
                    }else{
                        aLi[i].style.left=620-(aLi.length-i)*80+'px';
                    }
                }
            };
        })(i);
}

//上拉吸顶条效果
    window.onscroll=function(){

        var scrollT = document.documentElement.scrollTop||document.body.scrollTop;
    // console.log(scrollT)

        if(scrollT>greetingsTop+110){
            greetingsDiv.style.display = 'none';
            bg_2.style.position='fixed';
            bg_2.style.top=0;
            bg_2.style.left=0;
            place_holder.style.display = 'block'
        }else{
            bg_2.style.position='';
            greetingsDiv.style.display = 'block';
            place_holder.style.display = 'none';
        }
    }
