window.onload=function(){

    //要做事先找人
    var box = document.getElementsByClassName("all");
    var screen = box[0].children[0];
    var screenA = box[1].children[0];

    var ul = screen.children[0];
    var ulA = screenA.children[0];

    var ol = box[0].children[1];
    var olA = box[1].children[1];

    var ulLis = ul.children;//所有的图片
    var ulLisA = ulA.children;//所有的图片

    var imgWidth = screen.offsetWidth;
    var imgWidthA = screenA.offsetWidth;

    var arr = document.getElementsByClassName("arr");

    var arrRight = arr[0].children[0];
    var arrRightA = arr[1].children[0];

    console.log(arrRight);
    var arrLeft = arr[0].children[1];
    var arrLeftA = arr[1].children[1];
    var timer = null;
    var timerA = null;

    //1.动态生成结构
    //1.1根据图片的数量动态生成按钮
    for (var i = 0; i < ulLis.length; i++) {
        //动态生成按钮
        var li = document.createElement("li");
        //给li添加序号
        //索引号是从0开始的
        //序号=索引号+1
        // li.innerHTML = i + 1;
        //追加到ol下面
        ol.appendChild(li);
    }
    var olLis = ol.children;//必须生成之后才能获取到
    olLis[0].className = "current";

    //1.2把第一张图片追加到最后
    //复制第一张图片
    var firstImg = ulLis[0].cloneNode(true);
    //追加到ul后面
    ul.appendChild(firstImg);

    //2.鼠标经过按钮
    //循环遍历 给每一个按钮绑定鼠标经过事件
    for (var j = 0; j < olLis.length; j++) {
        olLis[j].index = j;
        olLis[j].onmouseover = function () {
            //按钮排他
            //干掉所有人
            for (var k = 0; k < olLis.length; k++) {
                olLis[k].className = "";
            }
            //留下我自己
            this.className = "current";
            //根据索引号 通过动画函数移动ul
            //图片移动的位置 和 当前按钮索引号 和 图片宽度有关 而且是负数
            var target = -this.index * imgWidth;
            animate(ul, target);

            //将应该显示的图片的索引号 和 鼠标经过的按钮的索引号 进行统一
            pic = this.index;
            //将应该亮起的按钮的索引号 和 鼠标经过的按钮的索引号 进行统一
            square = this.index;
        }
    }

    // 3.鼠标点击箭头
    // 鼠标经过box显示arr 清理定时器停止自动播放
    box[0].onmouseover = function () {
        // arr.style.display = "block";
        clearInterval(timer);
    }
    //鼠标离开box隐藏arr 设置定时器继续自动播放
    box[0].onmouseout = function () {
        // arr.style.display = "block";
        timer = setInterval(playNext, 1000);
    }

    // 点击 右箭头 显示下一张
    var pic = 0;//pic表示当前图片的索引
    var square = 0;//square表示当前按钮的索引
    arrRight.onclick = function () {
        playNext();
    }
    arrLeft.onclick = function () {
        //判断当前图片的索引pic是否等于最后一张图片的索引ulLis.length-1
        if (pic == 0) {
            pic = ulLis.length - 1;
            ul.style.left = -(ulLis.length - 1) * imgWidth + "px";
        }
        pic--;
        //通过动画函数对ul进行移动
        //target 和 图片索引 和 图片宽度 有关 而且是负数
        var target = -pic * imgWidth;
        animate(ul, target);

        //按钮也应该自动播放
        //如果当前按钮的索引号square大于第一个按钮的索引号0 就--
        if (square > 0) {
            square--;
        } else {
            //如果square等于零 说明到第一个了 这时就应该把他变成最后一个
            square = olLis.length - 1;
        }
        //干掉所有人
        for (var i = 0; i < olLis.length; i++) {
            olLis[i].className = "";
        }
        //留下我自己
        olLis[square].className = "current";
    }

    //4.添加自动滚动
    timer = setInterval(playNext, 1000)

    function playNext() {
        //先判断当前图片的索引pic是否等于最后一张图片的索引ulLis.length-1
        //如果相等马上跳过去然后在执行动画效果 从而实现无缝滚动
        //并且把索引号也归零
        if (pic == ulLis.length - 1) {
            ul.style.left = 0;
            pic = 0;
        }
        pic++;//pic++相当于 pic=pic+1;
        //通过动画函数对ul进行移动
        //target 和 图片索引 和 图片宽度 有关 而且是负数
        var target = -pic * imgWidth;
        animate(ul, target);

        //按钮也应该自动播放
        //如果当前按钮的索引号square小于最后一个按钮的索引号olLis.length - 1 就++
        if (square < olLis.length - 1) {
            square++;
        } else {
            square = 0;
        }

        //干掉所有人
        for (var i = 0; i < olLis.length; i++) {
            olLis[i].className = "";
        }
        //留下我自己
        olLis[square].className = "current";
    }

    //5.完善鼠标经过


    function animate(obj, target) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var step = 25;
            //left值越小越靠左
            //obj.offsetLeft小于target
            //obj在target的左侧
            //应该向右走
            //向右走step是正
            /*if (obj.offsetLeft < target) {
             step = 9;
             }
             if (obj.offsetLeft > target) {
             //向左走是负
             step = -9;
             }*/
            var step = obj.offsetLeft < target ? step : -step;

            //Math.abs(obj.offsetLeft - target) 这个表示对象到目标的距离
            //如果对象到目标的距离比一步迈出的距离要大 我就要继续走

            if (Math.abs(obj.offsetLeft - target) > Math.abs(step)) {
                obj.style.left = obj.offsetLeft + step + "px";
            } else {
                //再迈一步就超过目标了
                obj.style.left = target + "px";//手动把对象放置到目标上
                clearInterval(obj.timer);//清理定时器
            }
        }, 15)
    }


for (var Z = 0; Z < ulLisA.length; Z++) {
        //动态生成按钮
        var li = document.createElement("li");
        //给li添加序号
        //索引号是从0开始的
        //序号=索引号+1
        // li.innerHTML = i + 1;
        //追加到ol下面
        olA.appendChild(li);
    }
    var olLisA = olA.children;//必须生成之后才能获取到
    olLisA[0].className = "current";

    //1.2把第一张图片追加到最后
    //复制第一张图片
    var firstImgA = ulLisA[0].cloneNode(true);
    firstImgA.className = "cloneN";
    //追加到ul后面
    ulA.appendChild(firstImgA);

    //2.鼠标经过按钮
    //循环遍历 给每一个按钮绑定鼠标经过事件
    for (var Y = 0; Y < olLisA.length; Y++) {
        olLisA[Y].index = Y;
        olLisA[Y].onmouseover = function () {
            //按钮排他
            //干掉所有人
            for (var L = 0; L < olLisA.length; L++) {
                olLisA[L].className = "";
            }
            //留下我自己
            this.className = "current";
            //根据索引号 通过动画函数移动ul
            //图片移动的位置 和 当前按钮索引号 和 图片宽度有关 而且是负数
            var targetA = -this.index * imgWidthA;
            animate(ulA, targetA);

            //将应该显示的图片的索引号 和 鼠标经过的按钮的索引号 进行统一
            picA = this.index;
            //将应该亮起的按钮的索引号 和 鼠标经过的按钮的索引号 进行统一
            squareA = this.index;
        }
    }

    // 3.鼠标点击箭头
    // 鼠标经过box显示arr 清理定时器停止自动播放
    box[1].onmouseover = function () {
        // arr.style.display = "block";
        clearInterval(timerA);
    }
    //鼠标离开box隐藏arr 设置定时器继续自动播放
    box[1].onmouseout = function () {
        // arr.style.display = "block";
        timerA = setInterval(playNextA, 1000);
    }

    // 点击 右箭头 显示下一张
    var picA = 0;//pic表示当前图片的索引
    var squareA = 0;//square表示当前按钮的索引
    arrRightA.onclick = function () {
        playNextA();
    }
    arrLeftA.onclick = function () {
        //判断当前图片的索引pic是否等于最后一张图片的索引ulLis.length-1
        if (picA == 0) {
            picA = ulLisA.length - 1;
            ulA.style.left = -(ulLisA.length - 1) * imgWidthA + "px";
        }
        picA--;
        //通过动画函数对ul进行移动
        //target 和 图片索引 和 图片宽度 有关 而且是负数
        var targetA = -picA * imgWidthA;
        animate(ulA, targetA);

        //按钮也应该自动播放
        //如果当前按钮的索引号square大于第一个按钮的索引号0 就--
        if (squareA > 0) {
            squareA--;
        } else {
            //如果square等于零 说明到第一个了 这时就应该把他变成最后一个
            squareA = olLisA.length - 1;
        }
        //干掉所有人
        for (var i = 0; i < olLisA.length; i++) {
            olLisA[i].className = "";
        }
        //留下我自己
        olLisA[squareA].className = "current";
    }

    //4.添加自动滚动
    timerA = setInterval(playNextA, 1000)

    function playNextA() {
        //先判断当前图片的索引pic是否等于最后一张图片的索引ulLis.length-1
        //如果相等马上跳过去然后在执行动画效果 从而实现无缝滚动
        //并且把索引号也归零
        if (picA == ulLisA.length - 1) {
            ulA.style.left = 0;
            picA = 0;
        }
        picA++;//pic++相当于 pic=pic+1;
        //通过动画函数对ul进行移动
        //target 和 图片索引 和 图片宽度 有关 而且是负数
        var targetA = -picA * imgWidthA;
        animate(ulA, targetA);

        //按钮也应该自动播放
        //如果当前按钮的索引号square小于最后一个按钮的索引号olLis.length - 1 就++
        if (squareA < olLisA.length - 1) {
            squareA++;
        } else {
            squareA = 0;
        }

        //干掉所有人
        for (var i = 0; i < olLisA.length; i++) {
            olLisA[i].className = "";
        }
        //留下我自己
        olLisA[squareA].className = "current";
    }

    //5.完善鼠标经过



var arrAA = document.getElementById('Arr');
var RightAA = arrAA.children[0];
var LeftAA = arrAA.children[1];
var ImgAA = RightAA.children[0];
var ImgBB = LeftAA.children[0];
    ImgAA.onmouseover = function(){
        ImgAA.src = '../imgs/shouye_71.png';
    }
    ImgAA.onmouseout = function(){
        ImgAA.src = '../imgs/shouye_13.png';
    }
    ImgBB.onmouseover = function(){
        ImgBB.src = '../imgs/shouye_71.png';
    }
    ImgBB.onmouseout = function(){
        ImgBB.src = '../imgs/shouye_13.png';
    }


    var tj_bottom = document.getElementsByClassName("tj_bottom");
    console.log(tj_bottom[0]);
    var mrtj = tj_bottom[0].children[0];
    var gsdh = tj_bottom[0].children[1];
    var rmgd = tj_bottom[0].children[2];
    var classify = document.getElementsByClassName("classify");
    var ulL = classify[0].children[0]
    var Llis = ulL.children;
    Llis[0].onclick = function(){
        mrtj.style.display = "block";
        gsdh.style.display = "none";
        rmgd.style.display = "none";
    }
    Llis[1].onclick  = function(){
        mrtj.style.display = "none";
        gsdh.style.display = "block";
        rmgd.style.display = "none";
    }
    Llis[2].onclick  = function(){
        mrtj.style.display = "none";
        gsdh.style.display = "none";
        rmgd.style.display = "block";
    }


    var xgsj = document.getElementsByClassName("xgsj");
    var xgsj_ul = xgsj[0].children[0];
    var xgsj_lis = xgsj_ul.children;
    for (var i = 0; i < xgsj_lis.length; i++) {
        var spanONE = xgsj_lis[i].children[0];
        var spanTWO = xgsj_lis[i].children[1];

        var Pcolor = spanTWO.children[0];
        var imgS = spanONE.children;
        xgsj_lis[i].index = i;
        xgsj_lis[i].onmouseover = function(){
            var x=this.index;
         for (var j = 0; j < xgsj_lis.length; j++) {
              imgS[2].style.display = "none";
              imgS[3].style.display = "none";
              spanTWO.style.backgroundColor = "black";
              spanTWO.style.color = "#999999";
              Pcolor.style.color = "#eeeeee";
        }
        xgsj_lis[x].children[1].style.backgroundColor="#e7a80c";
        xgsj_lis[x].children[1].style.color="#999999";
        xgsj_lis[x].children[1].children[0].style.color="#999999"
        xgsj_lis[x].children[0].children[2].style.display = "block";
        xgsj_lis[x].children[0].children[3].style.display = "block";

        }
        xgsj_lis[i].onmouseout = function(){
            var x=this.index;
              for (var j = 0; j < xgsj_lis.length; j++) {
                xgsj_lis[x].children[1].style.backgroundColor="black";
                xgsj_lis[x].children[1].style.color="#999999";
                xgsj_lis[x].children[1].children[0].style.color="#eeeeee"
                xgsj_lis[x].children[0].children[2].style.display = "none";
                xgsj_lis[x].children[0].children[3].style.display = "none";
        }
        }
        
    }

    var xgsj = document.getElementsByClassName("xgsj");
    var xgsj_ulAA = xgsj[0].children[1];
    var xgsj_lisAA = xgsj_ulAA.children;
    for (var i = 0; i < xgsj_lisAA.length; i++) {
        var spanONEAA = xgsj_lisAA[i].children[0];
        var spanTWOAA= xgsj_lisAA[i].children[1];
        var PcolorAA = spanTWOAA.children[0];
        var imgSAA = spanONEAA.children;
        xgsj_lisAA[i].index = i;
        xgsj_lisAA[i].onmouseover = function(){
            var x=this.index;
         for (var j = 0; j < xgsj_lisAA.length; j++) {
              imgSAA[2].style.display = "none";
              imgSAA[3].style.display = "none";
              spanTWOAA.style.backgroundColor = "black";
              spanTWOAA.style.color = "#999999";
              PcolorAA.style.color = "#eeeeee";
        }
        xgsj_lisAA[x].children[1].style.backgroundColor="#e7a80c";
        xgsj_lisAA[x].children[1].style.color="#999999";
        xgsj_lisAA[x].children[1].children[0].style.color="#999999"
        xgsj_lisAA[x].children[0].children[2].style.display = "block";
        xgsj_lisAA[x].children[0].children[3].style.display = "block";
        }
        xgsj_lisAA[i].onmouseout = function(){
            var x=this.index;
              for (var j = 0; j < xgsj_lisAA.length; j++) {
                xgsj_lisAA[x].children[1].style.backgroundColor="black";
                xgsj_lisAA[x].children[1].style.color="#999999";
                xgsj_lisAA[x].children[1].children[0].style.color="#eeeeee"
                xgsj_lisAA[x].children[0].children[2].style.display = "none";
                xgsj_lisAA[x].children[0].children[3].style.display = "none";
        }
        }
        
    }

    var wrap = document.getElementById("wrap");
    console.log(wrap)
    var slide = document.getElementById("slide");
    var six_ul = slide.children[0];
    var six_ol = slide.children[1]; 
    console.log(six_ol)
    var six_lis = six_ul.children;
    // console.log(six_lis)

    var arrow = document.getElementById("arrow");
    var six_Right = document.getElementById("six_Right");
    var six_Left = document.getElementById("six_Left");
    var config = [
        {
            width: 310,
            // height:180,            
            top: 150,
            left: 30,
            opacity: 1,
            zIndex: 2
            // overflow:hidden;
        },//0
        {
            width: 488,
            // height:280,
            top: 100,
            left: 103,
            opacity: 1,
            zIndex: 3
        },//1
        {
            width: 670,
            // height:384,
            top: 50,
            left: 200,
            opacity: 1,
            zIndex: 4
        },//2
        {
            width: 488,
            // height:280,
            top: 100,
            left: 480,
            opacity:1,
            zIndex: 3
        },//3
        {
            width: 310,
            // height:180,
            top: 150,
            left: 730,
            opacity: 1,
            zIndex: 2
        }//4
    ];
    for (var i = 0; i < six_lis.length; i++) {
        var six_li = document.createElement("li");
        six_ol.appendChild(six_li);
    }
    var six_liols = six_ol.children;
    console.log(six_liols);


        six_liols[0].index=0;
        six_liols[0].onclick = function(){
           six_liols[0].style.height='3px';
           six_liols[0].style.backgroundColor='#9f9fa0';
           six_liols[1].style.height='1px';
           six_liols[1].style.backgroundColor='#ccc';
           six_liols[2].style.height='1px';
           six_liols[2].style.backgroundColor='#ccc';
           six_liols[3].style.height='1px';
           six_liols[3].style.backgroundColor='#ccc';
           six_liols[4].style.height='1px';
           six_liols[4].style.backgroundColor='#ccc';
           flag = false;
        var y = this.index;
            config.push(config.shift());
            config.push(config.shift());
            assign();
        }
        
         six_liols[1].index=1;
        six_liols[1].onclick = function(){
           six_liols[1].style.height='3px';
           six_liols[1].style.backgroundColor='#9f9fa0';
           six_liols[0].style.height='1px';
           six_liols[0].style.backgroundColor='#ccc';
           six_liols[3].style.height='1px';
           six_liols[3].style.backgroundColor='#ccc';
           six_liols[4].style.height='1px';
           six_liols[4].style.backgroundColor='#ccc';
           six_liols[2].style.height='1px';
           six_liols[2].style.backgroundColor='#ccc';
           flag = false;
        var y = this.index;
            config.push(config.shift());
            assign();
        }

        six_liols[3].index=3;
        six_liols[3].onclick = function(){
           six_liols[3].style.height='3px';
           six_liols[3].style.backgroundColor='#9f9fa0';
           six_liols[4].style.height='1px';
           six_liols[4].style.backgroundColor='#ccc';
           six_liols[0].style.height='1px';
           six_liols[0].style.backgroundColor='#ccc';
           six_liols[1].style.height='1px';
           six_liols[1].style.backgroundColor='#ccc';
           six_liols[2].style.height='1px';
           six_liols[2].style.backgroundColor='#ccc';
           flag = false;
        var y = this.index;
            config.unshift(config.pop());
            assign();
        }

        six_liols[4].index=4;
        six_liols[4].onclick = function(){
           six_liols[4].style.height='3px';
           six_liols[4].style.backgroundColor='#9f9fa0';
           six_liols[3].style.height='1px';
           six_liols[3].style.backgroundColor='#ccc';
           six_liols[1].style.height='1px';
           six_liols[1].style.backgroundColor='#ccc';
           six_liols[0].style.height='1px';
           six_liols[0].style.backgroundColor='#ccc';
           six_liols[2].style.height='1px';
           six_liols[2].style.backgroundColor='#ccc';
           flag = false;
        var y = this.index;
            config.unshift(config.pop());
            config.unshift(config.pop());
            assign();
        }
    
    wrap.onmouseover = function () {
        animation(arrow, {"opacity": 1});
    }
    wrap.onmouseout = function () {
        animation(arrow, {"opacity": 0});
    }
    function assign() {
        for (var i = 0; i < six_lis.length; i++) {
            animation(six_lis[i], config[i], function () {
                flag = true;
            });
        }
    }

    var flag = true;

    assign();
    six_Right.onclick = function () {
           six_liols[1].style.height='3px';
           six_liols[1].style.backgroundColor='#9f9fa0';
           six_liols[0].style.height='1px';
           six_liols[0].style.backgroundColor='#ccc';
           six_liols[3].style.height='1px';
           six_liols[3].style.backgroundColor='#ccc';
           six_liols[4].style.height='1px';
           six_liols[4].style.backgroundColor='#ccc';
           six_liols[2].style.height='1px';
           six_liols[2].style.backgroundColor='#ccc';
            flag = false;
            config.push(config.shift());
            assign();

    }
    six_Left.onclick = function () {
           six_liols[3].style.height='3px';
           six_liols[3].style.backgroundColor='#9f9fa0';
           six_liols[4].style.height='1px';
           six_liols[4].style.backgroundColor='#ccc';
           six_liols[0].style.height='1px';
           six_liols[0].style.backgroundColor='#ccc';
           six_liols[1].style.height='1px';
           six_liols[1].style.backgroundColor='#ccc';
           six_liols[2].style.height='1px';
           six_liols[2].style.backgroundColor='#ccc';
            flag = false;
            config.unshift(config.pop());
            assign();

    }
    function animation(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k == "opacity") {
                var leader = getStyle(obj, k) * 100;
                var target = json[k] * 100;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader / 100;
            } else if (k == "zIndex") {
                obj.style[k] = json[k];
            } else {
                var leader = parseInt(getStyle(obj, k)) || 0;
                var target = json[k];
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader + "px";
            }
            // console.log("target: " + target + "leader: " + leader + "step: " + step);
            if (leader != target) {
                flag = false;//告诉人家 我还有没到的呢
            }
        }
        //最后再判断 如果标记仍然是true说明 没有没到达的了
        //也就是都到达了
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 15)
}

function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
}
      
}