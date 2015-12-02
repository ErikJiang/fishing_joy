/**
 * Created by jiangink on 2015/11/28.
 */
//炮体类
function Cannon(imgNode, width, height, posX, posY) {
    this.imgNode = imgNode;             //图片节点
    this.width = width;                 //宽度
    this.height = height;               //高度
    this.posX = posX;                   //X坐标
    this.posY = posY;                   //Y坐标
    this.rotate = 0;                    //移动角度
}

//绘制图形
Cannon.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.posX, this.posY);
    ctx.rotate(util.radianToAngle(this.rotate));
    ctx.drawImage(this.imgNode, 0, 0, this.width, this.height,
        -this.width/2, -this.height/2, this.width, this.height);
    ctx.restore();
};


