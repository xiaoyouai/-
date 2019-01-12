//子弹
class Bullet extends Spirit {
    constructor(type) {
        if (type > 7 || type < 1) {
            throw new Error('子弹：1-7')
        }
        const data = window._g_resouce['bullet'][`bullet${type}`];

        super({ //{img: data.img, sx: data.frame.sx,...max_tick: 5}对应options
            img: data.img,
            sx: data.frame.sx,
            sy: data.frame.sy,
            w: data.frame.w,
            h: data.frame.h,
            speed: 10,
            type: type
        })
    }
}