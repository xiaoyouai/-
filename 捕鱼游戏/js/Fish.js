class Fish extends Spirit {
    constructor(type) { //鱼一共有5种，需要知道是哪种
        if (type > 5 || type < 1) {
            throw new Error('鱼：1-5')
        }
        const data = window._g_resouce['fish'][`fish${type}`];

        super({ //{img: data.img, sx: data.frame.sx,...max_tick: 5}对应options
            img: data.img,
            sx: data.frame.sx,
            sy: data.frame.sy,
            w: data.frame.w,
            h: data.frame.h,
            // rotation: 90,
            speed: Math.random() * 2.5 + 0.5,
            max_frame: 3,
            max_tick: 5,
            type: type,
            rotation: 90
        })
    }

    draw(gd) {
        this.rotation -= 90;
        super.draw(gd); //调用父类的方法
        this.rotation += 90; //转过去90度，从而解决接下面的move问题，基本变化过程为转0-draw-转90-move-转0-draw-转90......
    }

}