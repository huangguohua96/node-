const exec = require("child_process").exec; //  异步

function start(response) {
    console.log("Request handler 'start' was called!");

    exec("find /", 
        { timeout: 10000, maxBuffer: 20000*1024 },  
        function(error, stdout, stderr) {
            response.writeHead(200, {"Content-Type": "text/plain"});
            let time = new Date();
            response.write("hello start: " + time);
            response.end();
    });
}
function upload(response){
    console.log("Request handler 'upload' was called!");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello Upload!");
    response.end();
}

exports.start = start;
exports.upload = upload;