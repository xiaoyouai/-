//炮弹
class Cannon extends Spirit {
    constructor(type) {
        if (type > 7 || type < 1) {
            throw new Error('炮：1-7')
        }
        const data = window._g_resouce['cannon'][`cannon${type}`];

        super({ //{img: data.img, sx: data.frame.sx,...max_tick: 5}对应options
            img: data.img,
            sx: data.frame.sx,
            sy: data.frame.sy,
            w: data.frame.w,
            h: data.frame.h,
            // rotation: 90,
            speed: Math.random() * 2.5 + 0.5,
            type: type,
            max_frame: 5,
            max_tick: 2,
        })
    }
    setType(type) {
        if (type > 7 || type < 1) {
            throw new Error('炮：1-7')
        }
        const data = window._g_resouce['cannon'][`cannon${type}`];
        this.img = data.img,
            this.sx = data.frame.x,
            this.sy = data.frame.y,
            this.w = data.frame.w,
            this.h = data.frame.h,
            this.type = type
    }

}