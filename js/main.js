//上下滚动翻页
var oSection1 = document.getElementById("section1");
var oSection2 = document.getElementById("section2");
var isScroll = false;//是否正在下拉

//风琴效果
var oFlow1 = document.getElementById('s4-flow-1');
var aLi = oFlow1.getElementsByTagName('li');

//吸顶条
var bg_2 = document.getElementById("bg-2");
var place_holder = document.getElementById("place_holder");
var greetingsDiv = document.getElementById("greetings");
var greetingsTop = greetingsDiv.offsetTop;

//音乐开关
var oMusic = document.getElementById("music");
var oAudio = document.getElementsByTagName('audio')[0];

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
            // console.log('<0',delta)       
            scroller('section2', 500)

        }else{
            // console.log('>0',delta)
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

//控制音乐开关 
oMusic.addEventListener('click',function(event){
    if(oAudio.paused){
        removeClass(oMusic,'music-off')
        oAudio.play();
    }else{
        addClass(oMusic,'music-off')
        oAudio.pause();
    }
},false)

//echarts
 require.config({
            paths: {
                echarts: 'http://echarts.baidu.com/build/dist'
            }
        });
        
        // 使用
        require(
            [
                'echarts',
                'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('main')); 
                
                option = {
    title: {
        x: 'center',
        text: '部分前端技术掌握度一览',
        subtext: '0未接触;2了解;4掌握;6熟练;8精通;10专家',
        subtextStyle: {
            color: '#fff'          // 副标题文字颜色
        }
    },
    tooltip: {
        trigger: 'item'
    },
    calculable: true,
    grid: {
        borderWidth: 0,
        y: 80,
        y2: 60
    },
    xAxis: [
        {
            type: 'category',
            show: false,
            data: ['HTML', 'CSS', 'Js', 'jQuery', 'React', 'Augular', 'Node', 'WebPack', 'Gulp']
        }
    ],
    yAxis: [
        {
            type: 'value',
            show: true,
            data:['0','2','4','6','8','10']
        }
    ],
    series: [
        {
            name: '前端技能',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: function(params) {
                        // build a color map as your need.
                        var colorList = [
                          '#e0cdbf','#fff','#c5ebec','#e0cdbf','#fff',
                           '#c5ebec','#e0cdbf','#fff','#c5ebec','#e0cdbf',
                           '#fff','#c5ebec'
                        ];
                        return colorList[params.dataIndex]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}\n{c}'
                    }
                }
            },
            data: [8.5,8,7,6,7,6,6,6,6,6],
            
            // markPoint: {
            //     // tooltip: {
            //     //     trigger: 'item',
            //     //     backgroundColor: 'rgba(0,0,0,0)',
            //     //     // formatter: function(params){
            //     //     //     return '<img src="' 
            //     //     //             + params.data.symbol.replace('image://', '')
            //     //     //             + '"/>';
            //     //     // }
            //     // },
            //     data: [
            //         {xAxis:0, y: 350, name:'Line', },
            //         {xAxis:1, y: 350, name:'Bar', },
            //         {xAxis:2, y: 350, name:'Scatter', },
            //         {xAxis:3, y: 350, name:'K', },
            //         {xAxis:4, y: 350, name:'Pie', },
            //         {xAxis:5, y: 350, name:'Radar', },
            //         {xAxis:6, y: 350, name:'Chord', },
            //         {xAxis:7, y: 350, name:'Force',},
            //         {xAxis:8, y: 350, name:'Map',},
            //         {xAxis:9, y: 350, name:'Gauge', },
            //         {xAxis:10, y: 350, name:'Funnel', },
            //     ]
            // }
        }
    ]
};
        
                // 为echarts对象加载数据 
                myChart.setOption(option); 
            }
        );
