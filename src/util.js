/**
 * Created by jiangink on 2015/11/28.
 */
//工具函数集
var util = {
    //加载图片
    loadImages: function(arrSrc, func, funcErr) {
        var _count = 0;
        var _json = {};
        for(var i=0; i<arrSrc.length; i++) {
            var _oImg = new Image();

            (function(index) {
                _oImg.onload = function() {
                    var name = arrSrc[index].split('.')[0];
                    _json[name] = this;
                    _count++;
                    if(_count == arrSrc.length) {
                        func(_json);
                    }
                };

                _oImg.onerror = function() {
                    funcErr && funcErr();
                };
            })(i);
            _oImg.src = "./imgs/" + arrSrc[i];
        }
    },

    //弧度转为角度
    radianToAngle: function(n) {
        return n * Math.PI / 180;
    },

    //角度转为弧度
    angleToRadian: function(n) {
        return n * 180 / Math.PI;
    },

    //获取鼠标点击的坐标 (注：canvas要设置position: absolute)
    getEventPosition: function(ev) {
        var _x, _y;
        if(ev.layerX || ev.layerY == 0) {
            _x = ev.layerX;
            _y = ev.layerY;
        }
        else if(ev.offsetX || ev.offsetY == 0) {  //Opera
            _x = ev.offsetX;
            _y = ev.offsetY;
        }
        return {x: _x, y: _y};
    },

    //获取两个数闭合区间的随机值[under, over]
    getRandomBy: function(under, over) {
        switch (arguments.length) {
            case 1 : return parseInt(Math.random() * under + 1);
            case 2 : return parseInt(Math.random() * (over - under + 1) + under);
            default : return 0;
        }
    },

    //检测是否超出屏幕边界
    checkScreenOutside: function(obj, screenW, screenH) {
        if((obj.posX < -obj.padding) || (obj.posX > screenW+obj.padding) ||
            (obj.posY < -obj.padding) || (obj.posY > screenH+obj.padding)) {
            return true;
        }
        else {
            return false;
        }
    },

    //碰撞检测
    checkCollision : function(obj1, obj2) {
        //计算坐标差值
        var _xDVal = Math.abs(obj1.posX - obj2.posX),
            _yDVal = Math.abs(obj1.posY - obj2.posY),
            //计算对角线长度
            _obj1Diagon = Math.sqrt(Math.pow(obj1.width, 2) + Math.pow(obj1.height, 2)),
            _obj2Diagon = Math.sqrt(Math.pow(obj2.width, 2) + Math.pow(obj2.height, 2)),
            dist = Math.sqrt(Math.pow(_xDVal, 2) + Math.pow(_yDVal, 2));
        //若dist小于两物体对角线之和的一半，大于两物体对角线之差的一半，则能够确认碰撞；
        if(dist < (_obj1Diagon + _obj2Diagon)/2
            && dist > Math.abs(_obj1Diagon - _obj2Diagon)/2) {
            return true;
        }
        else {
            return false;
        }
    },

    //检测是否点击按钮
    //checkClickZone: function(posObj, btnObj) {
    //    var _offsetX = btnObj.posX;
    //    var _offsetY = btnObj.posY;
    //    if((posObj.x >= _offsetX) && (posObj.x <= _offsetX + btnObj.width)
    //        && (posObj.y >= _offsetY) && (posObj.y <= _offsetY + btnObj.height)) {
    //        return true;
    //    }else {
    //        return false;
    //    }
    //}
};

