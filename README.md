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



            