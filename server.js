const http = require("http");
const urlLib = require("url");

function start(route,handle) {
    function onRequest(request, response){
        let url = urlLib.parse(request.url,  true);
        console.log("Request for " + url.pathname + " received");

        route(handle, url, response); 
    }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;

