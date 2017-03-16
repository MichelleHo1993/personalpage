
// var oMenu = document.getElementById('menu');
// var oNav = document.getElementById('nav');
// var className = oNav.getAttribute('class');

// var zoomUl = document.getElementsByClassName('intro-cube');
// var zoomUl_l = document.getElementById('intro-l');
// var zoomUl_r = document.getElementById('intro-r');
// var zoomCube = zoomUl_l.getElementsByTagName('li');
// var zoomCube = zoomUl_r.getElementsByTagName('li');
var oSection1 = document.getElementById("section1");
var oSection2 = document.getElementById("section2");
var oFlow1 = document.getElementById('s4-flow-1');
var aLi = oFlow1.getElementsByTagName('li');
var bg_2 = document.getElementById("bg-2");
var place_holder = document.getElementById("place_holder");
var greetingsDiv = document.getElementById("greetings");
var greetingsTop = greetingsDiv.offsetTop;

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

// 控制菜单显示隐藏
// oMenu.onclick = function (){
// 	// oNav.setAttribute('class',className + ' show')
// 	// toggleClass(oNav,'show')

// 	if(hasClass(oNav,'fadeInRight')){
// 		addClass(oNav,'fadeOutRight')
// 		removeClass(oNav,'fadeInRight')
// 	}
// 	else{
// 		removeClass(oNav,'fadeOutRight')
// 		addClass(oNav,'fadeInRight')
// 	}
// }
// document.body.onScroll
// console.log(document.body.scrollHeight)
// 菜单控制隐藏结束

//首屏下拉

function getwheel(){
    function mousewheelHandler(e){
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        // console.log(delta > 0 ? "向上滚动" : "向下滚动");
        if(delta<0){
            console.log(oSection2.style.top)
            oSection2.style.top = 0;
        }
    }
    if(window.navigator.userAgent.indexOf('Firefox')!=-1){
        oSection1.addEventListener("DOMMouseScroll", mousewheelHandler, false);
        }else{
            oSection1.addEventListener("mousewheel", mousewheelHandler, false);
            oSection2.style.top = 0;
            console.log('下')
    }
}
getwheel();


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
    console.log(scrollT)

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
