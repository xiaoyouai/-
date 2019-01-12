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

            // 方法二：直接读取前台发过来的文件内容，然后发给前台，通过设置响应头让前台浏览器下载
            //发过来的文件内容的开头有一段data:image/png;base64;或者col=，这一段在使用时不需要用到它，所以要替换掉
            //decodeURIComponent是因为canvasdownload.html发过来的数据变成了url编码的格式，decodeURIComponent后才会变成和canvassend.html发过来的数据一样
            let buff = new Buffer(decodeURIComponent(buffer.toString().replace(/^col=/, '')).replace(/^data:[^,]+;base64,/, ''), 'base64');
            res.setHeader('Content-Disposition', 'attachment;filename=download.png'); //在常规HTTP响应中，Content-Disposition响应头是一个标题，指示是否希望内容在浏览器中内嵌显示，即作为网页或作为网页的一部分，或作为附件，下载和在本地保存。attachment表示应该下载;
            res.end(buff); //把data给前台

            // 方法一，先写入图片文件到服务器，再读取文件内容，然后发给前台，通过设置响应头让前台浏览器下载
            //fs.writeFile(filename,data,[options],callback),[options]这里是base64编码
            //----------------------------------------------------------------------------------------
            // fs.writeFile(filename, decodeURIComponent(buffer.toString().replace(/^col=/, '')).replace(/^data:[^,]+;base64,/, ''), 'base64', err => {
            //     fs.readFile(filename, (err, data) => { //把文件读出来
            //         res.setHeader('Content-Disposition', 'attachment;filename=download.png');
            //         res.end(data);
            //     })
            // })
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