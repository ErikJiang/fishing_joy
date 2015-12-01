/**
 * Created by jiangink on 2015/11/28.
 */
//金币类
function Coin(imgNode, width, height, posX, posY, targetX, targetY, maxFrame) {
    this.imgNode = imgNode;             //图片节点
    this.width = width;                 //宽度
    this.height = height;               //高度
    this.posX = posX;                   //X坐标
    this.posY = posY;                   //Y坐标
    this.targetX = targetX;             //终点X坐标
    this.targetY = targetY;             //终点Y坐标
    this.maxFrame = maxFrame;           //动画最大帧数
    this.curFrame = 0;                  //当前动画帧数
    this.padding = 0;                   //节点内边距
    this.startX = this.posX;
    this.startY = this.posY;
    this.count = 0;
}
//绘制图形
Coin.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.posX, this.posY);
    ctx.drawImage(this.imgNode, 0, this.curFrame*this.height, this.width, this.height,
        -this.width/2, -this.height/2, this.width, this.height);
    ctx.restore();
};
//切换下一帧
Coin.prototype.nextFrame = function() {
    this.curFrame++;
    if(this.curFrame >= this.maxFrame) {
        this.curFrame = 0;
    }
};
//图形移动
Coin.prototype.move = function() {
    this.count++;
    var distX = this.targetX - this.startX;
    var distY = this.targetY - this.startY;
    //将路程分为30段距离移动
    this.posX = this.startX + distX * this.count / 30;
    this.posY = this.startY + distY * this.count / 30;
};










