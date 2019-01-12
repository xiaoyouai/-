const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {
    if (req.url == '/upload_base64') { //接口为upload_base64
        let arr = [];
        req.on('data', data => { //接收数据
            arr.push(data);
        })
        req.on('end', () => {
            let buffer = Buffer.concat(arr);
            let filename = Math.random() + '.png';

            //发过来的文件内容的开头有一段data:image/png;base64;或者col=，这一段在使用时不需要用到它，所以要替换掉
            //decodeURIComponent是因为canvasdownload.html发过来的数据变成了url编码的格式，decodeURIComponent后才会变成和canvassend.html发过来的数据一样
            //fs.writeFile(filename,data,[options],callback),[options]这里是base64编码
            //----------------------------------------------------------------------------------------
            fs.writeFile(filename, buffer.toString().replace(/^data:[^,]+;base64,/, ''), 'base64', err => {
                res.end('ok');
            });
        });
    } else {
        fs.readFile(`www${req.url}`, (err, data) => {
            if (err) {
                res.write('404');
            } else {
                res.write(data);
            }
            res.end();
        })
    }
}).listen(8088);