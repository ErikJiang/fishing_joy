/**
 * Created by jiangink on 2015/11/28.
 */
//炮弹类
function Bullet(imgNode, width, height, cutX, cutY) {
    this.imgNode = imgNode;             //图片节点
    this.width = width;                 //宽度
    this.height = height;               //高度
    this.cutX = cutX;                   //切割点X坐标
    this.cutY = cutY;                   //切割点Y坐标
    this.posX = 0;                      //X坐标
    this.posY = 0;                      //Y坐标
    this.score = 0;                     //所占分值
    this.speed = 10;                    //固定速度
    this.rotate = 0;                    //移动角度
    this.padding = 300;                 //节点内边距
}
//绘制图形
Bullet.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.posX, this.posY);
    ctx.rotate(util.radianToAngle(this.rotate));
    ctx.drawImage(this.imgNode, this.cutX, this.cutY, this.width, this.height,
        -this.width/2, -this.height/2, this.width, this.height);
    ctx.restore();
};

//图形移动
Bullet.prototype.move = function() {
    this.posX += Math.cos(util.radianToAngle(this.rotate - 90)) * this.speed;
    this.posY += Math.sin(util.radianToAngle(this.rotate - 90)) * this.speed;
};




