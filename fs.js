var fs = require("fs"); //file system 文件系统，用于读写文件

// 1、文件系统的写
//同步写，成功则返回undefined
var res = fs.writeFileSync("./www/huang.txt", "么么哒，小可爱！", "utf8");

//异步写
fs.writeFile("./www/1.txt", "祈祷", function(err) {
    if(err){
        throw err;
    }else{
        console.log("写入成功！");
    }
});

// 2、文件系统的读
// 同步读
res = fs.readFileSync("./www/huang.txt");
console.log(res.toString());

res = fs.readFileSync("./www/huang.txt", "utf8");
console.log(res);

// 异步读
fs.readFile("./www/1.txt", function(err, data){
    if(err){
        throw err;
    }else{
        console.log(data.toString());
    }
});
fs.readFile("./www/1.txt", "utf8", function(err, data){
    if(err){
        throw err;
    }else{
        console.log(data);
    }
});

// 3、判断文件是否存在
res = fs.existsSync("./www/huang.txt");
console.log(res);

fs.exists("./www/1.txt", function(data){
    console.log(data);
});

// 4、添加内容
fs.appendFileSync("./www/huang.txt", "\n这是添加的内容，添加时间："+new Date());

fs.appendFile("./www/1.txt", "\n添加内容，时间："+new Date(), function(err){
    console.log(err);
});


// 5、文件监听
fs.watchFile("./www/huang.txt", function() {
    console.log("文件被修改了！");
});
fs.watch("./www", function(data){
    console.log("被修改了："+ data);
});