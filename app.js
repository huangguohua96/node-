var fs = require("fs"); //file system 文件系统，用于读写文件

//同步写，成功则返回undefined
var res = fs.writeFileSync("./www/huang.txt", "么么哒，小可爱！");

//异步写
fs.writeFile("./www/1.txt", "祈祷", function(err) {
    if(err){
        throw err;
    }else{
        console.log("写入成功！");
    }
});


// 同步读
res = fs.readFileSync("./www/huang.txt");
console.log(res.toString());

// 异步读
fs.readFile("./www/1.txt", function(err, data){
    if(err){
        throw err;
    }else{
        console.log(data.toString());
    }
})