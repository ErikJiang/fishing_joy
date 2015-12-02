/**
 * Created by jiangink on 2015/11/28.
 */
//将亡之鱼
function DeadFish(imgNode, width, height, cutPos) {
    this.imgNode = imgNode;             //图片节点
    this.width = width;                 //宽度
    this.height = height;               //高度
    this.posX = 0;                      //X坐标
    this.posY = 0;                      //Y坐标
    this.score = 0;                     //所占分值
    this.rotate = 0;                    //移动角度
    this.cutPos = cutPos;               //切割点
    this.curFrame = 0;                  //当前动画帧数
    this.maxFrame =  4;                 //动画最大帧数
    this.padding = 300;                 //节点内边距
}

//绘制图形
DeadFish.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.posX, this.posY);
    ctx.rotate(util.radianToAngle(this.rotate));
    if(Math.abs(this.rotate) >= 90) {
        ctx.scale(1, -1);
    }
    ctx.drawImage(this.imgNode, 0, (this.curFrame+this.cutPos)*this.height, this.width, this.height,
        -this.width/2, -this.height/2, this.width, this.height);
    ctx.restore();
};

//切换下一帧
DeadFish.prototype.nextFrame = function() {
    this.curFrame++;
    if(this.curFrame >= this.maxFrame) {
        this.curFrame = 0;
    }
};










