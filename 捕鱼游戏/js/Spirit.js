//基础控件
// 需要的变量
//w,h,x,y,sx,sy,scale,rotate,x,y为图形中心点的坐标
class Spirit {
    constructor(options) {
        this.img = options.img; //options包含了所有的参数

        this.sx = options.sx || 0;
        this.sy = options.sy || 0;

        this.w = options.w || this.img.width;
        this.h = options.h || this.img.height;

        this.x = options.x || 0;
        this.y = options.y || 0;

        this.rotation = options.rotation || 0;
        this.scaleX = options.scaleX || 1;
        this.scaleY = options.scaleY || 1;


        this.speed = options.speed || 0;
        this.type = options.type || 0;

        this.frame = options.frame || 0;
        this.max_frame = options.max_frame || 0;
        this.tick = options.tick || 0;
        this.max_tick = options.max_tick || 0;

    }
    draw(gd) { //画图,对所有物体起作用
        gd.save();

        gd.translate(this.x, this.y);
        gd.rotate(this.rotation * Math.PI / 180);
        gd.scale(this.scaleX, this.scaleY);

        gd.drawImage(
            this.img,
            this.sx, this.sy, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h //drawImg(oImg,sx,sy,sw,sh,dx,dy,dw,dh(source/destination))
        );
        gd.restore();
    }
    move() { //移动,对子弹和鱼起作用
        let speed_x = this.speed * Math.sin(this.rotation * Math.PI / 180); //当rotation为0时，speed_x=0,鱼会往上面移动，但是鱼在图片里鱼头是朝右的，这样鱼会有问题，所以要给鱼写个方法----Fish.js--draw(gd)
        let speed_y = this.speed * Math.cos(this.rotation * Math.PI / 180);
        this.x += speed_x;
        this.y -= speed_y;

    }
    setFrame(frame) {
        this.sy = frame * this.h;
    }


    nextFrame() { //对子弹、鱼、金币起作用
        this.tick++;
        if (this.tick > this.max_tick) {
            this.tick = 0;
            this.frame++;
            if (this.frame > this.max_frame) {
                this.frame = 0;
                this.setFrame(this.frame);
                return true; //表明走到头了
            } else {
                this.setFrame(this.frame);
                return false;
            }
        }
    }

    outOfCanvas(w, h) { //是否超出屏幕范围,主要对鱼和子弹起作用,w和h为canvas的宽高
        if (this.x < 0 - this.w - 100 || this.y < 0 - this.h - 100 ||
            this.x > w + this.w + 100 || this.y > h + this.h + 100
        ) {
            return true;
        } else {
            return false;
        }
    }

    collTest(spirit2) { //碰撞检测,主要对鱼和子弹起作用
        let r1 = Math.min(this.w / 2, this.h / 2);
        let r2 = Math.min(spirit2.w / 2, spirit2.h / 2);
        let dis = Math.sqrt(Math.pow(this.x - spirit2.x, 2) + Math.pow(this.y - spirit2.y, 2))
        return dis <= (r1 + r2);

    }

}