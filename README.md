# node学习笔记
#### 1、fs(文件系统)
   ##### (1)文件的读写

    同步写    
         => `var res = fs.writeFileSync("./www/huang.txt", "么么哒，小可爱！", "utf8");`
    异步写  
         => `fs.writeFile("./www/1.txt", "祈祷", function(err) { if(err) throw err }); `
         注意：   
            （1）最后的“utf8”为默认参数，可省略； 
            （2）若文件不存在，系统会自动创建文件；
            （3）写入成功则返回undefined
    
    同步读   
         => `res = fs.readFileSync("./www/huang.txt", "utf8");
            console.log(data);`
         => `res = fs.readFileSync("./www/huang.txt");
            console.log(data.toString());`
    异步读   
         => `fs.readFile("./www/1.txt", "utf8", function(err, data){})`
         注意：   
            （1）“utf8”为可选参数，若加入该参数，系统默认以UTF8的格式解读文件内容，若没有则输出二进制码，所以输出时需要.toString()转换格式
    
   ##### (2)追加内容  
        ` fs.appendFileSync("./www/huang.txt", "\n这是添加的内容，添加时间："+new Date());

        fs.appendFile("./www/1.txt", "\n添加内容，时间："+new Date(), function(err){
            console.log(err);
        }); `

   ##### (3)判断文件是否存在  
        ` res = fs.existsSync("./www/huang.txt");
        console.log(res);  
      
        fs.exists("./www/1.txt", function(data){
            console.log(data);
        }); `

   ##### (4)文件监听
    监听指定文件：   
        ` fs.watchFile("./www/huang.txt", function() {
            console.log("文件被修改了！");
        }); `
    监听指定目录：     
        ` fs.watch("./www", function(data){
            console.log("被修改了："+ data);
        }); `



***

#### (2)http模块和url模块
    `
    const http = require("http"); //获取http模块  
    const url = require("url"); //url模块用于解析访问路径和数据
    //定义回调函数
    function start(){
        function onRequest(request, response) {
            let pathName = url.parse(request.url,true).pathname; //获取url路径
            let query = url.parse(request.url, true).query; //获取用户请求数据
            response.writeHead("Content-Type": "text/plain");   //设置响应头
            response.write("Hello World!"); //相应主体
            response.end(); //完成响应  
       
        }   
        http.createServer(onRequest).listen(8888);  //调用http模块的createServer函数创建服务器并监听端口    
        console.log("Server has started.");
    }
    
    exports.start = start;  //出口

    `
#### (3)定义router模块和requestHandlers模块

#### (4)querystring模块和url模块
    `querystring.parse(str) //将字符串解析成json（解析POST数据）`  
    `urlLib.parse(req.url, true)    //将字符串解析成json(解析get数据)`

#### (5)POST数据请求
    ` 
    http.createServer(function(req, res){
        //POST数据请求(post 数据很大时会被分成多段进行传输)
        // data --有一段数据到达的时候触发（多次）
        var str = '';
        req.on("data", function(data) { str+=data; })

        //end --数据全部到达（一次）
        req.on("end", function() {})
    })
    `

#### (6)require、module.exports、exports模块
    ` require()   //引入其他模块  
    exports.a = 10  //输出
    module.exports = {a: 10}    //批量输出
    `

## npm 管理工具
    npm init 初始化项目，生成package.json文件
    npm login 登录
    npm publish 发布自己的模块
    npm --force unpublish   下线自己的模块


## express框架
    `
    1.安装： npm install express  
    2.引入模块: const express = require("express");    
    3.创建服务：const server = express();
    4.监听：server.listen(8888);
    5.处理请求： server.use('url', function(req, res) {});  //接收POST 和get 请求
                server.get(...) //接收get请求
                server.post(...)    //接收POST请求

    非侵入式   
    req   

    原生：res.write()   
    express: res.send()    //可以直接发送json   
    `
### express中间件
#### express-static插件
    安装： npm install express-static
    引入模块：const expressStatic = require("express-static");
    使用： server.use(expressStatic('./www'));  //监听www文件目录，（访问www下的文件时，会直接访问该文件）

### express 框架获取数据

    GET请求方式： req.query;    //不需要中间件处理

    POST请求方式：req.body  //需要中间件“body-parser”处理
        const bodyParser = require("body-Parser");
        server.use(bodyParser.urlEncoded({
            extended: true, //拓展模式
            limit: 100*1024,    //限制（默认100K） 
        }))
        server.use("/", function(req, res) {  req.body  })
    同时中间件可以自己写：
    const querystring = require("querystring"); //引入原生模块
    server.use("/", function(req, res, next){
        var str = "";
        req.on("data", function(data) { str =+ data;});
        req.on("end", function() {
            req.body = querystring.parse(str);

            next(); //继续执行下一步
        })
    })

### 链式操作
    server.use("/", function(req, res, next){
        ...
        next(); //进行下一步操作
     })

    server.use("/", function(req, res, next){ ... })

#### cookie 和 session

    在项目中安装和导入模块
    ` npm install --svae-dev cookie-parser cookie-session`   
    `
    const express = require("express");
    const expressStatic = require("expressStatic");

    const cookieParser = require("cookie-parser");  //用于cookie签名
    const cookieSession = require("cookie-session");    //使用session

    const server = express();
    server.listen(8080);

    server.use(cookieParser("签名key"));     //用于cookie签名，需要使用session时也要提前使用
    server.use(cookieSession({
        maxAge : 20*1000,    //生存时间
        keys: ["aaa", "bbb", "ccc", "ddd"]  //
    }));

    server.use("/", function(req, res, next){
        res.cookie("key", "value", {maxAge: 200*1000, signed: true, path: "/"});    //发送经过签名cookie
        res.cookie("key1", "value1", {maxAge: 200*1000000, path: "/"}); //发送未签名的cookie

        console.log(req.cookies) //访问未签名的cookie
        console.log(req.signedCookies)  //访问经过签名的cookie

        req.session.a = value;  //定义session

        console.log(req.session)  //访问session
    })
    `

