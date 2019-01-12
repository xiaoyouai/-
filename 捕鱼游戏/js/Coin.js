//钱币
class Coin extends Spirit {
    constructor(type) {
        if (type > 2 || type < 1) {
            throw new Error('钱币：1-2')
        }
        const data = window._g_resouce['coin'][`coinAni${type}`];

        super({ //{img: data.img, sx: data.frame.sx,...max_tick: 5}对应options
            img: data.img,
            sx: data.frame.x,
            sy: data.frame.y,
            w: data.frame.w,
            h: data.frame.h,
            speed: 5,
            type: type,
            max_frame: 10,
            max_tick: 2,
        })
    }

}