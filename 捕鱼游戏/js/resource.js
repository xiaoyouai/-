//加载img文件夹中的json文件信息
function loadMyResource(path) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'img/' + path,
            dataType: 'text',
            success(txt) {
                let json = eval('(' + txt + ')');

                let res = {};
                let count = 0,
                    total = 0;
                for (let name in json) {
                    total++;

                    let oImg = new Image();

                    oImg.src = 'img/' + json[name].src;
                    oImg.onload = function() {
                        res[name] = {
                            img: this,
                            frame: json[name].frame
                        };

                        count++;

                        if (count == total) {
                            resolve(res);
                        }
                    };
                    oImg.onerror = function() {
                        reject();
                    };
                }
            },
            error(err) {

                reject(err);
            }
        })
    });
}

async function loadResources() {
    let src = {
        bottom: 'bottom.json',
        bullet: 'bullet.json',
        cannon: 'cannon.json',
        coin: 'coin.json',
        fish: 'fish.json',
        number: 'number.json',
        web: 'web.json'
    };
    let imgs = {};


    try {
        for (let name in src) {
            imgs[name] = await loadMyResource(src[name]); //调用上面的loadMyResource函数，函数返回一个 Promise 对象，await 就会等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。
        }
        window._g_resouce = imgs;
    } catch (e) {
        throw e;
    }
}