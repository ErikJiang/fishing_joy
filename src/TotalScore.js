/**
 * Created by jiangink on 2015/11/28.
 */
//金币分值类
function TotalScore(imgNode, cutX, cutY, posX, posY, width, height) {
    this.imgNode = imgNode;             //图片节点
    this.width = width;                 //宽度
    this.height = height;               //高度
    this.posX = posX;                   //X坐标
    this.posY = posY;                   //Y坐标
    this.cutX = cutX;                   //切割坐标X
    this.cutY = cutY;                   //切割坐标Y
    this.curFrame = 0;                  //当前动画帧数
    this.padding = 0;                   //节点内边距
    this.startX = this.posX;
    this.startY = this.posY;
    this.time = 0;
    this.speed = 5;
}

//绘制图形
TotalScore.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.posX, this.posY);
    ctx.drawImage(this.imgNode, this.cutX, this.cutY, this.width, this.height,
        -this.width/2, -this.height/2, this.width, this.height);
    ctx.restore();
};

//切换下一帧
TotalScore.prototype.nextFrame = function() {
    this.curFrame++;
    if(this.curFrame >= this.maxFrame) {
        this.curFrame = 0;
    }
};





