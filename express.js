const express = require("express");
const expressStatic = require("express-static");

const server = express();
server.listen(8888);


server.use("/", function(req, res){
    res.send({a: 10, b: 20});
    res.end();
});

server.use(expressStatic("./www"));


