const express = require("express");
const querystring = require("querystring");

const server = express();
server.listen(8888);


//将POST请求数据存到 req.body
server.use("/", function(req, res, next){
    var str = "";
    req.on("data", function(data) { str += data;});
    req.on("end", function(){
        req.body = querystring.parse(str);

        next();
    });
});

server.use("/", function(req, res, next){
    res.send(req.body); 
    
    //get数据
    //req.query;
    next();
});
