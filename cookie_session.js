const cookieParser = require("cookie-parser");

const cookieSession = require("cookie-session");
const express = require("express");

const server = express();

server.listen(8080);

server.use(cookieParser("aaaaabbbbb"));
server.use(cookieSession({
    maxAge: 20*60000,
    keys: ["aaa", "bbbb", "ccc"]
}));

server.use("/", function(req, res, next){
    res.cookie("user", "huangguohua", {signed: true, path: "/", maxAge: 24*3600*1000});

    console.log(req.signedCookies);

    req.session.a = 16;

    console.log(req.session.a);

    res.send("ok");
});

