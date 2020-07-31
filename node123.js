var http = require('http')
// var server = http.createServer();  1
var zhonwen = {'Content-Type': 'text/html; charset=utf-8'}
var fs = require("fs")
var wwwDir = 'I:/node.js'
var mysql = require('mysql')
var comments = []
var chengong = {
    request:0,
    data:{},
}
var cuowu = {
    request:100,
    data:"名字必填"
}
var url = require('url')
// 链接mysql

// 1. 创建连接 ----打开冰箱们
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '15978727639',
    database: 'ceshi'
});
// 2. 连接数据库 打开冰箱门
connection.connect( (err) =>{
    if(err){
        throw err
    }else{
        console.log("链接成功")
    }
});
    // 3. 执行数据操作 把大象放到冰箱
connection.query('SELECT * FROM `ceshi1`', function (error, results, fields) {
    if (error){
        throw error;
    }else{
        comments = results
    }
});
// // 4. 关闭连接 关闭冰箱门
// connection.end();
// 简写http         2
http.createServer(function(req,res) {
    var parseObj = url.parse(req.url, true)
    var parseName = parseObj.pathname
    res.writeHead(200, zhonwen)
    if(parseName != '/favicon.ico'){
        if(parseName == '/'){
            res.end(JSON.stringify(comments))
        }else if(parseName == '/pinglun'){
            if(parseObj.query.name ==''){
                res.end(JSON.stringify(cuowu))
            }else{
                connection.query('INSERT INTO ceshi1 SET  ?',{
                    name: parseObj.query.name,
                    xb: parseObj.query.xb,
                    csrq: parseObj.query.csrq,
                    address: parseObj.query.address,
                    Byxx: parseObj.query.Byxx,
                    zip: parseObj.query.zip,},function(error,results,fields) {
                    if(error){
                        console.log(error)
                    }else{
                        connection.query('SELECT * FROM `ceshi1`', function (error, results, fields) {
                            if (error){
                                throw error;
                            }else{
                                res.end(JSON.stringify(results))
                            }
                        });
                        
                    }
                })
            }
        }
    }

}).listen(3000,function(){
    console.log("服务器启动成功,打开啦3000端口")
})

// server.on('request',function(req,res){           1
    // console.log("收到请求啦，请求路径是："+req.url)
    // ---------------------返回json数据
    // if(req.url == '/'){
    //     res.setHeader('Content-Type','text/html; charset=utf-8')
    //     res.end(JSON.stringify(comments))
    // }
    // *----------------------------------------------*像Apache一样的js
    // var filePath = '/index.html'
    // if(req.url != '/'){
    //     filePath = req.url
    //     fs.readFile(wwwDir+filePath,function(err,data){
    //         if(err){
    //             res.setHeader('Content-Type','text/plain; charset=utf-8')
    //             return res.end("暂时没有这个资源")
    //         }else{
    //             // res.setHeader('Content-Type','text/html; charset=utf-8')
    //             // res.setHeader("Content-type","application/json");
    //             res.end(data)
    //         }
    //     })
    // }e
    // console.log(filePath,wwwDir+filePath)
    // --------------------------------------------------------------------------
    // if(req.url == '/'){
    //     // res.write("hellow,world")
    //     fs.readFile("./index.html",function(err,data){
    //         if(err){
    //             res.setHeader('Content-Type','text/plain; charset=utf-8')
    //             res.end("文件读取失败")
    //         }else{
    //             res.setHeader('Content-Type','text/html; charset=utf-8')
    //             res.end(data)
    //         }
    //     })
    // }else if(req.url == '/loagind'){
    //     res.write("欢迎登陆")
    // }else if(req.url == '/index'){
    //     res.write("欢迎来到首页")
    // }else if(req.url == '/images'){
    //     fs.readFile('./3440x1440.jpg',function(err,data){
    //         if(err){
    //             res.setHeader("Content-Type","image/jpeg;")
    //             res.end("图片读取失败")
    //         }else{
    //             res.setHeader("Content-Type","image/jpeg;")
    //             res.end(data)
    //         }
            
    //     })
    // }else{
    //     res.writeHead(200, zhonwen)
    //     res.end('暂无页面')
    // }
    
// })
// server.listen(80,function(){
//     console.log("服务器启动成功")
// })