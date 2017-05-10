/**
 * Created by jf on 2016/4/3.
 */
window.onload = function () {
    var wrap = document.getElementById("wrap");
    var slide = document.getElementById("slide");
    var ul = slide.children[0];
    var lis = ul.children;
    var arrow = document.getElementById("arrow");
    var arrRight = document.getElementById("arrRight");
    var arrLeft = document.getElementById("arrLeft");
    var config = [
        {
            width: 400,
            top: 150,
            left: -50,
            opacity: 0.2,
            zIndex: 2
        },//0
        {
            width: 600,
            top: 100,
            left: 50,
            opacity: 0.8,
            zIndex: 3
        },//1
        {
            width: 800,
            top: 50,
            left: 200,
            opacity: 1,
            zIndex: 4
        },//2
        {
            width: 600,
            top: 100,
            left: 550,
            opacity: 0.8,
            zIndex: 3
        },//3
        {
            width: 400,
            top: 150,
            left: 800,
            opacity: 0.2,
            zIndex: 2
        }//4
    ];
    wrap.onmouseover = function () {
        animation(arrow, {"opacity": 1});
    }
    wrap.onmouseout = function () {
        animation(arrow, {"opacity": 0});
    }
    function assign() {
        for (var i = 0; i < lis.length; i++) {
            animation(lis[i], config[i], function () {
                flag = true;
            });
        }
    }

    var flag = true;

    assign();
    arrRight.onclick = function () {
        //if (flag) {
            flag = false;
            config.push(config.shift());
            assign();
        //}
    }
    arrLeft.onclick = function () {
        //if (flag) {
            flag = false;
            config.unshift(config.pop());
            assign();
        //}
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
            console.log("target: " + target + "leader: " + leader + "step: " + step);
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