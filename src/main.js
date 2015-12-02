/**
 * Created by jiangink on 2015/11/27.
 */

//DOMContentLoaded优于onload
document.addEventListener("DOMContentLoaded", function() {
    //setInterval id
    var createfishId, spriteMoveId, changeStyleId;

    //canvas上下文处理
    var oPlayBox = document.getElementById("playBox");
    var ctx =  oPlayBox.getContext("2d");

    //初始化属性参数
    util.loadImages(resoure.img, function(images){
        var arrFish = new Array();
        var arrBull = new Array();
        var arrweb = new Array();
        var arrDeadFish = new Array();
        var arrCoin = new Array();
        var arrCoinText = new Array();
        var arrTotalScore = new Array();

        //初始化鱼类属性
        var fishsAttr = [
            {img: images.fish1, width:55, height: 37, frame: 4,score: 1},
            {img: images.fish2, width:78, height: 64, frame: 4,score: 2},
            {img: images.fish3, width:72, height: 56, frame: 4,score: 5},
            {img: images.fish4, width:77, height: 59, frame: 4,score: 10},
            {img: images.fish5, width:107, height: 122, frame: 4,score: 20},
            {img: images.fish6, width:105, height: 79, frame: 8,score: 30},
            {img: images.fish7, width:92, height: 151, frame: 6,score: 40},
            {img: images.fish8, width:174, height: 126, frame: 8,score: 60},
            {img: images.fish9, width:166, height: 183, frame: 8,score: 90},
            {img: images.fish0, width:178, height: 187, frame: 6,score: 120},
            {img: images.shark1, width:509, height: 270, frame: 8,score: 150},
            {img: images.shark2, width:516, height: 273, frame: 8,score: 300}
        ];

        //初始化炮体属性
        var cannonsAttr = [
            {img:images.cannon1, w: 74, h: 74, x: 512, y:oPlayBox.height-30},
            {img:images.cannon2, w: 74, h: 76, x: 512, y:oPlayBox.height-30},
            {img:images.cannon3, w: 74, h: 76, x: 512, y:oPlayBox.height-30},
            {img:images.cannon4, w: 74, h: 83, x: 512, y:oPlayBox.height-30},
            {img:images.cannon5, w: 74, h: 85, x: 512, y:oPlayBox.height-30},
            {img:images.cannon6, w: 74, h: 90, x: 512, y:oPlayBox.height-30},
            {img:images.cannon7, w: 74, h: 94, x: 512, y:oPlayBox.height-30}
        ];

        //初始化炮弹属性
        var bullsAttr = [
            {img : images.bullet, sx : 86, sy : 0, w : 24, h : 26},
            {img : images.bullet, sx : 61, sy : 0, w : 25, h : 29},
            {img : images.bullet, sx : 32, sy : 35, w : 27, h : 31},
            {img : images.bullet, sx : 30, sy : 82, w : 29, h : 33},
            {img : images.bullet, sx : 0, sy : 82, w : 30, h : 34},
            {img : images.bullet, sx : 30, sy : 0, w : 31, h : 35},
            {img : images.bullet, sx : 0, sy : 44, w : 32, h : 38},
            {img : images.bullet, sx : 0, sy : 0, w : 30, h : 44}
        ];

        //初始化渔网属性
        var websAttr = [
            {img : images.web, sx : 319, sy : 355, w : 116, h : 118},
            {img : images.web, sx : 0, sy : 399, w : 137, h : 142},
            {img : images.web, sx : 163, sy : 355, w : 156, h : 162},
            {img : images.web, sx : 242, sy : 181, w : 180, h : 174},
            {img : images.web, sx : 0, sy : 244, w : 163, h : 155},
            {img : images.web, sx : 242, sy : 0, w : 191, h : 181},
            {img : images.web, sx : 0, sy : 0, w : 242, h : 244}
        ];

        //初始化金币属性
        var coinsAttr = [
            {img : images.coinAni1, w : 60, h : 60},
            {img : images.coinAni2, w : 60, h : 60}
        ];

        //初始化金币分数属性
        var coinTexts = {
            '0' : {img:images.coinText, sx: 0, w: 36, h: 49},//0
            '1' : {img:images.coinText, sx: 36, w: 36, h: 49},//1
            '2' : {img:images.coinText, sx: 72, w: 36, h: 49},//2
            '3' : {img:images.coinText, sx: 108, w: 36, h: 49},//3
            '4' : {img:images.coinText, sx: 144, w: 36, h: 49},//4
            '5' : {img:images.coinText, sx: 180, w: 36, h: 49},//5
            '6' : {img:images.coinText, sx: 216, w: 36, h: 49},//6
            '7' : {img:images.coinText, sx: 252, w: 36, h: 49},//7
            '8' : {img:images.coinText, sx: 288, w: 36, h: 49},//8
            '9' : {img:images.coinText, sx: 324, w: 36, h: 49},//9
            'x' : {img:images.coinText, sx: 360, w: 36, h: 49}//x
        };

        //初始化总分数属性
        var totalTexts = {
            '9' : {img:images.numberText, sy: 0, w: 20, h: 24},//0
            '8' : {img:images.numberText, sy: 24, w: 20, h: 24},//1
            '7' : {img:images.numberText, sy: 48, w: 20, h: 24},//2
            '6' : {img:images.numberText, sy: 72, w: 20, h: 24},//3
            '5' : {img:images.numberText, sy: 96, w: 20, h: 24},//4
            '4' : {img:images.numberText, sy: 120, w: 20, h: 24},//5
            '3' : {img:images.numberText, sy: 144, w: 20, h: 24},//6
            '2' : {img:images.numberText, sy: 168, w: 20, h: 24},//7
            '1' : {img:images.numberText, sy: 192, w: 20, h: 24},//8
            '0' : {img:images.numberText, sy: 216, w: 20, h: 24}//9
        };

        //创建底部平台
        var bottomBar = new Component(images.bottomBar, 765, 71, 468, oPlayBox.height-35);
        var energyBar = new Component(images.energyBar, 213, 19, 735, oPlayBox.height-17);
        var cannonM = new Component(images.cannonMinus, 44, 31, 450, oPlayBox.height-20);
        var cannonMD = new Component(images.cannonMinusDown, 44, 31, 450, oPlayBox.height-20);
        var cannonP = new Component(images.cannonPlus, 44, 31, 575, oPlayBox.height-20);
        var cannonPD = new Component(images.cannonPlusDown, 44, 31, 575, oPlayBox.height-20);
        //返回按钮
        var backBtn = new Component(images.backBtn, 42, 42, oPlayBox.width-64, oPlayBox.height-650);
        var backBtnD = new Component(images.backBtnDown, 42, 42,  oPlayBox.width-64, oPlayBox.height-650);

        //创建总分计数
        function createTotalScore() {
            var totalNum = localStorage.getItem("userScore");
            while(totalNum.length < 6) {
                totalNum = "0" + totalNum;
            }
            arrTotalScore.splice(0, arrTotalScore.length);
            for(var i = 0; i < 6; i++) {
                var totalTextAt = totalTexts[totalNum.charAt(i)];
                var oTotalScore = new TotalScore(totalTextAt.img, 0, totalTextAt.sy, (115 + (totalTextAt.w + 4) * i), oPlayBox.height-15, totalTextAt.w, totalTextAt.h);
                arrTotalScore.push(oTotalScore);
            }
        }
        createTotalScore();

        //创建炮体
        var selNum = 0;
        var clickM = false;
        var clickP = false;
        var clickB = false;
        var canAttr = cannonsAttr[selNum];
        var oCannon = new Cannon(canAttr.img, canAttr.w, canAttr.h, canAttr.x, canAttr.y);

        //开始游戏按钮点击
        var oMenuPage = document.getElementById("menuPage");
        var oStartBtn = document.getElementById("startBtn");
        var oContiBtn = document.getElementById("continueBtn");
        var oExitBtn = document.getElementById("exitBtn");

        var scores = localStorage.getItem("userScore");
        if(parseInt(scores) == 0) {
            oContiBtn.disabled = true;
        }
        else {
            oContiBtn.disabled = false;
        }

        //相关点击事件
        oPlayBox.addEventListener("click", function(ev) {
            var pos = util.getEventPosition(ev);
            console.log("posX:"+pos.x+" posY:"+pos.y);
            if(pos.x > 87 && pos.x < 850 && pos.y < oPlayBox.height && pos.y > oPlayBox.height - 40){
                //左键递减
                if(pos.x < 467 && pos.x > 433 && pos.y < 695 && pos.y > 671) {
                    clickM = true;
                    selNum--;
                    if(0 > selNum) {
                        selNum = cannonsAttr.length-1;
                    }
                }
                //右键递增
                if(pos.x < 591 && pos.x > 557 && pos.y < 695 && pos.y > 671) {
                    clickP = true;
                    selNum++;
                    if(cannonsAttr.length <= selNum) {
                        selNum = 0;
                    }
                }
                canAttr = cannonsAttr[selNum];
                oCannon = new Cannon(canAttr.img, canAttr.w, canAttr.h, canAttr.x, canAttr.y);
            }
            //back键返回
            else if(pos.x < 980 && pos.x > 940 && pos.y < 68 && pos.y > 30){
                clickB = true;

                scores = localStorage.getItem("userScore");
                if(parseInt(scores) == 0) {
                    oContiBtn.disabled = true;
                }
                else {
                    oContiBtn.disabled = false;
                }

                setTimeout(function(){
                    oMenuPage.style.top = "0px";
                    oMenuPage.style.webkitTransition = "top 1s";
                    clearInterval(createfishId);
                    clearInterval(spriteMoveId);
                    clearInterval(changeStyleId);
                }, 500);
            }
            else{
                //计算角度
                var cX = oCannon.posX;
                var cY = oCannon.posY;
                var x = pos.x - cX;
                var y = pos.y - cY;
                var aVal = Math.atan2(y, x);
                oCannon.rotate = util.angleToRadian(aVal) + 90;

                //创建炮弹类
                var bullet = bullsAttr[selNum];
                var oBullet = new Bullet(bullet.img, bullet.w, bullet.h, bullet.sx, bullet.sy);
                oBullet.posX = oCannon.posX;
                oBullet.posY = oCannon.posY;
                oBullet.rotate = oCannon.rotate;
                arrBull.push(oBullet);
            }
        });

        //定时器1：创建鱼群对象
        function createFishHandler () {
            var _randNum = util.getRandomBy(0, 11);
            var _fish = fishsAttr[_randNum];
            var _oFish = new Fish(_fish.img, _fish.width, _fish.height, _fish.frame);
            if(util.getRandomBy(10) <= 5) {                 //左侧方向鱼群
                _oFish.posX = -_oFish.padding;
                _oFish.rotate = util.getRandomBy(-60, 60);  //[-60deg, 60deg]
            }
            else{                                           //右侧方向鱼群
                _oFish.posX = oPlayBox.width + _oFish.padding;
                _oFish.rotate = util.getRandomBy(-240, -120); //[-240deg, -120deg]
            }
            _oFish.posY = Math.random() * oPlayBox.height;
            _oFish.score = _fish.score;
            arrFish.push(_oFish);
        }

        //定时器2：精灵绘制与移动处理
        function spriteMoveHandler () {
            ctx.clearRect(0, 0, oPlayBox.width, oPlayBox.height);

            //绘制炮弹
            for(var i=0; i<arrBull.length; i++) {
                if(util.checkScreenOutside(arrBull[i], oPlayBox.width, oPlayBox.height)) {
                    arrBull.splice(i--, 1);
                    continue;
                }
                arrBull[i].move();
                arrBull[i].draw(ctx);
            }

            //绘制鱼群
            for(var i=0; i<arrFish.length; i++) {
                if(util.checkScreenOutside(arrFish[i], oPlayBox.width, oPlayBox.height)) {
                    arrFish.splice(i--, 1);
                    continue;
                }
                arrFish[i].move();
                arrFish[i].draw(ctx);
            }
            //绘制死鱼
            for(var i=0; i<arrDeadFish.length; i++) {
                arrDeadFish[i].draw(ctx);
            }

            //绘制渔网
            for(var i=0; i<arrweb.length; i++) {
                arrweb[i].draw(ctx);
            }

            //绘制金币
            for(var i=0; i<arrCoin.length; i++) {
                //if(util.checkScreenOutside(arrCoin[i], oPlayBox.width, oPlayBox.height)) {
                if(arrCoin[i].posX >= arrCoin[i].targetX - 50 && arrCoin[i].posX <= arrCoin[i].targetX + 50
                    && arrCoin[i].posY >= arrCoin[i].targetY - 30 && arrCoin[i].posY <= arrCoin[i].targetY + 30){
                    arrCoin.splice(i--, 1);
                    continue;
                }
                arrCoin[i].move();
                arrCoin[i].draw(ctx);
            }

            //绘制金币分数
            for(var i=0; i<arrCoinText.length; i++) {
                if(arrCoinText[i].time > 20) {
                    arrCoinText.splice(i--, 1);
                    continue;
                }
                arrCoinText[i].move();
                arrCoinText[i].draw(ctx);
            }

            //绘制底部组件
            bottomBar.draw(ctx);
            energyBar.draw(ctx);
            cannonM.draw(ctx);
            cannonP.draw(ctx);
            backBtn.draw(ctx);
            if(clickM) {
                cannonMD.draw(ctx);
                clickM = false;
            }
            if(clickP) {
                cannonPD.draw(ctx);
                clickP = false;
            }
            if(clickB) {
                backBtnD.draw(ctx);
                clickB = false;
            }

            //绘制总分计数
            for(var i=0; i<arrTotalScore.length; i++) {
                arrTotalScore[i].draw(ctx);
            }

            //绘制炮体
            oCannon.draw(ctx);

            //碰撞处理
            for(var i=0; i<arrFish.length; i++) {
                for(var j=0; j<arrBull.length; j++) {
                    //鱼与炮弹之间的碰撞检测
                    if( util.checkCollision(arrFish[i], arrBull[j]) ) {
                        //铺放渔网
                        var webAttr = websAttr[selNum];
                        var oWeb = new Web(webAttr.img, webAttr.w, webAttr.h,
                            arrBull[j].posX, arrBull[j].posY, webAttr.sx, webAttr.sy);
                        arrweb.push(oWeb);
                        //0.4秒后清除渔网
                        (function(obj){
                            setTimeout(function(){
                                for(var i=0; i<arrweb.length; i++) {
                                    if(arrweb[i] == obj) {
                                        arrweb.splice(i, 1);
                                        break;
                                    }
                                }
                            }, 400);
                        })(oWeb);

                        //鱼与渔网之间的碰撞检测
                        for(var k=0; k<arrFish.length; k++) {
                            for(var w=0; w<arrweb.length; w++) {
                                //如果已碰撞并且满足随机条件40%
                                if( util.checkCollision(arrFish[k], arrweb[w]) && util.getRandomBy(10) < 5) {
                                    //绘制亡命之鱼
                                    var oDeadFish = new DeadFish(arrFish[k].imgNode, arrFish[k].width, arrFish[k].height, arrFish[k].maxFrame);
                                    //传递坐标
                                    oDeadFish.posX = arrFish[k].posX;
                                    oDeadFish.posY = arrFish[k].posY;
                                    //传递角度
                                    oDeadFish.rotate = arrFish[k].rotate;
                                    arrDeadFish.push(oDeadFish);
                                    //1秒后清除亡鱼垂死挣扎状
                                    (function(obj){
                                        setTimeout(function(){
                                            for(var i=0; i<arrDeadFish.length; i++) {
                                                if(arrDeadFish[i] == obj) {
                                                    arrDeadFish.splice(i, 1);
                                                    break;
                                                }
                                            }
                                        }, 1000);
                                    })(oDeadFish);

                                    //显示金币
                                    var coinAttr;
                                    if(arrFish[k].score <= 30) {
                                        coinAttr = coinsAttr[0];
                                    }
                                    else{
                                        coinAttr = coinsAttr[1];
                                    }
                                    var oCoin = new Coin(coinAttr.img, coinAttr.w, coinAttr.h, arrFish[k].posX, arrFish[k].posY, 160, 665, 10);
                                    arrCoin.push(oCoin);

                                    //显示得分
                                    var coinScore = arrFish[k].score + 'x';
                                    for(var t = 0; t < coinScore.length; t++){
                                        var coinTextAt = coinTexts[coinScore.charAt(t)];
                                        var oCoinScore = new CoinScore(coinTextAt.img, coinTextAt.sx, 0, arrFish[k].posX + 36 * t, arrFish[k].posY, coinTextAt.w, coinTextAt.h, arrFish[k].posX + 36 * t, arrFish[k].posY - 50);
                                        arrCoinText.push(oCoinScore);
                                    }

                                    //累加至总分显示
                                    var totalNum = localStorage.getItem("userScore");
                                    totalNum = parseInt(totalNum) + arrFish[k].score;
                                    totalNum = totalNum.toString();
                                    while(totalNum.length < 6) {
                                        totalNum = "0" + totalNum;
                                    }
                                    arrTotalScore.splice(0, arrTotalScore.length);  //清空一次
                                    for(var i = 0; i < 6; i++) {
                                        var totalTextAt = totalTexts[totalNum.charAt(i)];
                                        var oTotalScore = new TotalScore(totalTextAt.img, 0, totalTextAt.sy, (115 + (totalTextAt.w + 4) * i), oPlayBox.height-15, totalTextAt.w, totalTextAt.h);
                                        arrTotalScore.push(oTotalScore);
                                    }
                                    localStorage.setItem("userScore", totalNum);
                                    //清除已碰撞的鱼
                                    arrFish.splice(k--, 1);
                                }
                            }
                        }
                        //清除已碰撞的子弹
                        arrBull.splice(j--, 1);
                    }
                }
            }

        }

        //定时器3：精灵下一帧切换样式处理
        function changeSpriteStyleHandler () {
            for(var i = 0; i < arrFish.length; i++) {
                arrFish[i].nextFrame();
            }
            for(var j = 0; j < arrDeadFish.length; j++) {
                arrDeadFish[j].nextFrame();
            }
            for(var k = 0; k < arrCoin.length; k++) {
                arrCoin[k].nextFrame();
            }
        }

        //按钮点击事件：开始新游戏
        oStartBtn.addEventListener("click", function() {
            oMenuPage.style.top = "-700px";
            oMenuPage.style.webkitTransition = "top 1s";
            //初始化数组
            arrFish.splice(0, arrFish.length);
            arrBull.splice(0, arrBull.length);
            arrweb.splice(0, arrweb.length);
            arrDeadFish.splice(0, arrDeadFish.length);
            arrCoin.splice(0, arrCoin.length);
            arrCoinText.splice(0, arrCoinText.length);

            localStorage.setItem("userScore", "000000");
            createTotalScore();
            createfishId = setInterval(createFishHandler, util.getRandomBy(200, 2000));
            spriteMoveId = setInterval(spriteMoveHandler, 20);
            changeStyleId =  setInterval(changeSpriteStyleHandler, 150);
        }, false);

        //按钮点击事件：继续已有游戏
        oContiBtn.addEventListener("click", function() {
            oMenuPage.style.top = "-700px";
            oMenuPage.style.webkitTransition = "top 1s";
            createfishId = setInterval(createFishHandler, util.getRandomBy(200, 2000));
            spriteMoveId = setInterval(spriteMoveHandler, 20);
            changeStyleId =  setInterval(changeSpriteStyleHandler, 150);
        });

        //按钮点击事件：关闭页面游戏
        oExitBtn.addEventListener("click", function() {
            var userAgent = navigator.userAgent;
            if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Presto") != -1) {
                window.location.replace("about:blank");
            } else {
                window.opener = null;
                window.open("", "_self");
                window.close();
            }
        });

    }, function(){
        alert("load image error, please refresh page.")
    });

}, false);

