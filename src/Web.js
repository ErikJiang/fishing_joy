/**
 * Created by jiangink on 2015/11/28.
 */
//渔网类
function Web(imgNode, width, height, posX, posY, cutX, cutY) {
    this.imgNode = imgNode;             //图片节点
    this.width = width;                 //宽度
    this.height = height;               //高度
    this.cutX = cutX;                   //切割点X坐标
    this.cutY = cutY;                   //切割点Y坐标
    this.posX = posX;                   //X坐标
    this.posY = posY;                   //Y坐标
    this.rotate = 0;                    //移动角度
    this.padding = 300;                 //节点内边距
}

//绘制图形
Web.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.posX, this.posY);
    ctx.rotate(util.radianToAngle(this.rotate));
    ctx.drawImage(this.imgNode, this.cutX, this.cutY, this.width, this.height,
        -this.width/2, -this.height/2, this.width, this.height);
    ctx.restore();
};




