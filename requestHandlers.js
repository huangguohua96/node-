//const exec = require("child_process").exec; //  异步
const fs = require("fs");
function start(response, url) {
    console.log("Request handler 'start' was called!");
    console.log(url.query)

    response.writeHead(200, {"Cotent-Type": "text/plain"} );
    fs.readFile("./www/home.html", function(err, data){
        if(err){
            throw err;
        }else{
            response.write(data);
        }
        response.end();
    });
    
}
function upload(response, url){
    console.log("Request handler 'upload' was called!");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello Upload!");
    response.end();
}

exports.start = start;
exports.upload = upload;