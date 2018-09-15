const fs = require("fs");

function route(handle, url, response){
    console.log("About to route a request for "+ url.pathname);
    if(typeof handle[url.pathname] === "function"){
        handle[url.pathname](response, url);
    }else{
        fs.readFile("./www"+url.pathname, function(err,data){
            if(err){
                console.log("No request handler found for " + url.pathname);
                response.writeHead(404, {"Content-Type": "text/plain"});
                response.write("404 Not found!");
            }else{
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write(data);
            }
            response.end();
        });
        
    }
}

exports.route = route;